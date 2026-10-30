// Fechas del panel, en hora de Lloret y cortas: es para leer de un vistazo en el movil.
import { hoyEnMadrid } from './resumen';

const CORTA = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', timeZone: 'Europe/Madrid' });
const CORTA_ANIO = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Madrid' });
const CON_HORA = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid',
});

/** Un instante o un dia (AAAA-MM-DD) → «30 oct»; con el año si no es el de hoy. */
export function dia(v: string, ahora = new Date()): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T12:00:00Z`) : new Date(v);
  return (d.getUTCFullYear() === ahora.getUTCFullYear() ? CORTA : CORTA_ANIO).format(d);
}

export function diaYHora(v: string): string {
  return CON_HORA.format(new Date(v));
}

/** Dias entre hoy y un dia (AAAA-MM-DD), en Lloret: negativo si ya paso. */
export function diasHasta(aaaammdd: string, ahora = new Date()): number {
  const hoy = Date.parse(`${hoyEnMadrid(ahora)}T00:00:00Z`);
  return Math.round((Date.parse(`${aaaammdd}T00:00:00Z`) - hoy) / 86_400_000);
}

/** «hoy», «mañana», «en 3 días», «ayer», «hace 4 días». */
export function relativo(aaaammdd: string, ahora = new Date()): string {
  const n = diasHasta(aaaammdd, ahora);
  if (n === 0) return 'hoy';
  if (n === 1) return 'mañana';
  if (n === -1) return 'ayer';
  return n > 0 ? `en ${n} días` : `hace ${-n} días`;
}
