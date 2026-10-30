// Lo que pinta el panel, calculado sin tocar la base: las consultas (datos.ts) traen filas y esto decide estados y
// el resumen «Hoy». Asi se prueba sin Postgres.
import type { Estado } from '../propuestas/leer';

export const ESTADOS_CONTACTO = [
  'en_conversacion',
  'reunion_hecha',
  'diagnostico_enviado',
  'propuesta_enviada',
  'ganado',
  'perdido',
] as const;

export type EstadoContacto = (typeof ESTADOS_CONTACTO)[number];

export const NOMBRE_ESTADO: Record<EstadoContacto, string> = {
  en_conversacion: 'En conversación',
  reunion_hecha: 'Reunión hecha',
  diagnostico_enviado: 'Diagnóstico enviado',
  propuesta_enviada: 'Propuesta enviada',
  ganado: 'Ganado',
  perdido: 'Perdido',
};

/** Ganados y perdidos se ocultan de «en curso», no se borran (decision 3). */
export const cerrado = (e: EstadoContacto) => e === 'ganado' || e === 'perdido';

export interface Contacto {
  id: number;
  negocio: string;
  persona: string | null;
  telefono: string | null;
  correo: string | null;
  origen: string | null;
  estado: EstadoContacto;
  siguiente_accion: string | null;
  /** AAAA-MM-DD */
  fecha: string | null;
  notas: string | null;
  propuesta: string | null;
  colaborador: string | null;
  actualizado: string;
}

export interface HitoPanel {
  /** Desde 1, como en `scripts/propuesta.ts avance`. */
  n: number;
  hito: string;
  importe_centimos: number;
  cuando: string;
  /** Cuando se marco cumplido (lo ve el cliente), o null. */
  cumplido: string | null;
  /** «Cobrado el…» que apunto Ruben (AAAA-MM-DD), o null. Nunca lo ve el cliente. */
  cobrado: string | null;
}

export type Acuse = 'enviado' | 'fallido' | 'pendiente';

export interface PropuestaPanel {
  referencia: string;
  version: number;
  estado: Estado;
  negocio: string;
  cliente: string;
  creada: string;
  /** El instante en que deja de poderse aceptar (fin del dia `venceDia` en Lloret). */
  vence: string;
  /** El ultimo dia en que vale, AAAA-MM-DD, como lo ve el cliente. */
  venceDia: string;
  aceptada: string | null;
  /** Decision 2: nombre, correo, razon social y cargo; ni DNI, ni NIF, ni domicilio. */
  aceptante: { nombre: string; correo: string; razon_social: string | null; cargo: string | null } | null;
  acuse: Acuse | null;
  hitos: HitoPanel[];
  aperturas: { primera: string; ultima: string; veces: number } | null;
  /** El contacto que la enlaza; de ahi hereda el colaborador (decision 5). */
  contacto: { id: number; negocio: string; colaborador: string | null } | null;
}

export interface EventoHito {
  tipo: string;
  hito: number;
  fecha: string | null;
  created_at: string;
}

/** Lo ultimo que se dijo de cada hito gana, igual que en la pagina del cliente. */
export function plegarHitos(eventos: EventoHito[]): { cumplidos: Record<number, string>; cobrados: Record<number, string> } {
  const cumplidos: Record<number, string> = {};
  const cobrados: Record<number, string> = {};
  for (const e of eventos) {
    if (e.tipo === 'hito_cumplido') cumplidos[e.hito] = e.created_at;
    else if (e.tipo === 'hito_deshecho') delete cumplidos[e.hito];
    else if (e.tipo === 'cobro_apuntado' && e.fecha) cobrados[e.hito] = e.fecha;
    else if (e.tipo === 'cobro_deshecho') delete cobrados[e.hito];
  }
  return { cumplidos, cobrados };
}

/** El ultimo evento del acuse manda; aceptada sin ninguno todavia, pendiente. */
export function estadoAcuse(aceptada: boolean, tipos: string[]): Acuse | null {
  if (!aceptada) return null;
  for (let i = tipos.length - 1; i >= 0; i--) {
    if (tipos[i] === 'acuse_enviado') return 'enviado';
    if (tipos[i] === 'acuse_fallido') return 'fallido';
  }
  return 'pendiente';
}

/** La fecha de hoy en Lloret, AAAA-MM-DD. */
export function hoyEnMadrid(ahora = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(ahora);
}

