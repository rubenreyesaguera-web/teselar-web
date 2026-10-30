// Las consultas del panel. Lee de las tablas de las propuestas (db/propuestas.sql) y de las suyas (db/panel.sql).
//
// Desde aqui solo se ESCRIBE lo que decidio Ruben el 30/10: contactos (alta, edicion y cierre), cobros, hitos
// cumplidos (con el mismo evento de solo anadir que `avance` del script, con `origen: panel`) y el contador de
// la entrada. Crear, sustituir e invalidar propuestas sigue siendo solo cosa de `scripts/propuesta.ts`.
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { capacidadValida } from '../propuestas/canonico';
import type { InstantaneaV1 } from '../propuestas/instantanea';
import { FORMA_REFERENCIA, type Estado } from '../propuestas/leer';
import type { EstadoAcceso } from './sesion';
import { caducados, estadoAcuse, plegarHitos, type CamposContacto, type Contacto, type EventoHito, type PropuestaPanel } from './resumen';

type Sql = NeonQueryFunction<false, false>;

export function conexion(): Sql {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('Falta DATABASE_URL');
  return neon(url);
}

const iso = (v: string | Date) => new Date(v).toISOString();
const isoONull = (v: string | Date | null) => (v === null ? null : iso(v));

// ——— Propuestas ———

interface FilaPropuesta {
  proposal_id: string;
  version: number;
  status: 'publicada' | 'sustituida' | 'invalidada';
  snapshot: InstantaneaV1;
  created_at: string | Date;
  expires_at: string | Date;
  accepted_at: string | Date | null;
  nombre: string | null;
  correo: string | null;
  razon_social: string | null;
  cargo: string | null;
  primera: string | Date | null;
  ultima: string | Date | null;
  veces: number | null;
}

interface FilaEvento {
  proposal_id: string;
  tipo: string;
  hito: number | null;
  fecha: string | null;
  created_at: string | Date;
}

interface FilaEnlace {
  id: number;
  negocio: string;
  colaborador: string | null;
  propuesta: string;
}

export function componerPropuesta(f: FilaPropuesta, eventos: FilaEvento[], enlace: FilaEnlace | undefined, ahora = new Date()): PropuestaPanel {
  const aceptada = f.accepted_at !== null;
  let estado: Estado;
  if (aceptada) estado = 'aceptada';
  else if (f.status !== 'publicada') estado = 'retirada';
  else if (new Date(f.expires_at) <= ahora) estado = 'vencida';
  else estado = 'vigente';
  const deHitos: EventoHito[] = eventos
    .filter((e) => e.hito !== null)
    .map((e) => ({ tipo: e.tipo, hito: e.hito as number, fecha: e.fecha, created_at: iso(e.created_at) }));
  const { cumplidos, cobrados } = plegarHitos(deHitos);
  return {
    referencia: f.proposal_id,
    version: f.version,
    estado,
    negocio: f.snapshot.partes.cliente.negocio,
    cliente: f.snapshot.partes.cliente.nombre,
    creada: iso(f.created_at),
    vence: iso(f.expires_at),
    venceDia: f.snapshot.vigencia.hasta,
    aceptada: isoONull(f.accepted_at),
    aceptante: aceptada && f.nombre && f.correo ? { nombre: f.nombre, correo: f.correo, razon_social: f.razon_social, cargo: f.cargo } : null,
    acuse: estadoAcuse(aceptada, eventos.map((e) => e.tipo)),
    hitos: f.snapshot.pagos.hitos.map((h, i) => ({
      n: i + 1,
      hito: h.hito,
      importe_centimos: h.importe_centimos,
      cuando: h.cuando,
      cumplido: cumplidos[i + 1] ?? null,
      cobrado: cobrados[i + 1] ?? null,
    })),
    aperturas: f.primera && f.ultima && f.veces ? { primera: iso(f.primera), ultima: iso(f.ultima), veces: f.veces } : null,
    contacto: enlace ? { id: Number(enlace.id), negocio: enlace.negocio, colaborador: enlace.colaborador } : null,
  };
}

/**
 * Todas las propuestas, cada una en su version mas reciente, de la mas nueva a la mas vieja. Si se pasa una
 * referencia, solo esa. Las de prueba (año 2099) tambien salen: son las que hay en la base de verdad.
 */
