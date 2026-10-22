import { describe, expect, test } from 'bun:test';
import { enlaceWhatsApp, leerEnlace } from './enlace';

describe('lo que la demo lee del enlace', () => {
  test('sin nada: vacia y contando', () => {
    expect(leerEnlace('')).toEqual({ empresa: '', sector: null, partes: [], doc2: false });
  });

  test('el enlace de un lead: empresa y sector', () => {
    expect(leerEnlace('?empresa=Prueba&sector=inm')).toEqual({ empresa: 'Prueba', sector: 'inm', partes: [], doc2: false });
  });

  test('el del documento 2: las partes de la reunion ya marcadas y sin contar', () => {
    expect(leerEnlace('?empresa=Instalaciones%20Costa&sector=inst&lleva=cli,tec&desde=doc2')).toEqual({
      empresa: 'Instalaciones Costa',
      sector: 'inst',
      partes: ['tec', 'cli'],
      doc2: true,
    });
  });

  test('lo que no existe se ignora', () => {
    const e = leerEnlace('?sector=xyz&lleva=tec,tec,%20mat%20,nada,__proto__&desde=doc1');
    expect(e.sector).toBeNull();
    expect(e.partes).toEqual(['tec', 'mat']);
    expect(e.doc2).toBe(false);
  });

  test('una empresa enorme se recorta', () => {
    expect(leerEnlace(`?empresa=${'x'.repeat(500)}`).empresa.length).toBe(80);
  });
});

describe('WhatsApp a Ruben', () => {
  const con = 'Hola Rubén, he visto la demo que me preparaste para {empresa}.';
  const sin = 'Hola Rubén, he visto la demo que me preparaste.';

  test('con el nombre de la empresa en el mensaje', () => {
    const u = new URL(enlaceWhatsApp(con, sin, 'Cal Pep & Fills'));
    expect(u.origin + u.pathname).toBe('https://wa.me/34653232735');
    expect(u.searchParams.get('text')).toBe('Hola Rubén, he visto la demo que me preparaste para Cal Pep & Fills.');
  });

  test('sin empresa, el mensaje sin nombre', () => {
    expect(new URL(enlaceWhatsApp(con, sin, '  ')).searchParams.get('text')).toBe(sin);
  });
});
