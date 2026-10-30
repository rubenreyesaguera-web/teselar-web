// POST /api/propuestas/apertura (decision 4 del panel, 30/10): la pagina /p/ lo llama al abrirse con el enlace del
// cliente, con la capacidad en la cabecera X-Propuesta-Capacidad, como al aceptar. Se apuntan la primera apertura, la
// ultima y cuantas van; ni IP, ni navegador, ni cookie. Si quien abre tiene el panel abierto (Ruben), no cuenta.
import { NextResponse, type NextRequest } from 'next/server';
import { registrarApertura } from '@/lib/panel/datos';
import { COOKIE, sesionValida } from '@/lib/panel/sesion';
import { origenPermitido } from '@/lib/propuestas/origen';

export const dynamic = 'force-dynamic';

const vacio = () => new NextResponse(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: NextRequest) {
  const sitio = req.headers.get('sec-fetch-site');
  if (!origenPermitido(req.headers.get('origin')) || (sitio && sitio !== 'same-origin')) {
    return new NextResponse(null, { status: 403 });
  }
  if (sesionValida(req.cookies.get(COOKIE)?.value, process.env.PANEL_SECRETO)) return vacio();
  let referencia: unknown;
  try {
    referencia = ((await req.json()) as { referencia?: unknown })?.referencia;
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (typeof referencia !== 'string') return new NextResponse(null, { status: 400 });
  try {
    // Con capacidad mala o propuesta inexistente tambien 204: la respuesta no dice nada a quien prueba.
    await registrarApertura(referencia, req.headers.get('x-propuesta-capacidad') ?? '');
  } catch (e) {
    console.error('[propuestas] no se pudo apuntar la apertura', e instanceof Error ? e.message : e);
  }
  return vacio();
}
