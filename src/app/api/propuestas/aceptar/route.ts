// POST /api/propuestas/aceptar (ADR-091, hito 6.5). La capacidad llega en la cabecera X-Propuesta-Capacidad: el
// navegador la saca del fragmento de la URL, que nunca viaja en la peticion de la pagina. No se registra en ningun
// log, ni ella ni el cuerpo.
import { after, NextResponse, type NextRequest } from 'next/server';
import { aceptarPropuesta, registrarEvento } from '@/lib/propuestas/aceptar';
import { enviarAviso, textoAceptacion } from '@/lib/propuestas/aviso';

export const dynamic = 'force-dynamic';

const ORIGENES = ['https://www.teselarsoftware.com', 'https://teselarsoftware.com'];

/** Lista exacta; PROPUESTAS_ORIGENES (separados por comas) solo para probar en local o en una vista previa. */
function origenPermitido(origen: string | null): boolean {
  if (!origen || origen === 'null') return false;
  const extra = (process.env.PROPUESTAS_ORIGENES ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  return [...ORIGENES, ...extra].includes(origen);
}

const noStore = { 'Cache-Control': 'no-store' };

export async function POST(req: NextRequest) {
  const sitio = req.headers.get('sec-fetch-site');
  if (!origenPermitido(req.headers.get('origin')) || (sitio && sitio !== 'same-origin')) {
    return NextResponse.json({ ok: false, codigo: 'origen', mensaje: 'Origen no permitido' }, { status: 403, headers: noStore });
  }
  const url = process.env.DATABASE_URL;
  if (!url) return NextResponse.json({ ok: false, codigo: 'config', mensaje: 'No disponible' }, { status: 503, headers: noStore });
  const base = new URL(url).pathname.slice(1);

  let entrada: unknown;
  try {
    entrada = await req.json();
  } catch {
    return NextResponse.json({ ok: false, codigo: 'datos', mensaje: 'Faltan los datos' }, { status: 400, headers: noStore });
  }
  const referencia = typeof (entrada as { referencia?: unknown })?.referencia === 'string' ? (entrada as { referencia: string }).referencia : '?';

  try {
    const resultado = await aceptarPropuesta(url, req.headers.get('x-propuesta-capacidad') ?? '', entrada, (j, quien) => {
      // Despues de responder: la clienta no espera al correo, y si falla queda como evento.
      after(async () => {
        const { asunto, texto } = textoAceptacion(j, quien, base);
        try {
          await enviarAviso(asunto, texto);
        } catch (e) {
          await registrarEvento(url, j.referencia, 'aviso_fallido', { error: e instanceof Error ? e.message : String(e) });
        }
      });
    });
    return NextResponse.json(resultado.body, { status: resultado.status, headers: noStore });
  } catch (e) {
    // El unico instante que no se puede perder (hito 6.6): queda en la base y se avisa.
    const error = e instanceof Error ? e.message : String(e);
    console.error('[propuestas] error al aceptar', referencia, error);
    after(async () => {
      await registrarEvento(url, referencia, 'error_aceptacion', { error });
      try {
        await enviarAviso(`${base === 'neondb' ? '' : '[PRUEBAS] '}FALLO al aceptar la propuesta ${referencia}`, `Alguien intentó aceptar ${referencia} y falló:\n\n${error}\n\nMira la tabla evento.`);
      } catch {
        // Ya esta en la base.
      }
    });
    return NextResponse.json(
      { ok: false, codigo: 'error', mensaje: 'No se ha podido guardar. Vuelve a intentarlo en un momento; si sigue, escríbeme.' },
      { status: 500, headers: noStore },
    );
  }
}
