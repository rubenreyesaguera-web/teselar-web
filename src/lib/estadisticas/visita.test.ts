import { describe, expect, test } from 'bun:test';
import { dispositivoDe, dominioDe, esRobot, limpiarOrigen, limpiarRuta, paisDe, validarVisita } from './visita';

const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const ANDROID_MOVIL = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36';
const ANDROID_TABLETA = 'Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const IPAD = 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const ESCRITORIO = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

describe('contador de la web: lo que se guarda y lo que no', () => {
  test('rutas: solo las de la web publica, en minusculas y sin barra final; nada de consultas ni otras rutas', () => {
    expect(limpiarRuta('/es')).toBe('/es');
    expect(limpiarRuta('/ES/Demo/')).toBe('/es/demo');
    expect(limpiarRuta('/ca/c/gis')).toBe('/ca/c/gis');
    expect(limpiarRuta('/panel')).toBeNull();
    expect(limpiarRuta('/p/P-2026-001')).toBeNull();
    expect(limpiarRuta('/es/demo?nombre=Bar%20Pepe')).toBeNull();
    expect(limpiarRuta('/es/' + 'a'.repeat(300))).toBeNull();
    expect(limpiarRuta(42)).toBeNull();
  });

  test('de la web de origen, solo el dominio y sin www; la propia web no es una fuente', () => {
    expect(dominioDe('https://www.google.com/search?q=teselar+lloret')).toBe('google.com');
    expect(dominioDe('https://l.instagram.com/?u=https%3A%2F%2Fteselarsoftware.com')).toBe('l.instagram.com');
    expect(dominioDe('https://www.teselarsoftware.com/es')).toBeNull();
    expect(dominioDe('')).toBeNull();
    expect(dominioDe('esto no es una url')).toBeNull();
  });

  test('la etiqueta ?origen= solo con letras, numeros y guiones: un nombre o un telefono no entran', () => {
    expect(limpiarOrigen('bio')).toBe('bio');
    expect(limpiarOrigen(' QR-Visitas ')).toBe('qr-visitas');
    expect(limpiarOrigen('Bar Pepe')).toBeNull();
    expect(limpiarOrigen('+34600111222')).toBeNull();
    expect(limpiarOrigen('a'.repeat(31))).toBeNull();
    expect(limpiarOrigen(null)).toBeNull();
  });

  test('robots fuera; dispositivo y pais en una palabra', () => {
    expect(esRobot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')).toBe(true);
    expect(esRobot('Mozilla/5.0 ... Chrome-Lighthouse')).toBe(true);
    expect(esRobot('WhatsApp/2.23.20.0')).toBe(true);
    expect(esRobot(null)).toBe(true);
    expect(esRobot(IPHONE)).toBe(false);
    expect(dispositivoDe(IPHONE)).toBe('movil');
    expect(dispositivoDe(ANDROID_MOVIL)).toBe('movil');
    expect(dispositivoDe(ANDROID_TABLETA)).toBe('tableta');
    expect(dispositivoDe(IPAD)).toBe('tableta');
    expect(dispositivoDe(ESCRITORIO)).toBe('escritorio');
    expect(paisDe('es')).toBe('ES');
    expect(paisDe('XYZ')).toBeNull();
    expect(paisDe(null)).toBeNull();
  });

  test('entrada: la primera pagina de quien llega de fuera o sin origen; moverse por dentro no lo es', () => {
    expect(validarVisita({ ruta: '/es', primera: true, referente: 'https://www.google.com/', origen: 'bio' }, IPHONE, 'ES')).toEqual({
      ruta: '/es', entrada: true, dominio: 'google.com', origen: 'bio', pais: 'ES', dispositivo: 'movil',
    });
    expect(validarVisita({ ruta: '/es/demo', primera: true, referente: '' }, ESCRITORIO, null)).toMatchObject({ entrada: true, dominio: null });
    expect(validarVisita({ ruta: '/es/demo', primera: true, referente: 'https://teselarsoftware.com/es' }, ESCRITORIO, 'ES')).toMatchObject({
      entrada: false, dominio: null, origen: null,
    });
    // En la segunda pagina no se lee ni el origen ni la etiqueta, aunque lleguen
    expect(validarVisita({ ruta: '/es/demo', primera: false, referente: 'https://google.com', origen: 'bio' }, ESCRITORIO, 'ES')).toMatchObject({
      entrada: false, dominio: null, origen: null,
    });
  });

  test('lo que no esta en la lista no llega a la fila, y robots o rutas raras no cuentan', () => {
    const v = validarVisita({ ruta: '/es', primera: true, ip: '1.2.3.4', nombre: 'Ana', agente: IPHONE }, IPHONE, 'ES');
    expect(Object.keys(v ?? {}).sort()).toEqual(['dispositivo', 'dominio', 'entrada', 'origen', 'pais', 'ruta']);
    expect(validarVisita({ ruta: '/es' }, 'Googlebot', 'US')).toBeNull();
    expect(validarVisita({ ruta: '/admin' }, IPHONE, 'ES')).toBeNull();
    expect(validarVisita('hola', IPHONE, 'ES')).toBeNull();
  });
});
