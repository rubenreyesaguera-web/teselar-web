// POST /api/demo/evento: el contador de la demo de gestion (ADR-113, doc 31). Solo cuenta pasos; no lee la IP, ni
// cookies, ni nada del cuerpo que no este en la lista de validarEvento.
import { NextResponse, type NextRequest } from 'next/server';
import { guardarEvento, validarEvento } from '@/lib/demo/evento';

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