const DIA_MS = 24 * 60 * 60 * 1000;
/** El acuse sale justo despues de responder al cliente; si en 15 minutos no consta, algo ha fallado. */
const MARGEN_ACUSE_MS = 15 * 60 * 1000;

export interface Hoy {
  /** Vigentes cuyo ultimo dia es dentro de 7 dias de calendario o menos. */
  vencen: PropuestaPanel[];
  /** Aceptadas cuyo PDF no consta como enviado (LSSI art. 28: 24 horas). */
  sinPdf: PropuestaPanel[];
  /** Contactos abiertos cuyo siguiente paso ya paso o es hoy. */
  pasos: { contacto: Contacto; vencido: boolean }[];
  /** Hitos cumplidos (el cliente ya los ve) sin «Cobrado el…». */
  sinCobrar: { propuesta: PropuestaPanel; hito: HitoPanel }[];
}

export function resumenHoy(propuestas: PropuestaPanel[], contactos: Contacto[], ahora = new Date()): Hoy {
  const hoy = hoyEnMadrid(ahora);
  const t = ahora.getTime();
  return {
    vencen: propuestas
      .filter((p) => p.estado === 'vigente' && (Date.parse(p.venceDia) - Date.parse(hoy)) / DIA_MS <= 7)
      .sort((a, b) => a.venceDia.localeCompare(b.venceDia)),
    sinPdf: propuestas.filter(
      (p) => p.acuse === 'fallido' || (p.acuse === 'pendiente' && p.aceptada && t - new Date(p.aceptada).getTime() > MARGEN_ACUSE_MS),
    ),
    pasos: contactos
      .filter((c) => !cerrado(c.estado) && c.fecha !== null && c.fecha <= hoy)
      .sort((a, b) => (a.fecha ?? '').localeCompare(b.fecha ?? ''))
      .map((c) => ({ contacto: c, vencido: (c.fecha ?? '') < hoy })),
    sinCobrar: propuestas.flatMap((p) => p.hitos.filter((h) => h.cumplido && !h.cobrado).map((hito) => ({ propuesta: p, hito }))),
  };
}

export interface CamposContacto {
  negocio: string;
  persona: string | null;
  telefono: string | null;
  correo: string | null;
  origen: string | null;
  estado: EstadoContacto;
  siguiente_accion: string | null;
  fecha: string | null;
  notas: string | null;
  propuesta: string | null;
  colaborador: string | null;
}

const LIMITES: Record<Exclude<keyof CamposContacto, 'estado'>, number> = {
  negocio: 200,
  persona: 200,
  telefono: 40,
  correo: 254,
  origen: 200,
  siguiente_accion: 500,
  fecha: 10,
  notas: 5000,
  propuesta: 10,
  colaborador: 100,
};

/** Del formulario a los campos limpios, o el mensaje del primer fallo. Los vacios son null. */
export function validarContacto(form: Record<string, unknown>): string | CamposContacto {
  const t = (k: string) => {
    const v = typeof form[k] === 'string' ? (form[k] as string).normalize('NFC').trim() : '';
    return v === '' ? null : v;
  };
  const campos = {} as Record<keyof CamposContacto, string | null>;
  for (const k of Object.keys(LIMITES) as (keyof typeof LIMITES)[]) {
    const v = t(k);
    if (v !== null && v.length > LIMITES[k]) return `«${k}» es demasiado largo (máximo ${LIMITES[k]})`;
    campos[k] = v;
  }
  if (!campos.negocio) return 'Falta el negocio';
  const estado = t('estado') ?? 'en_conversacion';
  if (!(ESTADOS_CONTACTO as readonly string[]).includes(estado)) return 'Estado no válido';
  if (campos.fecha && (!/^\d{4}-\d{2}-\d{2}$/.test(campos.fecha) || Number.isNaN(Date.parse(campos.fecha)))) return 'Fecha no válida';
  if (campos.correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(campos.correo)) return 'Correo no válido';
  if (campos.propuesta) {
    campos.propuesta = campos.propuesta.toUpperCase();
    if (!/^P-\d{4}-\d{3}$/.test(campos.propuesta)) return 'La propuesta va como P-2026-001';
  }
  return { ...(campos as Omit<CamposContacto, 'estado'> & { negocio: string }), estado: estado as EstadoContacto };
}
