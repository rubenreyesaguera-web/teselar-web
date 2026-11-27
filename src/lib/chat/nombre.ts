// TesS explica su nombre («Tes de Teselar y la S de Software») sin que se lo pregunten, y su regla lo prohíbe: visto el 26/11 y,
// el 27/11, en 4 de las 10 primeras respuestas de la charla del taller (ADR-122). El servidor lo mira como el plural o las
// cifras: si lo explica y nadie ha preguntado por su nombre, pide reescribir; si aun así sigue, quita esa frase.
const plano = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// «Tes» de Teselar … «S» de Software, con o sin comillas, en los tres idiomas («de», «from», «for»)
const EXPLICA = /\btes\b\W{0,3}\s*(de|from|for|of)\s+teselar\b[\s\S]{0,60}?\bs\b\W{0,3}\s*(de|from|for|of)\s+software\b/;
// El usuario ha preguntado por el nombre si lo nombra o pregunta cómo se llama o qué significa
const PREGUNTA = /\b(tess|nombre|nom|name|llamas|dius|called|significa|vol dir|mean|means)\b/;

export function explicaElNombre(texto: string): boolean {
  return EXPLICA.test(plano(texto));
}

export function preguntanPorElNombre(delUsuario: string[]): boolean {
  return delUsuario.some(m => PREGUNTA.test(plano(m)));
}

// Último recurso: quita las frases (o los trozos tras «;») que explican el nombre. Si no quedara nada, deja el texto tal cual.
export function sinExplicarElNombre(texto: string): string {
  const trozos = texto.split(/(?<=[.!?;])\s+/);
  const quedan: string[] = [];
  trozos.forEach((t, k) => {
    if (explicaElNombre(t)) {
      // Lo que iba antes de un «;» quitado acaba ahora en punto
      if (k > 0 && quedan.length) quedan[quedan.length - 1] = quedan[quedan.length - 1].replace(/;$/, '.');
    } else quedan.push(t);
  });
  if (!quedan.length || quedan.length === trozos.length) return texto;
  return quedan.join(' ').replace(/;$/, '.').trim();
}
