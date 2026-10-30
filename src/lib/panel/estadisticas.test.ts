import { describe, expect, test } from 'bun:test';
import { periodo, rellenar, variacion } from './estadisticas';

const AHORA = new Date('2026-10-30T22:30:00Z'); // 23:30 en Lloret, todavia dia 30

describe('periodos de las estadisticas', () => {
  test('los ultimos N dias contando hoy, y los N de antes', () => {
    expect(periodo('7', null, AHORA)).toEqual({ desde: '2026-10-24', hasta: '2026-10-30', anterior: { desde: '2026-10-17', hasta: '2026-10-23' } });
    expect(periodo('30', null, AHORA).anterior).toEqual({ desde: '2026-09-01', hasta: '2026-09-30' });
  });

  test('«todo» empieza el primer dia con datos y no compara', () => {
    expect(periodo('todo', '2026-10-30', AHORA)).toEqual({ desde: '2026-10-30', hasta: '2026-10-30', anterior: null });
    expect(periodo('todo', null, AHORA).desde).toBe('2026-10-30');
  });

  test('rellenar pone a 0 los dias sin nada, tambien al cambiar de mes', () => {
    expect(rellenar('2026-10-30', '2026-11-02', [{ dia: '2026-11-01', n: 3 }])).toEqual([
      { dia: '2026-10-30', n: 0 }, { dia: '2026-10-31', n: 0 }, { dia: '2026-11-01', n: 3 }, { dia: '2026-11-02', n: 0 },
    ]);
  });

  test('variacion en %; sin base (antes 0) no hay %', () => {
    expect(variacion(12, 10)).toBe(20);
    expect(variacion(5, 10)).toBe(-50);
    expect(variacion(3, 0)).toBeNull();
    expect(variacion(3, null)).toBeNull();
  });
});
