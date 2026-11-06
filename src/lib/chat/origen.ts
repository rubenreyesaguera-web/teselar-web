// La etiqueta del enlace (`?origen=meta-tess`) viaja con el lead del chat a la columna «origen» de la hoja, para saber
// de qué campaña viene sin cruzar fechas (07_Pendientes, 13/11). Sin etiqueta, o si no es válida, sigue siendo `tess`.
import { limpiarOrigen } from '@/lib/estadisticas/visita';

export function origenDelLead(origen: unknown): string {
  const o = limpiarOrigen(origen);
  return o ? `tess · ${o}` : 'tess';
}
