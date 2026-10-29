// Las condiciones generales que se aceptan junto con cada propuesta (ADR-117; doc 33 de la boveda, version limpia
// cerrada con Ruben el 29/10). Sin ellas, la aceptacion solo cubre la propuesta: la Ley 7/1998 (art. 5.1) exige
// ensenarlas antes y dar un ejemplar, y la Ley 1/1998 de politica linguistica (art. 15.3) las quiere en castellano y en
// catalan, en ejemplares separados.
//
// El texto vive en `src/data/condiciones-v<n>.json` y NO se edita: un cambio es una version nueva (otro fichero y
// otro numero aqui), porque cada aceptacion guarda la version y la huella del texto que se le enseno al cliente.
import V1 from '@/data/condiciones-v1.json';
import { jsonCanonico, sha256Hex } from './canonico';

export type Lengua = 'es' | 'ca';
export const LENGUAS: readonly Lengua[] = ['es', 'ca'];

export interface Clausula {
  titulo: string;
  puntos: string[];
}

export interface TextoCondiciones {
  titulo: string;
  intro: string[];
  clausulas: Clausula[];
  anexo: Clausula;
}

export interface Condiciones {
  version: number;
  /** Dia desde el que se aplican, `AAAA-MM-DD`. */
  enVigor: string;
  texto: Record<Lengua, TextoCondiciones>;
}

export const CONDICIONES: Condiciones = {
  version: 1,
  enVigor: '2026-10-30',
  texto: V1 as Record<Lengua, TextoCondiciones>,
};

/** La huella del texto de una lengua: lo que se guarda con la aceptacion para saber que se enseno exactamente. */
export function huellaCondiciones(lengua: Lengua, c: Condiciones = CONDICIONES): string {
  return sha256Hex(jsonCanonico({ version: c.version, enVigor: c.enVigor, lengua, texto: c.texto[lengua] }));
}

/** La ruta publica de las condiciones en esa lengua. */
export function rutaCondiciones(lengua: Lengua): string {
  return `/${lengua}/legal/condiciones`;
}
