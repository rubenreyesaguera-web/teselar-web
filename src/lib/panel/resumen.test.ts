import { describe, expect, test } from 'bun:test';
import {
  caducados, comisionDe, diaDeBorrado, estadoAcuse, hoyEnMadrid, plegarHitos, resumenColaboradores, resumenHoy, sumarMeses, validarContacto,
  validarSaldo, type Contacto, type PropuestaPanel,
} from './resumen';

const AHORA = new Date('2026-10-30T22:30:00Z'); // 23:30 en Lloret, todavia dia 30

function propuesta(p: Partial<PropuestaPanel>): PropuestaPanel {
  return {
    referencia: 'P-2026-001', version: 1, estado: 'vigente', negocio: 'Negocio', cliente: 'Cliente',
    creada: '2026-10-01T10:00:00Z', vence: '2026-11-30T23:00:00Z', venceDia: '2026-11-30', aceptada: null,
    aceptante: null, acuse: null, hitos: [], setup_centimos: 0, aperturas: null, contacto: null, ...p,
  };
}

function contacto(c: Partial<Contacto>): Contacto {
  return {
    id: 1, negocio: 'Bar', persona: null, telefono: null, correo: null, origen: null, estado: 'en_conversacion',
    siguiente_accion: null, fecha: null, notas: null, propuesta: null, colaborador: null, comision: 'ninguna',
    comision_saldada: null, comision_forma: null, comision_valor_centimos: null, comision_nota: null, actualizado: '2026-10-30T10:00:00Z', ...c,
  };
}

describe('hitos y cobros', () => {
  test('lo último que se dijo de cada hito gana, y cumplido y cobrado van por separado', () => {
    const e = (tipo: string, hito: number, fecha: string | null = null) => ({ tipo, hito, fecha, created_at: `2026-10-${10 + hito}T10:00:00.000Z` });
    const r = plegarHitos([
      e('hito_cumplido', 1), e('cobro_apuntado', 1, '2026-10-12'),
      e('hito_cumplido', 2), e('hito_deshecho', 2),
      e('cobro_apuntado', 3, '2026-10-20'), e('cobro_deshecho', 3),
      e('acuse_enviado', 1),
    ]);
    expect(r.cumplidos).toEqual({ 1: '2026-10-11T10:00:00.000Z' });
    expect(r.cobrados).toEqual({ 1: '2026-10-12' });
  });

  test('el acuse: el último evento manda; aceptada sin ninguno, pendiente', () => {
    expect(estadoAcuse(false, [])).toBeNull();
    expect(estadoAcuse(true, [])).toBe('pendiente');
    expect(estadoAcuse(true, ['acuse_fallido', 'acuse_enviado'])).toBe('enviado');
    expect(estadoAcuse(true, ['acuse_enviado', 'acuse_fallido'])).toBe('fallido');
  });
});

describe('«Hoy»', () => {
  test('la fecha de hoy es la de Lloret, no la de UTC', () => {
    expect(hoyEnMadrid(new Date('2026-10-30T23:30:00Z'))).toBe('2026-10-31');
    expect(hoyEnMadrid(AHORA)).toBe('2026-10-30');
  });

  test('propuestas vigentes cuyo último día cae en 7 días de calendario o menos, de la más próxima a la más lejana', () => {
    const r = resumenHoy(
      [
        propuesta({ referencia: 'P-2026-001', venceDia: '2026-11-06' }),
        propuesta({ referencia: 'P-2026-002', venceDia: '2026-11-02' }),
        propuesta({ referencia: 'P-2026-003', venceDia: '2026-11-07' }),
        propuesta({ referencia: 'P-2026-004', venceDia: '2026-11-01', estado: 'aceptada' }),
      ],
      [],
      AHORA,
    );
    expect(r.vencen.map((p) => p.referencia)).toEqual(['P-2026-002', 'P-2026-001']);
  });

  test('PDF sin entregar: el que falló, y el pendiente solo pasado un margen', () => {
    const r = resumenHoy(
      [
        propuesta({ referencia: 'P-2026-001', estado: 'aceptada', acuse: 'fallido', aceptada: '2026-10-30T22:29:00Z' }),
        propuesta({ referencia: 'P-2026-002', estado: 'aceptada', acuse: 'pendiente', aceptada: '2026-10-30T22:25:00Z' }),
        propuesta({ referencia: 'P-2026-003', estado: 'aceptada', acuse: 'pendiente', aceptada: '2026-10-30T20:00:00Z' }),
        propuesta({ referencia: 'P-2026-004', estado: 'aceptada', acuse: 'enviado', aceptada: '2026-10-29T20:00:00Z' }),
      ],
      [],
      AHORA,
    );
    expect(r.sinPdf.map((p) => p.referencia)).toEqual(['P-2026-001', 'P-2026-003']);
  });

  test('contactos abiertos con el paso para hoy o vencido; los cerrados y los de mañana no', () => {
    const r = resumenHoy(
      [],
      [
        contacto({ id: 1, fecha: '2026-10-30' }),
        contacto({ id: 2, fecha: '2026-10-28' }),
        contacto({ id: 3, fecha: '2026-10-31' }),
        contacto({ id: 4, fecha: '2026-10-01', estado: 'perdido' }),
        contacto({ id: 5, fecha: null }),
      ],
      AHORA,
    );
    expect(r.pasos.map((p) => [p.contacto.id, p.vencido])).toEqual([[2, true], [1, false]]);
  });

  test('hitos cumplidos sin cobrar', () => {
    const h = (n: number, cumplido: string | null, cobrado: string | null) => ({ n, hito: `H${n}`, importe_centimos: 100, cuando: '', cumplido, cobrado });
    const r = resumenHoy(
      [propuesta({ estado: 'aceptada', hitos: [h(1, '2026-10-10T10:00:00Z', '2026-10-11'), h(2, '2026-10-20T10:00:00Z', null), h(3, null, null)] })],
      [],
      AHORA,
    );
    expect(r.sinCobrar.map((x) => x.hito.n)).toEqual([2]);
  });
});