export async function leerPropuestas(referencia?: string, sql: Sql = conexion()): Promise<PropuestaPanel[]> {
  if (referencia !== undefined && !FORMA_REFERENCIA.test(referencia)) return [];
  const ref = referencia ?? null;
  const filas = (await sql`
    SELECT DISTINCT ON (v.proposal_id)
           v.proposal_id, v.version, v.status, v.snapshot, v.created_at, v.expires_at,
           a.accepted_at, i.nombre, i.correo, i.razon_social, i.cargo,
           ap.primera, ap.ultima, ap.veces
      FROM propuesta_version v
      LEFT JOIN aceptacion a ON a.proposal_id = v.proposal_id AND a.version = v.version
      LEFT JOIN aceptacion_identidad i ON i.acceptance_id = a.acceptance_id
      LEFT JOIN propuesta_apertura ap ON ap.proposal_id = v.proposal_id
     WHERE ${ref}::text IS NULL OR v.proposal_id = ${ref}
     ORDER BY v.proposal_id DESC, v.version DESC`) as FilaPropuesta[];
  if (!filas.length) return [];
  const eventos = (await sql`
    SELECT proposal_id, tipo, (detalle->>'hito')::int AS hito, detalle->>'fecha' AS fecha, created_at FROM evento
     WHERE (${ref}::text IS NULL OR proposal_id = ${ref})
       AND tipo IN ('hito_cumplido', 'hito_deshecho', 'cobro_apuntado', 'cobro_deshecho', 'acuse_enviado', 'acuse_fallido')
     ORDER BY evento_id`) as FilaEvento[];
  const enlaces = (await sql`
    SELECT DISTINCT ON (propuesta) id, negocio, colaborador, propuesta FROM contacto
     WHERE propuesta IS NOT NULL AND (${ref}::text IS NULL OR propuesta = ${ref})
     ORDER BY propuesta, actualizado DESC`) as FilaEnlace[];
  const ahora = new Date();
  return filas.map((f) =>
    componerPropuesta(
      f,
      eventos.filter((e) => e.proposal_id === f.proposal_id),
      enlaces.find((e) => e.propuesta === f.proposal_id),
      ahora,
    ),
  );
}

type Resultado = { ok: true; texto: string } | { ok: false; error: string };

/** Marca o desmarca un hito cumplido (lo ve el cliente). Solo sobre propuestas aceptadas y si el estado cuadra. */
export async function marcarHito(referencia: string, n: number, deshacer: boolean, sql: Sql = conexion()): Promise<Resultado> {
  if (!FORMA_REFERENCIA.test(referencia) || !Number.isSafeInteger(n) || n < 1) return { ok: false, error: 'Hito no válido' };
  const tipo = deshacer ? 'hito_deshecho' : 'hito_cumplido';
  const esperado = deshacer ? 'hito_cumplido' : 'hito_deshecho';
  // Una sola sentencia: solo inserta si esta aceptada, el hito existe y lo ultimo dicho de el es lo contrario.
  const filas = (await sql`
    INSERT INTO evento (proposal_id, version, tipo, detalle)
    SELECT a.proposal_id, a.version, ${tipo}, jsonb_build_object('hito', ${n}::int, 'origen', 'panel')
      FROM aceptacion a
     WHERE a.proposal_id = ${referencia}
       AND ${n}::int <= jsonb_array_length(a.snapshot->'pagos'->'hitos')
       AND coalesce((SELECT e.tipo FROM evento e
                      WHERE e.proposal_id = ${referencia} AND e.tipo IN ('hito_cumplido', 'hito_deshecho')
                        AND (e.detalle->>'hito')::int = ${n}::int
                      ORDER BY e.evento_id DESC LIMIT 1), 'hito_deshecho') = ${esperado}
    RETURNING (SELECT x.snapshot->'pagos'->'hitos'->(${n}::int - 1)->>'hito' FROM aceptacion x WHERE x.proposal_id = ${referencia}) AS hito`) as {
    hito: string;
  }[];
  if (!filas.length) return { ok: false, error: `No se ha cambiado: el hito ${n} ya estaba ${deshacer ? 'sin marcar' : 'marcado'}, o la propuesta no está aceptada` };
  return { ok: true, texto: `«${filas[0].hito}» ${deshacer ? 'desmarcado' : 'marcado como cumplido'}` };
}

