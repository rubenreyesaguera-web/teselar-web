import { describe, expect, test } from 'bun:test';
import { preguntaPorSusClientes, respondeComoClientesDeRuben } from './clientes';

// La respuesta real de la toma de P8 del 27/11, a «¿Y cuántos clientes estoy perdiendo con la libreta?»
const MAL = 'Rubén trabaja solo y cada proyecto lo hace él de principio a fin, así que prefiero que lo veas antes que darte un número: lo que hace lo puedes probar aquí, en esta web, conmigo y en su página de reservas. En la charla gratuita te lo enseña por dentro. ¿Quieres que Rubén te llame para echar un vistazo a cómo organizar las citas de tu taller?';

describe('la respuesta de los clientes de Rubén no se usa para los del usuario', () => {
  test('la frase de la regla se reconoce', () => {
    expect(respondeComoClientesDeRuben(MAL)).toBe(true);
    expect(respondeComoClientesDeRuben('Es imposible saber el número exacto, pero cada llamada perdida es un cliente que se va.')).toBe(false);
  });

  test('preguntas por sus propios clientes', () => {
    expect(preguntaPorSusClientes('¿Y cuántos clientes estoy perdiendo con la libreta?')).toBe(true);
    expect(preguntaPorSusClientes('¿Cuántos clientes pierdo así?')).toBe(true);
    expect(preguntaPorSusClientes('Quants clients estic perdent?')).toBe(true);
    expect(preguntaPorSusClientes('How many customers am I losing?')).toBe(true);
  });

  test('preguntas por los de Rubén: ahí sí va la regla', () => {
    expect(preguntaPorSusClientes('¿Cuántos clientes tenéis?')).toBe(false);
    expect(preguntaPorSusClientes('¿Pero cuántos?')).toBe(false);
    expect(preguntaPorSusClientes('¿Cuántos clientes tiene Rubén?')).toBe(false);
    expect(preguntaPorSusClientes('How many clients do you have?')).toBe(false);
  });
});
