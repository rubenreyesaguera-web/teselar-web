// El contador de toda la web (fase 2 del panel, 30/10; 07_Pendientes punto 7). Una fila por pagina vista, sin datos
// personales: ni IP, ni navegador, ni cookie, ni la direccion completa de la web de origen. La IP y el navegador se
// usan solo un instante, al llegar la peticion, para sacar el pais (cabecera de Vercel) y el tipo de dispositivo, y
// para no contar robots; no se guardan (Ruben, decision 4b).
import { neon } from '@neondatabase/serverless';

export type Dispositivo = 'movil' | 'escritorio' | 'tableta';

export interface Visita {
  ruta: string;
  entrada: boolean;
  dominio: string | null;
  origen: string | null;
  pais: string | null;
  dispositivo: Dispositivo;
}

/** Los dominios de la propia web: venir de ellos es moverse por dentro, no una entrada. */
const PROPIOS = ['teselarsoftware.com'];

const RUTA = /^\/(es|ca|en)(\/[a-z0-9/-]*)?$/;
const ORIGEN = /^[a-z0-9-]{1,30}$/;
const ROBOT =
  /bot|crawl|spider|slurp|scrape|headless|lighthouse|pagespeed|preview|facebookexternalhit|whatsapp|telegram|vercel|curl|wget|python|node-fetch|axios|go-http|java\/|httpclient|monitor|uptime|^$/i;

/** Sin la barra final; en minusculas. La que no tiene forma de pagina de la web, null. */
export function limpiarRuta(ruta: unknown): string | null {
  if (typeof ruta !== 'string' || ruta.length > 200) return null;
  const r = ruta.toLowerCase().replace(/\/+$/, '');
  return RUTA.test(r) ? r : null;
}

/** Solo el dominio, sin «www.». De la propia web o sin origen, null. */
export function dominioDe(referente: unknown): string | null {
  if (typeof referente !== 'string' || !referente) return null;
  let host: string;
  try {
    host = new URL(referente).hostname.toLowerCase();
  } catch {
    return null;
  }
  host = host.replace(/^www\./, '');
  if (!/^[a-z0-9.-]{1,100}$/.test(host)) return null;
  if (PROPIOS.some((p) => host === p || host.endsWith(`.${p}`))) return null;
  return host;
}

export function esPropio(referente: unknown): boolean {
  if (typeof referente !== 'string' || !referente) return false;
  try {
    const host = new URL(referente).hostname.toLowerCase();
    return PROPIOS.some((p) => host === p || host.endsWith(`.${p}`));
  } catch {
    return false;
  }
}

/** La etiqueta de los enlaces (`?origen=bio`): solo letras, numeros y guiones, para que nadie cuele un nombre. */
export function limpiarOrigen(origen: unknown): string | null {
  if (typeof origen !== 'string') return null;
  const o = origen.trim().toLowerCase();
  return ORIGEN.test(o) ? o : null;
}

export function esRobot(agente: string | null): boolean {
  return ROBOT.test(agente ?? '');
}

export function dispositivoDe(agente: string | null): Dispositivo {
  const a = agente ?? '';
  if (/ipad|tablet|kindle|silk|playbook|(android(?!.*mobile))/i.test(a)) return 'tableta';
  if (/mobi|iphone|ipod|android|windows phone/i.test(a)) return 'movil';
  return 'escritorio';
}

export function paisDe(cabecera: string | null): string | null {
  const p = (cabecera ?? '').toUpperCase();
  return /^[A-Z]{2}$/.test(p) ? p : null;
}

/**
 * La fila que se guarda, o null si no se cuenta. Del cuerpo solo se leen `ruta`, `referente` (solo en la primera
 * pagina de quien llega) y `origen`; de la peticion, el pais y el navegador, que no se guardan.
 */
export function validarVisita(cuerpo: unknown, agente: string | null, pais: string | null): Visita | null {
  if (esRobot(agente)) return null;
  if (!cuerpo || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) return null;
  const c = cuerpo as Record<string, unknown>;
  const ruta = limpiarRuta(c.ruta);
  if (!ruta) return null;
  const primera = c.primera === true;
  const entrada = primera && !esPropio(c.referente);
  return {
    ruta,
    entrada,
    dominio: entrada ? dominioDe(c.referente) : null,
    origen: entrada ? limpiarOrigen(c.origen) : null,
    pais: paisDe(pais),
    dispositivo: dispositivoDe(agente),
  };
}

export async function guardarVisita(url: string, v: Visita): Promise<void> {
  const sql = neon(url);
  await sql`
    INSERT INTO visita (ruta, entrada, dominio, origen, pais, dispositivo)
    VALUES (${v.ruta}, ${v.entrada}, ${v.dominio}, ${v.origen}, ${v.pais}, ${v.dispositivo})`;
}
