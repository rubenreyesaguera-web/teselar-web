// Entrada al panel privado (decision 1 del «1 a 1» del 30/10): una contrasena, cifrada en Vercel, sesion de 30 dias y
// 5 fallos seguidos bloquean 15 minutos.
//
// Dos variables de entorno, las dos Secret en Vercel:
//   PANEL_CLAVE_HASH  la contrasena cifrada con scrypt; la genera Ruben en su terminal con `bun scripts/panel.ts clave`
//                     y la contrasena en claro no sale nunca de su maquina.
//   PANEL_SECRETO     al menos 32 caracteres aleatorios para firmar la cookie; cambiarlo cierra todas las sesiones.
//
// La cookie solo lleva hasta cuando vale y su firma: ni la contrasena ni nada de quien entra.
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const COOKIE = 'teselar_panel';
export const DURACION_MS = 30 * 24 * 60 * 60 * 1000;
export const MAX_FALLOS = 5;
export const BLOQUEO_MS = 15 * 60 * 1000;

// N = 2^15: unos 32 MB y menos de 100 ms por intento en Vercel; bastante para una sola contrasena larga.
const N = 32768;
const R = 8;
const P = 1;
const MAXMEM = 64 * 1024 * 1024;

/**
 * `scrypt:N:r:p:sal:hash`, con sal y hash en base64url. Con «:» y no «$», que el shell expande al cargar la variable
 * (`. fichero.env` dejaba la contrasena buena sin entrar; visto en la prueba en local del 30/10).
 */
export function cifrarClave(clave: string): string {
  if (clave.length < 16) throw new Error('La contraseña tiene que tener al menos 16 caracteres');
  const sal = randomBytes(16);
  const hash = scryptSync(clave.normalize('NFC'), sal, 32, { N, r: R, p: P, maxmem: MAXMEM });
  return `scrypt:${N}:${R}:${P}:${sal.toString('base64url')}:${hash.toString('base64url')}`;
}

/** Compara en tiempo constante. Un hash mal formado no deja entrar a nadie. */
export function claveValida(clave: string, cifrada: string): boolean {
  const partes = cifrada.trim().split(':');
  if (partes.length !== 6 || partes[0] !== 'scrypt') return false;
  const [n, r, p] = partes.slice(1, 4).map(Number);
  if (![n, r, p].every((x) => Number.isSafeInteger(x) && x > 0)) return false;
  const sal = Buffer.from(partes[4], 'base64url');
  const esperado = Buffer.from(partes[5], 'base64url');
  if (sal.length < 16 || esperado.length < 32) return false;
  const hash = scryptSync(clave.normalize('NFC'), sal, esperado.length, { N: n, r, p, maxmem: MAXMEM });
  return timingSafeEqual(hash, esperado);
}

function firma(secreto: string, texto: string): string {
  return createHmac('sha256', secreto).update(texto).digest('base64url');
}

function comprobarSecreto(secreto: string | undefined): string {
  if (!secreto || secreto.length < 32) throw new Error('Falta PANEL_SECRETO (al menos 32 caracteres)');
  return secreto;
}

/** El valor de la cookie: `v1.<vence en ms>.<firma>`. */
export function nuevaSesion(secreto: string | undefined, ahora = Date.now()): { valor: string; vence: Date } {
  const s = comprobarSecreto(secreto);
  const vence = ahora + DURACION_MS;
  const cuerpo = `v1.${vence}`;
  return { valor: `${cuerpo}.${firma(s, cuerpo)}`, vence: new Date(vence) };
}

/** Si la cookie es buena y no ha vencido. Sin secreto configurado, nadie tiene sesion. */
export function sesionValida(valor: string | undefined, secreto: string | undefined, ahora = Date.now()): boolean {
  if (!valor || !secreto || secreto.length < 32) return false;
  const m = /^(v1\.(\d{13}))\.([A-Za-z0-9_-]{43})$/.exec(valor);
  if (!m) return false;
  const esperada = Buffer.from(firma(secreto, m[1]));
  const recibida = Buffer.from(m[3]);
  if (esperada.length !== recibida.length || !timingSafeEqual(esperada, recibida)) return false;
  return Number(m[2]) > ahora;
}

export interface EstadoAcceso {
  fallos_seguidos: number;
  bloqueado_hasta: Date | null;
}

/** Lo que pasa tras un intento: los fallos que quedan apuntados y, si toca, hasta cuando se bloquea. */
export function tras(estado: EstadoAcceso, acierto: boolean, ahora = Date.now()): EstadoAcceso {
  if (acierto) return { fallos_seguidos: 0, bloqueado_hasta: null };
  const fallos = estado.fallos_seguidos + 1;
  if (fallos >= MAX_FALLOS) return { fallos_seguidos: 0, bloqueado_hasta: new Date(ahora + BLOQUEO_MS) };
  return { fallos_seguidos: fallos, bloqueado_hasta: null };
}

export function bloqueado(estado: EstadoAcceso, ahora = Date.now()): boolean {
  return estado.bloqueado_hasta !== null && estado.bloqueado_hasta.getTime() > ahora;
}
