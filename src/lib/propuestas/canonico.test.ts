import { describe, expect, test } from 'bun:test';
import { capacidadValida, hashCapacidad, hashOferta, jsonCanonico, nuevaCapacidad, sha256Hex } from './canonico';

describe('jsonCanonico', () => {
  test('el orden de las claves no cambia el resultado, a ninguna profundidad', () => {
    const a = { b: 1, a: { d: [1, { y: 2, x: 1 }], c: 'é' } };
    const b = { a: { c: 'é', d: [1, { x: 1, y: 2 }] }, b: 1 };
    expect(jsonCanonico(a)).toBe('{"a":{"c":"é","d":[1,{"x":1,"y":2}]},"b":1}');
    expect(jsonCanonico(b)).toBe(jsonCanonico(a));
  });

  test('el orden de las listas sí cuenta', () => {
    expect(jsonCanonico([1, 2])).not.toBe(jsonCanonico([2, 1]));
  });

  test('rechaza decimales: los importes van en céntimos', () => {
    expect(() => jsonCanonico({ precio: 700.5 })).toThrow('$.precio');
    expect(() => jsonCanonico({ n: Number.NaN })).toThrow();
    expect(() => jsonCanonico({ n: 2 ** 53 })).toThrow();
  });

  test('rechaza lo que no es JSON sin ambigüedad', () => {
    expect(() => jsonCanonico({ a: undefined })).toThrow('$.a');
    expect(() => jsonCanonico({ f: new Date() })).toThrow('objetos planos');
    expect(() => jsonCanonico({ s: 'a\u0000b' })).toThrow('nulo');
  });

  test('rechaza texto sin normalizar a NFC (la misma tilde, dos hashes)', () => {
    expect(() => jsonCanonico({ s: 'é' })).toThrow('NFC');
    expect(() => jsonCanonico({ ['é']: 1 })).toThrow('NFC');
  });
});

describe('hashes', () => {
  test('SHA-256 de un vector conocido', () => {
    expect(sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });

  test('un cambio de un céntimo cambia el hash de la oferta', () => {
    expect(hashOferta({ importe_centimos: 70000 })).not.toBe(hashOferta({ importe_centimos: 70001 }));
    expect(hashOferta({ a: 1, b: 2 })).toBe(hashOferta({ b: 2, a: 1 }));
  });
});

describe('capacidad', () => {
  test('256 bits en base64url, distinta cada vez', () => {
    const c = nuevaCapacidad();
    expect(c).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(Buffer.from(c, 'base64url')).toHaveLength(32);
    expect(nuevaCapacidad()).not.toBe(c);
  });

  test('solo vale la capacidad cuyo hash está guardado', () => {
    const c = nuevaCapacidad();
    const guardado = hashCapacidad(c);
    expect(guardado).not.toContain(c);
    expect(capacidadValida(c, guardado)).toBe(true);
    expect(capacidadValida(nuevaCapacidad(), guardado)).toBe(false);
    expect(capacidadValida('', guardado)).toBe(false);
    expect(capacidadValida(guardado, guardado)).toBe(false);
    expect(capacidadValida(c, 'no-es-un-hash')).toBe(false);
  });
});
