import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { email, slug, titulo, consentimiento, origen } = await req.json();

  if (!email || !slug || !titulo || !consentimiento) {
    return NextResponse.json({ error: 'missing-fields' }, { status: 400 });
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
      email,
      slug,
      titulo,
      consentimiento: String(consentimiento),
      origen: origen || 'landing-recursos',
    }),
  });

  if (!makeResponse.ok) {
    return NextResponse.json({ error: 'webhook-failed' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
