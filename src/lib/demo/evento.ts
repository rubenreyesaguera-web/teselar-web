// Contador de la demo de gestion (decidido el 22/10, doc 31 fase 1): una fila por paso, sin datos personales.
//
// Lo que NO se guarda nunca: el nombre de la empresa, el texto de «Otro», la IP ni ninguna cookie. No basta con que el
// navegador no lo mande: validarEvento construye la fila solo con los campos de la lista, y la tabla (db/demo.sql) no
// tiene columnas donde meterlos.
import { neon } from '@neondatabase/serverless';
import { COMO, esComo, esParte, esSector, PARTES, type Como, type Parte, type Sector } from '@/data/demo';

export const PASOS = ['abrir', 'panel', 'reservar'] as const;
export type Paso = (typeof PASOS)[number];

const IDIOMAS = ['es', 'ca', 'en'] as const;

export interface EventoDemo {
  paso: Paso;
  lng: (typeof IDIOMAS)[number];
  sector: Sector | null;
  partes: Parte[];
  como: Como[];
  desdeEnlace: boolean;
}

/** La fila que se guarda, o null si algo no cuadra. Lo que no esta en la lista se ignora. */
export function validarEvento(entrada: unknown): EventoDemo | null {
  if (!entrada || typeof entrada !== 'object' || Array.isArray(entrada)) return null;
  const e = entrada as Record<string, unknown>;

  if (!(PASOS as readonly unknown[]).includes(e.paso)) return null;
  if (!(IDIOMAS as readonly unknown[]).includes(e.lng)) return null;
  if (e.sector != null && !esSector(e.sector)) return null;
  if (e.desdeEnlace != null && typeof e.desdeEnlace !== 'boolean') return null;

  const partes = e.partes ?? [];
  if (!Array.isArray(partes) || partes.length > PARTES.length || !partes.every(esParte)) return null;

  // Hasta el 24/10 «como» era una sola respuesta. Un navegador con la pagina vieja aun puede mandar el texto suelto.
  const como = e.como == null ? [] : typeof e.como === 'string' ? [e.como] : e.como;
  if (!Array.isArray(como) || como.length > COMO.length || !como.every(esComo)) return null;

  return {
    paso: e.paso as Paso,
    lng: e.lng as EventoDemo['lng'],
    sector: e.sector ?? null,
    // En el orden de PARTES y sin repetidas, para que el mismo marcado cuente siempre igual.
    partes: PARTES.filter((p) => partes.includes(p)),
    como: COMO.filter((c) => como.includes(c)),
    desdeEnlace: e.desdeEnlace === true,
  } as EventoDemo;
}

export async function guardarEvento(url: string, ev: EventoDemo): Promise<void> {
  const sql = neon(url);
  await sql`
    INSERT INTO demo_evento (paso, lng, sector, partes, como, desde_enlace)
    VALUES (${ev.paso}, ${ev.lng}, ${ev.sector}, ${ev.partes}, ${ev.como}, ${ev.desdeEnlace})
  `;
}
