// POST /api/demo/evento: el contador de la demo de gestion (ADR-113, doc 31). Solo cuenta pasos; no lee la IP ni nada
// del cuerpo que no este en la lista de validarEvento. Desde el 5/11, como el contador de visitas, no cuenta robots ni a
// Ruben con el panel abierto: de las 20 aperturas de octubre, 16 eran pruebas nuestras del 22 al 24/10 y dos, de
// madrugada. La cookie del panel solo se mira para no contar; el navegador, solo para descartar robots.
import { NextResponse, type NextRequest } from 'next/server';
import { guardarEvento, validarEvento } from '@/lib/demo/evento';
import { esRobot } from '@/lib/estadisticas/visita';
import { COOKIE, sesionValida } from '@/lib/panel/sesion';

export const dynamic = 'force-dynamic';

const ORIGENES = ['https://www.teselarsoftware.com', 'https://teselarsoftware.com'];
const MAXIMO_CUERPO = 1000;

/** Lista exacta; DEMO_ORIGENES (separados por comas) solo para probar en local o en una vista previa. */
function origenPermitido(origen: string | null): boolean {
  if (!origen || origen === 'null') return false;
  const extra = (process.env.DEMO_ORIGENES ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  return [...ORIGENES, ...extra].includes(origen);
}

const noStore = { 'Cache-Control': 'no-store' };

export async function POST(req: NextRequest) {
  const sitio = req.headers.get('sec-fetch-site');
  if (!origenPermitido(req.headers.get('origin')) || (sitio && sitio !== 'same-origin')) {
    return new NextResponse(null, { status: 403, headers: noStore });
  }

  const cuerpo = await req.text();
  if (cuerpo.length > MAXIMO_CUERPO) return new NextResponse(null, { status: 413, headers: noStore });
  let entrada: unknown;
  try {
    entrada = JSON.parse(cuerpo);
  } catch {
    return new NextResponse(null, { status: 400, headers: noStore });
  }
  const evento = validarEvento(entrada);
  if (!evento) return new NextResponse(null, { status: 400, headers: noStore });
  // Robots y Ruben: 204 igualmente, la respuesta no dice si se ha contado.
  if (esRobot(req.headers.get('user-agent')) || sesionValida(req.cookies.get(COOKIE)?.value, process.env.PANEL_SECRETO)) {
    return new NextResponse(null, { status: 204, headers: noStore });
  }

  const url = process.env.DATABASE_URL;
  if (!url) return new NextResponse(null, { status: 503, headers: noStore });
  try {
    await guardarEvento(url, evento);
  } catch (e) {
    // Sin el cuerpo: solo el motivo. La demo sigue funcionando aunque no se cuente.
    console.error('demo/evento:', e instanceof Error ? e.message : e);
    return new NextResponse(null, { status: 500, headers: noStore });
  }
  return new NextResponse(null, { status: 204, headers: noStore });
}
