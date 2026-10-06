import { describe, expect, test } from 'bun:test';
import { hashOferta } from './canonico';
import { euros, fechaLarga } from './formato';
import { interpretar, leerPropuesta, type FilaVersion } from './leer';

const snapshot = { schema_version: 1, referencia: 'P-2026-001', version: 1 };
const ahora = new Date('2026-10-10T12:00:00Z');
const fila = (cambios: Partial<FilaVersion> = {}): FilaVersion => ({
  snapshot,
  offer_hash: hashOferta(snapshot),
  schema_version: 1,
  status: 'publicada',
  expires_at: '2026-11-05T23:00:00Z',
  accepted_at: null,
  ...cambios,
});

describe('interpretar', () => {
  test('los cuatro estados', () => {
    expect(interpretar(fila(), ahora).estado).toBe('vigente');
    expect(interpretar(fila({ expires_at: '2026-10-01T00:00:00Z' }), ahora).estado).toBe('vencida');
    expect(interpretar(fila({ status: 'invalidada' }), ahora).estado).toBe('retirada');
    expect(interpretar(fila({ accepted_at: '2026-10-08T09:15:00Z' }), ahora).estado).toBe('aceptada');
  });

  test('si lo guardado no da su hash, no se enseña', () => {
    expect(() => interpretar(fila({ offer_hash: hashOferta({ otra: 1 }) }), ahora)).toThrow('no coincide');
    expect(() => interpretar(fila({ snapshot: { ...snapshot, version: 2 } }), ahora)).toThrow('no coincide');
  });

  test('un esquema que no conoce, tampoco', () => {
    expect(() => interpretar(fila({ schema_version: 2 }), ahora)).toThrow('desconocido');
  });

  test('una referencia con otra forma ni llega a la base', async () => {
    const antes = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;
    try {
      expect(await leerPropuesta("P-2026-001' OR 1=1")).toBeNull();
      expect(await leerPropuesta('es')).toBeNull();
    } finally {
      if (antes !== undefined) process.env.DATABASE_URL = antes;
    }
  });
});

describe('formato', () => {
  test('euros desde céntimos', () => {
    expect(euros(76500)).toBe('765 €');
    expect(euros(76550)).toBe('765,50 €');
    expect(euros(1200000)).toBe('12.000 €');
  });

  test('fechas largas', () => {
    expect(fechaLarga('2026-11-05')).toBe('5 de noviembre de 2026');
  });
});
