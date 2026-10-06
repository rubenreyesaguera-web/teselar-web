import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { RECURSOS, getRecurso } from '../../../../data/recursos';

const BASE_URL = 'https://www.teselarsoftware.com';

// Landing de captura de lead magnets: no debe indexarse, no aporta contenido propio de
// busqueda y solo tiene sentido llegando desde el enlace del primer comentario de LinkedIn.
const ROBOTS: Metadata['robots'] = {
  index: false,
  follow: true,
};

// Las cinco landings se generan al compilar, igual que las portadas desde el 2/10/2026:
// dinamicas, Next mandaba sus metadatos por streaming al <body>.
export function generateStaticParams() {
  return Object.keys(RECURSOS).map((slug) => ({ slug }));
}

// Hasta el 6/10/2026 estas paginas no tenian titulo propio: heredaban el de la portada, asi
// que la tarjeta del enlace en LinkedIn o WhatsApp anunciaba "IA y Software a Medida en
// Lloret de Mar" en vez del recurso. Y el canonical apuntaba a la portada.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string; slug: string }>;
}): Promise<Metadata> {
  const { lng, slug } = await params;
  const recurso = getRecurso(slug);
  if (!recurso) return { robots: ROBOTS };

  const url = `${BASE_URL}/${lng}/recursos/${slug}`;
  const titulo = `${recurso.titulo} · Recurso gratuito | Teselar Software`;
  return {
    title: titulo,
    description: recurso.subtitulo,
    robots: ROBOTS,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: titulo,
      description: recurso.subtitulo,
      siteName: 'Teselar Software',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Teselar Software — La pieza que encaja' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: recurso.subtitulo,
      images: ['/og-image.png'],
    },
  };
}

export default function RecursoLayout({ children }: { children: ReactNode }) {
  return children;
}
