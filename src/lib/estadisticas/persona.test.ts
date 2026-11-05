import { describe, expect, test } from 'bun:test';
import { esperarPersona } from './persona';

const siempre = () => true;
const espera = (ms: number) => new Promise((r) => setTimeout(r, ms));
/** true si la promesa se ha resuelto dentro de `ms`. */
const resuelta = (p: Promise<void>, ms: number) => Promise.race([p.then(() => true), espera(ms).then(() => false)]);

function pagina(visible = true) {
  const doc = Object.assign(new EventTarget(), { visibilityState: visible ? 'visible' : 'hidden' });
  const cambiar = (v: boolean) => {
    doc.visibilityState = v ? 'visible' : 'hidden';
    doc.dispatchEvent(new Event('visibilitychange'));
  };
  return { ventana: new EventTarget(), doc, cambiar };
}

describe('contar solo con alguien delante', () => {
  test('sin gesto ni tiempo a la vista, no cuenta', async () => {
    const { ventana, doc } = pagina();
    expect(await resuelta(esperarPersona(ventana, doc, {}, 10_000, siempre), 50)).toBe(false);
  });

  test('con un toque, una tecla, la rueda o un clic, cuenta al momento', async () => {
    for (const g of ['pointerdown', 'touchstart', 'wheel', 'keydown']) {
      const { ventana, doc } = pagina();
      const p = esperarPersona(ventana, doc, {}, 10_000, siempre);
      ventana.dispatchEvent(new Event(g));
      expect(await resuelta(p, 20)).toBe(true);
    }
  });

  test('el scroll solo no vale: lo puede hacer un script', async () => {
    const { ventana, doc } = pagina();
    const p = esperarPersona(ventana, doc, {}, 10_000, siempre);
    ventana.dispatchEvent(new Event('scroll'));
    expect(await resuelta(p, 20)).toBe(false);
  });

  test('un gesto lanzado por un script (isTrusted falso) no cuenta', async () => {
    const { ventana, doc } = pagina();
    const p = esperarPersona(ventana, doc, {}, 10_000);
    ventana.dispatchEvent(new Event('pointerdown'));
    expect(await resuelta(p, 20)).toBe(false);
  });

  test('con navigator.webdriver no cuenta nunca, ni con gestos ni con tiempo', async () => {
    const { ventana, doc } = pagina();
    const p = esperarPersona(ventana, doc, { webdriver: true }, 10, siempre);
    ventana.dispatchEvent(new Event('pointerdown'));
    expect(await resuelta(p, 60)).toBe(false);
  });

  test('cuenta tras el tiempo a la vista', async () => {
    const { ventana, doc } = pagina();
    expect(await resuelta(esperarPersona(ventana, doc, {}, 40, siempre), 150)).toBe(true);
  });

  test('el tiempo solo corre con la pestaña a la vista', async () => {
    const { ventana, doc, cambiar } = pagina(false);
    const p = esperarPersona(ventana, doc, {}, 80, siempre);
    expect(await resuelta(p, 150)).toBe(false);
    cambiar(true);
    await espera(50);
    cambiar(false);
    expect(await resuelta(p, 150)).toBe(false);
    cambiar(true);
    expect(await resuelta(p, 150)).toBe(true);
  });
});
