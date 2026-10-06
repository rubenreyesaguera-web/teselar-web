import { describe, expect, test } from 'bun:test';
import ejemplo from '../../../scripts/propuesta.ejemplo.json';
import { hashOferta } from './canonico';
import { construirInstantanea, hoyEnMadrid, sumarDias, validarContenido } from './instantanea';

const copia = (): Record<string, unknown> => structuredClone(ejemplo) as Record<string, unknown>;

describe('validarContenido', () => {
  test('el ejemplo sintético es válido', () => {
    expect(validarContenido(copia()).vigencia_dias).toBe(30);
  });

  test('una clave desconocida es un error, no se pierde en silencio', () => {
    expect(() => validarContenido({ ...copia(), garantía: 'x' })).toThrow('$.garantía: clave desconocida');
  });

  test('falta una sección', () => {
    const c = copia();
    delete c.exclusiones;
    expect(() => validarContenido(c)).toThrow('$.exclusiones: falta');
  });

  test('un importe con decimales no entra', () => {
    const c = copia() as typeof ejemplo;
    c.precio.conceptos[0].importe_centimos = 765.5;
    expect(() => validarContenido(c)).toThrow('$.precio.conceptos[0].importe_centimos');
  });

  test('los hitos de pago tienen que sumar la puesta en marcha', () => {
    const c = copia() as typeof ejemplo;
    c.pagos.hitos[3].importe_centimos = 20000;
    expect(() => validarContenido(c)).toThrow('suman 76000 centimos');
  });

  test('un texto vacío pide «Por confirmar» en vez de rellenar', () => {
    const c = copia() as typeof ejemplo;
    c.calendario[0].plazo = '  ';
    expect(() => validarContenido(c)).toThrow('Por confirmar');
  });

  test('los precios son siempre + IVA (ADR-088)', () => {
    const c = copia() as Record<string, unknown>;
    c.impuestos = { precios_mas_iva: false, nota: null };
    expect(() => validarContenido(c)).toThrow('ADR-088');
  });

  test('normaliza el texto a NFC, así que la instantánea siempre se puede firmar', () => {
    const c = copia() as typeof ejemplo;
    c.partes.cliente.nombre = 'Rubén';
    const v = validarContenido(c);
    expect(v.partes.cliente.nombre).toBe('Rubén');
    expect(() => hashOferta(construirInstantanea(v, { referencia: 'P-2026-001', version: 1, fecha: '2026-10-06' }))).not.toThrow();
  });
});

describe('construirInstantanea', () => {
  const contenido = validarContenido(copia());

  test('pone esquema, referencia, versión, fecha y vigencia', () => {
    const i = construirInstantanea(contenido, { referencia: 'P-2026-001', version: 1, fecha: '2026-10-06' });
    expect(i.schema_version).toBe(1);
    expect(i.vigencia).toEqual({ dias: 30, hasta: '2026-11-05' });
    expect('vigencia_dias' in i).toBe(false);
  });

  test('dos versiones de la misma propuesta dan dos hashes distintos', () => {
    const v1 = construirInstantanea(contenido, { referencia: 'P-2026-001', version: 1, fecha: '2026-10-06' });
    const v2 = construirInstantanea(contenido, { referencia: 'P-2026-001', version: 2, fecha: '2026-10-06' });
    expect(hashOferta(v1)).not.toBe(hashOferta(v2));
  });
});

describe('fechas', () => {
  test('sumarDias cruza meses y años', () => {
    expect(sumarDias('2026-12-15', 30)).toBe('2027-01-14');
    expect(sumarDias('2028-02-28', 1)).toBe('2028-02-29');
  });

  test('hoyEnMadrid usa la hora de Lloret, no la UTC', () => {
    expect(hoyEnMadrid(new Date('2026-10-06T22:30:00Z'))).toBe('2026-10-07');
    expect(hoyEnMadrid(new Date('2026-12-31T22:59:00Z'))).toBe('2026-12-31');
  });
});
