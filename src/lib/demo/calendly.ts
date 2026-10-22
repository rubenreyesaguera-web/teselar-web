// Enlace al Calendly del diagnostico con las respuestas de la demo ya puestas (ADR-113, fase 1 del doc 31).
//
// Las preguntas del evento, por orden: a1 telefono, a2 «Nombre de tu empresa y web», a3 «¿Que es lo que mas te
// preocupa...?», a4 sector, a5 que lleva, a6 como lo lleva. Calendly las rellena por posicion, asi que si alguien
// cambia el orden en el evento, hay que cambiarlo aqui. Van en texto libre: un desplegable solo se rellena con el texto
// exacto de la opcion.

export const CALENDLY_DIAGNOSTICO = 'https://calendly.com/teselarsoftware-info/diagnostico30min';

export interface RespuestasCalendly {
  empresa: string;
  sector: string;
  lleva: string;
  como: string;
}

// Calendly no pone limite documentado; esto solo evita enlaces absurdos si alguien pega un texto enorme.
const MAXIMO = 200;

// Los espacios van como %20 y no como «+» (lo que haria URLSearchParams): la ayuda de Calendly lo pide asi.
export function enlaceCalendly(r: RespuestasCalendly): string {
  const campos: [string, string][] = [['a2', r.empresa], ['a4', r.sector], ['a5', r.lleva], ['a6', r.como]];
  const query = campos
    .map(([clave, valor]) => [clave, valor.replace(/\s+/g, ' ').trim().slice(0, MAXIMO)])
    .filter(([, limpio]) => limpio)
    .map(([clave, limpio]) => `${clave}=${encodeURIComponent(limpio)}`)
    .join('&');
  return query ? `${CALENDLY_DIAGNOSTICO}?${query}` : CALENDLY_DIAGNOSTICO;
}
