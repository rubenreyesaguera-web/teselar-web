// La pagina Estadisticas del panel (fase 2, 30/10): lo mas parecido a Google Analytics que permite un contador sin
// cookies. «Visitas» son las entradas (la primera pagina de quien llega) y «paginas vistas», todas; no hay usuarios,
// sesiones, rebote ni tiempo en pagina, porque piden reconocer al visitante. Los dias son de Lloret.
import type { NeonQueryFunction } from '@neondatabase/serverless';
import { conexion } from './datos';
import { sumarDias } from './formato';
import { hoyEnMadrid } from './resumen';

type Sql = NeonQueryFunction<false, false>;

export const RANGOS = ['7', '30', '90', 'todo'] as const;
export type Rango = (typeof RANGOS)[number];

export const esRango = (r: unknown): r is Rango => (RANGOS as readonly unknown[]).includes(r);

export interface Periodo {
  /** Primer dia incluido, AAAA-MM-DD. */
  desde: string;
  /** Ultimo dia incluido (hoy). */
  hasta: string;
  /** El periodo anterior del mismo largo, o null con «todo». */
  anterior: { desde: string; hasta: string } | null;
}

/** Los ultimos N dias contando hoy, y los N de antes. Con «todo», desde el primer dia con datos. */
export function periodo(rango: Rango, primerDia: string | null, ahora = new Date()): Periodo {
  const hoy = hoyEnMadrid(ahora);
  if (rango === 'todo') return { desde: primerDia && primerDia < hoy ? primerDia : hoy, hasta: hoy, anterior: null };
  const n = Number(rango);
  const desde = sumarDias(hoy, -(n - 1));
  return { desde, hasta: hoy, anterior: { desde: sumarDias(desde, -n), hasta: sumarDias(desde, -1) } };
}

/** Todos los dias del periodo, con 0 los que no tienen nada. */
export function rellenar(desde: string, hasta: string, filas: { dia: string; n: number }[]): { dia: string; n: number }[] {
  const por = new Map(filas.map((f) => [f.dia, f.n]));
  const dias: { dia: string; n: number }[] = [];
  for (let d = desde; d <= hasta; d = sumarDias(d, 1)) dias.push({ dia: d, n: por.get(d) ?? 0 });
  return dias;
}

/** Cambio en % frente al periodo anterior; null si antes no habia nada (no hay base para un %). */
export function variacion(actual: number, anterior: number | null): number | null {
  if (anterior === null || anterior === 0) return null;
  return Math.round(((actual - anterior) / anterior) * 100);
}

export interface Fila {
  clave: string;
  n: number;
}

export interface Totales {
  visitas: number;
  vistas: number;
  reservas: number;
}

export interface Estadisticas {
  periodo: Periodo;
  totales: Totales;
  totalesAntes: Totales | null;
  /** Visitas por dia del periodo y, alineadas por posicion, las del anterior. */
  serie: { dia: string; n: number }[];
  serieAntes: { dia: string; n: number }[] | null;
  ahora: { visitas: number; vistas: number };
  paginas: Fila[];
  fuentes: Fila[];
  campanas: Fila[];
  paises: Fila[];
  dispositivos: Fila[];
  embudo: { abrir: number; panel: number; reservar: number };
}

// Desde la medianoche de Lloret del primer dia hasta la del dia siguiente al ultimo.
const LIMITES = (p: { desde: string; hasta: string }) => [p.desde, sumarDias(p.hasta, 1)] as const;

async function totales(sql: Sql, p: { desde: string; hasta: string }): Promise<Totales> {
  const [a, b] = LIMITES(p);
  const [v] = (await sql`
    SELECT count(*) FILTER (WHERE entrada)::int AS visitas, count(*)::int AS vistas FROM visita
     WHERE creado >= (${a}::timestamp AT TIME ZONE 'Europe/Madrid') AND creado < (${b}::timestamp AT TIME ZONE 'Europe/Madrid')`) as {
    visitas: number;
    vistas: number;
  }[];
  const [r] = (await sql`
    SELECT count(*)::int AS n FROM demo_evento WHERE paso = 'reservar'
       AND creado >= (${a}::timestamp AT TIME ZONE 'Europe/Madrid') AND creado < (${b}::timestamp AT TIME ZONE 'Europe/Madrid')`) as {
    n: number;
  }[];
  return { visitas: v.visitas, vistas: v.vistas, reservas: r.n };
}

