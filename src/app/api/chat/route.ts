import { NextResponse } from 'next/server';

export const maxDuration = 30;

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

const CATALOGO = `
CATÁLOGO OFICIAL TESELAR (precios cerrados, PROHIBIDO inventar otros):
- Auditoría Digital: 150€ (se descuentan del precio si después contrata cualquier proyecto).
- Automatizaciones específicas: 350€–900€.
- Web Esencial: 600€–800€, 1 idioma incluido, cada idioma adicional +150€. Incluye WhatsApp y formulario.
- Integración de IA (chatbots, asistentes): 800€–3.000€ + supervisión mensual con el Plan Básico de mantenimiento (60€/mes). Las claves de API son del cliente.
- Web Completa: desde 1.500€ con 2 idiomas incluidos, cada idioma adicional +250€. Blog, panel de gestión.
- Tienda Online / E-commerce: desde 4.000€, Plan Básico de mantenimiento incluido el primer año.
- Web Inmobiliaria: desde 3.000€. Buscador con filtros, panel de propiedades, 2 idiomas, exportación XML Kyero para Idealista/Habitaclia/Fotocasa. Plan Básico incluido el primer año.
- Sistema de Gestión a Medida (ERP/CRM): 4.000€–6.000€, Plan Básico incluido el primer año.
- Mantenimiento (sin permanencia): Plan Básico 60€/mes — monitorización automática 24/7, copias de seguridad semanales, actualizaciones y corrección de errores, 1h/mes de cambios, supervisión del asistente IA si aplica, respuesta en 24-48h laborables, informe trimestral. Plan Plus 150€/mes — todo lo del Básico con copias diarias, 5h/mes de desarrollo (no acumulables), vigilancia de pasarelas de pago y feeds a portales, respuesta el mismo día laborable (4h en incidencia crítica), informe mensual. Para e-commerce e inmobiliarias recomienda el Plus.
- Condiciones: 50% por adelantado, 1 semana de ajustes en vivo gratis tras el lanzamiento.
- Proyecto combinado: si se contratan varios servicios a la vez, el de mayor importe va al 100% y cada adicional lleva un 15% de descuento (el análisis y la puesta en marcha se hacen una sola vez). Los mantenimientos mensuales no se descuentan.
`;

function construirSystemPrompt(leadCaptured: boolean): string {
  let s = `
Eres el asistente de Teselar Software, estudio de diseño web y software a medida en Lloret de Mar (Girona). Tus respuestas deben ser MUY BREVES (máximo 2-3 frases cortas), con tono cercano, profesional y sin tecnicismos.
REGLA 1: Mimetiza el idioma del usuario al instante y mantenlo siempre.
REGLA HONESTIDAD: PROHIBIDO inventar descuentos, plazos, servicios o promesas que no estén en el catálogo. Si te preguntan algo fuera del catálogo o un detalle de alcance, responde que eso te lo confirma Rubén en una llamada, y captura el contacto.
REGLA DEMO: Tú mismo eres la demostración en vivo del servicio "Integración de IA". Si te preguntan si pueden tener un asistente como tú en su web, responde con orgullo que sí: desde 800€ + 60€/mes de supervisión (Plan Básico).
`;
  if (leadCaptured) {
    s += `
REGLA 2: OBJETIVO CUMPLIDO. Ya tienes los datos del cliente: ESTÁ PROHIBIDO pedirle más datos. Cierra la conversación con elegancia.
REGLA 3: Si sigue preguntando por servicios, responde de forma servicial con el catálogo y recuérdale que Rubén le ampliará los detalles en la llamada.
REGLA 4: SOLO si el cliente revela información crítica nueva (presupuesto exacto, servicio distinto), añade al final el marcador: [LEAD_UPDATED: Nombre | Servicio de interés | Teléfono]
`;
  } else {
    s += `
REGLA 2: NINGÚN CALLEJÓN SIN SALIDA. Todas tus respuestas terminan con una pregunta suave para mantener la conversación.
REGLA 3: EL EMBUDO. En las primeras 2 interacciones, entiende qué necesita (tipo de negocio, qué le falta online). En la 3ª interacción haz la transición al cierre: ofrece que Rubén le llame sin compromiso y pide nombre y teléfono.
REGLA 4: Cuando tengas nombre y teléfono, agradece en el mismo idioma del usuario y añade obligatoriamente al final el marcador: [LEAD_CLOSED: Nombre | Servicio de interés | Teléfono]. Ejemplo: [LEAD_CLOSED: Marta | Web Inmobiliaria | 612345678]
REGLA 5: Tras confirmar los datos, no hagas más preguntas.
`;
  }
  return s + CATALOGO;
}

