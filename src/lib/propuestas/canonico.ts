// JSON canonico, hash y capacidad de las propuestas (ADR-091, hito 6.3).
//
// El hash de una oferta es el SHA-256 de su JSON canonico: claves ordenadas, sin espacios, y solo valores que
// sobreviven sin cambios a un viaje por `jsonb` de Postgres. Por eso no se admiten numeros con decimales (los
// importes van en centimos), ni `undefined`, ni cadenas sin normalizar a NFC (la misma tilde escrita de dos
// formas daria dos hashes distintos para el mismo texto).
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export type ValorCanonico =
  | null
  | boolean
  | number
  | string
  | ValorCanonico[]
  | { [clave: string]: ValorCanonico };

function comprobarCadena(s: string, ruta: string): void {
  if (s.normalize('NFC') !== s) throw new Error(`${ruta}: la cadena no esta en NFC`);
  if (s.includes('\u0000')) throw new Error(`${ruta}: la cadena lleva un caracter nulo`);
}

function serializar(valor: unknown, ruta: string): string {
  if (valor === null) return 'null';
  switch (typeof valor) {
    case 'boolean':
      return valor ? 'true' : 'false';
    case 'number':
      if (!Number.isSafeInteger(valor)) {
        throw new Error(`${ruta}: solo se admiten enteros (importes en centimos), no ${valor}`);
      }
      return String(valor);
    case 'string':
      comprobarCadena(valor, ruta);
      return JSON.stringify(valor);
    case 'object': {
      if (Array.isArray(valor)) {
        return `[${valor.map((v, i) => serializar(v, `${ruta}[${i}]`)).join(',')}]`;
      }
      if (Object.getPrototypeOf(valor) !== Object.prototype) {
        throw new Error(`${ruta}: solo objetos planos`);
      }
      const claves = Object.keys(valor).sort();
      return `{${claves
        .map((k) => {
          comprobarCadena(k, `${ruta}.${k}`);
          return `${JSON.stringify(k)}:${serializar((valor as Record<string, unknown>)[k], `${ruta}.${k}`)}`;
        })
        .join(',')}}`;
    }
    default:
      throw new Error(`${ruta}: tipo no admitido (${typeof valor})`);
  }
}

/** El JSON canonico de un valor. Lanza si el valor no es representable sin ambiguedad. */
export function jsonCanonico(valor: unknown): string {
  return serializar(valor, '$');
}

export function sha256Hex(texto: string): string {
  return createHash('sha256').update(texto, 'utf8').digest('hex');
}

/** El `offer_hash`: SHA-256 del JSON canonico de la instantanea. */
export function hashOferta(instantanea: unknown): string {
  return sha256Hex(jsonCanonico(instantanea));
}

/** Capacidad del enlace del cliente: 32 bytes aleatorios (256 bits) en base64url. Va en el fragmento de la URL. */
export function nuevaCapacidad(): string {
  return randomBytes(32).toString('base64url');
}

/** Lo unico que se guarda de la capacidad. */
export function hashCapacidad(capacidad: string): string {
  return sha256Hex(capacidad);
}

const FORMA_CAPACIDAD = /^[A-Za-z0-9_-]{43}$/;

/** Compara una capacidad recibida con el hash guardado, en tiempo constante. */
export function capacidadValida(capacidad: string, hashGuardado: string): boolean {
  if (!FORMA_CAPACIDAD.test(capacidad) || !/^[0-9a-f]{64}$/.test(hashGuardado)) return false;
  return timingSafeEqual(Buffer.from(hashCapacidad(capacidad), 'hex'), Buffer.from(hashGuardado, 'hex'));
}
