import { describe, expect, test } from 'bun:test';
import { reservasColaboradores } from './datos';
import { textoReservas } from './resumen';

const respuesta = (status: number, cuerpo?: unknown) =>
  (async () => new Response(cuerpo === undefined ? null : JSON.stringify(cuerpo), { status })) as unknown as typeof fetch;

describe('cifra «Reservas» de un colaborador (D132)', () => {
  test('pide a citas con el secreto y sin caché, y devuelve lo que cuenta', async () => {
    let visto: { url: string; init?: RequestInit } | null = null;
    const pedir = (async (url: string, init?: RequestInit) => {
      visto = { url, init };
      return new Response(JSON.stringify({ gis: { reservas: 2, anuladas: 1 } }), { status: 200 });
    }) as unknown as typeof fetch;
    expect(await reservasColaboradores('s3creto', pedir)).toEqual({ gis: { reservas: 2, anuladas: 1 } });
    const v = visto as unknown as { url: string; init: RequestInit };
    expect(v.url).toBe('https://reservas.teselarsoftware.com/api/colaboradores?negocio=teselarsoftware');
    expect((v.init.headers as Record<string, string>).authorization).toBe('Bearer s3creto');
    expect(v.init.cache).toBe('no-store');
  });

  test('sin secreto, con 401, 503, red caída o respuesta rara: null, nunca un 0', async () => {
    expect(await reservasColaboradores('', respuesta(200, {}))).toBeNull();
    expect(await reservasColaboradores('x', respuesta(401))).toBeNull();
    expect(await reservasColaboradores('x', respuesta(503))).toBeNull();
    expect(await reservasColaboradores('x', (async () => { throw new Error('red'); }) as unknown as typeof fetch)).toBeNull();
    expect(await reservasColaboradores('x', respuesta(200, [1]))).toBeNull();
    expect(await reservasColaboradores('x', respuesta(200, { gis: { reservas: '2' } }))).toBeNull();
  });

  test('cómo sale en la tarjeta', () => {
    const d = { gis: { reservas: 2, anuladas: 1 }, ana: { reservas: 5, anuladas: 2 }, eva: { reservas: 3, anuladas: 0 } };
    expect(textoReservas(d, 'gis')).toEqual({ cifra: '2', anuladas: '1 anulada' });
    expect(textoReservas(d, 'ana')).toEqual({ cifra: '5', anuladas: '2 anuladas' });
    expect(textoReservas(d, 'eva')).toEqual({ cifra: '3', anuladas: null });
    expect(textoReservas(d, 'nadie')).toEqual({ cifra: '0', anuladas: null });
    expect(textoReservas(null, 'gis')).toEqual({ cifra: '—', anuladas: null });
    expect(textoReservas(d, null)).toEqual({ cifra: '—', anuladas: null });
  });
});
