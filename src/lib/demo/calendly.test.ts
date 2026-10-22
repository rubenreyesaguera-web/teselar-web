import { describe, expect, test } from 'bun:test';
import { CALENDLY_DIAGNOSTICO, contextoDemo, enlaceCalendly } from './calendly';

const ES = { sector: 'Sector', lleva: 'Llevo', como: 'Hoy' };

describe('enlace al Calendly', () => {
  test('a2 la empresa y a4 lo que ya me ha contado; nada mas', () => {
    const u = new URL(enlaceCalendly('Instalaciones Costa', 'Sector: Instalaciones · Llevo: Técnicos · Hoy: Excel'));
    expect(u.origin + u.pathname).toBe(CALENDLY_DIAGNOSTICO);
    expect(u.searchParams.get('a2')).toBe('Instalaciones Costa');
    expect(u.searchParams.get('a4')).toBe('Sector: Instalaciones · Llevo: Técnicos · Hoy: Excel');
    // a1 (telefono) y a3 (preocupacion) las escribe el cliente; a5 y a6 ya no existen.
    expect([...u.searchParams.keys()]).toEqual(['a2', 'a4']);
  });

  test('los espacios van como %20, no como +', () => {
    expect(enlaceCalendly('Cal Pep', '')).toBe(`${CALENDLY_DIAGNOSTICO}?a2=Cal%20Pep`);
  });

  test('lo vacio no se manda', () => {
    expect(enlaceCalendly('  ', '')).toBe(CALENDLY_DIAGNOSTICO);
  });

  test('caracteres raros viajan escapados y vuelven iguales', () => {
    const raro = 'Cal Pep & Fills = 100% <b>';
    const u = new URL(enlaceCalendly(raro, ''));
    expect(u.searchParams.get('a2')).toBe(raro);
    expect(u.search).not.toContain('<');
  });

  test('textos enormes se recortan', () => {
    expect(new URL(enlaceCalendly('x'.repeat(5000), '')).searchParams.get('a2')!.length).toBe(400);
  });
});

describe('la linea de la demo', () => {
  test('todo contestado', () => {
    expect(contextoDemo({ sector: 'Instalaciones', lleva: 'Técnicos, Facturas', como: 'WhatsApp y memoria' }, ES)).toBe(
      'Sector: Instalaciones · Llevo: Técnicos, Facturas · Hoy: WhatsApp y memoria',
    );
  });

  test('solo lo contestado', () => {
    expect(contextoDemo({ sector: '', lleva: 'Citas o agenda', como: '' }, ES)).toBe('Llevo: Citas o agenda');
    expect(contextoDemo({ sector: '', lleva: '', como: '' }, ES)).toBe('');
  });

  test('con las cinco partes y Otro escrito cabe de sobra', () => {
    const largo = contextoDemo(
      {
        sector: 'Otro: jardinería, piscinas y mantenimiento de comunidades',
        lleva: 'Técnicos que salen a trabajar, Clientes y presupuestos, Facturas y cobros, Citas o agenda, Material o almacén',
        como: 'Un programa que no me convence',
      },
      ES,
    );
    expect(largo.length).toBeLessThan(400);
    expect(new URL(enlaceCalendly('X', largo)).searchParams.get('a4')).toBe(largo);
  });
});
