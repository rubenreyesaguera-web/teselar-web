// La instantanea canonica de una propuesta, version 1 del esquema (ADR-091, hito 6.3).
//
// Los campos son las secciones de la plantilla del doc 24 de la boveda (24_Plantilla_Propuesta.md), cada una con
// el nombre que alli lleva entre corchetes. La pagina, el dialogo de confirmacion y el endpoint de aceptacion leen
// ESTE objeto, tal y como se guardo; nunca se recompone desde la plantilla.
//
// La validacion es estricta a proposito: una clave desconocida es un error (una errata no se pierde en silencio),
// los importes son enteros en centimos, y lo que pagan los hitos cuadra con lo que cuesta la puesta en marcha.
// Lo que falte por saber se escribe «Por confirmar» en el texto; nunca se rellena (regla 1 del doc 24).

export const SCHEMA_VERSION = 1;

export interface Concepto {
  concepto: string;
  importe_centimos: number;
  periodicidad: 'unico' | 'mensual';
}

export interface HitoDePago {
  hito: string;
  importe_centimos: number;
  cuando: string;
}

export interface TramoDeCalendario {
  tramo: string;
  depende_de: string;
  plazo: string;
}

/** Lo que se rellena a mano (el JSON que lee `scripts/propuesta.ts crear`). */
export interface ContenidoV1 {
  partes: {
    cliente: { nombre: string; negocio: string };
    proveedor: { nombre: string; marca: string; nif: string | null };
  };
  situacion: { palabras_del_cliente: string[]; lo_que_funciona: string | null };
  solucion: { resumen: string; dia_a_dia: string[] };
  alcance: string[];
  entregables: string[];
  exclusiones: string[];
  dependencias: string[];
  calendario: TramoDeCalendario[];
  precio: { moneda: 'EUR'; conceptos: Concepto[] };
  impuestos: { precios_mas_iva: true; nota: string | null };
  pagos: { hitos: HitoDePago[]; notas: string[] };
  garantia: string | null;
  vigencia_dias: number;
  siguiente_paso: string;
}

/** Lo que se guarda y se firma con el hash: el contenido mas lo que pone el script. */
export interface InstantaneaV1 extends Omit<ContenidoV1, 'vigencia_dias'> {
  schema_version: typeof SCHEMA_VERSION;
  referencia: string;
  version: number;
  fecha: string;
  vigencia: { dias: number; hasta: string };
}

type Obj = Record<string, unknown>;

class ErrorDeContenido extends Error {}

function falla(ruta: string, que: string): never {
  throw new ErrorDeContenido(`${ruta}: ${que}`);
}

function objeto(v: unknown, ruta: string, claves: readonly string[]): Obj {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) falla(ruta, 'tiene que ser un objeto');
  const o = v as Obj;
  for (const k of Object.keys(o)) if (!claves.includes(k)) falla(`${ruta}.${k}`, 'clave desconocida');
  for (const k of claves) if (!(k in o)) falla(`${ruta}.${k}`, 'falta');
  return o;
}

function texto(v: unknown, ruta: string): string {
  if (typeof v !== 'string') falla(ruta, 'tiene que ser texto');
  const s = v.normalize('NFC').trim();
  if (s === '') falla(ruta, 'esta vacio (si falta el dato, «Por confirmar»)');
  return s;
}

function textoONulo(v: unknown, ruta: string): string | null {
  return v === null ? null : texto(v, ruta);
}

function lista<T>(v: unknown, ruta: string, cada: (x: unknown, r: string) => T, minimo = 1): T[] {
  if (!Array.isArray(v)) falla(ruta, 'tiene que ser una lista');
  if (v.length < minimo) falla(ruta, `necesita al menos ${minimo} elemento(s)`);
  return v.map((x, i) => cada(x, `${ruta}[${i}]`));
}

function centimos(v: unknown, ruta: string): number {
  if (typeof v !== 'number' || !Number.isSafeInteger(v) || v < 0) {
    falla(ruta, 'tiene que ser un entero de centimos, sin decimales (150 € = 15000)');
  }
  return v;
}

function concepto(v: unknown, ruta: string): Concepto {
  const o = objeto(v, ruta, ['concepto', 'importe_centimos', 'periodicidad']);
  if (o.periodicidad !== 'unico' && o.periodicidad !== 'mensual') falla(`${ruta}.periodicidad`, "'unico' o 'mensual'");
  return {
    concepto: texto(o.concepto, `${ruta}.concepto`),
    importe_centimos: centimos(o.importe_centimos, `${ruta}.importe_centimos`),
    periodicidad: o.periodicidad,
  };
}

function hitoDePago(v: unknown, ruta: string): HitoDePago {
  const o = objeto(v, ruta, ['hito', 'importe_centimos', 'cuando']);
  return {
    hito: texto(o.hito, `${ruta}.hito`),
    importe_centimos: centimos(o.importe_centimos, `${ruta}.importe_centimos`),
    cuando: texto(o.cuando, `${ruta}.cuando`),
  };
}

function tramo(v: unknown, ruta: string): TramoDeCalendario {
  const o = objeto(v, ruta, ['tramo', 'depende_de', 'plazo']);
  return {
    tramo: texto(o.tramo, `${ruta}.tramo`),
    depende_de: texto(o.depende_de, `${ruta}.depende_de`),
    plazo: texto(o.plazo, `${ruta}.plazo`),
  };
}

