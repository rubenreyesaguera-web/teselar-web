import { NextResponse } from 'next/server';

export const maxDuration = 30;

// Punto unico de entrada de leads. Hasta el 2026-09-10 solo servia a la descarga
// de recursos; ahora tambien al formulario de contacto y a TesS, para que los tres
// queden REGISTRADOS en la hoja antes de que nadie intente avisar de nada. Ver ADR-050:
// cuando el aviso y el archivo son la misma cosa, al romperse el aviso se pierde el dato.
export async function POST(req: Request) {
  const cuerpo = await req.json();
  const { email, telefono, nombre, negocio, quePedia, slug, titulo, consentimiento, origen } = cuerpo;

  // El lead de un recurso sigue exigiendo lo de siempre; los otros solo piden una
  // forma de devolver la llamada, que en el chat es un telefono y no un correo.
  const esRecurso = Boolean(slug);
  if (esRecurso && (!email || !titulo || !consentimiento)) {
    return NextResponse.json({ error: 'missing-fields' }, { status: 400 });
  }
  if (!esRecurso && !email && !telefono) {
    return NextResponse.json({ error: 'missing-contact' }, { status: 400 });
  }

  const webhookUrl = process.env.MAKE_LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: 'webhook-not-configured' }, { status: 500 });
  }

  const makeResponse = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tipo: 'lead',
      origen: origen || 'recurso-pdf',
      email: email || '',
      telefono: telefono || '',
      nombre: nombre || '',
      negocio: negocio || '',
      quePedia: quePedia || titulo || '',
      slug: slug || '',
      titulo: titulo || '',
      consentimiento: String(consentimiento ?? ''),
    }),
  });

  if (!makeResponse.ok) {
    return NextResponse.json({ error: 'webhook-failed' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
