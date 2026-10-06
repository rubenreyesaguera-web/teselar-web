// Leer una propuesta para la pagina publica /p/[ref] (ADR-091, hito 6.4).
//
// Se lee la version mas reciente de la propuesta, y antes de devolverla se recalcula su hash: si lo guardado no
// da el `offer_hash` con el que se publico, no se ensena nada. La pagina pinta este objeto tal cual; nunca
// recompone la propuesta desde la plantilla.
import { neon } from '@neondatabase/serverless';
import { hashOferta } from './canonico';
import { SCHEMA_VERSION, type InstantaneaV1 } from './instantanea';

export const FORMA_REFERENCIA = /^P-[0-9]{4}-[0-9]{3}$/;

export type Estado = 'vigente' | 'vencida' | 'aceptada' | 'retirada';

export interface PropuestaLeida {
  instantanea: InstantaneaV1;
  offerHash: string;
  estado: Estado;
  venceEl: Date;
  aceptadaEl: Date | null;
  /** Hitos de pago cumplidos (numero desde 1 → cuando), solo si esta aceptada. */
  cumplidos: Record<number, string>;
}

export interface FilaVersion {
  snapshot: unknown;
  offer_hash: string;
  schema_version: number;
  status: 'publicada' | 'sustituida' | 'invalidada';
  expires_at: string | Date;
  accepted_at: string | Date | null;
}

/** De la fila de la base a lo que pinta la pagina. Lanza si la instantanea no es la que se publico. */
export function interpretar(fila: FilaVersion, ahora = new Date()): PropuestaLeida {
  if (fila.schema_version !== SCHEMA_VERSION) {
    throw new Error(`Esquema de instantanea ${fila.schema_version} desconocido`);
  }
  const offerHash = fila.offer_hash.trim();
  if (hashOferta(fila.snapshot) !== offerHash) {
    throw new Error('La instantanea guardada no coincide con su hash: no se muestra');
  }
  const venceEl = new Date(fila.expires_at);
  const aceptadaEl = fila.accepted_at ? new Date(fila.accepted_at) : null;
  let estado: Estado;
  if (aceptadaEl) estado = 'aceptada';
  else if (fila.status !== 'publicada') estado = 'retirada';
  else if (venceEl <= ahora) estado = 'vencida';
  else estado = 'vigente';
  return { instantanea: fila.snapshot as InstantaneaV1, offerHash, estado, venceEl, aceptadaEl, cumplidos: {} };
}

/** Lo ultimo que se dijo de cada hito gana: cumplido, o deshecho (y entonces no cuenta). */
export function hitosCumplidos(eventos: { tipo: string; hito: number; created_at: string | Date }[]): Record<number, string> {
  const fuera: Record<number, string> = {};
  for (const e of eventos) {
    if (e.tipo === 'hito_cumplido') fuera[e.hito] = new Date(e.created_at).toISOString();
    else delete fuera[e.hito];
  }
  return fuera;
}

/** La version mas reciente de `referencia`, o null si no existe. */
export async function leerPropuesta(referencia: string): Promise<PropuestaLeida | null> {
  if (!FORMA_REFERENCIA.test(referencia)) return null;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('Falta DATABASE_URL');
  const sql = neon(url);
  const filas = (await sql`
    SELECT v.snapshot, v.offer_hash, v.schema_version, v.status, v.expires_at, a.accepted_at
      FROM propuesta_version v
      LEFT JOIN aceptacion a ON a.proposal_id = v.proposal_id AND a.version = v.version
     WHERE v.proposal_id = ${referencia}
     ORDER BY v.version DESC
     LIMIT 1`) as FilaVersion[];
  if (!filas.length) return null;
  const p = interpretar(filas[0]);
  if (p.estado === 'aceptada') {
    const eventos = (await sql`
      SELECT tipo, (detalle->>'hito')::int AS hito, created_at FROM evento
       WHERE proposal_id = ${referencia} AND tipo IN ('hito_cumplido', 'hito_deshecho')
       ORDER BY evento_id`) as { tipo: string; hito: number; created_at: string | Date }[];
    p.cumplidos = hitosCumplidos(eventos);
  }
  return p;
}
