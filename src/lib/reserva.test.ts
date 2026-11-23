import { describe, expect, test } from 'bun:test';
import { contextoDemo, RESERVA_DIAGNOSTICO, reservaColaborador, reservaDemo } from './reserva';
import { COLABORADORES } from '../data/colaboradores';

const ES = { empresa: 'Empresa', sector: 'Sector', lleva: 'Llevo', como: 'Hoy' };

describe('reserva del diagnóstico', () => {
  test('va a la página de reservas propia, sin idioma y con origen web', () => {
    const u = new URL(RESERVA_DIAGNOSTICO);
    expect(u.host).toBe('reservas.teselarsoftware.com');
    expect(u.pathname).toBe('/teselarsoftware');
    expect(u.searchParams.get('o')).toBe('web');
  });

  test('la tarjeta de un colaborador lleva su marca c-<slug> (D132)', () => {
    const u = new URL(reservaColaborador('gis'));
    expect(u.pathname).toBe('/teselarsoftware');
    expect(u.searchParams.get('o')).toBe('c-gis');
    expect(u.searchParams.has('d')).toBe(false);
  });

  test('todos los colaboradores de la web tienen un slug que citas acepta', () => {
    for (const slug of Object.keys(COLABORADORES)) expect(() => reservaColaborador(slug)).not.toThrow();
  });

  test('un slug que citas no aceptaría falla al construir, no en la reserva', () => {
    expect(() => reservaColaborador('Gis')).toThrow();
    expect(() => reservaColaborador('a'.repeat(31))).toThrow();
  });

  test('la demo manda su línea en d= y sigue contando como web (D133)', () => {
    const linea = contextoDemo({ empresa: 'Peluquería Ana', sector: 'Peluquería', lleva: 'Citas, Facturas', como: 'WhatsApp, Excel' }, ES);
    expect(linea).toBe('Empresa: Peluquería Ana · Sector: Peluquería · Llevo: Citas, Facturas · Hoy: WhatsApp, Excel');
    const u = new URL(reservaDemo(linea));
    expect(u.searchParams.get('o')).toBe('web');
    expect(u.searchParams.get('d')).toBe(linea);
  });

  test('solo lo contestado, y sin d= si no ha contestado nada', () => {
    expect(contextoDemo({ empresa: '', sector: 'Otro: tienda  de\nbicis', lleva: '', como: ' ' }, ES)).toBe('Sector: Otro: tienda de bicis');
    expect(reservaDemo(contextoDemo({ empresa: '  ', sector: '', lleva: '', como: '' }, ES))).toBe(RESERVA_DIAGNOSTICO);
  });

  test('la empresa, aunque sea larga, cabe entera en los 250 que guarda citas', () => {
    const empresa = 'E'.repeat(80); // MAXIMO_EMPRESA de la demo
    const linea = contextoDemo({ empresa, sector: 'S'.repeat(100), lleva: 'L'.repeat(100), como: 'C'.repeat(100) }, ES);
    expect(linea.slice(0, 250)).toContain(`Empresa: ${empresa}`);
  });

  test('caracteres que romperían el enlace llegan intactos', () => {
    const linea = 'Sector: Otro: R&D #1 + 50% ?o=c-falso';
    expect(new URL(reservaDemo(linea)).searchParams.get('d')).toBe(linea);
    expect(new URL(reservaDemo(linea)).searchParams.get('o')).toBe('web');
  });
});