describe('validar un contacto', () => {
  test('lo vacío es null, la referencia se pasa a mayúsculas y el estado por defecto es «en conversación»', () => {
    const r = validarContacto({ negocio: '  Bar Pepe ', persona: '', propuesta: 'p-2026-001', fecha: '2026-11-03' });
    expect(r).toMatchObject({ negocio: 'Bar Pepe', persona: null, propuesta: 'P-2026-001', estado: 'en_conversacion', fecha: '2026-11-03' });
  });

  test('errores con su mensaje', () => {
    expect(validarContacto({ negocio: ' ' })).toBe('Falta el negocio');
    expect(validarContacto({ negocio: 'x', estado: 'borrado' })).toBe('Estado no válido');
    expect(validarContacto({ negocio: 'x', fecha: '30/10/2026' })).toBe('Fecha no válida');
    expect(validarContacto({ negocio: 'x', correo: 'sin-arroba' })).toBe('Correo no válido');
    expect(validarContacto({ negocio: 'x', propuesta: 'P-26-1' })).toBe('La propuesta va como P-2026-001');
    expect(validarContacto({ negocio: 'x'.repeat(201) })).toContain('demasiado largo');
  });
});

describe('borrado a los 12 meses (politica, apartado 8)', () => {
  test('sumar meses: fin de mes y cambio de año', () => {
    expect(sumarMeses('2026-10-30', 12)).toBe('2027-10-30');
    expect(sumarMeses('2028-02-29', 12)).toBe('2029-02-28');
    expect(sumarMeses('2026-01-31', 1)).toBe('2026-02-28');
    expect(sumarMeses('2026-12-15', 1)).toBe('2027-01-15');
  });

  test('cuenta desde lo más reciente entre guardar la ficha y el siguiente paso; los ganados no se borran', () => {
    expect(diaDeBorrado(contacto({ actualizado: '2026-10-30T10:00:00Z' }))).toBe('2027-10-30');
    expect(diaDeBorrado(contacto({ actualizado: '2026-10-30T10:00:00Z', fecha: '2027-03-15' }))).toBe('2028-03-15');
    expect(diaDeBorrado(contacto({ actualizado: '2026-10-30T10:00:00Z', fecha: '2026-09-01' }))).toBe('2027-10-30');
    // Guardada a las 00:30 de Lloret del dia 31: el dia es el 31, no el 30 de UTC
    expect(diaDeBorrado(contacto({ actualizado: '2026-10-30T23:30:00Z' }))).toBe('2027-10-31');
    expect(diaDeBorrado(contacto({ estado: 'ganado', actualizado: '2020-01-01T10:00:00Z' }))).toBeNull();
  });

  test('se borran el mismo día que vencen, también los perdidos; los ganados nunca', () => {
    const r = caducados(
      [
        contacto({ id: 1, actualizado: '2025-10-30T10:00:00Z' }),
        contacto({ id: 2, actualizado: '2025-10-31T10:00:00Z' }),
        contacto({ id: 3, actualizado: '2025-01-01T10:00:00Z', estado: 'perdido' }),
        contacto({ id: 4, actualizado: '2020-01-01T10:00:00Z', estado: 'ganado' }),
        contacto({ id: 5, actualizado: '2025-01-01T10:00:00Z', fecha: '2026-01-10' }),
      ],
      AHORA,
    );
    expect(r.map((c) => c.id)).toEqual([1, 3]);
  });

  test('«Hoy» avisa de los que se borran en 30 días o menos, del más próximo al más lejano', () => {
    const r = resumenHoy(
      [],
      [
        contacto({ id: 1, actualizado: '2025-11-29T10:00:00Z' }), // 29/11: en 30 dias
        contacto({ id: 2, actualizado: '2025-11-30T10:00:00Z' }), // en 31 dias: todavia no
        contacto({ id: 3, actualizado: '2025-11-05T10:00:00Z', estado: 'perdido' }),
        contacto({ id: 4, actualizado: '2025-10-30T10:00:00Z' }), // vence hoy: se borra, no se avisa
        contacto({ id: 5, actualizado: '2025-11-05T10:00:00Z', estado: 'ganado' }),
      ],
      AHORA,
    );
    expect(r.seBorran.map((x) => [x.contacto.id, x.dia])).toEqual([[3, '2026-11-05'], [1, '2026-11-29']]);
  });
});

