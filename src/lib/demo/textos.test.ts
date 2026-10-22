import { describe, expect, test } from 'bun:test';
import { dictionaries } from '../../i18n/dictionaries';

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
