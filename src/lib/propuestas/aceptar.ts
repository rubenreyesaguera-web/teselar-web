// Aceptar una propuesta (ADR-091, hito 6.5). El endpoint POST /api/propuestas/aceptar es una capa fina sobre esto.
//
// Lo que manda el navegador solo sirve para decir QUE version cree estar aceptando y QUIEN dice ser: los terminos
// (instantanea y hash) se copian de la base dentro de la misma sentencia que inserta, y la base vuelve a comprobarlos
// con su trigger. Respuestas:
//   201 aceptada ahora · 200 repeticion del mismo intento (misma clave) · 409 ya estaba aceptada, o hay version nueva
//   410 vencida o retirada · 403 sin capacidad valida · 429 demasiados intentos fallidos · 400 datos mal · 404 no existe
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { capacidadValida } from './canonico';
import { FORMA_REFERENCIA } from './leer';

export const MAX_INTENTOS_FALLIDOS = 20;

export interface Justificante {
  referencia: string;
  version: number;
  offer_hash: string;
  accepted_at: string;
}

export interface Resultado {
  status: number;
  body: { ok: boolean; codigo: string; mensaje: string; justificante?: Justificante };
}

export interface DatosAceptacion {
  referencia: string;
  version: number;
  offer_hash: string;
  nombre: string;
  correo: string;
  empresa: string;
  casilla_leido: boolean;
  casilla_autoridad: boolean;
  idempotency_key: string;
}

export interface Identidad {
  nombre: string;
  correo: string;
  empresa: string;
}

const CORREO = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const r = (status: number, codigo: string, mensaje: string, justificante?: Justificante): Resultado => ({
  status,
  body: { ok: status < 300, codigo, mensaje, ...(justificante ? { justificante } : {}) },
});

/** Valida la forma de lo que llega. Devuelve el mensaje del primer fallo, o los datos limpios. */
export function validarDatos(entrada: unknown): string | DatosAceptacion {
  if (typeof entrada !== 'object' || entrada === null) return 'Faltan los datos';
  const e = entrada as Record<string, unknown>;
  const t = (k: string) => (typeof e[k] === 'string' ? (e[k] as string).normalize('NFC').trim() : '');
  const datos: DatosAceptacion = {
    referencia: t('referencia'),
    version: typeof e.version === 'number' ? e.version : NaN,
    offer_hash: t('offer_hash'),
    nombre: t('nombre'),
    correo: t('correo').toLowerCase(),
    empresa: t('empresa'),
    casilla_leido: e.casilla_leido === true,
    casilla_autoridad: e.casilla_autoridad === true,
    idempotency_key: t('idempotency_key'),
  };
  if (!FORMA_REFERENCIA.test(datos.referencia) || !Number.isSafeInteger(datos.version) || datos.version < 1) return 'Propuesta no válida';
  if (!/^[0-9a-f]{64}$/.test(datos.offer_hash)) return 'Propuesta no válida';
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(datos.idempotency_key)) return 'Intento no válido';
  if (!datos.nombre || datos.nombre.length > 200) return 'Escribe tu nombre';
  if (!CORREO.test(datos.correo) || datos.correo.length > 254) return 'Escribe un correo válido';
  if (!datos.empresa || datos.empresa.length > 200) return 'Escribe el nombre del negocio';
  if (!datos.casilla_leido || !datos.casilla_autoridad) return 'Marca las dos casillas para aceptar';
  return datos;
}

type Sql = NeonQueryFunction<false, false>;

async function justificanteExistente(sql: Sql, referencia: string) {
  const filas = (await sql`
    SELECT proposal_id, version, offer_hash, accepted_at, idempotency_key FROM aceptacion WHERE proposal_id = ${referencia}`) as {
    proposal_id: string;
    version: number;
    offer_hash: string;
    accepted_at: string | Date;
    idempotency_key: string;
  }[];
  if (!filas.length) return null;
  const f = filas[0];
  return {
    clave: f.idempotency_key,
    justificante: {
      referencia: f.proposal_id,
      version: f.version,
      offer_hash: f.offer_hash.trim(),
      accepted_at: new Date(f.accepted_at).toISOString(),
    },
  };
}

/**
 * Registra la aceptacion. `avisar` se llama solo cuando se acaba de crear una (no en repeticiones) y nunca
 * decide nada: si falla, la aceptacion ya esta guardada.
 */