async function serie(sql: Sql, p: { desde: string; hasta: string }) {
  const [a, b] = LIMITES(p);
  const filas = (await sql`
    SELECT to_char((creado AT TIME ZONE 'Europe/Madrid')::date, 'YYYY-MM-DD') AS dia, count(*)::int AS n FROM visita
     WHERE entrada AND creado >= (${a}::timestamp AT TIME ZONE 'Europe/Madrid') AND creado < (${b}::timestamp AT TIME ZONE 'Europe/Madrid')
     GROUP BY 1`) as { dia: string; n: number }[];
  return rellenar(p.desde, p.hasta, filas);
}

/** Las N claves con mas filas; lo que no tiene clave sale como `vacio` (p. ej. «Directo»). */
async function top(sql: Sql, p: { desde: string; hasta: string }, columna: 'ruta' | 'dominio' | 'origen' | 'pais' | 'dispositivo', soloEntradas: boolean, vacio: string | null) {
  const [a, b] = LIMITES(p);
  // La columna sale de una lista cerrada (el tipo de arriba), nunca de lo que llega por la web.
  const col = { ruta: 'ruta', dominio: 'dominio', origen: 'origen', pais: 'pais', dispositivo: 'dispositivo' }[columna];
  const filas = (await sql.query(
    `SELECT ${col} AS clave, count(*)::int AS n FROM visita
      WHERE ($1::boolean = false OR entrada)
        AND creado >= ($2::timestamp AT TIME ZONE 'Europe/Madrid') AND creado < ($3::timestamp AT TIME ZONE 'Europe/Madrid')
        AND ($4::text IS NOT NULL OR ${col} IS NOT NULL)
      GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 10`,
    [soloEntradas, a, b, vacio],
  )) as { clave: string | null; n: number }[];
  return filas.map((f) => ({ clave: f.clave ?? (vacio as string), n: f.n }));
}

async function recientesDe(sql: Sql): Promise<{ visitas: number; vistas: number }> {
  const [r] = (await sql`
    SELECT count(*) FILTER (WHERE entrada)::int AS visitas, count(*)::int AS vistas FROM visita
     WHERE creado > now() - interval '30 minutes'`) as { visitas: number; vistas: number }[];
  return r;
}

async function embudoDe(sql: Sql, p: { desde: string; hasta: string }): Promise<{ abrir: number; panel: number; reservar: number }> {
  const [a, b] = LIMITES(p);
  const [r] = (await sql`
    SELECT count(*) FILTER (WHERE paso = 'abrir')::int AS abrir, count(*) FILTER (WHERE paso = 'panel')::int AS panel,
           count(*) FILTER (WHERE paso = 'reservar')::int AS reservar FROM demo_evento
     WHERE creado >= (${a}::timestamp AT TIME ZONE 'Europe/Madrid') AND creado < (${b}::timestamp AT TIME ZONE 'Europe/Madrid')`) as {
    abrir: number;
    panel: number;
    reservar: number;
  }[];
  return r;
}

export async function leerEstadisticas(rango: Rango, ahora = new Date(), sql: Sql = conexion()): Promise<Estadisticas> {
  const [primero] = (await sql`
    SELECT to_char((min(creado) AT TIME ZONE 'Europe/Madrid')::date, 'YYYY-MM-DD') AS dia FROM visita`) as { dia: string | null }[];
  const p = periodo(rango, primero?.dia ?? null, ahora);
  const [t, tAntes, s, sAntes, recientes, paginas, fuentes, campanas, paises, dispositivos, embudo] = await Promise.all([
    totales(sql, p),
    p.anterior ? totales(sql, p.anterior) : Promise.resolve(null),
    serie(sql, p),
    p.anterior ? serie(sql, p.anterior) : Promise.resolve(null),
    recientesDe(sql),
    top(sql, p, 'ruta', false, null),
    top(sql, p, 'dominio', true, 'Directo'),
    top(sql, p, 'origen', true, null),
    top(sql, p, 'pais', true, 'Desconocido'),
    top(sql, p, 'dispositivo', true, null),
    embudoDe(sql, p),
  ]);
  return {
    periodo: p,
    totales: t,
    totalesAntes: tAntes,
    serie: s,
    serieAntes: sAntes,
    ahora: recientes,
    paginas,
    fuentes,
    campanas,
    paises,
    dispositivos,
    embudo,
  };
}
