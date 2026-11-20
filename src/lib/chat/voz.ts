// Teselar es Rubén solo (REGLA DE VOZ del prompt): TesS no puede hablar de Teselar en plural. El prompt lo prohíbe y aun
// así se cuela («lo que hacemos», batería del 20/11, ADR-122), así que el servidor lo mira en cada respuesta.
const plano = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const PLURAL = [
  // castellano
  /\b(hacemos|somos|nosotros|nuestro|nuestra|nuestros|nuestras|trabajamos|ofrecemos|montamos|tenemos|podemos|agendemos|reservemos)\b/,
  // catalán
  /\b(fem|som|nosaltres|nostre|nostra|nostres|treballem|oferim|muntem|tenim|podem)\b/,
  // inglés
  /\b(we|our|ours|we're|we've|we'll)\b/,
];

export function hablaEnPlural(texto: string): boolean {
  const t = plano(texto);
  return PLURAL.some(p => p.test(t));
}
