// POST /api/propuestas/aceptar (ADR-091, hito 6.5). La capacidad llega en la cabecera X-Propuesta-Capacidad: el
// navegador la saca del fragmento de la URL, que nunca viaja en la peticion de la pagina. No se registra en ningun
// log, ni ella ni el cuerpo.
import { after, NextResponse, type NextRequest } from 'next/server';
import { aceptarPropuesta, registrarEvento } from '@/lib/propuestas/aceptar';
import { enviarAcuse, enviarAviso, textoAceptacion, textoAcuse } from '@/lib/propuestas/aviso';
import { leerPropuesta } from '@/lib/propuestas/leer';
import { generarPdf } from '@/lib/propuestas/pdf';

/** El domicilio completo del prestador va solo en el PDF de quien firma; vive en el entorno, no en el codigo. */
const DOMICILIO = process.env.TESELAR_DOMICILIO ?? 'Lloret de Mar (Girona)';

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
    const resultado = await aceptarPropuesta(url, req.headers.get('x-propuesta-capacidad') ?? '', entrada, (j, quien, lengua) => {
      // Despues de responder: la clienta no espera a los correos, y si fallan queda como evento.
      after(async () => {
        const { asunto, texto } = textoAceptacion(j, quien, base);
        try {
          await enviarAviso(asunto, texto);
        } catch (e) {
          await registrarEvento(url, j.referencia, 'aviso_fallido', { error: e instanceof Error ? e.message : String(e) });
        }
      });
      // El acuse con el PDF (LSSI art. 28: en 24 horas). Si falla, Ruben lo sabe por correo y por el evento, y lo manda a mano.
      after(async () => {
        try {
          const p = await leerPropuesta(j.referencia);
          if (!p) throw new Error('No se pudo leer la propuesta para el PDF');
          const pdf = await generarPdf({ instantanea: p.instantanea, justificante: j, quien, lengua, domicilioProveedor: DOMICILIO });
          const a = textoAcuse(j, quien, lengua, base);
          await enviarAcuse({ para: quien.correo, ...a, pdf });
          await registrarEvento(url, j.referencia, 'acuse_enviado', { lengua, bytes: pdf.length });
        } catch (e) {
          const error = e instanceof Error ? e.message : String(e);
          await registrarEvento(url, j.referencia, 'acuse_fallido', { error });
          try {
            await enviarAviso(
              `${base === 'neondb' ? '' : '[PRUEBAS] '}NO salió el PDF de ${j.referencia}`,
              `El cliente aceptó ${j.referencia}, pero no le llegó su copia en PDF:\n\n${error}\n\nMándasela a mano antes de 24 horas (LSSI art. 28).`,
            );
          } catch {
            // Ya esta en la base.
          }
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