/** «Cobrado el…» de un hito, o deshacerlo. Es un apunte de Ruben, no una factura, y el cliente no lo ve. */
export async function apuntarCobro(referencia: string, n: number, fecha: string | null, sql: Sql = conexion()): Promise<Resultado> {
  if (!FORMA_REFERENCIA.test(referencia) || !Number.isSafeInteger(n) || n < 1) return { ok: false, error: 'Hito no válido' };
  const deshacer = fecha === null;
  if (!deshacer && (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || Number.isNaN(Date.parse(fecha)))) return { ok: false, error: 'Fecha no válida' };
  const tipo = deshacer ? 'cobro_deshecho' : 'cobro_apuntado';
  const detalle = deshacer ? { hito: n, origen: 'panel' } : { hito: n, fecha, origen: 'panel' };
  const filas = (await sql`
    INSERT INTO evento (proposal_id, version, tipo, detalle)
    SELECT a.proposal_id, a.version, ${tipo}, ${JSON.stringify(detalle)}::jsonb
      FROM aceptacion a
     WHERE a.proposal_id = ${referencia}
       AND ${n}::int <= jsonb_array_length(a.snapshot->'pagos'->'hitos')
       AND coalesce((SELECT e.tipo FROM evento e
                      WHERE e.proposal_id = ${referencia} AND e.tipo IN ('cobro_apuntado', 'cobro_deshecho')
                        AND (e.detalle->>'hito')::int = ${n}::int
                      ORDER BY e.evento_id DESC LIMIT 1), 'cobro_deshecho') = ${deshacer ? 'cobro_apuntado' : 'cobro_deshecho'}
    RETURNING (SELECT x.snapshot->'pagos'->'hitos'->(${n}::int - 1)->>'hito' FROM aceptacion x WHERE x.proposal_id = ${referencia}) AS hito`) as {
    hito: string;
  }[];
  if (!filas.length) return { ok: false, error: `No se ha cambiado: el cobro del hito ${n} ya estaba ${deshacer ? 'sin apuntar' : 'apuntado'}, o la propuesta no está aceptada` };
  return { ok: true, texto: deshacer ? `Cobro de «${filas[0].hito}» deshecho` : `«${filas[0].hito}» cobrado el ${fecha}` };
}

// ——— Contactos ———

interface FilaContacto extends Omit<Contacto, 'actualizado'> {
  actualizado: string | Date;
}

const deFila = (f: FilaContacto): Contacto => ({ ...f, id: Number(f.id), actualizado: iso(f.actualizado) });

/** Los contactos; por defecto solo los abiertos (ganados y perdidos se ocultan, no se borran). */
export async function leerContactos(incluirCerrados = false, sql: Sql = conexion()): Promise<Contacto[]> {
  const filas = (await sql`
    SELECT id, negocio, persona, telefono, correo, origen, estado, siguiente_accion, to_char(fecha, 'YYYY-MM-DD') AS fecha,
           notas, propuesta, colaborador, actualizado
      FROM contacto
     WHERE ${incluirCerrados} OR estado NOT IN ('ganado', 'perdido')
     ORDER BY fecha ASC NULLS LAST, actualizado DESC`) as FilaContacto[];
  return filas.map(deFila);
}

export async function leerContacto(id: number, sql: Sql = conexion()): Promise<Contacto | null> {
  if (!Number.isSafeInteger(id) || id < 1) return null;
  const filas = (await sql`
    SELECT id, negocio, persona, telefono, correo, origen, estado, siguiente_accion, to_char(fecha, 'YYYY-MM-DD') AS fecha,
           notas, propuesta, colaborador, actualizado
      FROM contacto WHERE id = ${id}`) as FilaContacto[];
  return filas.length ? deFila(filas[0]) : null;
}

