// Lo que la demo lee del enlace (ADR-113, doc 31 y regla del documento 2 en el doc 18 de la boveda).
//
//   ?empresa=...&sector=...      para mandarla preparada a un lead
//   &lleva=tec,cli               las partes que salieron en la reunion, ya marcadas
//   &desde=doc2                  viene del documento 2: ya hizo el diagnostico, asi que el final cambia a «¿Lo
//                                hablamos?» por WhatsApp, y no se cuenta (lo marcado lo puso Ruben, no el visitante)
import { PARTES, esParte, esSector, type Parte, type Sector } from '@/data/demo';

export const MAXIMO_EMPRESA = 80;

export interface Enlace {
  empresa: string;
  sector: Sector | null;
  partes: Parte[];
  doc2: boolean;
}

export function leerEnlace(search: string): Enlace {
  const q = new URLSearchParams(search);
  const s = q.get('sector');
  const lleva = (q.get('lleva') ?? '').split(',').map((p) => p.trim());
  return {
    empresa: (q.get('empresa') ?? '').trim().slice(0, MAXIMO_EMPRESA),
    sector: esSector(s) ? s : null,
    // En el orden de PARTES, sin repetidas y sin lo que no exista.
    partes: PARTES.filter((p) => lleva.includes(p) && esParte(p)),
    doc2: q.get('desde') === 'doc2',
  };
}

export const WHATSAPP_RUBEN = '34653232735';

/** wa.me con el mensaje ya escrito. Con empresa, {empresa} se cambia por el nombre; sin ella, va el mensaje sin nombre
 *  (quitar solo el nombre deja frases cojas, y en catalan esta el apostrofo: «d'Instal·lacions»). */
export function enlaceWhatsApp(conEmpresa: string, sinEmpresa: string, empresa: string): string {
  const nombre = empresa.replace(/\s+/g, ' ').trim();
  const texto = nombre ? conEmpresa.replace('{empresa}', nombre) : sinEmpresa;
  return `https://wa.me/${WHATSAPP_RUBEN}?text=${encodeURIComponent(texto)}`;
}
