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

// Segunda pasada (24/10): lo que la primera tanda de arreglos dejo torcido.
describe('mantenimiento', () => {
  test('el Plus no lleva «Recomendado» ni los feeds, que ya van en el Basico de la inmobiliaria', () => {
    expect(PORTADA).not.toMatch(/'Recomendado'|recomendado: true/);
    for (const lng of LNGS) {
      expect(dictionaries[lng].pricing.plus.f3).not.toMatch(/feed/);
      expect(dictionaries[lng].faq.q6.a).not.toMatch(/feeds? a portal|portal feed/);
    }
  });

  test('el Basico de las automatizaciones se paga: no dice «incluido»', () => {
    expect(JSON.stringify(dictionaries)).not.toMatch(/Básico incluido de forma obligatoria|Bàsic inclòs de manera obligatòria|include the Basic Plan as a requirement/);
  });
});

describe('WhatsApp Business', () => {
  // Cuatro lectores entendian que perdian su numero: el cambio conserva numero, chats y contactos.
  test('sin «migrar» ni «no migras de número»', () => {
    const textos = [JSON.stringify(dictionaries), LLMS, TESS];
    for (const t of textos) expect(t).not.toMatch(/migrar es gratis|migrar és gratis|migrating is free|no migras de número|no migres de número|not migrate your number|no migra de n[uú]mero/);
  });
});

// Tercera pasada (25/10).
describe('textos de la tercera pasada', () => {
  test('sin «costes ocultos», «dos por semana», superlativos ni «escribo el código»', () => {
    const todo = JSON.stringify(dictionaries) + TESS;
    expect(todo).not.toMatch(/costes ocultos|costos ocults|hidden costs|dos por semana|dues per setmana|two a week/);
    expect(todo).not.toMatch(/insuperable|unrivaled|Huyo de|Fujo de|I avoid heavy/);
    expect(todo).not.toMatch(/Yo escribo el código|Jo escric el codi|I write the code|escribe el c[oó]digo/);
  });

  test('la teselacion se explica y el 09 avisa de la auditoria', () => {
    for (const lng of LNGS) {
      expect(dictionaries[lng].concept.text1).toMatch(/baldosas|rajoles|tiles/);
      expect(dictionaries[lng].services.s8.paso).toMatch(/150 €/);
    }
    expect(PORTADA).toContain('t.services.s8.paso');
  });

  test('la agenda nombra Google Calendar y Outlook', () => {
    for (const lng of LNGS) expect(dictionaries[lng].services.s9.f2).toMatch(/Google Calendar.*Outlook/);
  });

  // 52 semanas para el año y el mes = año / 12: con 4,33 el año daba 20.784 € frente a 1.040 h (52 semanas).
  test('el simulador cuenta con 52 semanas', () => {
    expect(PORTADA).not.toContain('4.33');
    expect(PORTADA).toContain('hourlyCost * 52');
  });
});

// Cuarta pasada (25/10).
describe('textos de la cuarta pasada', () => {
  test('sin frases de plantilla en «¿Por qué elegirme?», el mantenimiento ni el proceso', () => {
    const todo = JSON.stringify(dictionaries);
    expect(todo).not.toMatch(/éxito continuo|èxit continu|long-term success|Tranquilidad absoluta|Tranquil·litat absoluta|peace of mind/);
    expect(todo).not.toMatch(/objetivos locales|objectius locals|local goals|mejores prácticas de la industria|industry-leading|acceso privado|accés privat|private access/);
  });

  test('el Basico no habla solo de «tu web» ni del nombre antiguo del 09', () => {
    for (const lng of LNGS) expect(dictionaries[lng].pricing.basic.desc).not.toMatch(/Sistemas a Medida|Sistemes a Mida|Custom Systems|^(Tu web vigilada|La teva web vigilada|Your website watched)/);
  });

  // Doc 04: el tope de conversaciones se dice de frente, y el 03 son dos planes.
  test('el 03 dice sus dos planes y la cuota su tope', () => {
    for (const lng of LNGS) {
      expect(dictionaries[lng].services.s9.planes).toMatch(/700-900€.*150€.*1[.,]500-1[.,]800€.*250€/);
      expect(dictionaries[lng].pricing.citas.tope).toMatch(/500.*1[.,]500/);
    }
    expect(PORTADA).toContain('t.services.s9.planes');
    expect(PORTADA).toContain('t.pricing.citas.tope');
    for (const t of [TESS, LLMS]) expect(t).toMatch(/no se corta/);
  });

  test('los datos separan citas del 05 y nombran la agenda', () => {
    for (const lng of LNGS) {
      const datos = dictionaries[lng].demo.faq.find((f) => 'id' in f && f.id === 'datos')!.r;
      for (const t of [dictionaries[lng].faq.q14.a, datos]) {
        expect(t).toMatch(/\(05\)/);
        expect(t).toMatch(/agenda|calendar/);
      }
    }
    for (const t of [TESS, LLMS]) expect(t).toMatch(/su agenda/);
  });

  test('el bloque de WhatsApp va despues de las tarjetas', () => {
    expect(PORTADA.indexOf('t.services.tres_ia.title')).toBeGreaterThan(PORTADA.indexOf('filteredServices.map'));
  });

  test('TesS y llms.txt ya no ofrecen «dos plazas por semana»', () => {
    for (const t of [TESS, LLMS]) expect(t).not.toMatch(/plazas\s+por\s+semana/i);
  });
});