export async function aceptarPropuesta(
  url: string,
  capacidad: string,
  entrada: unknown,
  avisar?: (j: Justificante, quien: Identidad) => void,
): Promise<Resultado> {
  const datos = validarDatos(entrada);
  if (typeof datos === 'string') return r(400, 'datos', datos);
  const sql = neon(url);

  const versiones = (await sql`
    SELECT version, offer_hash, status, expires_at, capability_hash, intentos_fallidos
      FROM propuesta_version WHERE proposal_id = ${datos.referencia} ORDER BY version DESC LIMIT 1`) as {
    version: number;
    offer_hash: string;
    status: string;
    expires_at: string | Date;
    capability_hash: string;
    intentos_fallidos: number;
  }[];
  if (!versiones.length) return r(404, 'no_existe', 'Esta propuesta no existe');
  const ultima = versiones[0];

  // Ya aceptada: se distingue la repeticion del mismo intento de otro intento distinto.
  const previa = await justificanteExistente(sql, datos.referencia);
  if (previa) {
    if (previa.clave === datos.idempotency_key) return r(200, 'repetida', 'Aceptación registrada', previa.justificante);
    return r(409, 'ya_aceptada', 'Esta propuesta ya estaba aceptada', previa.justificante);
  }

  // La capacidad se comprueba sobre la version que dice aceptar, que tiene que ser la ultima.
  if (ultima.intentos_fallidos >= MAX_INTENTOS_FALLIDOS) {
    return r(429, 'bloqueada', 'Demasiados intentos. Escríbeme y te mando un enlace nuevo');
  }
  if (!capacidadValida(capacidad, ultima.capability_hash.trim())) {
    await sql`UPDATE propuesta_version SET intentos_fallidos = intentos_fallidos + 1
               WHERE proposal_id = ${datos.referencia} AND version = ${ultima.version}`;
    return r(403, 'sin_capacidad', 'Para aceptar, abre el enlace completo que te envié');
  }
  if (ultima.version !== datos.version || ultima.offer_hash.trim() !== datos.offer_hash) {
    return r(409, 'version_nueva', 'Hay una versión más reciente de esta propuesta. Recarga la página');
  }
  if (ultima.status !== 'publicada') return r(410, 'retirada', 'Esta propuesta se ha retirado');
  if (new Date(ultima.expires_at) <= new Date()) return r(410, 'vencida', 'Esta propuesta ha vencido');

  // Una sola sentencia: copia los terminos de la base, guarda la identidad aparte y deja el evento. Si otra
  // aceptacion se ha colado entre medias, ON CONFLICT no inserta nada y se responde con la que gano.
  let filas: { accepted_at: string | Date }[];
  try {
    filas = (await sql`
      WITH a AS (
        INSERT INTO aceptacion (proposal_id, version, snapshot, offer_hash, casilla_leido, casilla_autoridad, idempotency_key)
        SELECT proposal_id, version, snapshot, offer_hash, true, true, ${datos.idempotency_key}
          FROM propuesta_version WHERE proposal_id = ${datos.referencia} AND version = ${datos.version}
        ON CONFLICT DO NOTHING
        RETURNING acceptance_id, proposal_id, version, accepted_at
      ), i AS (
        INSERT INTO aceptacion_identidad (acceptance_id, nombre, correo, empresa)
        SELECT acceptance_id, ${datos.nombre}, ${datos.correo}, ${datos.empresa} FROM a
      ), e AS (
        INSERT INTO evento (proposal_id, version, tipo) SELECT proposal_id, version, 'aceptada' FROM a
      )
      SELECT accepted_at FROM a`) as { accepted_at: string | Date }[];
  } catch (e) {
    // El trigger de la base tiene la ultima palabra (vencio o se retiro justo ahora).
    const m = e instanceof Error ? e.message : '';
    if (m.includes('vencio')) return r(410, 'vencida', 'Esta propuesta ha vencido');
    if (m.includes('esta invalidada') || m.includes('esta sustituida')) return r(409, 'version_nueva', 'Esta versión ya no está vigente. Recarga la página');
    throw e;
  }

  if (!filas.length) {
    const gano = await justificanteExistente(sql, datos.referencia);
    if (gano?.clave === datos.idempotency_key) return r(200, 'repetida', 'Aceptación registrada', gano.justificante);
    if (gano) return r(409, 'ya_aceptada', 'Esta propuesta ya estaba aceptada', gano.justificante);
    throw new Error('La aceptación no se insertó y no hay ninguna guardada');
  }

  const justificante: Justificante = {
    referencia: datos.referencia,
    version: datos.version,
    offer_hash: datos.offer_hash,
    accepted_at: new Date(filas[0].accepted_at).toISOString(),
  };
  avisar?.(justificante, { nombre: datos.nombre, correo: datos.correo, empresa: datos.empresa });
  return r(201, 'aceptada', 'Propuesta aceptada', justificante);
}

/** Deja constancia de un fallo en la tabla de eventos (hito 6.6). Nunca lanza. */
export async function registrarEvento(url: string, referencia: string, tipo: 'aviso_fallido' | 'error_aceptacion', detalle: object) {
  try {
    const sql = neon(url);
    await sql`INSERT INTO evento (proposal_id, tipo, detalle) VALUES (${referencia}, ${tipo}, ${JSON.stringify(detalle)}::jsonb)`;
  } catch (e) {
    console.error('[propuestas] no se pudo registrar el evento', tipo, e instanceof Error ? e.message : e);
  }
}
