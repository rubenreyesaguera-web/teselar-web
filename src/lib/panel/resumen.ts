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

/** Comision del colaborador, por contacto (fase 2, decision 2): 10 % del setup si hace de puente, 20 % si acompana. */
export const COMISIONES = ['ninguna', 'puente', 'acompana'] as const;
export type Comision = (typeof COMISIONES)[number];
export const PORCENTAJE: Record<Comision, number> = { ninguna: 0, puente: 10, acompana: 20 };
export const NOMBRE_COMISION: Record<Comision, string> = {
  ninguna: 'Sin comisión',
  puente: '10 % · puente',
  acompana: '20 % · acompaña la venta',
};

export const FORMAS_PAGO = ['transferencia', 'canje', 'descuento'] as const;
export type FormaPago = (typeof FORMAS_PAGO)[number];
export const NOMBRE_FORMA: Record<FormaPago, string> = {
  transferencia: 'Transferencia',
  canje: 'Canje por mantenimiento u otro servicio',
  descuento: 'Descuento en un producto suyo',
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
  comision: Comision;
  /** «Saldado el…» (AAAA-MM-DD), o null. Solo lo ve Ruben, como los cobros. */
  comision_saldada: string | null;
  comision_forma: FormaPago | null;
  /** Si se pago con un canje o un descuento: lo que se acordo que vale, en centimos (LIVA art. 79.Uno). */
  comision_valor_centimos: number | null;
  comision_nota: string | null;
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
  /** La puesta en marcha: la suma de los conceptos de pago unico. Sobre esto va la comision. */
  setup_centimos: number;
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

/** Politica de privacidad, apartado 8: sin contrato, se borran a los 12 meses del ultimo contacto (Ruben, 30/10). */
export const PLAZO_MESES = 12;
/** «Hoy» avisa de los que se borran en 30 dias o menos, para que de tiempo a escribirles. */
export const AVISO_DIAS = 30;

/** Suma meses de calendario a un dia AAAA-MM-DD; si el dia no existe en ese mes, el ultimo del mes (29 feb → 28 feb). */
export function sumarMeses(aaaammdd: string, meses: number): string {
  const [a, m, d] = aaaammdd.split('-').map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  const ultimo = new Date(Date.UTC(anio, mes, 0)).getUTCDate();
  return `${anio}-${String(mes).padStart(2, '0')}-${String(Math.min(d, ultimo)).padStart(2, '0')}`;
}

/**
 * El dia en que se borra un contacto, o null si no se borra (ganado: hay contrato). El ultimo contacto es lo mas
 * reciente entre la ultima vez que se guardo la ficha y la fecha del siguiente paso (Ruben, 30/10, opcion C): a quien
 * se le dijo «hablamos en primavera» el plazo le cuenta desde la primavera.
 */
export function diaDeBorrado(c: Contacto): string | null {
  if (c.estado === 'ganado') return null;
  const guardado = hoyEnMadrid(new Date(c.actualizado));
  const ultimo = c.fecha && c.fecha > guardado ? c.fecha : guardado;
  return sumarMeses(ultimo, PLAZO_MESES);
}

/** Los que ya han llegado a su dia de borrado. */
export function caducados(contactos: Contacto[], ahora = new Date()): Contacto[] {
  const hoy = hoyEnMadrid(ahora);
  return contactos.filter((c) => {
    const d = diaDeBorrado(c);
    return d !== null && d <= hoy;
  });
}

export interface Hoy {
  /** Vigentes cuyo ultimo dia es dentro de 7 dias de calendario o menos. */
  vencen: PropuestaPanel[];
  /** Aceptadas cuyo PDF no consta como enviado (LSSI art. 28: 24 horas). */
  sinPdf: PropuestaPanel[];
  /** Contactos abiertos cuyo siguiente paso ya paso o es hoy. */
  pasos: { contacto: Contacto; vencido: boolean }[];
  /** Hitos cumplidos (el cliente ya los ve) sin «Cobrado el…». */
  sinCobrar: { propuesta: PropuestaPanel; hito: HitoPanel }[];
  /** Contactos que se borran en AVISO_DIAS dias o menos, del mas proximo al mas lejano. */
  seBorran: { contacto: Contacto; dia: string }[];
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
    seBorran: contactos
      .map((contacto) => ({ contacto, dia: diaDeBorrado(contacto) }))
      .filter((x): x is { contacto: Contacto; dia: string } => x.dia !== null && x.dia > hoy && (Date.parse(x.dia) - Date.parse(hoy)) / DIA_MS <= AVISO_DIAS)
      .sort((a, b) => a.dia.localeCompare(b.dia)),
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
  comision: Comision;
}

const LIMITES: Record<Exclude<keyof CamposContacto, 'estado' | 'comision'>, number> = {
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
  const comision = t('comision') ?? 'ninguna';
  if (!(COMISIONES as readonly string[]).includes(comision)) return 'Comisión no válida';
  if (comision !== 'ninguna' && !campos.colaborador) return 'La comisión necesita un colaborador';
  const estado = t('estado') ?? 'en_conversacion';
  if (!(ESTADOS_CONTACTO as readonly string[]).includes(estado)) return 'Estado no válido';
  if (campos.fecha && (!/^\d{4}-\d{2}-\d{2}$/.test(campos.fecha) || Number.isNaN(Date.parse(campos.fecha)))) return 'Fecha no válida';
  if (campos.correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(campos.correo)) return 'Correo no válido';
  if (campos.propuesta) {
    campos.propuesta = campos.propuesta.toUpperCase();
    if (!/^P-\d{4}-\d{3}$/.test(campos.propuesta)) return 'La propuesta va como P-2026-001';
  }
  return {
    ...(campos as Omit<CamposContacto, 'estado' | 'comision'> & { negocio: string }),
    estado: estado as EstadoContacto,
    comision: comision as Comision,
  };
}

// ——— Colaboradores (fase 2) ———

/** Lo que se le debe a un colaborador por un contacto: el % sobre el setup, solo si su propuesta esta aceptada. */
export function comisionDe(c: Contacto, p: PropuestaPanel | undefined): number {
  if (!p || p.estado !== 'aceptada') return 0;
  return Math.round((p.setup_centimos * PORCENTAJE[c.comision]) / 100);
}

export interface LineaColaborador {
  contacto: Contacto;
  propuesta: PropuestaPanel | null;
  /** Lo que le corresponde, en centimos (0 si no hay comision o la propuesta no esta aceptada). */
  importe: number;
}

export interface ResumenColaborador {
  nombre: string;
  /** El de su pagina /c/[slug], si la tiene. */
  slug: string | null;
  visitas: number;
  visitas30: number;
  contactos: number;
  firmados: number;
  setupFirmado: number;
  debido: number;
  saldado: number;
  lineas: LineaColaborador[];
}

const normal = (s: string) => s.normalize('NFC').trim().toLowerCase();

/**
 * Un resumen por colaborador: los que tienen pagina (aunque no hayan traido a nadie) y cualquier otro nombre que salga
 * en un contacto. El colaborador del contacto se compara sin mayusculas ni espacios de mas.
 */
export function resumenColaboradores(
  conPagina: { slug: string; nombre: string }[],
  contactos: Contacto[],
  propuestas: PropuestaPanel[],
  visitas: Record<string, { total: number; ultimos30: number }>,
): ResumenColaborador[] {
  const por = new Map<string, ResumenColaborador>();
  const nuevo = (nombre: string, slug: string | null): ResumenColaborador => ({
    nombre, slug, visitas: slug ? visitas[slug]?.total ?? 0 : 0, visitas30: slug ? visitas[slug]?.ultimos30 ?? 0 : 0,
    contactos: 0, firmados: 0, setupFirmado: 0, debido: 0, saldado: 0, lineas: [],
  });
  for (const c of conPagina) por.set(normal(c.nombre), nuevo(c.nombre, c.slug));
  for (const c of contactos) {
    if (!c.colaborador) continue;
    const k = normal(c.colaborador);
    if (!por.has(k)) por.set(k, nuevo(c.colaborador.trim(), null));
    const r = por.get(k) as ResumenColaborador;
    const p = c.propuesta ? propuestas.find((x) => x.referencia === c.propuesta) ?? null : null;
    const importe = comisionDe(c, p ?? undefined);
    r.contactos += 1;
    if (p?.estado === 'aceptada') {
      r.firmados += 1;
      r.setupFirmado += p.setup_centimos;
    }
    r.debido += importe;
    if (c.comision_saldada) r.saldado += importe;
    r.lineas.push({ contacto: c, propuesta: p, importe });
  }
  return [...por.values()].sort((a, b) => b.debido - a.debido || b.contactos - a.contactos || a.nombre.localeCompare(b.nombre));
}

/** Del formulario de «Saldado el…» a lo que se guarda, o el mensaje del fallo. */
export function validarSaldo(form: Record<string, unknown>):
  | string
  | { fecha: string; forma: FormaPago; valor_centimos: number | null; nota: string | null } {
  const t = (k: string) => (typeof form[k] === 'string' ? (form[k] as string).trim() : '');
  const fecha = t('fecha');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || Number.isNaN(Date.parse(fecha))) return 'Fecha no válida';
  const forma = t('forma');
  if (!(FORMAS_PAGO as readonly string[]).includes(forma)) return 'Forma de pago no válida';
  const nota = t('nota') || null;
  if (nota && nota.length > 500) return 'La nota es demasiado larga (máximo 500)';
  let valor_centimos: number | null = null;
  if (forma !== 'transferencia') {
    const v = t('valor').replace(/\s|€/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
    const n = Number(v);
    if (!v || !Number.isFinite(n) || n < 0) return 'Con un canje o un descuento, pon lo que acordasteis que vale, en euros';
    valor_centimos = Math.round(n * 100);
  }
  return { fecha, forma: forma as FormaPago, valor_centimos, nota };
}
