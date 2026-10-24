import { describe, expect, test } from 'bun:test';
import { EJEMPLOS, PARTES, SECTORES, esSector, type EjemploSector } from './demo';

const IDIOMAS = ['es', 'ca', 'en'] as const;

// Todas las cadenas de un ejemplo, para comprobar que ninguna se ha quedado vacia.
function cadenas(valor: unknown): string[] {
  if (typeof valor === 'string') return [valor];
  if (Array.isArray(valor)) return valor.flatMap(cadenas);
  if (valor && typeof valor === 'object') return Object.values(valor).flatMap(cadenas);
  return [];
}

// La forma de un ejemplo: cuantas filas tiene cada parte. Una traduccion con una fila de menos no tiene la misma.
function forma(e: EjemploSector) {
  return {
    tecnicos: e.tec.tecnicos.map((t) => t.paradas.length),
    parte: e.tec.parte.filas.length,
    cli: e.cli.avisos.map((a) => a.urgente),
    fac: e.fac.filas.length,
    cit: e.cit.citas.length,
    mat: e.mat.filas.length,
  };
}

describe('ejemplos de la demo', () => {
  test('cada idioma tiene los ocho sectores y ninguno de mas', () => {
    for (const lng of IDIOMAS) expect(Object.keys(EJEMPLOS[lng]).sort()).toEqual([...SECTORES].sort());
  });

  test('cada sector tiene las cinco partes, y ninguna vacia', () => {
    for (const lng of IDIOMAS) {
      for (const s of SECTORES) {
        const e = EJEMPLOS[lng][s];
        for (const parte of PARTES) expect(e[parte]).toBeDefined();
        expect(e.tec.tecnicos.length).toBeGreaterThan(0);
        for (const tec of e.tec.tecnicos) expect(tec.paradas.length).toBeGreaterThan(0);
        expect(e.tec.parte.filas.length).toBeGreaterThan(0);
        expect(e.cli.avisos.length).toBeGreaterThan(0);
        expect(e.fac.filas.length).toBeGreaterThan(0);
        expect(e.cit.citas.length).toBeGreaterThan(0);
        expect(e.mat.filas.length).toBeGreaterThan(0);
      }
    }
  });

  test('ningun texto vacio', () => {
    for (const lng of IDIOMAS) {
      for (const s of SECTORES) {
        for (const c of cadenas(EJEMPLOS[lng][s])) expect(c.trim()).not.toBe('');
      }
    }
  });

  test('el catalan y el ingles tienen las mismas filas que el castellano', () => {
    for (const s of SECTORES) {
      expect(forma(EJEMPLOS.ca[s])).toEqual(forma(EJEMPLOS.es[s]));
      expect(forma(EJEMPLOS.en[s])).toEqual(forma(EJEMPLOS.es[s]));
    }
  });

  test('las horas tienen forma HH:MM', () => {
    for (const lng of IDIOMAS) {
      for (const s of SECTORES) {
        const e = EJEMPLOS[lng][s];
        const horas = [...e.tec.tecnicos.flatMap((t) => t.paradas), ...e.cit.citas].map((p) => p.hora);
        for (const h of horas) expect(h).toMatch(/^([01]\d|2[0-3]):[0-5]\d$/);
      }
    }
  });

  // Hasta el 24/10 mandaban los contratos de mantenimiento. Ruben, despues del ensayo: «Avisos y obras es el dia a
  // dia. Mantenimientos es lo programado». Las dos cosas, al mismo nivel.
  test('en instalaciones salen los avisos y los contratos de mantenimiento', () => {
    const inst = EJEMPLOS.es.inst;
    expect(inst.cli.titulo).toBe('Avisos y contratos');
    expect(inst.cli.avisos.some((a) => a.tipo.startsWith('Aviso'))).toBe(true);
    expect(inst.cli.avisos.some((a) => a.tipo.startsWith('Contrato'))).toBe(true);
    expect(inst.tec.parte.filas[0].etiqueta).toBe('Aviso');
  });

  // La opcion de clientes toma este titulo al elegir sector: donde no hay presupuestos, no puede decirlo (24/10).
  test('inmobiliaria, fisio y gestoria no hablan de presupuestos', () => {
    for (const lng of IDIOMAS) {
      for (const s of ['inm', 'sal', 'ges'] as const) {
        const e = EJEMPLOS[lng][s];
        expect(e.cli.titulo).not.toMatch(/presupuest|pressupost|quote/i);
        expect(e.explica?.cli?.ahorro ?? '').not.toMatch(/presupuest|pressupost|quote/i);
      }
    }
  });

  test('en el taller, cada coche va por su matricula', () => {
    for (const lng of IDIOMAS) {
      for (const a of EJEMPLOS[lng].tal.cli.avisos.filter((x) => !x.cliente.includes('Repartos'))) {
        expect(a.cliente).toMatch(/· \d{4} [A-Z]{3}$/);
      }
    }
  });

  test('el sector del enlace solo vale si existe', () => {
    expect(esSector('inm')).toBe(true);
    for (const malo of [null, undefined, '', 'INM', 'xyz', 'toString', '__proto__']) expect(esSector(malo)).toBe(false);
  });
});
