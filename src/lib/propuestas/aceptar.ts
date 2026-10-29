// Aceptar una propuesta (ADR-091, hito 6.5). El endpoint POST /api/propuestas/aceptar es una capa fina sobre esto.
//
// Lo que manda el navegador solo sirve para decir QUE version cree estar aceptando y QUIEN dice ser: los terminos
// (instantanea y hash) se copian de la base dentro de la misma sentencia que inserta, y la base vuelve a comprobarlos
// con su trigger. Respuestas:
//   201 aceptada ahora · 200 repeticion del mismo intento (misma clave) · 409 ya estaba aceptada, o hay version nueva
//   410 vencida o retirada · 403 sin capacidad valida · 429 demasiados intentos fallidos · 400 datos mal · 404 no existe
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { capacidadValida } from './canonico';
import { CONDICIONES, huellaCondiciones, type Lengua } from './condiciones';
import { dniValido, nifSociedadValido, normalizarDocumento } from './identificacion';
import { FORMA_REFERENCIA } from './leer';

export const MAX_INTENTOS_FALLIDOS = 20;

// Los mensajes que ve quien acepta, en la lengua de la propuesta. El castellano es el de siempre (los tests lo leen).
const MENSAJES = {
  es: {
    faltan: 'Faltan los datos',
    tipo: 'Elige si aceptas como autónomo o como sociedad',
    propuesta: 'Propuesta no válida',
    intento: 'Intento no válido',
    nombre: 'Escribe tu nombre completo',
    dni: 'Revisa el DNI o NIE: la letra no cuadra con el número',
    correo: 'Escribe un correo válido',
    domicilio: 'Escribe el domicilio completo',
    razon: 'Escribe la razón social',
    nif: 'Revisa el NIF de la sociedad: el control no cuadra',
    cargo: 'Escribe tu cargo en la sociedad',
    casillas: 'Marca las tres casillas para aceptar',
    no_existe: 'Esta propuesta no existe',
    repetida: 'Aceptación registrada',
    ya_aceptada: 'Esta propuesta ya estaba aceptada',
    bloqueada: 'Demasiados intentos. Escríbeme y te mando un enlace nuevo',
    sin_capacidad: 'Para aceptar, abre el enlace completo que te envié',
    version_nueva: 'Hay una versión más reciente de esta propuesta. Recarga la página',
    condiciones_nuevas: 'Las condiciones generales han cambiado. Recarga la página para ver las vigentes',
    retirada: 'Esta propuesta se ha retirado',
    vencida: 'Esta propuesta ha vencido',
    no_vigente: 'Esta versión ya no está vigente. Recarga la página',
    aceptada: 'Propuesta aceptada',
  },
  ca: {
    faltan: 'Hi falten les dades',
    tipo: 'Tria si acceptes com a autònom o com a societat',
    propuesta: 'Proposta no vàlida',
    intento: 'Intent no vàlid',
    nombre: 'Escriu el teu nom complet',
    dni: 'Revisa el DNI o NIE: la lletra no quadra amb el número',
    correo: 'Escriu un correu vàlid',
    domicilio: 'Escriu el domicili complet',
    razon: 'Escriu la raó social',
    nif: 'Revisa el NIF de la societat: el control no quadra',
    cargo: 'Escriu el teu càrrec a la societat',
    casillas: 'Marca les tres caselles per acceptar',
    no_existe: 'Aquesta proposta no existeix',
    repetida: 'Acceptació registrada',
    ya_aceptada: 'Aquesta proposta ja estava acceptada',
    bloqueada: 'Massa intents. Escriu-me i t’envio un enllaç nou',
    sin_capacidad: 'Per acceptar, obre l’enllaç complet que et vaig enviar',
    version_nueva: 'Hi ha una versió més recent d’aquesta proposta. Torna a carregar la pàgina',
    condiciones_nuevas: 'Les condicions generals han canviat. Torna a carregar la pàgina per veure les vigents',
    retirada: 'Aquesta proposta s’ha retirat',
    vencida: 'Aquesta proposta ha vençut',
    no_vigente: 'Aquesta versió ja no és vigent. Torna a carregar la pàgina',
    aceptada: 'Proposta acceptada',
  },
} as const satisfies Record<Lengua, Record<string, string>>;

type ClaveMensaje = keyof (typeof MENSAJES)['es'];

