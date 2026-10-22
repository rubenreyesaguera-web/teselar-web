import { describe, expect, test } from 'bun:test';
import { CALENDLY_DIAGNOSTICO, enlaceCalendly } from './calendly';

describe('enlace al Calendly', () => {
  test('cada respuesta va en su pregunta: a2 empresa, a4 sector, a5 que lleva, a6 como', () => {
    const u = new URL(enlaceCalendly({ empresa: 'Instalaciones Costa', sector: 'Instalaciones', lleva: 'Técnicos, Facturas', como: 'Excel' }));
    expect(u.origin + u.pathname).toBe(CALENDLY_DIAGNOSTICO);
    expect(u.searchParams.get('a2')).toBe('Instalaciones Costa');
    expect(u.searchParams.get('a4')).toBe('Instalaciones');
    expect(u.searchParams.get('a5')).toBe('Técnicos, Facturas');
    expect(u.searchParams.get('a6')).toBe('Excel');
    // a1 (telefono) y a3 (preocupacion) las escribe el cliente en el Calendly.
    expect(u.searchParams.has('a1')).toBe(false);
    expect(u.searchParams.has('a3')).toBe(false);
  });

  test('los espacios van como %20, no como +', () => {
    const enlace = enlaceCalendly({ empresa: 'Cal Pep', sector: '', lleva: 'Clientes y presupuestos', como: '' });
    expect(enlace).toBe(`${CALENDLY_DIAGNOSTICO}?a2=Cal%20Pep&a5=Clientes%20y%20presupuestos`);
  });

  test('lo vacio no se manda', () => {
    const u = new URL(enlaceCalendly({ empresa: '  ', sector: '', lleva: '', como: '' }));
    expect([...u.searchParams.keys()]).toEqual([]);
  });

  test('caracteres raros viajan escapados y vuelven iguales', () => {
    const raro = 'Cal Pep & Fills = 100% <b>';
    const u = new URL(enlaceCalendly({ empresa: raro, sector: '', lleva: '', como: '' }));
    expect(u.searchParams.get('a2')).toBe(raro);
    expect(u.search).not.toContain('<');
  });

  test('textos enormes se recortan', () => {
    const u = new URL(enlaceCalendly({ empresa: 'x'.repeat(5000), sector: '', lleva: '', como: '' }));
    expect(u.searchParams.get('a2')!.length).toBe(200);
  });
});
