import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { COLABORADORES } from '@/data/colaboradores';
import { RUBEN, calendlyDeParteDe, enlaceColaborador, vcardRuben, whatsappARuben, whatsappParaReenviar } from './enlaces';
import { textos } from './textos';

const RAIZ = join(import.meta.dir, '..', '..', '..');

describe('colaboradores', () => {
  test('cada uno tiene su foto en public/ y al menos un idioma', () => {
    for (const c of Object.values(COLABORADORES)) {
      expect(existsSync(join(RAIZ, 'public', c.foto))).toBe(true);
      expect(c.idiomas.length).toBeGreaterThan(0);
    }
  });

  test('Gis: catalan por defecto y castellano, colaboradora', () => {
    const g = COLABORADORES.gis;
    expect(g.idiomas).toEqual(['ca', 'es']);
    expect(textos('es', g).etiqueta).toBe('COLABORADORA DE TESELAR');
    expect(textos('ca', g).etiqueta).toBe('COL·LABORADORA DE TESELAR');
  });
});

describe('todo lleva a Ruben', () => {
  const g = COLABORADORES.gis;

  test('el contacto que se guarda es el de Ruben, con la nota de quien lo presento', () => {
    const v = vcardRuben(textos('es', g).nota_vcard);
    expect(v).toContain('FN:Rubén Reyes');
    expect(v).toContain(`TEL;TYPE=CELL:${RUBEN.telefono}`);
    expect(v).toContain('NOTE:Te lo presentó Gis');
    // Solo un telefono y un correo: los de Ruben.
    expect(v.match(/^TEL/gm)?.length).toBe(1);
    expect(v.match(/^EMAIL/gm)?.length).toBe(1);
    expect(v.startsWith('BEGIN:VCARD\r\n')).toBe(true);
  });

  test('la nota escapa lo que romperia la vCard', () => {
    expect(vcardRuben('Pep; Maria, i Joan')).toContain('NOTE:Pep\\; Maria\\, i Joan');
  });

  test('WhatsApp al numero de Ruben, con «de parte de»', () => {
    const u = new URL(whatsappARuben(textos('ca', g).whatsapp_texto));
    expect(u.pathname).toBe('/34653232735');
    expect(u.searchParams.get('text')).toBe('Hola Rubén, vinc de part de Gis.');
  });

  test('el Calendly marca la reserva en la pregunta 4, en su idioma', () => {
    expect(new URL(calendlyDeParteDe(textos('es', g).de_parte_de)).searchParams.get('a4')).toBe('De parte de Gis');
    expect(new URL(calendlyDeParteDe(textos('ca', g).de_parte_de)).searchParams.get('a4')).toBe('De part de Gis');
  });

  test('lo que reenvia el colaborador va sin numero y con su enlace', () => {
    const url = enlaceColaborador('es', 'gis');
    expect(url).toBe('https://www.teselarsoftware.com/es/c/gis');
    const u = new URL(whatsappParaReenviar(textos('es', g).reenviar_texto(url)));
    expect(u.pathname).toBe('/');
    expect(u.searchParams.get('text')).toContain(url);
  });
});