/** La lengua que pide el navegador; cualquier otra cosa, castellano. */
const lenguaDe = (v: unknown): Lengua => (v === 'ca' ? 'ca' : 'es');

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
  dni: string;
  correo: string;
  tipo: 'autonomo' | 'sociedad';
  razon_social: string | null;
  nif_sociedad: string | null;
  /** Del autonomo, o el domicilio social si es sociedad (ADR-095). */
  domicilio: string;
  /** Solo si acepta una sociedad: administrador, apoderado... (ADR-095). */
  cargo: string | null;
  casilla_leido: boolean;
  casilla_autoridad: boolean;
  /** Las condiciones generales y su anexo (ADR-117): la casilla y la version que se le enseno. */
  casilla_condiciones: boolean;
  condiciones_version: number;
  /** La lengua de la propuesta: la del justificante, el correo y el PDF. */
  lengua: Lengua;
  idempotency_key: string;
}

export type Identidad = Pick<DatosAceptacion, 'nombre' | 'dni' | 'correo' | 'tipo' | 'razon_social' | 'nif_sociedad' | 'domicilio' | 'cargo'>;

const CORREO = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const r = (lengua: Lengua, status: number, codigo: string, clave: ClaveMensaje, justificante?: Justificante): Resultado => ({
  status,
  body: { ok: status < 300, codigo, mensaje: MENSAJES[lengua][clave], ...(justificante ? { justificante } : {}) },
});