export async function crearContacto(c: CamposContacto, sql: Sql = conexion()): Promise<number> {
  const filas = (await sql`
    INSERT INTO contacto (negocio, persona, telefono, correo, origen, estado, siguiente_accion, fecha, notas, propuesta, colaborador)
    VALUES (${c.negocio}, ${c.persona}, ${c.telefono}, ${c.correo}, ${c.origen}, ${c.estado}, ${c.siguiente_accion},
            ${c.fecha}::date, ${c.notas}, ${c.propuesta}, ${c.colaborador})
    RETURNING id`) as { id: number }[];
  return Number(filas[0].id);
}

export async function actualizarContacto(id: number, c: CamposContacto, sql: Sql = conexion()): Promise<boolean> {
  const filas = (await sql`
    UPDATE contacto SET negocio = ${c.negocio}, persona = ${c.persona}, telefono = ${c.telefono}, correo = ${c.correo},
           origen = ${c.origen}, estado = ${c.estado}, siguiente_accion = ${c.siguiente_accion}, fecha = ${c.fecha}::date,
           notas = ${c.notas}, propuesta = ${c.propuesta}, colaborador = ${c.colaborador}, actualizado = now()
     WHERE id = ${id} RETURNING id`) as { id: number }[];
  return filas.length > 0;
}

/**
 * Borra los contactos que han llegado a su dia de borrado (politica, apartado 8) y devuelve sus negocios para
 * ensenarlos una vez en «Hoy». No queda copia de lo borrado en ningun sitio, ni de los nombres (Ruben, 31/10).
 * La regla esta en `caducados`; el `actualizado` de la condicion (a milisegundos, como sale de
 * `leerContactos`) evita borrar uno que se haya guardado entre medias.
 */
export async function borrarCaducados(ahora = new Date(), sql: Sql = conexion()): Promise<string[]> {
  const vencidos = caducados(await leerContactos(true, sql), ahora);
  if (!vencidos.length) return [];
  const ids = vencidos.map((c) => c.id);
  const fechas = vencidos.map((c) => c.actualizado);
  const filas = (await sql`
    DELETE FROM contacto c USING unnest(${ids}::bigint[], ${fechas}::timestamptz[]) AS v(id, actualizado)
     WHERE c.id = v.id AND date_trunc('milliseconds', c.actualizado) = v.actualizado AND c.estado <> 'ganado'
    RETURNING c.negocio`) as { negocio: string }[];
  return filas.map((f) => f.negocio);
}

// ——— Entrada ———

export async function leerAcceso(sql: Sql = conexion()): Promise<EstadoAcceso> {
  const filas = (await sql`SELECT fallos_seguidos, bloqueado_hasta FROM panel_acceso WHERE id = 1`) as {
    fallos_seguidos: number;
    bloqueado_hasta: string | Date | null;
  }[];
  if (!filas.length) throw new Error('Falta la fila de panel_acceso: pasa `bun scripts/panel.ts migrar`');
  const f = filas[0];
  return { fallos_seguidos: f.fallos_seguidos, bloqueado_hasta: f.bloqueado_hasta ? new Date(f.bloqueado_hasta) : null };
}

export async function guardarAcceso(e: EstadoAcceso, sql: Sql = conexion()): Promise<void> {
  const hasta = e.bloqueado_hasta ? e.bloqueado_hasta.toISOString() : null;
  await sql`UPDATE panel_acceso SET fallos_seguidos = ${e.fallos_seguidos}, bloqueado_hasta = ${hasta}::timestamptz WHERE id = 1`;
}

// ——— Aperturas (decision 4) ———

/**
 * Apunta que alguien ha abierto la propuesta con el enlace del cliente: la capacidad del fragmento tiene que ser la
 * de alguna de sus versiones. Solo la referencia y la hora: ni IP, ni navegador, ni cookie.
 */
export async function registrarApertura(referencia: string, capacidad: string, sql: Sql = conexion()): Promise<boolean> {
  if (!FORMA_REFERENCIA.test(referencia)) return false;
  const versiones = (await sql`SELECT capability_hash FROM propuesta_version WHERE proposal_id = ${referencia}`) as {
    capability_hash: string;
  }[];
  if (!versiones.some((v) => capacidadValida(capacidad, v.capability_hash.trim()))) return false;
  await sql`
    INSERT INTO propuesta_apertura (proposal_id) VALUES (${referencia})
    ON CONFLICT (proposal_id) DO UPDATE SET ultima = now(), veces = propuesta_apertura.veces + 1`;
  return true;
}
