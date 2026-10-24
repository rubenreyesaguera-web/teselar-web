import { describe, expect, test } from 'bun:test';
import { dictionaries } from '../../i18n/dictionaries';
import { EJEMPLOS, ORDEN_INICIAL, ORDEN_PARTES, PARTES, SECTORES } from '../../data/demo';

// Las seis cajas del panel (la ruta y el parte son dos) llevan «Como funciona» y «Te ahorras» en los tres idiomas.
const CAJAS = ['tec', 'parte', 'cli', 'fac', 'cit', 'mat'] as const;

describe('explicaciones de la demo', () => {
  for (const lng of ['es', 'ca', 'en'] as const) {
    test(`${lng}: cada caja dice como funciona y que ahorra`, () => {
      const d = dictionaries[lng].demo;
      expect(d.como_label.trim()).not.toBe('');
      expect(d.ahorro_label.trim()).not.toBe('');
      expect(Object.keys(d.explica).sort()).toEqual([...CAJAS].sort());
      for (const c of CAJAS) {
        expect(d.explica[c].como.trim()).not.toBe('');
        expect(d.explica[c].ahorro.trim()).not.toBe('');
      }
    });

    // Sin cifras de ahorro: no hay nada medido que las respalde (ADR-025).
    test(`${lng}: sin cifras inventadas`, () => {
      const textos = Object.values(dictionaries[lng].demo.explica).flatMap((e) => [e.como, e.ahorro]);
      for (const t of textos) expect(t).not.toMatch(/\d|%|€/);
    });
  }
});

// Los textos propios de un sector (24/10) siguen las mismas reglas que los comunes.
describe('explicaciones propias de cada sector', () => {
  for (const lng of ['es', 'ca', 'en'] as const) {
    test(`${lng}: solo cajas que existen, sin textos vacios y sin cifras`, () => {
      for (const s of SECTORES) {
        for (const [caja, e] of Object.entries(EJEMPLOS[lng][s].explica ?? {})) {
          expect([...CAJAS] as string[]).toContain(caja);
          for (const t of [e?.como, e?.ahorro].filter((x) => x !== undefined)) {
            expect(t!.trim()).not.toBe('');
            expect(t).not.toMatch(/\d|%|€/);
          }
        }
      }
    });
  }

  test('los tres idiomas cambian los mismos textos en los mismos sectores', () => {
    const forma = (lng: 'es' | 'ca' | 'en') =>
      SECTORES.map((s) => Object.entries(EJEMPLOS[lng][s].explica ?? {}).map(([c, e]) => `${s}.${c}:${Object.keys(e!).sort()}`).sort().join('|'));
    expect(forma('ca')).toEqual(forma('es'));
    expect(forma('en')).toEqual(forma('es'));
  });
});

// Opcion B (24/10): todos los sectores menos «Otro» llevan sus seis cajas completas, en los tres idiomas.
describe('cada sector con sus textos', () => {
  for (const lng of ['es', 'ca', 'en'] as const) {
    test(`${lng}: seis cajas con «como» y «ahorro» en cada sector`, () => {
      for (const s of SECTORES.filter((x) => x !== 'otr')) {
        const e = EJEMPLOS[lng][s].explica;
        for (const c of CAJAS) {
          expect(e?.[c]?.como?.trim()).toBeTruthy();
          expect(e?.[c]?.ahorro?.trim()).toBeTruthy();
        }
      }
    });
  }
});

describe('orden de «¿Que llevas?»', () => {
  test('cada sector, y el inicial, tienen las cinco partes sin repetir', () => {
    for (const orden of [ORDEN_INICIAL, ...SECTORES.map((s) => ORDEN_PARTES[s])]) {
      expect([...orden].sort()).toEqual([...PARTES].sort());
    }
  });

  test('sin sector no empieza por «Tecnicos»', () => {
    expect(ORDEN_INICIAL[0]).not.toBe('tec');
  });
});

// «Lo que mas me preguntan» (24/10): la respuesta de los datos lleva `id`, porque en fisio y gestoria se le anade el
// contrato de proteccion de datos.
describe('preguntas frecuentes de la demo', () => {
  for (const lng of ['es', 'ca', 'en'] as const) {
    test(`${lng}: cuatro preguntas, la de los datos marcada y el contrato escrito`, () => {
      const d = dictionaries[lng].demo;
      expect(d.faq.length).toBe(4);
      expect(d.faq.filter((f) => 'id' in f && f.id === 'datos').length).toBe(1);
      expect(d.faq.filter((f) => 'id' in f && f.id === 'whatsapp').length).toBe(1);
      expect(d.faq_contrato.trim()).not.toBe('');
    });
  }
});