async function intentarGemini(apiKey: string, system: string, messages: ChatMessage[], newMsgText: string): Promise<string | null> {
  try {
    const history = messages
      .filter((msg, index) => !(index === 0 && msg.sender === 'bot'))
      .map(msg => ({ role: msg.sender === 'bot' ? 'model' : 'user', parts: [{ text: msg.text }] }));
    history.push({ role: 'user', parts: [{ text: newMsgText }] });

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: history,
        generationConfig: { temperature: 0.7 }
      })
    });
    if (!res.ok) throw new Error(`Gemini ${res.status}`);
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (e) {
    console.error('Gemini falló:', e);
    return null;
  }
}

async function intentarOpenAICompatible(url: string, apiKey: string, model: string, system: string, messages: ChatMessage[], newMsgText: string, extraHeaders: Record<string, string> = {}): Promise<string | null> {
  try {
    const chatMessages = [
      { role: 'system', content: system },
      ...messages
        .filter((msg, index) => !(index === 0 && msg.sender === 'bot'))
        .map(msg => ({ role: msg.sender === 'bot' ? 'assistant' : 'user', content: msg.text })),
      { role: 'user', content: newMsgText }
    ];
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json', ...extraHeaders },
      body: JSON.stringify({ model, messages: chatMessages, temperature: 0.7 })
    });
    if (!res.ok) throw new Error(`${url} ${res.status}`);
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || null;
  } catch (e) {
    console.error(`${model} falló:`, e);
    return null;
  }
}

// Si el bot cerró un lead, lo mandamos al mismo buzón que el formulario de la web
async function enviarLead(marcador: string, tipo: string) {
  try {
    const [nombre, servicio, telefono] = marcador.split('|').map(s => s.trim());
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '5c1024f8-ccf6-408d-926f-553dd013526a',
        subject: `🤖 Lead del chatbot (${tipo}): ${nombre}`,
        from_name: 'Chatbot Teselar',
        nombre,
        servicio_interes: servicio,
        telefono
      })
    });
  } catch (e) {
    console.error('Web3Forms falló:', e);
  }
}

const FALLBACK: Record<string, string> = {
  es: 'Ahora mismo no puedo responder (¡hasta los asistentes de IA descansan!). Escríbenos por WhatsApp al +34 653 232 735 o usa el formulario de contacto y te respondemos enseguida.',
  ca: 'Ara mateix no puc respondre (fins i tot els assistents d\'IA descansen!). Escriu-nos per WhatsApp al +34 653 232 735 o fes servir el formulari de contacte.',
  en: 'I can\'t answer right now (even AI assistants need a break!). Message us on WhatsApp at +34 653 232 735 or use the contact form and we\'ll get back to you shortly.'
};

export async function POST(req: Request) {
  const { messages = [], newMsgText, leadCaptured = false, lng = 'es' } = await req.json();
  if (!newMsgText) return NextResponse.json({ error: 'Falta el mensaje' }, { status: 400 });

  const system = construirSystemPrompt(leadCaptured);
  const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;

  let botResponse: string | null = null;
  if (geminiKey) botResponse = await intentarGemini(geminiKey, system, messages, newMsgText);
  if (!botResponse && groqKey) botResponse = await intentarOpenAICompatible('https://api.groq.com/openai/v1/chat/completions', groqKey, 'llama-3.1-8b-instant', system, messages, newMsgText);
  if (!botResponse && openRouterKey) botResponse = await intentarOpenAICompatible('https://openrouter.ai/api/v1/chat/completions', openRouterKey, 'openrouter/auto', system, messages, newMsgText, { 'HTTP-Referer': 'https://www.teselarsoftware.com', 'X-Title': 'Teselar Software' });

  if (!botResponse) {
    return NextResponse.json({ response: FALLBACK[lng] || FALLBACK.es, offline: true });
  }

  // Detectar y despachar el lead; el marcador nunca llega al navegador
  let leadClosed = false;
  const match = botResponse.match(/\[LEAD_(CLOSED|UPDATED):([^\]]+)\]/);
  if (match) {
    leadClosed = match[1] === 'CLOSED';
    await enviarLead(match[2], match[1]);
    botResponse = botResponse.replace(/\[LEAD_(CLOSED|UPDATED):[^\]]+\]/g, '').trim();
  }

  return NextResponse.json({ response: botResponse, leadClosed });
}
