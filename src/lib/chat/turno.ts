// La orden de cada turno de TesS (ADR-122, addenda del 20/11, decisiones 1 y 4).
//
// Las normas de la llamada ya estaban en el prompt y el modelo gratuito no las cumplía: en la batería del 20/11 ofreció la
// llamada en 5 de 6 primeras respuestas, la repitió en respuestas seguidas y se la ofreció a quien abrió con «no voy a
// comprar». Así que el servidor mira la conversación y le añade a TesS una orden SOLO para ese turno. No depende de que el
// modelo cuente respuestas ni recuerde lo que dijo: eso lo hace este código.

export interface Mensaje {
  sender: 'bot' | 'user';
  text: string;
}

export type Turno = 'no_compra' | 'caro' | 'primera' | 'tras_llamada' | 'libre';

const plano = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// «No voy a comprar», «solo quería saberlo», «no me interesa», «no tengo negocio», en castellano, catalán e inglés.
const NO_COMPRA = [
  /\bno (voy a|pienso|quiero) (comprar|contratar)/,
  /\bno (me )?interesa/,
  /\bsolo (queria|quiero|tengo) (saber|informacion|curiosidad|mirar)/,
  /\bsolo (miraba|estaba mirando|curiosidad|por curiosidad|era curiosidad)/,
  /\bno tengo (negocio|empresa)\b/,
  /\bestoy (contento|bien) (asi|como estoy)/,
  /\bno (vull|penso) (comprar|contractar)/,
  /\bnomes (volia|vull) (saber|informacio|mirar)/,
  /\bno m'interessa/,
  /\b(not (going to|gonna) buy|not interested|just (looking|curious|browsing)|i'?m not buying)/,
];

// «Caro», «no tengo presupuesto», «no me lo puedo permitir».
const CARO = [
  /\bcar[oa]s?\b/,
  /\bno (tengo|hay|me llega el) (presupuesto|dinero)/,
  /\b(se me va|se sale) de(l)? presupuesto/,
  /\bno me lo puedo permitir/,
  /\bmassa car/,
  /\bno (tinc|hi ha) (pressupost|diners)/,
  /\b(expensive|too much|can'?t afford|no budget|out of my budget)/,
];

// Lo que TesS dice cuando ofrece la llamada o el diagnóstico.
const OFRECE_LLAMADA = [
  /\bte (llame|llama|llamara)\b/,
  /\bllamarte\b/,
  /\bdiagnostico\b/,
  /\benlace para (reservar|elegir)/,
  /\bet (truqui|truca|trucara)\b/,
  /\bdiagnostic\b/,
  /\b(call you|give you a call|diagnosis)\b/,
];

// Un sí corto a lo que se le ofreció: entonces TesS tiene que seguir (pedir los datos o pasar el enlace), sin orden.
const SI = /^(si|vale|ok|okay|claro|perfecto|de acuerdo|venga|adelante|por favor|d'acord|endavant|yes|sure|please)\b/;

// Pregunta el precio él: en la primera respuesta se le puede dar, sin llamada.
const PREGUNTA_PRECIO = /\b(cuanto (cuesta|vale|cobras|cobra|sale|costaria)|precio|precios|quant (costa|val)|preu|how much|price)\b/;

const coincide = (texto: string, patrones: RegExp[]) => patrones.some(p => p.test(plano(texto)));

/** Qué turno es. Prioridad: el «no» manda sobre todo; después «caro»; después la primera respuesta; después la repetición. */
export function tipoDeTurno(historial: Mensaje[], nuevo: string): Turno {
  const delCliente = [...historial.filter(m => m.sender === 'user').map(m => m.text), nuevo];
  if (delCliente.some(t => coincide(t, NO_COMPRA))) return 'no_compra';
  if (coincide(nuevo, CARO)) return 'caro';

  // El widget manda su saludo como primer mensaje de TesS: la primera respuesta es la que no tiene ninguna de TesS después
  // del primer mensaje del cliente.
  const primerCliente = historial.findIndex(m => m.sender === 'user');
  const respuestas = primerCliente < 0 ? [] : historial.slice(primerCliente).filter(m => m.sender === 'bot');
  if (respuestas.length === 0) return 'primera';

  const anterior = respuestas[respuestas.length - 1].text;
  if (coincide(anterior, OFRECE_LLAMADA) && !SI.test(plano(nuevo.trim()))) return 'tras_llamada';
  return 'libre';
}

/** La orden que se añade al final del prompt en este turno, o null si no hace falta ninguna. */
export function ordenDelTurno(historial: Mensaje[], nuevo: string): string | null {
  switch (tipoDeTurno(historial, nuevo)) {
    case 'no_compra':
      return 'El cliente ha dicho que no va a comprar o que solo quiere información. Contesta lo que pregunte y NO ofrezcas nada: ni productos, ni precios que no pida, ni la llamada, ni el diagnóstico, ni el enlace. No le hagas preguntas sobre su negocio. Como mucho, dile que aquí estás si algún día lo necesita.';
    case 'caro':
      return 'Le parece caro o no tiene presupuesto. NO repitas el precio que ya le diste. Baja un escalón (citas con WhatsApp → sin WhatsApp; la tienda → la Web Esencial con botón de WhatsApp), o dile que con lo que tiene le basta o que lo puede hacer él. Acaba ofreciendo el diagnóstico gratuito para que Rubén estudie su caso y dejándole elegir, con esta idea: «¿Quieres que Rubén estudie tu caso? Te paso el enlace para elegir hora, o si prefieres te llama él.» No ofrezcas solo la llamada.';
    case 'primera':
      return PREGUNTA_PRECIO.test(plano(nuevo))
        ? 'Es tu primera respuesta y pregunta el precio: dáselo, con + IVA. En esta respuesta NO ofrezcas la llamada, ni el diagnóstico, ni el enlace. Acaba con UNA pregunta sobre su negocio o lo que pierde hoy.'
        : 'Es tu primera respuesta. Contesta lo que pregunte y acaba con UNA pregunta sobre su negocio o lo que pierde hoy. En esta respuesta NO ofrezcas la llamada, ni el diagnóstico, ni el enlace, y NO des precios: todavía no sabes qué le falta.';
    case 'tras_llamada':
      return 'En tu respuesta anterior ya ofreciste la llamada o el diagnóstico y no ha dicho que sí. En esta NO lo vuelvas a ofrecer: contesta lo que pregunte y acaba con una pregunta sobre lo que le falta o lo que pierde hoy.';
    default:
      return null;
  }
}
