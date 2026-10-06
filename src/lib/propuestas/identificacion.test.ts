import { describe, expect, test } from 'bun:test';
import { dniValido, nifSociedadValido, normalizarDocumento } from './identificacion';

describe('DNI y NIE', () => {
  test('la letra de control', () => {
    expect(dniValido('12345678Z')).toBe(true);
    expect(dniValido('12345678A')).toBe(false);
    expect(dniValido('00000000T')).toBe(true);
  });

  test('NIE: X, Y y Z cuentan como 0, 1 y 2', () => {
    expect(dniValido('X1234567L')).toBe(true);
    expect(dniValido('Y1234567X')).toBe(true);
    expect(dniValido('Z1234567R')).toBe(true);
    expect(dniValido('X1234567A')).toBe(false);
  });

  test('admite espacios, puntos, guiones y minusculas', () => {
    expect(normalizarDocumento(' 12.345.678-z ')).toBe('12345678Z');
    expect(dniValido('12.345.678-z')).toBe(true);
  });

  test('formas malas', () => {
    for (const malo of ['', '1234567Z', '123456789Z', 'X12345678L', 'ABCDEFGHZ', 'B12345674']) expect(dniValido(malo)).toBe(false);
  });
});

describe('NIF de sociedad', () => {
  test('S.L. y S.A. llevan cifra de control', () => {
    expect(nifSociedadValido('B12345674')).toBe(true);
    expect(nifSociedadValido('A58818501')).toBe(true);
    expect(nifSociedadValido('B12345670')).toBe(false);
    expect(nifSociedadValido('B1234567D')).toBe(false);
  });

  test('los organismos llevan letra de control', () => {
    expect(nifSociedadValido('P1234567D')).toBe(true);
    expect(nifSociedadValido('P12345674')).toBe(false);
  });

  test('una asociacion (G) admite cifra o letra', () => {
    expect(nifSociedadValido('G12345674')).toBe(true);
    expect(nifSociedadValido('G1234567D')).toBe(true);
  });

  test('un DNI no es un NIF de sociedad', () => {
    expect(nifSociedadValido('12345678Z')).toBe(false);
  });
});
