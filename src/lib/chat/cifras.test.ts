import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { cifrasInventadas } from './cifras';

// El prompt de verdad, para que el catálogo sea el de producción y no uno de juguete
const PROMPT = readFileSync(new URL('../../app/api/chat/route.ts', import.meta.url), 'utf8');
const TALLER = 'Tengo un taller mecánico en Blanes. Me llaman unas 10 veces a la semana para pedir cita y lo apunto todo en una libreta.';

describe('TesS no inventa cifras de clientes ni de dinero', () => {
  test('lo que dijo al taller el 12/11 se detecta', () => {
    expect(cifrasInventadas('10 llamadas a la semana son más de 40 clientes al mes que puedes estar perdiendo.', PROMPT, [TALLER])).toEqual(['40']);
    expect(cifrasInventadas('Con tus llamadas, puedes estar perdiendo unos cuarenta clientes al mes.', PROMPT, [TALLER])).toEqual(['cuarenta']);
    expect(cifrasInventadas('Eso son unos 600 € al mes que se te escapan.', PROMPT, [TALLER])).toEqual(['600']);
    expect(cifrasInventadas('Un 30% de esas llamadas acaban en otro taller.', PROMPT, [TALLER])).toEqual(['30']);
    expect(cifrasInventadas('Te ahorrarías 7 horas a la semana.', PROMPT, [TALLER])).toEqual(['7']);
  });

  test('en catalán y en inglés también', () => {
    expect(cifrasInventadas('Pots estar perdent més de 40 clients al mes.', PROMPT, ['Tinc un taller, em truquen 10 cops a la setmana.'])).toEqual(['40']);
    expect(cifrasInventadas('You could be losing over 40 customers a month.', PROMPT, ['I run a garage, I get 10 calls a week.'])).toEqual(['40']);
  });

  test('las cifras del usuario y las del catálogo no saltan', () => {
    expect(cifrasInventadas('Con 10 llamadas a la semana y todo en una libreta, es fácil que alguna cita se pierda.', PROMPT, [TALLER])).toEqual([]);
    expect(cifrasInventadas('Es imposible saber el número exacto: depende de cuántas llamadas no llegas a coger.', PROMPT, [TALLER])).toEqual([]);
    expect(cifrasInventadas('La versión sin WhatsApp son 150€ de puesta en marcha y 29€/mes, más IVA; con WhatsApp, 450€ + 59€/mes.', PROMPT, [TALLER])).toEqual([]);
    expect(cifrasInventadas('Each extra calendar is +8€/month, and the website starts at €990 + VAT.', PROMPT, [])).toEqual([]);
    expect(cifrasInventadas('Los mensajes salen entre 1,7 y 3,3 céntimos por cita.', PROMPT, [])).toEqual([]);
    expect(cifrasInventadas('Dos piezas juntas son 10.915€ y las tres, 15.930€.', PROMPT, [])).toEqual([]);
    expect(cifrasInventadas('La señal es del 10% con un mínimo de 150 euros.', PROMPT, [])).toEqual([]);
    expect(cifrasInventadas('Respuesta en 48h laborables como máximo.', PROMPT, [])).toEqual([]);
  });

  test('las cifras sin unidad no se miran', () => {
    expect(cifrasInventadas('Escríbele por WhatsApp al +34 653 232 735 y te contesta él.', PROMPT, [])).toEqual([]);
    expect(cifrasInventadas('Tienes las dos versiones: con WhatsApp o sin él.', PROMPT, [])).toEqual([]);
    expect(cifrasInventadas('La charla gratuita dura 30 minutos.', PROMPT, [])).toEqual([]);
  });

  test('lo que dijo antes TesS no vale como fuente: solo el usuario y el catálogo', () => {
    // La función solo recibe los mensajes del usuario; si la respuesta repite un 40 que ella misma inventó antes, salta
    expect(cifrasInventadas('Como te decía, esos 40 clientes al mes cuentan.', PROMPT, [TALLER, '¿Y eso cuánto me costaría?'])).toEqual(['40']);
  });
});