const textos = (v: unknown, r: string, minimo = 1) => lista(v, r, texto, minimo);

/** Valida y normaliza el JSON rellenado. Lanza con la ruta exacta del primer fallo. */
export function validarContenido(entrada: unknown): ContenidoV1 {
  const o = objeto(entrada, '$', [
    'partes', 'situacion', 'solucion', 'alcance', 'entregables', 'exclusiones', 'dependencias',
    'calendario', 'precio', 'impuestos', 'pagos', 'garantia', 'vigencia_dias', 'siguiente_paso',
  ]);

  const partes = objeto(o.partes, '$.partes', ['cliente', 'proveedor']);
  const cliente = objeto(partes.cliente, '$.partes.cliente', ['nombre', 'negocio']);
  const proveedor = objeto(partes.proveedor, '$.partes.proveedor', ['nombre', 'marca', 'nif']);
  const situacion = objeto(o.situacion, '$.situacion', ['palabras_del_cliente', 'lo_que_funciona']);
  const solucion = objeto(o.solucion, '$.solucion', ['resumen', 'dia_a_dia']);
  const precio = objeto(o.precio, '$.precio', ['moneda', 'conceptos']);
  if (precio.moneda !== 'EUR') falla('$.precio.moneda', "solo 'EUR'");
  const impuestos = objeto(o.impuestos, '$.impuestos', ['precios_mas_iva', 'nota']);
  if (impuestos.precios_mas_iva !== true) falla('$.impuestos.precios_mas_iva', 'todos los precios son + IVA (ADR-088)');
  const pagos = objeto(o.pagos, '$.pagos', ['hitos', 'notas']);

  if (typeof o.vigencia_dias !== 'number' || !Number.isSafeInteger(o.vigencia_dias) || o.vigencia_dias < 1 || o.vigencia_dias > 365) {
    falla('$.vigencia_dias', 'dias enteros entre 1 y 365 (el doc 24 fija 30)');
  }

  const contenido: ContenidoV1 = {
    partes: {
      cliente: { nombre: texto(cliente.nombre, '$.partes.cliente.nombre'), negocio: texto(cliente.negocio, '$.partes.cliente.negocio') },
      proveedor: {
        nombre: texto(proveedor.nombre, '$.partes.proveedor.nombre'),
        marca: texto(proveedor.marca, '$.partes.proveedor.marca'),
        nif: textoONulo(proveedor.nif, '$.partes.proveedor.nif'),
      },
    },
    situacion: {
      palabras_del_cliente: textos(situacion.palabras_del_cliente, '$.situacion.palabras_del_cliente'),
      lo_que_funciona: textoONulo(situacion.lo_que_funciona, '$.situacion.lo_que_funciona'),
    },
    solucion: { resumen: texto(solucion.resumen, '$.solucion.resumen'), dia_a_dia: textos(solucion.dia_a_dia, '$.solucion.dia_a_dia') },
    alcance: textos(o.alcance, '$.alcance'),
    entregables: textos(o.entregables, '$.entregables'),
    exclusiones: textos(o.exclusiones, '$.exclusiones'),
    dependencias: textos(o.dependencias, '$.dependencias'),
    calendario: lista(o.calendario, '$.calendario', tramo),
    precio: { moneda: 'EUR', conceptos: lista(precio.conceptos, '$.precio.conceptos', concepto) },
    impuestos: { precios_mas_iva: true, nota: textoONulo(impuestos.nota, '$.impuestos.nota') },
    pagos: { hitos: lista(pagos.hitos, '$.pagos.hitos', hitoDePago), notas: textos(pagos.notas, '$.pagos.notas', 0) },
    garantia: textoONulo(o.garantia, '$.garantia'),
    vigencia_dias: o.vigencia_dias,
    siguiente_paso: texto(o.siguiente_paso, '$.siguiente_paso'),
  };

  // Lo que se paga por hitos es la puesta en marcha entera: ni un centimo mas ni uno menos.
  const unico = contenido.precio.conceptos.filter((c) => c.periodicidad === 'unico').reduce((s, c) => s + c.importe_centimos, 0);
  const porHitos = contenido.pagos.hitos.reduce((s, h) => s + h.importe_centimos, 0);
  if (unico !== porHitos) {
    falla('$.pagos.hitos', `suman ${porHitos} centimos y los conceptos de pago unico, ${unico}`);
  }
  return contenido;
}

/** Suma `dias` a una fecha `AAAA-MM-DD`, sin husos horarios por medio. */
export function sumarDias(fecha: string, dias: number): string {
  const d = new Date(`${fecha}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

/** La fecha de hoy en Lloret (Europe/Madrid), `AAAA-MM-DD`. */
export function hoyEnMadrid(ahora = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(ahora);
}

export function construirInstantanea(
  contenido: ContenidoV1,
  meta: { referencia: string; version: number; fecha: string },
): InstantaneaV1 {
  const { vigencia_dias, ...resto } = contenido;
  return {
    schema_version: SCHEMA_VERSION,
    referencia: meta.referencia,
    version: meta.version,
    fecha: meta.fecha,
    vigencia: { dias: vigencia_dias, hasta: sumarDias(meta.fecha, vigencia_dias) },
    ...resto,
  };
}
