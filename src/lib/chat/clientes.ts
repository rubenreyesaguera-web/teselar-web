// La REGLA CLIENTES (27/11, opción C de Rubén) contesta a «¿Cuántos clientes tenéis?», pero el mismo día TesS la usó para
// «¿Y cuántos clientes estoy perdiendo con la libreta?», que pregunta por los clientes del usuario (la pregunta de P8). El
// servidor lo mira: si responde con la frase de los clientes de Rubén y la pregunta es sobre su propio negocio, pide reescribir.
const plano = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// La frase fija de la regla, en los tres idiomas (basta con un trozo)
const FRASE = /(antes que darte un numero|abans que donar-te un numero|rather (you )?see (it|them) than (give|giving) you a number|prefiero que lo veas)/;
// Primera persona del usuario sobre su negocio, y no sobre Teselar
const SUYOS = /\b(estoy perdiendo|pierdo|perdere|mis clientes|mi negocio|mi taller|perdo|estic perdent|els meus clients|am i losing|i lose|my customers|my clients)\b/;
const DE_RUBEN = /\b(teneis|tienes|tiene ruben|habeis|has hecho|ha hecho|teniu|tens|do you have|have you)\b/;

export function respondeComoClientesDeRuben(texto: string): boolean {
  return FRASE.test(plano(texto));
}

export function preguntaPorSusClientes(pregunta: string): boolean {
  const p = plano(pregunta);
  return SUYOS.test(p) && !DE_RUBEN.test(p);
}
