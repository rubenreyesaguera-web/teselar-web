import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { dictionaries } from '../i18n/dictionaries';

// Arreglos de la portada tras el ensayo con clientes simulados (24/10, doc 32 de la boveda).
const LNGS = ['es', 'ca', 'en'] as const;
const leer = (ruta: string) => readFileSync(new URL(ruta, import.meta.url), 'utf8');
const TESS = leer('../app/api/chat/route.ts');
const LLMS = leer('../../public/llms.txt');
const PORTADA = leer('../app/[lng]/page.tsx');
const LAYOUT = leer('../app/[lng]/layout.tsx');

describe('pago', () => {
  // Ley 11/2021: tope de 1.000 € en efectivo si una parte es profesional, y cuenta la operacion entera.
  test('sin efectivo en la web, TesS ni llms.txt', () => {
    const textos = [JSON.stringify(dictionaries), LLMS, TESS.replace(/nunca en efectivo/g, '')];
    for (const t of textos) expect(t).not.toMatch(/efectivo|efectiu|cash in hand/i);
  });
});

describe('primera persona', () => {
  test('sin plural ni «freelancers inestables»', () => {
    for (const lng of LNGS) expect(JSON.stringify(dictionaries[lng].values)).not.toMatch(/inestables|unstable|artesan|craftsm/i);
    expect(PORTADA).not.toMatch(/Desarrollamos|Desenvolupem|We hand-craft|Multiplicamos|vuestra web/);
  });
});

describe('el 09', () => {
  test('titulo sin siglas y sin «escritorio»', () => {
    for (const lng of LNGS) {
      const s8 = dictionaries[lng].services.s8;
      expect(s8.title).not.toMatch(/ERP|CRM|FSM/);
      expect(s8.f1).not.toMatch(/escritorio|escriptori|desktop/i);
    }
  });
});

describe('simulador', () => {
  // Con los valores de serie recomendaba el 09 a todo el mundo: la pieza se decide en el diagnostico.
  test('no recomienda ningun servicio', () => {
    for (const lng of LNGS) {
      const sim = dictionaries[lng].simulator as Record<string, string>;
      expect(Object.keys(sim).filter((k) => k.startsWith('opt_') || k.startsWith('rec_badge'))).toEqual([]);
      expect(sim.rec_texto.trim()).not.toBe('');
    }
    expect(PORTADA).not.toMatch(/simulator\.opt_s|suggestedService/);
  });
});

describe('datos', () => {
  test('la pregunta de los datos esta en la portada y en el FAQPage', () => {
    for (const lng of LNGS) expect(dictionaries[lng].faq.q14.a).toMatch(/Google Cloud/);
    expect(PORTADA).toContain('t.faq.q14');
    expect(LAYOUT).toContain("'q14'");
  });

  // ADR-033: la IA de citas va en la cuenta de Teselar. La demo no puede decir que todo va a nombre del cliente.
  test('la demo dice que la IA de citas va en la cuenta de Teselar', () => {
    for (const lng of LNGS) {
      const datos = dictionaries[lng].demo.faq.find((f) => 'id' in f && f.id === 'datos');
      expect(datos?.r).toMatch(/Google Cloud/);
      expect(datos?.r).not.toMatch(/^(Todo lo que se monte|Tot el que es munti|Everything we set up)/);
    }
  });
});

describe('«Pruébalo con tu empresa»', () => {
  test('dice que tarda 2 minutos y no pide registro', () => {
    for (const lng of LNGS) expect(dictionaries[lng].demo.portada_nota).toMatch(/2 /);
    expect(PORTADA.match(/t\.demo\.portada_nota/g)?.length).toBe(2);
  });
});

describe('catalogo', () => {
  test('sin lineas de tecnologia en las tarjetas', () => {
    expect(PORTADA).not.toContain('{service.tag}');
  });
});
