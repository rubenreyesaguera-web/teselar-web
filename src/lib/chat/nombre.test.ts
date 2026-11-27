import { describe, expect, test } from 'bun:test';
import { explicaElNombre, preguntanPorElNombre, sinExplicarElNombre } from './nombre';

// Respuestas reales de las pasadas del 27/11 en producción (la charla del taller)
const VEZ_4 = 'Hola. Soy TesS, la asistente de IA de Teselar Software. La Tes de Teselar y la S de Software. Apuntar las citas en una libreta funciona mientras se está con las manos en la grasa. ¿Qué parte te quita más tiempo?';
const VEZ_9 = 'Hola, soy TesS, la asistente virtual de Teselar Software. El juego de mi nombre es la "Tes" de Teselar y la "S" de Software. Apuntar las citas en una libreta funciona, pero con diez llamadas a la semana seguro que alguna se escapa. ¿Crees que pierdes alguna?';
const VEZ_2 = '¡Hola! Soy TesS, la asistente de IA de Teselar Software; "Tes" de Teselar y la "S" de Software. Apuntar las citas en una libreta funciona. ¿Esas llamadas te entran sobre todo durante el día?';

describe('TesS no explica su nombre si no se lo preguntan', () => {
  test('lo que dijo el 27/11 se detecta, y en catalán e inglés', () => {
    expect(explicaElNombre(VEZ_4)).toBe(true);
    expect(explicaElNombre(VEZ_9)).toBe(true);
    expect(explicaElNombre(VEZ_2)).toBe(true);
    expect(explicaElNombre('El meu nom: «Tes» de Teselar i la «S» de Software.')).toBe(true);
    expect(explicaElNombre('My name comes from "Tes" from Teselar and the "S" from Software.')).toBe(true);
  });

  test('presentarse sin explicar el nombre no salta', () => {
    expect(explicaElNombre('Hola, soy TesS, la asistente de IA de Teselar Software. ¿A qué se dedica tu negocio?')).toBe(false);
    expect(explicaElNombre('Teselar Software es Rubén, que hace webs y software a medida.')).toBe(false);
  });

  test('si preguntan por el nombre, sí puede explicarlo', () => {
    expect(preguntanPorElNombre(['¿Por qué te llamas así?'])).toBe(true);
    expect(preguntanPorElNombre(['¿Qué significa TesS?'])).toBe(true);
    expect(preguntanPorElNombre(['Why that name?'])).toBe(true);
    expect(preguntanPorElNombre(['Tengo un taller mecánico en Blanes.', '¿Y cuántos clientes estoy perdiendo?'])).toBe(false);
  });

  test('el último recurso quita solo la frase del nombre', () => {
    expect(sinExplicarElNombre(VEZ_4)).toBe('Hola. Soy TesS, la asistente de IA de Teselar Software. Apuntar las citas en una libreta funciona mientras se está con las manos en la grasa. ¿Qué parte te quita más tiempo?');
    expect(sinExplicarElNombre(VEZ_9)).not.toContain('Tes" de Teselar');
    expect(sinExplicarElNombre(VEZ_9)).toContain('¿Crees que pierdes alguna?');
    expect(sinExplicarElNombre('Hola, ¿qué tal?')).toBe('Hola, ¿qué tal?');
    expect(sinExplicarElNombre(VEZ_2)).toBe('¡Hola! Soy TesS, la asistente de IA de Teselar Software. Apuntar las citas en una libreta funciona. ¿Esas llamadas te entran sobre todo durante el día?');
  });
});
