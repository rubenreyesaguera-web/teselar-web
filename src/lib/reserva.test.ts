import { describe, expect, test } from 'bun:test';
import { RESERVA_DIAGNOSTICO } from './reserva';

describe('reserva del diagnóstico', () => {
  test('va a la página de reservas propia, sin idioma y con origen web', () => {
    const u = new URL(RESERVA_DIAGNOSTICO);
    expect(u.host).toBe('reservas.teselarsoftware.com');
    expect(u.pathname).toBe('/teselarsoftware');
    expect(u.searchParams.get('o')).toBe('web');
  });
});
