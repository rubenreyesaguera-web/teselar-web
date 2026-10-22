// GET /api/contacto/[slug]?lng=es|ca: la ficha de contacto (vCard) de Ruben, con la nota de que colaborador se lo
// presento. Nunca lleva datos del colaborador (fase 4 del doc 31).
import { NextResponse, type NextRequest } from 'next/server';
import { COLABORADORES } from '@/data/colaboradores';
import { vcardRuben } from '@/lib/colaboradores/enlaces';
import { textos } from '@/lib/colaboradores/textos';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COLABORADORES[slug];
  if (!c) return new NextResponse(null, { status: 404 });
  const pedido = req.nextUrl.searchParams.get('lng');
  const lng = pedido === 'ca' && c.idiomas.includes('ca') ? 'ca' : 'es';
  return new NextResponse(vcardRuben(textos(lng, c).nota_vcard), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Ruben-Reyes-Teselar.vcf"',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
