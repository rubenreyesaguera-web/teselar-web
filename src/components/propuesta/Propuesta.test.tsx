import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ejemplo from '../../../scripts/propuesta.ejemplo.json';
import { hashOferta } from '@/lib/propuestas/canonico';
import { construirInstantanea, validarContenido, type InstantaneaV1 } from '@/lib/propuestas/instantanea';
import type { Estado } from '@/lib/propuestas/leer';
import Propuesta from './Propuesta';

const instantanea = construirInstantanea(validarContenido(structuredClone(ejemplo)), {
  referencia: 'P-2026-001',
  version: 2,
  fecha: '2026-10-06',
});

function pintar(p: InstantaneaV1, estado: Estado = 'vigente', aceptadaEl: Date | null = null): string {
  return renderToStaticMarkup(<Propuesta instantanea={p} offerHash={hashOferta(p)} estado={estado} aceptadaEl={aceptadaEl} />);
}

// El texto tal y como lo deja React en el HTML.
const escapar = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

function textosDe(v: unknown, fuera: string[] = []): string[] {
  if (typeof v === 'string') fuera.push(v);
  else if (Array.isArray(v)) v.forEach((x) => textosDe(x, fuera));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => textosDe(x, fuera));
  return fuera;
}

describe('la página sale de la instantánea', () => {
  const html = pintar(instantanea);

  test('cada texto de la instantánea está en la página, literal', () => {
    // Fechas e importes se formatean; las enumeraciones (unico/mensual, EUR) se traducen. El resto, tal cual.
    const formateados = new Set(['2026-10-06', '2026-11-05', 'unico', 'mensual', 'EUR', 'P-2026-001']);
    const faltan = textosDe(instantanea).filter((t) => !formateados.has(t) && !html.includes(escapar(t)));
    expect(faltan).toEqual([]);
  });

  test('importes con + IVA, fechas en español, referencia, versión y huella', () => {
    expect(html).toContain('765 € + IVA');
    expect(html).toContain('150 € al mes + IVA');
    expect(html).toContain('205 € + IVA');
    expect(html).toContain('6 de octubre de 2026');
    expect(html).toContain('Válida hasta el 5 de noviembre de 2026');
    expect(html).toContain('P-2026-001 · v2');
    expect(html).toContain(hashOferta(instantanea));
  });

  test('un cambio en la instantánea se ve en la página (no hay texto de plantilla)', () => {
    const otra = structuredClone(instantanea);
    otra.solucion.resumen = 'Texto que solo existe en esta instantánea';
    expect(pintar(otra)).toContain('Texto que solo existe en esta instantánea');
    expect(pintar(otra)).not.toContain(escapar(instantanea.solucion.resumen));
  });

  test('sin garantía no hay sección de garantía, y la numeración no salta', () => {
    const sin = { ...instantanea, garantia: null };
    const h = pintar(sin);
    expect(h).not.toContain('Garantía');
    expect(h).toContain('>09</span>Siguiente paso');
  });
});

describe('estados', () => {
  test('vencida avisa y sigue enseñando lo que se ofreció', () => {
    const h = pintar(instantanea, 'vencida');
    expect(h).toContain('venció el 5 de noviembre de 2026');
    expect(h).toContain(escapar(instantanea.solucion.resumen));
  });

  test('aceptada da la fecha en hora de Lloret (el componente ni recibe quién aceptó)', () => {
    const h = pintar(instantanea, 'aceptada', new Date('2026-10-08T09:15:00Z'));
    expect(h).toContain('Aceptada el 8 de octubre de 2026 a las 11:15');
  });

  test('retirada no enseña el contenido', () => {
    const h = pintar(instantanea, 'retirada');
    expect(h).toContain('se ha retirado');
    expect(h).not.toContain(escapar(instantanea.solucion.resumen));
    expect(h).not.toContain('765');
  });
});
