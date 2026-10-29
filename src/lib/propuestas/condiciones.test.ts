import { describe, expect, test } from 'bun:test';
import ejemplo from '../../../scripts/propuesta.ejemplo.json';
import { CONDICIONES, huellaCondiciones, LENGUAS } from './condiciones';
import { TEXTOS } from './textos';
import { validarDatos } from './aceptar';
import { hashOferta } from './canonico';
import { construirInstantanea, validarContenido } from './instantanea';

describe('condiciones generales (ADR-117)', () => {
  test('castellano y catalán son el mismo texto en estructura: 15 cláusulas con los mismos puntos y el anexo de 10', () => {
    const [es, ca] = LENGUAS.map((l) => CONDICIONES.texto[l]);
    expect(es.clausulas).toHaveLength(15);
    expect(ca.clausulas).toHaveLength(15);
    expect(ca.clausulas.map((c) => c.puntos.length)).toEqual(es.clausulas.map((c) => c.puntos.length));
    expect(es.anexo.puntos).toHaveLength(10);
    expect(ca.anexo.puntos).toHaveLength(10);
  });

  test('sin marcas de borrador, sin IA nombrada (ADR-115) y en NFC', () => {
    for (const l of LENGUAS) {
      const todo = JSON.stringify(CONDICIONES.texto[l]);
      expect(todo).not.toMatch(/🟣|\[…\]|Rubén, 29\/10|\bIA\b|inteligencia artificial|intel·ligència artificial|Claude/);
      expect(todo.normalize('NFC')).toBe(todo);
    }
  });

  test('la huella cambia con la lengua y con cualquier letra del texto', () => {
    expect(huellaCondiciones('es')).toMatch(/^[0-9a-f]{64}$/);
    expect(huellaCondiciones('es')).not.toBe(huellaCondiciones('ca'));
    const otra = structuredClone(CONDICIONES);
    otra.texto.es.clausulas[3].puntos[0] += '.';
    expect(huellaCondiciones('es', otra)).not.toBe(huellaCondiciones('es'));
  });

  test('el texto del formulario ya no dice «no es una firma electrónica» (ADR-117, J9)', () => {
    for (const l of LENGUAS) expect(TEXTOS[l].avisoLegal('X').join('')).not.toMatch(/firma electr|signatura electr/i);
  });
});

describe('aceptar exige las condiciones', () => {
  const base = {
    referencia: 'P-2026-001', version: 1, offer_hash: 'a'.repeat(64), tipo: 'autonomo', nombre: 'Persona de Prueba',
    dni: '12345678Z', correo: 'prueba@example.com', domicilio: 'Carrer de Prova 1, 17310 Lloret de Mar',
    casilla_leido: true, casilla_autoridad: true, casilla_condiciones: true, condiciones_version: CONDICIONES.version,
    idempotency_key: 'x'.repeat(32),
  };

  test('con todo, pasa; sin la casilla de condiciones o sin su versión, no', () => {
    expect(typeof validarDatos(base)).toBe('object');
    expect(validarDatos({ ...base, casilla_condiciones: false })).toBe('Marca las tres casillas para aceptar');
    expect(validarDatos({ ...base, casilla_condiciones: undefined })).toBe('Marca las tres casillas para aceptar');
    expect(typeof validarDatos({ ...base, condiciones_version: undefined })).toBe('string');
  });

  test('los fallos salen en la lengua de la propuesta; una lengua rara es castellano', () => {
    expect(validarDatos({ ...base, lengua: 'ca', casilla_condiciones: false })).toBe('Marca les tres caselles per acceptar');
    expect(validarDatos({ ...base, lengua: 'ca', dni: '12345678A' })).toBe('Revisa el DNI o NIE: la lletra no quadra amb el número');
    expect((validarDatos({ ...base, lengua: 'fr' }) as { lengua: string }).lengua).toBe('es');
  });
});

describe('idioma de la propuesta', () => {
  test('sin idioma, la instantánea y su hash no cambian (las de antes siguen valiendo)', () => {
    const c = validarContenido(structuredClone(ejemplo));
    expect('idioma' in c).toBe(false);
    const i = construirInstantanea(c, { referencia: 'P-2026-001', version: 1, fecha: '2026-10-06' });
    expect('idioma' in i).toBe(false);
    expect(hashOferta(i)).toBe(hashOferta(construirInstantanea(validarContenido(structuredClone(ejemplo)), { referencia: 'P-2026-001', version: 1, fecha: '2026-10-06' })));
  });

  test("solo 'es' o 'ca'", () => {
    expect(validarContenido({ ...structuredClone(ejemplo), idioma: 'ca' }).idioma).toBe('ca');
    expect(() => validarContenido({ ...structuredClone(ejemplo), idioma: 'en' })).toThrow('$.idioma');
  });
});