/** Valida la forma de lo que llega. Devuelve el mensaje del primer fallo, o los datos limpios. */
export function validarDatos(entrada: unknown): string | DatosAceptacion {
  if (typeof entrada !== 'object' || entrada === null) return MENSAJES.es.faltan;
  const e = entrada as Record<string, unknown>;
  const lengua = lenguaDe(e.lengua);
  const m = MENSAJES[lengua];
  const t = (k: string) => (typeof e[k] === 'string' ? (e[k] as string).normalize('NFC').trim() : '');
  const tipo = e.tipo === 'sociedad' ? 'sociedad' : e.tipo === 'autonomo' ? 'autonomo' : null;
  if (!tipo) return m.tipo;
  const datos: DatosAceptacion = {
    referencia: t('referencia'),
    version: typeof e.version === 'number' ? e.version : NaN,
    offer_hash: t('offer_hash'),
    nombre: t('nombre'),
    dni: normalizarDocumento(t('dni')),
    correo: t('correo').toLowerCase(),
    tipo,
    razon_social: tipo === 'sociedad' ? t('razon_social') : null,
    nif_sociedad: tipo === 'sociedad' ? normalizarDocumento(t('nif_sociedad')) : null,
    domicilio: t('domicilio'),
    cargo: tipo === 'sociedad' ? t('cargo') : null,
    casilla_leido: e.casilla_leido === true,
    casilla_autoridad: e.casilla_autoridad === true,
    casilla_condiciones: e.casilla_condiciones === true,
    condiciones_version: typeof e.condiciones_version === 'number' ? e.condiciones_version : NaN,
    lengua,
    idempotency_key: t('idempotency_key'),
  };
  if (!FORMA_REFERENCIA.test(datos.referencia) || !Number.isSafeInteger(datos.version) || datos.version < 1) return m.propuesta;
  if (!/^[0-9a-f]{64}$/.test(datos.offer_hash)) return m.propuesta;
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(datos.idempotency_key)) return m.intento;
  if (!datos.nombre || datos.nombre.length > 200) return m.nombre;
  if (!dniValido(datos.dni)) return m.dni;
  if (!CORREO.test(datos.correo) || datos.correo.length > 254) return m.correo;
  if (datos.domicilio.length < 5 || datos.domicilio.length > 300) return m.domicilio;
  if (datos.tipo === 'sociedad') {
    if (!datos.razon_social || datos.razon_social.length > 200) return m.razon;
    if (!nifSociedadValido(datos.nif_sociedad ?? '')) return m.nif;
    if (!datos.cargo || datos.cargo.length < 2 || datos.cargo.length > 100) return m.cargo;
  }
  if (!datos.casilla_leido || !datos.casilla_autoridad || !datos.casilla_condiciones) return m.casillas;
  if (!Number.isSafeInteger(datos.condiciones_version) || datos.condiciones_version < 1) return m.faltan;
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
  avisar?: (j: Justificante, quien: Identidad, lengua: Lengua) => void,
): Promise<Resultado> {
  const datos = validarDatos(entrada);
  if (typeof datos === 'string') return { status: 400, body: { ok: false, codigo: 'datos', mensaje: datos } };
  const L = datos.lengua;
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
  if (!versiones.length) return r(L, 404, 'no_existe', 'no_existe');
  const ultima = versiones[0];

  // Ya aceptada: se distingue la repeticion del mismo intento de otro intento distinto.
  const previa = await justificanteExistente(sql, datos.referencia);
  if (previa) {
    if (previa.clave === datos.idempotency_key) return r(L, 200, 'repetida', 'repetida', previa.justificante);
    return r(L, 409, 'ya_aceptada', 'ya_aceptada', previa.justificante);
  }

  // La capacidad se comprueba sobre la version que dice aceptar, que tiene que ser la ultima.
  if (ultima.intentos_fallidos >= MAX_INTENTOS_FALLIDOS) {
    return r(L, 429, 'bloqueada', 'bloqueada');
  }
  if (!capacidadValida(capacidad, ultima.capability_hash.trim())) {
    await sql`UPDATE propuesta_version SET intentos_fallidos = intentos_fallidos + 1
               WHERE proposal_id = ${datos.referencia} AND version = ${ultima.version}`;
    return r(L, 403, 'sin_capacidad', 'sin_capacidad');
  }
  if (ultima.version !== datos.version || ultima.offer_hash.trim() !== datos.offer_hash) {
    return r(L, 409, 'version_nueva', 'version_nueva');
  }
  // Se acepta el texto de condiciones que hay ahora; si el navegador ensenaba otro, que recargue y lo vea.
  if (datos.condiciones_version !== CONDICIONES.version) return r(L, 409, 'condiciones_nuevas', 'condiciones_nuevas');
  if (ultima.status !== 'publicada') return r(L, 410, 'retirada', 'retirada');
  if (new Date(ultima.expires_at) <= new Date()) return r(L, 410, 'vencida', 'vencida');

  // Una sola sentencia: copia los terminos de la base, guarda la identidad aparte y deja el evento. Si otra
  // aceptacion se ha colado entre medias, ON CONFLICT no inserta nada y se responde con la que gano.
  let filas: { accepted_at: string | Date }[];
  try {
    filas = (await sql`
      WITH a AS (
        INSERT INTO aceptacion (proposal_id, version, snapshot, offer_hash, casilla_leido, casilla_autoridad, idempotency_key,
                                casilla_condiciones, condiciones_version, condiciones_hash, lengua)
        SELECT proposal_id, version, snapshot, offer_hash, true, true, ${datos.idempotency_key},
               true, ${CONDICIONES.version}, ${huellaCondiciones(L)}, ${L}
          FROM propuesta_version WHERE proposal_id = ${datos.referencia} AND version = ${datos.version}
        ON CONFLICT DO NOTHING
        RETURNING acceptance_id, proposal_id, version, accepted_at
      ), i AS (
        INSERT INTO aceptacion_identidad (acceptance_id, nombre, dni, correo, tipo, razon_social, nif_sociedad, domicilio, cargo)
        SELECT acceptance_id, ${datos.nombre}, ${datos.dni}, ${datos.correo}, ${datos.tipo}, ${datos.razon_social}, ${datos.nif_sociedad},
               ${datos.domicilio}, ${datos.cargo} FROM a
      ), e AS (
        INSERT INTO evento (proposal_id, version, tipo) SELECT proposal_id, version, 'aceptada' FROM a
      )
      SELECT accepted_at FROM a`) as { accepted_at: string | Date }[];
  } catch (e) {
    // El trigger de la base tiene la ultima palabra (vencio o se retiro justo ahora).
    const m = e instanceof Error ? e.message : '';
    if (m.includes('vencio')) return r(L, 410, 'vencida', 'vencida');
    if (m.includes('esta invalidada') || m.includes('esta sustituida')) return r(L, 409, 'version_nueva', 'no_vigente');
    throw e;
  }

  if (!filas.length) {
    const gano = await justificanteExistente(sql, datos.referencia);
    if (gano?.clave === datos.idempotency_key) return r(L, 200, 'repetida', 'repetida', gano.justificante);
    if (gano) return r(L, 409, 'ya_aceptada', 'ya_aceptada', gano.justificante);
    throw new Error('La aceptación no se insertó y no hay ninguna guardada');
  }

  const justificante: Justificante = {
    referencia: datos.referencia,
    version: datos.version,
    offer_hash: datos.offer_hash,
    accepted_at: new Date(filas[0].accepted_at).toISOString(),
  };
  const { nombre, dni, correo, tipo, razon_social, nif_sociedad, domicilio, cargo } = datos;
  avisar?.(justificante, { nombre, dni, correo, tipo, razon_social, nif_sociedad, domicilio, cargo }, L);
  return r(L, 201, 'aceptada', 'aceptada', justificante);
}

/** Deja constancia de un fallo en la tabla de eventos (hito 6.6). Nunca lanza. */
export async function registrarEvento(
  url: string,
  referencia: string,
  tipo: 'aviso_fallido' | 'error_aceptacion' | 'acuse_enviado' | 'acuse_fallido',
  detalle: object,
) {
  try {
    const sql = neon(url);
    await sql`INSERT INTO evento (proposal_id, tipo, detalle) VALUES (${referencia}, ${tipo}, ${JSON.stringify(detalle)}::jsonb)`;
  } catch (e) {
    console.error('[propuestas] no se pudo registrar el evento', tipo, e instanceof Error ? e.message : e);
  }
}
