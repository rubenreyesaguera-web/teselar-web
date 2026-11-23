// El diagnóstico gratuito se reserva en la página de reservas propia de Teselar (Teselar Citas), no en Calendly
// (Rubén, 20/11). Enlace sin idioma: la página redirige al del navegador y conserva la consulta (`o` y `d`).
//
// De parte de quién viene (ADR-120, D131-D135, 23/11): solo en el negocio de Teselar, la página acepta `o=c-<slug>`
// (la tarjeta de un colaborador: sale «Llegó desde: página de Gis») y `d=<línea>` (lo que contó el visitante en la demo,
// que citas limpia y corta a 250 caracteres y que solo ve Rubén y quien reserva).
const PAGINA = 'https://reservas.teselarsoftware.com/teselarsoftware';

export const RESERVA_DIAGNOSTICO = `${PAGINA}?o=web`;

// Lo mismo que acepta citas (`esSlugColaborador`): si no, la reserva contaría «sin origen».
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** El botón de reservar de la tarjeta `/c/<slug>`. */
export function reservaColaborador(slug: string): string {
  if (slug.length > 30 || !SLUG.test(slug)) throw new Error(`Slug de colaborador que citas no acepta: «${slug}»`);
  return `${PAGINA}?o=c-${slug}`;
}

export interface RespuestasDemo {
  empresa: string;
  sector: string;
  lleva: string;
  como: string;
}

/**
 * La línea de la demo, en el idioma del visitante y solo con lo que haya contestado:
 * «Empresa: … · Sector: … · Llevo: … · Hoy: …». La empresa va delante porque citas corta por el final (Rubén, 23/11:
 * hace falta para preparar la charla, como en el prediagnóstico).
 */
export function contextoDemo(r: RespuestasDemo, etiquetas: { empresa: string; sector: string; lleva: string; como: string }): string {
  return ([['empresa', r.empresa], ['sector', r.sector], ['lleva', r.lleva], ['como', r.como]] as const)
    .map(([clave, valor]) => [clave, valor.replace(/\s+/g, ' ').trim()] as const)
    .filter(([, valor]) => valor)
    .map(([clave, valor]) => `${etiquetas[clave]}: ${valor}`)
    .join(' · ');
}

// Citas corta a 250; esto solo evita un enlace enorme si alguien pega un texto largo en «Otro».
const MAXIMO_ENLACE = 400;

/** El botón de reservar de la demo: origen web y, si ha contestado algo, su línea. */
export function reservaDemo(contexto: string): string {
  const d = contexto.trim().slice(0, MAXIMO_ENLACE);
  return d ? `${RESERVA_DIAGNOSTICO}&d=${encodeURIComponent(d)}` : RESERVA_DIAGNOSTICO;
}
