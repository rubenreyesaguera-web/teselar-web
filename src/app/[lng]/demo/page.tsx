import type { Metadata } from 'next';
import { dictionaries } from '../../../i18n/dictionaries';
import { EJEMPLOS } from '../../../data/demo';
import { DemoGestion } from '../../../components/demo/DemoGestion';

// La demo de gestion (ADR-113, doc 31): indexable y en los tres idiomas. El componente es de cliente, pero aqui se le
// pasan solo sus textos y los ejemplos de su idioma, no el diccionario entero.

type Lng = 'es' | 'ca' | 'en';
const BASE = 'https://www.teselarsoftware.com';

function idioma(lng: string): Lng {
  return (['es', 'ca', 'en'] as const).includes(lng as Lng) ? (lng as Lng) : 'en';
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const lng = idioma((await params).lng);
  const t = dictionaries[lng].demo;
  const url = `${BASE}/${lng}/demo`;
  return {
    title: t.meta_title,
    description: t.meta_description,
    alternates: {
      canonical: url,
      languages: {
        'es-ES': `${BASE}/es/demo`,
        'ca-ES': `${BASE}/ca/demo`,
        'en-US': `${BASE}/en/demo`,
        'x-default': `${BASE}/es/demo`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lng === 'ca' ? 'ca_ES' : lng === 'es' ? 'es_ES' : 'en_US',
      url,
      title: t.meta_title,
      description: t.meta_description,
      siteName: 'Teselar Software',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Teselar Software — La pieza que encaja' }],
    },
    twitter: { card: 'summary_large_image', title: t.meta_title, description: t.meta_description, images: ['/og-image.png'] },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ lng: string }> }) {
  const lng = idioma((await params).lng);
  return <DemoGestion lng={lng} t={dictionaries[lng].demo} ejemplos={EJEMPLOS[lng]} />;
}
