import { describe, expect, test } from 'bun:test';
import { ordenDelTurno, tipoDeTurno, type Mensaje } from './turno';

const saludo: Mensaje = { sender: 'bot', text: '¡Hola! Soy TesS. ¿En qué te ayudo?' };
const u = (text: string): Mensaje => ({ sender: 'user', text });
const b = (text: string): Mensaje => ({ sender: 'bot', text });

// Las seis charlas de la batería del 20/11 (ADR-122, addenda): lo que hizo mal TesS es lo que tiene que quedar cubierto.
describe('orden del turno de TesS', () => {
  test('la primera respuesta, con o sin el saludo del widget delante, es «primera»', () => {
    expect(tipoDeTurno([], 'Hola, tengo una tienda de ropa en Lloret. ¿Qué me podéis ofrecer?')).toBe('primera');
    expect(tipoDeTurno([saludo], 'Soy electricista, los avisos me llegan por WhatsApp. ¿Qué tenéis?')).toBe('primera');
  });

  test('en la primera no hay llamada ni precio, salvo que pregunte el precio', () => {
    const sinPrecio = ordenDelTurno([saludo], 'Tengo una tienda de ropa en Lloret. ¿Qué me podéis ofrecer?')!;
    expect(sinPrecio).toContain('NO ofrezcas la llamada');
    expect(sinPrecio).toContain('NO des precios');
    const conPrecio = ordenDelTurno([saludo], '¿Cuánto cuesta una web?')!;
    expect(conPrecio).toContain('dáselo');
    expect(conPrecio).toContain('NO ofrezcas la llamada');
  });

  test('si la respuesta anterior ofrecía la llamada, no se repite', () => {
    const h = [saludo, u('Tengo un taller en Blanes y apunto las citas en una libreta.'), b('Eso lo resuelve el sistema de citas. ¿Quieres que Rubén te llame?')];
    expect(tipoDeTurno(h, '¿Y eso cuánto me costaría?')).toBe('tras_llamada');
    expect(ordenDelTurno(h, '¿Y eso cuánto me costaría?')).toContain('NO lo vuelvas a ofrecer');
  });

  // Desde el 23/11 el diagnóstico se llama «charla gratuita» (D129): ofrecerla también cuenta, en los tres idiomas.
  test('si la respuesta anterior ofrecía la charla gratuita, no se repite', () => {
    const ofertas = [
      '¿Te apetece una charla gratuita de 30 minutos con Rubén?',
      'Vols una xerrada gratuïta de 30 minuts amb el Rubén?',
      'Would you like a free 30-minute intro call with Rubén?',
    ];
    for (const oferta of ofertas) {
      const h = [saludo, u('Tengo una peluquería en Lloret.'), b(oferta)];
      expect(tipoDeTurno(h, '¿Y eso cuánto me costaría?')).toBe('tras_llamada');
    }
  });

  test('si dice que sí a la llamada, no hay orden: TesS sigue y pide los datos', () => {
    const h = [saludo, u('Tengo un taller.'), b('¿Cuántas citas pierdes?'), u('Unas cinco.'), b('¿Quieres que Rubén te llame?')];
    expect(tipoDeTurno(h, 'Sí, por favor')).toBe('libre');
    expect(ordenDelTurno(h, 'Vale')).toBeNull();
  });

  test('«no voy a comprar» manda sobre todo, también si lo dijo antes o de entrada', () => {
    expect(tipoDeTurno([], 'No voy a comprar nada, solo tengo curiosidad: ¿cómo funciona el asistente?')).toBe('no_compra');
    const h = [saludo, u('Tengo una peluquería en Tossa, ¿hacéis webs?'), b('¿Cómo coges ahora las citas?')];
    expect(tipoDeTurno(h, 'Vale, gracias, pero no voy a comprar nada, solo quería saberlo.')).toBe('no_compra');
    const despues = [...h, u('No me interesa, gracias.'), b('Entendido, aquí estoy.')];
    expect(tipoDeTurno(despues, '¿Y trabajáis en Blanes?')).toBe('no_compra');
    expect(ordenDelTurno(despues, '¿Y trabajáis en Blanes?')).toContain('NO ofrezcas nada');
  });

  test('en catalán y en inglés también', () => {
    expect(tipoDeTurno([], 'No vull comprar res, només volia saber-ho')).toBe('no_compra');
    expect(tipoDeTurno([], "Just looking, I'm not going to buy anything")).toBe('no_compra');
    const h = [saludo, u('Tinc una perruqueria'), b('El sistema de cites costa 150€ + 29€/mes + IVA.')];
    expect(tipoDeTurno(h, 'És massa car per a mi')).toBe('caro');
    expect(tipoDeTurno(h, 'That is too expensive for me')).toBe('caro');
  });

  test('con «caro», diagnóstico para que Rubén estudie su caso y a elegir enlace o llamada', () => {
    const h = [saludo, u('Soy electricista.'), b('¿Trabajas solo o con equipo?'), u('Solo. ¿Cuánto cuesta?'), b('La automatización sencilla son 690€ + IVA.')];
    expect(tipoDeTurno(h, 'Uf, me parece caro para lo que facturo.')).toBe('caro');
    const orden = ordenDelTurno(h, 'Uf, me parece caro para lo que facturo.')!;
    expect(orden).toContain('NO repitas el precio');
    expect(orden).toContain('Te paso el enlace para elegir hora, o si prefieres te llama él');
  });

  test('una conversación normal, sin llamada ofrecida, no lleva orden', () => {
    const h = [saludo, u('Tengo una inmobiliaria'), b('¿Qué programa usas para los pisos?')];
    expect(ordenDelTurno(h, 'Inmovilla')).toBeNull();
  });
});
