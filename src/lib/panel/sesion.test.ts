import { describe, expect, test } from 'bun:test';
import { bloqueado, BLOQUEO_MS, cifrarClave, claveValida, DURACION_MS, MAX_FALLOS, nuevaSesion, sesionValida, tras } from './sesion';

const SECRETO = 'x'.repeat(40);

describe('contraseña', () => {
  const cifrada = cifrarClave('una contraseña larga de prueba');

  test('la buena entra y cualquier otra no', () => {
    expect(claveValida('una contraseña larga de prueba', cifrada)).toBe(true);
    expect(claveValida('una contraseña larga de prueb', cifrada)).toBe(false);
    expect(claveValida('', cifrada)).toBe(false);
  });

  test('no se guarda en claro y cada cifrado lleva su sal', () => {
    expect(cifrada).not.toContain('contraseña');
    expect(cifrada).toStartWith('scrypt:32768:8:1:');
    expect(cifrarClave('una contraseña larga de prueba')).not.toBe(cifrada);
  });

  test('sin «$»: el shell no la estropea al cargarla de un .env', () => {
    expect(cifrada).not.toContain('$');
  });

  test('las cortas no se aceptan al cifrar', () => {
    expect(() => cifrarClave('corta')).toThrow();
  });

  test('un hash mal formado no deja entrar a nadie', () => {
    for (const malo of ['', 'scrypt:', 'bcrypt:1:2:3:a:b', cifrada.slice(0, -10), cifrada.replace(':32768:', ':0:')]) {
      expect(claveValida('una contraseña larga de prueba', malo)).toBe(false);
    }
  });
});

describe('sesión', () => {
  test('vale 30 días y luego no', () => {
    const ahora = Date.UTC(2026, 9, 30);
    const { valor, vence } = nuevaSesion(SECRETO, ahora);
    expect(vence.getTime()).toBe(ahora + DURACION_MS);
    expect(sesionValida(valor, SECRETO, ahora + 1000)).toBe(true);
    expect(sesionValida(valor, SECRETO, ahora + DURACION_MS - 1)).toBe(true);
    expect(sesionValida(valor, SECRETO, ahora + DURACION_MS)).toBe(false);
  });

  test('una cookie tocada o firmada con otro secreto no vale', () => {
    const { valor } = nuevaSesion(SECRETO);
    const [v, vence, firma] = valor.split('.');
    expect(sesionValida(`${v}.${Number(vence) + 1000}.${firma}`, SECRETO)).toBe(false);
    expect(sesionValida(valor, 'y'.repeat(40))).toBe(false);
    expect(sesionValida(`${v}.${vence}.${'A'.repeat(43)}`, SECRETO)).toBe(false);
    expect(sesionValida('', SECRETO)).toBe(false);
    expect(sesionValida(undefined, SECRETO)).toBe(false);
  });

  test('sin secreto (o corto) nadie tiene sesión ni se puede crear', () => {
    const { valor } = nuevaSesion(SECRETO);
    expect(sesionValida(valor, undefined)).toBe(false);
    expect(sesionValida(valor, 'corto')).toBe(false);
    expect(() => nuevaSesion(undefined)).toThrow();
    expect(() => nuevaSesion('corto')).toThrow();
  });
});

describe('bloqueo', () => {
  test(`${MAX_FALLOS} fallos seguidos bloquean 15 minutos; un acierto pone a cero`, () => {
    const ahora = 1_000_000;
    let e = { fallos_seguidos: 0, bloqueado_hasta: null as Date | null };
    for (let i = 1; i < MAX_FALLOS; i++) {
      e = tras(e, false, ahora);
      expect(e.fallos_seguidos).toBe(i);
      expect(bloqueado(e, ahora)).toBe(false);
    }
    e = tras(e, false, ahora);
    expect(bloqueado(e, ahora)).toBe(true);
    expect(bloqueado(e, ahora + BLOQUEO_MS - 1)).toBe(true);
    expect(bloqueado(e, ahora + BLOQUEO_MS)).toBe(false);
    expect(tras({ fallos_seguidos: 3, bloqueado_hasta: null }, true)).toEqual({ fallos_seguidos: 0, bloqueado_hasta: null });
  });
});
