import { describe, expect, test } from 'bun:test';
import { hablaEnPlural } from './voz';

describe('TesS habla de Rubén en singular', () => {
  test('el plural de la batería del 20/11 se detecta', () => {
    expect(hablaEnPlural('Yo misma soy una demostración en vivo de lo que hacemos.')).toBe(true);
    expect(hablaEnPlural('Somos un equipo pequeño')).toBe(true);
    expect(hablaEnPlural('Nuestro sistema de citas')).toBe(true);
    expect(hablaEnPlural('Ho fem a mida')).toBe(true);
    expect(hablaEnPlural('We build websites')).toBe(true);
  });

  test('en singular no salta, aunque haya palabras parecidas', () => {
    expect(hablaEnPlural('Rubén hace webs a medida y lo monta él.')).toBe(false);
    expect(hablaEnPlural('¿Quieres que Rubén te llame o te paso el enlace?')).toBe(false);
    expect(hablaEnPlural('Ruben builds it himself; you keep the code.')).toBe(false);
    expect(hablaEnPlural('El Rubén ho fa ell mateix, sense femta ni somnis.')).toBe(false);
  });
});