// Quinta pasada (25/10).
describe('textos de la quinta pasada', () => {
  // ADR-094: lo hecho a medida es del cliente al pagarlo todo, con su codigo; citas es la excepcion.
  test('la respuesta de los datos dice de quien es lo hecho a medida', () => {
    for (const lng of LNGS) {
      const datos = dictionaries[lng].demo.faq.find((f) => 'id' in f && f.id === 'datos')!.r;
      for (const t of [dictionaries[lng].faq.q14.a, datos]) expect(t).toMatch(/código|codi|source code/);
    }
    expect(JSON.stringify(dictionaries) + LLMS + TESS).not.toMatch(/inmobiliaria y ERP\/CRM|immobiliària i ERP\/CRM|real estate and ERP\/CRM|inmobiliaria, ERP\/CRM|ERP\/CRM desktop/);
  });

  test('«¿y si un dia no estas?» tiene su pregunta, sin suplente', () => {
    for (const lng of LNGS) {
      expect(dictionaries[lng].faq.q15.a).toMatch(/Plus/);
      expect(dictionaries[lng].faq.q15.a).not.toMatch(/otro programador|un altre programador|another developer/);
      expect(dictionaries[lng].leads.post_services).not.toMatch(/reducido|reduït|limited number/);
    }
    expect(PORTADA).toContain('t.faq.q15');
    expect(LAYOUT).toContain("'q15'");
  });

  test('sin «obligatorio» en el Basico ni en el 02, ni «24-48h», ni jerga', () => {
    for (const lng of LNGS) {
      const d = dictionaries[lng];
      expect(d.pricing.basic.desc + d.services.s2.f8).not.toMatch(/obligatori|required/);
      expect(d.pricing.basic.f4).toMatch(/48/);
      expect(JSON.stringify(d)).not.toMatch(/24-48/);
      expect(d.services.categories.systems).not.toMatch(/ERP/);
      expect(d.services.s2.f2 + d.services.s2.f5).not.toMatch(/CRM|bidireccional|Two-way database/);
      expect(d.services.s8.paso).not.toMatch(/^(Entre la|Between)/);
    }
    for (const t of [TESS, LLMS]) expect(t).not.toMatch(/24-48/);
  });
});

// Sexta pasada (25/10). Addenda de ADR-041: solo Citas se para al dar de baja la cuota.
describe('textos de la sexta pasada', () => {
  test('solo Citas se para; el Basico del 02 y la cuota del 05 son recomendados', () => {
    for (const lng of LNGS) {
      const d = dictionaries[lng];
      const textos = [d.pricing.basic.desc, d.services.s2.f8, d.services.s4.f7, d.faq.q6.a, d.faq.q13.a].join(' ');
      expect(textos).not.toMatch(/obligatori|required|mandatory|se para\.|s’atura\.|the automation stops/);
      expect(d.faq.q13.a).toMatch(/Citas por WhatsApp: se paran|Cites per WhatsApp: s’aturen|WhatsApp Appointments: it stops/);
    }
    for (const t of [TESS, LLMS]) expect(t).not.toMatch(/NO es opcional|cuota mensual del asistente,\s+obligatoria|se detienen si se cancela la cuota -/);
  });

  test('la excepcion de citas dice por que y que se lleva, y los datos nombran la salud', () => {
    for (const lng of LNGS) {
      const datos = dictionaries[lng].demo.faq.find((f) => 'id' in f && f.id === 'datos')!.r;
      for (const t of [dictionaries[lng].faq.q14.a, datos]) {
        expect(t).not.toMatch(/excepción|excepció|exception/);
        expect(t).toMatch(/salud|salut|health/);
      }
    }
  });

  test('sin «formación integral», «3-4 secciones» heredadas ni «prediagnóstico digital»', () => {
    for (const lng of LNGS) {
      const d = dictionaries[lng];
      expect(d.services.s8.f7).not.toMatch(/integral|priority/);
      expect(d.services.s5.hereda).not.toMatch(/3-4/);
      expect(JSON.stringify(d)).not.toMatch(/prediagnóstico digital|prediagnòstic digital|digital pre-diagnosis/);
    }
  });
});
