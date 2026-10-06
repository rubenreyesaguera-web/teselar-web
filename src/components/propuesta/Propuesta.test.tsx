import { describe, expect, mock, test } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ejemplo from '../../../scripts/propuesta.ejemplo.json';
import { hashOferta } from '@/lib/propuestas/canonico';
import { construirInstantanea, validarContenido, type InstantaneaV1 } from '@/lib/propuestas/instantanea';
import type { Estado } from '@/lib/propuestas/leer';

// Fuera de Next no hay router; el render en servidor solo necesita que exista.
mock.module('next/navigation', () => ({ useRouter: () => ({ refresh() {} }) }));
const { default: Propuesta } = await import('./Propuesta');

const instantanea = construirInstantanea(validarContenido(structuredClone(ejemplo)), {
  referencia: 'P-2026-001',
  version: 2,
  fecha: '2026-10-06',
});

function pintar(p: InstantaneaV1, estado: Estado = 'vigente', aceptadaEl: Date | null = null, cumplidos: Record<number, string> = {}): string {
  return renderToStaticMarkup(
    <Propuesta instantanea={p} offerHash={hashOferta(p)} estado={estado} aceptadaEl={aceptadaEl} cumplidos={cumplidos} />,
  );
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

// Fechas e importes se formatean; las enumeraciones (unico/mensual, EUR) se traducen. El resto, tal cual.
const FORMATEADOS = new Set(['2026-10-06', '2026-11-05', 'unico', 'mensual', 'EUR', 'P-2026-001']);

describe('la página sale de la instantánea', () => {
  const html = pintar(instantanea);

  test('cada texto de la instantánea está en la página, literal', () => {
    const faltan = textosDe(instantanea).filter((t) => !FORMATEADOS.has(t) && !html.includes(escapar(t)));
    expect(faltan).toEqual([]);
  });

  test('portada: para quién, titular, tarjeta con total + IVA y los pagos, estado y botones', () => {
    expect(html).toContain(`Para ${escapar(instantanea.partes.cliente.nombre)} · ${escapar(instantanea.partes.cliente.negocio)}`);
    expect(html).toContain(`<h1 id="titular">${escapar(instantanea.portada.titular)}</h1>`);
    expect(html).toMatch(/<aside class="tarjeta"[\s\S]*Cómo se paga · 4 pagos[\s\S]*<\/aside>/);
    expect(html).toContain('Propuesta de Rubén Reyes Agüera · Teselar Software · NIF 47897952S · 6 de octubre de 2026');
    expect(html).toContain('765 €<span> + IVA</span>');
    expect(html).toContain('150 € al mes + IVA');
    expect(html).toContain('Válida hasta el 5 de noviembre de 2026');
    expect(html).toContain('Pendiente de aceptación');
    expect(html.match(/<button[^>]*>Aceptar propuesta/g)?.length).toBe(4); // botones: cabecera, portada, cierre y barra del móvil
  });

  test('el detalle va plegado hasta «Ver alcance completo», con un botón y no un enlace (no toca el fragmento)', () => {
    expect(html).toContain('<div id="alcance-completo" class="zona-alcance" hidden="">');
    expect(html).toContain('aria-controls="alcance-completo"');
    expect(html).not.toMatch(/href="#/);
  });

  test('ya no hay cuadro de datos aparte', () => {
    expect(html).not.toContain('class="datos"');
  });

  test('«Lo que aceptas»: el diálogo trae las condiciones; sin la capacidad del fragmento no hay formulario', () => {
    // En el servidor nunca hay fragmento: el formulario solo aparece en el navegador con el enlace completo.
    expect(html).toContain('Lo que aceptas');
    expect(html).toContain('<div class="condiciones">');
    expect(html).toContain('Para aceptar, abre el enlace completo que te envié');
    expect(html).not.toContain('<form');
  });

  test('un cambio en la instantánea se ve en la página (no hay texto de plantilla)', () => {
    const otra = structuredClone(instantanea);
    otra.solucion.resumen = 'Texto que solo existe en esta instantánea';
    expect(pintar(otra)).toContain('Texto que solo existe en esta instantánea');
    expect(pintar(otra)).not.toContain(escapar(instantanea.solucion.resumen));
  });

  test('sin garantía no hay sección de garantía, y la numeración no salta', () => {
    const h = pintar({ ...instantanea, garantia: null });
    expect(h).not.toContain('>Garantía<');
    expect(h).toContain('>08</span>Vigencia');
  });
});

describe('estados', () => {
  test('vencida avisa, enseña lo ofrecido y no deja aceptar', () => {
    const h = pintar(instantanea, 'vencida');
    expect(h).toContain('venció el 5 de noviembre de 2026');
    expect(h).toContain(escapar(instantanea.solucion.resumen));
    expect(h).not.toContain('Aceptar propuesta');
    expect(h).not.toContain('<dialog');
  });

  test('aceptada: fecha en hora de Lloret, sin botones, y el seguimiento con los hitos cumplidos', () => {
    const h = pintar(instantanea, 'aceptada', new Date('2026-10-08T09:15:00Z'), { 1: '2026-10-09T10:00:00Z' });
    expect(h).toContain('Aceptada el 8 de octubre de 2026 a las 11:15');
    expect(h).toContain('Propuesta aceptada');
    expect(h).not.toContain('Aceptar propuesta');
    expect(h).toMatch(/<aside class="tarjeta"[\s\S]*Cómo va[\s\S]*<\/aside>/);
    expect(h).not.toContain('Siguiente paso');
    expect(h).toContain('1 de 4 pasos cumplidos');
    expect(h).toContain('Cumplido el 9 de octubre de 2026 a las 12:00');
    expect(h.match(/>Pendiente</g)?.length).toBe(3);
  });

  test('retirada no enseña nada de la propuesta, tampoco escondido en el diálogo', () => {
    const h = pintar(instantanea, 'retirada');
    expect(h).toContain('se ha retirado');
    expect(h).toContain('<h1 id="titular">Propuesta P-2026-001</h1>');
    const filtrados = textosDe(instantanea).filter((t) => !FORMATEADOS.has(t) && t.length > 12 && h.includes(escapar(t)));
    expect(filtrados).toEqual([instantanea.partes.proveedor.marca].filter((t) => t.length > 12));
    expect(h).not.toContain('765');
  });
});
