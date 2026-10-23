import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validarEvento } from './evento';

const RAIZ = join(import.meta.dir, '..', '..', '..');
const bueno = { paso: 'panel', lng: 'es', sector: 'inst', partes: ['cli', 'tec'], como: ['whatsapp', 'excel'], desdeEnlace: true };

describe('contador de la demo: lo que entra', () => {
  test('un evento bueno', () => {
    expect(validarEvento(bueno)).toEqual({ paso: 'panel', lng: 'es', sector: 'inst', partes: ['tec', 'cli'], como: ['excel', 'whatsapp'], desdeEnlace: true });
  });

  test('lo minimo: abrir sin nada marcado', () => {
    expect(validarEvento({ paso: 'abrir', lng: 'ca' })).toEqual({ paso: 'abrir', lng: 'ca', sector: null, partes: [], como: [], desdeEnlace: false });
  });

  test('la pagina de antes del 24/10 mandaba una sola respuesta en «como»: se guarda como lista', () => {
    expect(validarEvento({ ...bueno, como: 'papel' })?.como).toEqual(['papel']);
  });

  test('nunca guarda la empresa, el texto de Otro, la IP ni nada fuera de la lista', () => {
    const r = validarEvento({ ...bueno, empresa: 'Instalaciones Costa', otro: 'jardineria', ip: '1.2.3.4', email: 'a@b.c', nombre: 'Pep' });
    expect(r).not.toBeNull();
    expect(Object.keys(r!).sort()).toEqual(['como', 'desdeEnlace', 'lng', 'partes', 'paso', 'sector']);
    expect(JSON.stringify(r)).not.toMatch(/Costa|jardineria|1\.2\.3\.4|a@b\.c|Pep/);
  });

  test('rechaza lo que no esta en la lista', () => {
    const malos: unknown[] = [
      null, 'texto', [], 42,
      { ...bueno, paso: 'comprar' },
      { ...bueno, lng: 'fr' },
      { ...bueno, sector: 'Instalaciones Costa' },
      { ...bueno, sector: 'toString' },
      { ...bueno, como: 'fax' },
      { ...bueno, como: ['whatsapp', 'fax'] },
      { ...bueno, como: ['papel', 'papel', 'papel', 'papel', 'papel'] },
      { ...bueno, como: { a: 'papel' } },
      { ...bueno, partes: 'tec' },
      { ...bueno, partes: ['tec', 'Instalaciones Costa'] },
      { ...bueno, partes: ['tec', 'tec', 'tec', 'tec', 'tec', 'tec'] },
      { ...bueno, desdeEnlace: 'si' },
    ];
    for (const m of malos) expect(validarEvento(m)).toBeNull();
  });
});

describe('contador de la demo: donde se guarda', () => {
  const sql = readFileSync(join(RAIZ, 'db', 'demo.sql'), 'utf8');
  const columnas = [...sql.matchAll(/^\s{2}([a-z_]+)\s+(?:bigint|timestamptz|text|text\[\]|boolean)\b/gm)].map((m) => m[1]);

  test('la tabla solo tiene las columnas del contador', () => {
    expect(columnas).toEqual(['id', 'creado', 'paso', 'lng', 'sector', 'partes', 'como', 'desde_enlace']);
  });

  test('la ruta no lee la IP ni cookies', () => {
    const ruta = readFileSync(join(RAIZ, 'src', 'app', 'api', 'demo', 'evento', 'route.ts'), 'utf8');
    expect(ruta).not.toMatch(/x-forwarded-for|x-real-ip|req\.ip|cookies\(|\.cookies/i);
  });
});
