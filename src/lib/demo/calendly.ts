// Enlace al Calendly del diagnostico con las respuestas ya puestas (ADR-113, fase 1 del doc 31).
//
// Las preguntas del evento, por orden: a1 telefono, a2 «Nombre de tu empresa y web», a3 «¿Que es lo que mas te
// preocupa...?» y a4 «Lo que ya me has contado», de varias lineas. Calendly las rellena por posicion, asi que si alguien
// cambia el orden en el evento, hay que cambiarlo aqui.
//
// Hasta el 22/10 la demo rellenaba tres preguntas (sector, que lleva, como lo lleva). Ruben: «quizas son muchas
// preguntas»; quien reservaba sin pasar por la demo veia tres cajas vacias de mas. Ahora todo va en a4, en una linea:
// lo de la demo («Sector: ... · Llevo: ... · Hoy: ...») o el colaborador que lo presenta («De parte de Gis»).

export const CALENDLY_DIAGNOSTICO = 'https://calendly.com/teselarsoftware-info/diagnostico30min';

// Calendly no pone limite documentado; esto solo evita enlaces absurdos si alguien pega un texto enorme. Con las cinco
// partes marcadas y «Otro» escrito, la linea de la demo no pasa de unos 250 caracteres.
const MAXIMO = 400;

const limpio = (t: string) => t.replace(/\s+/g, ' ').trim().slice(0, MAXIMO);

/** a2 la empresa y a4 lo que ya se sabe. Los espacios van como %20 y no como «+»: la ayuda de Calendly lo pide asi. */
export function enlaceCalendly(empresa: string, contexto: string): string {
  const query = ([['a2', empresa], ['a4', contexto]] as const)
    .map(([clave, valor]) => [clave, limpio(valor)] as const)
    .filter(([, valor]) => valor)
    .map(([clave, valor]) => `${clave}=${encodeURIComponent(valor)}`)
    .join('&');
  return query ? `${CALENDLY_DIAGNOSTICO}?${query}` : CALENDLY_DIAGNOSTICO;
}

export interface RespuestasDemo {
  sector: string;
  lleva: string;
  como: string;
}

/** La linea de la demo para a4, en el idioma del visitante: solo lo que haya contestado. */
export function contextoDemo(r: RespuestasDemo, etiquetas: { sector: string; lleva: string; como: string }): string {
  return ([['sector', r.sector], ['lleva', r.lleva], ['como', r.como]] as const)
    .filter(([, valor]) => valor.trim())
    .map(([clave, valor]) => `${etiquetas[clave]}: ${valor.trim()}`)
    .join(' · ');
}
