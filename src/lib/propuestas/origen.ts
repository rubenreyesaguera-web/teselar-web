// De donde se admiten las peticiones que llevan la capacidad (aceptar y apertura): lista exacta, sin comodines.

const ORIGENES = ['https://www.teselarsoftware.com', 'https://teselarsoftware.com'];

/** Lista exacta; PROPUESTAS_ORIGENES (separados por comas) solo para probar en local o en una vista previa. */
export function origenPermitido(origen: string | null): boolean {
  if (!origen || origen === 'null') return false;
  const extra = (process.env.PROPUESTAS_ORIGENES ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  return [...ORIGENES, ...extra].includes(origen);
}
