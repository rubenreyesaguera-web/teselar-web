// POST /api/visita: el contador de toda la web (fase 2 del panel, 30/10). Solo cuenta paginas vistas; la IP y el
// navegador se miran al llegar (pais de la cabecera de Vercel, tipo de dispositivo, si es un robot) y no se guardan.
// Si quien visita tiene el panel abierto (Ruben), no cuenta, como las aperturas de las propuestas.
import { NextResponse, type NextRequest } from 'next/server';
import { guardarVisita, validarVisita } from '@/lib/estadisticas/visita';
import { COOKIE, sesionValida } from '@/lib/panel/sesion';
import { origenPermitido } from '@/lib/propuestas/origen';

export const dynamic = 'force-dynamic';

const MAXIMO_CUERPO = 1000;
const noStore = { 'Cache-Control': 'no-store' };
const vacio = () => new NextResponse(null, { status: 204, headers: noStore });

export async function POST(req: NextRequest) {
  const sitio = req.headers.get('sec-fetch-site');
  if (!origenPermitido(req.headers.get('origin')) || (sitio && sitio !== 'same-origin')) {
    return new NextResponse(null, { status: 403, headers: noStore });
  }
  if (sesionValida(req.cookies.get(COOKIE)?.value, process.env.PANEL_SECRETO)) return vacio();

  const cuerpo = await req.text();
  if (cuerpo.length > MAXIMO_CUERPO) return new NextResponse(null, { status: 413, headers: noStore });
  let entrada: unknown;
  try {
    entrada = JSON.parse(cuerpo);
  } catch {
    return new NextResponse(null, { status: 400, headers: noStore });
  }
  const visita = validarVisita(entrada, req.headers.get('user-agent'), req.headers.get('x-vercel-ip-country'));
  // Robots y rutas raras: 204 igualmente, la respuesta no dice nada.
  if (!visita) return vacio();

  const url = process.env.DATABASE_URL;
  if (!url) return new NextResponse(null, { status: 503, headers: noStore });
  try {
    await guardarVisita(url, visita);
  } catch (e) {
    console.error('visita:', e instanceof Error ? e.message : e);
    return new NextResponse(null, { status: 500, headers: noStore });
  }
  return vacio();
}