describe('colaboradores y comision (fase 2)', () => {
  const firmada = propuesta({ referencia: 'P-2026-002', estado: 'aceptada', setup_centimos: 150000 });
  const vigente = propuesta({ referencia: 'P-2026-003', estado: 'vigente', setup_centimos: 90000 });

  test('10 % o 20 % del setup, solo con la propuesta aceptada', () => {
    expect(comisionDe(contacto({ colaborador: 'Betty', comision: 'puente' }), firmada)).toBe(15000);
    expect(comisionDe(contacto({ colaborador: 'Betty', comision: 'acompana' }), firmada)).toBe(30000);
    expect(comisionDe(contacto({ colaborador: 'Gis', comision: 'ninguna' }), firmada)).toBe(0);
    expect(comisionDe(contacto({ colaborador: 'Betty', comision: 'puente' }), vigente)).toBe(0);
    expect(comisionDe(contacto({ colaborador: 'Betty', comision: 'puente' }), undefined)).toBe(0);
  });

  test('resumen: los que tienen pagina aunque no traigan a nadie, el nombre sin mayusculas, y lo saldado aparte', () => {
    const r = resumenColaboradores(
      [{ slug: 'gis', nombre: 'Gis' }],
      [
        contacto({ id: 1, colaborador: 'betty ', comision: 'puente', propuesta: 'P-2026-002', comision_saldada: '2026-11-10' }),
        contacto({ id: 2, colaborador: 'Betty', comision: 'acompana', propuesta: 'P-2026-003' }),
        contacto({ id: 3, colaborador: null }),
      ],
      [firmada, vigente],
      { gis: { total: 12, ultimos30: 4 } },
    );
    expect(r.map((x) => [x.nombre, x.slug, x.contactos, x.firmados, x.setupFirmado, x.debido, x.saldado, x.visitas30])).toEqual([
      ['betty', null, 2, 1, 150000, 15000, 15000, 0],
      ['Gis', 'gis', 0, 0, 0, 0, 0, 4],
    ]);
  });

  test('la comision necesita colaborador; por defecto, sin comision', () => {
    expect(validarContacto({ negocio: 'x', comision: 'puente' })).toBe('La comisión necesita un colaborador');
    expect(validarContacto({ negocio: 'x', colaborador: 'Betty', comision: 'mucha' })).toBe('Comisión no válida');
    expect(validarContacto({ negocio: 'x' })).toMatchObject({ comision: 'ninguna' });
  });

  test('saldar: con canje o descuento hace falta el valor acordado en euros', () => {
    expect(validarSaldo({ fecha: '2026-11-10', forma: 'transferencia' })).toEqual({ fecha: '2026-11-10', forma: 'transferencia', valor_centimos: null, nota: null });
    expect(validarSaldo({ fecha: '2026-11-10', forma: 'canje', valor: '' })).toContain('acordasteis');
    expect(validarSaldo({ fecha: '2026-11-10', forma: 'canje', valor: '1.250,50 €', nota: '3 meses' })).toEqual({
      fecha: '2026-11-10', forma: 'canje', valor_centimos: 125050, nota: '3 meses',
    });
    expect(validarSaldo({ fecha: '2026-11-10', forma: 'descuento', valor: '300' })).toMatchObject({ valor_centimos: 30000 });
    expect(validarSaldo({ fecha: 'ayer', forma: 'canje', valor: '1' })).toBe('Fecha no válida');
    expect(validarSaldo({ fecha: '2026-11-10', forma: 'bizum' })).toBe('Forma de pago no válida');
  });
});
