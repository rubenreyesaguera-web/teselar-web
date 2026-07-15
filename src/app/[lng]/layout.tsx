import React from 'react';
import '../../index.css';
import type { Metadata } from 'next';
import { dictionaries } from '../../i18n/dictionaries';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const t = dictionaries[lng as 'es' | 'ca' | 'en'] || dictionaries.en;
  const baseUrl = 'https://www.teselarsoftware.com';

  // Custom metadata based on current language
  const keywordsMap = {
    es: ['diseño web Lloret de Mar', 'desarrollo web Girona', 'páginas web Costa Brava', 'software a medida', 'web inmobiliaria', 'automatización', 'IA', 'Teselar Software'],
    ca: ['disseny web Lloret de Mar', 'desenvolupament web Girona', 'pàgines web Costa Brava', 'programari a mida', 'web immobiliària', 'automatització', 'IA', 'Teselar Software'],
    en: ['web design Lloret de Mar', 'web development Girona', 'websites Costa Brava', 'custom software', 'real estate website', 'automation', 'AI', 'Teselar Software']
  };

  const titlesMap = {
    es: 'Diseño Web y Software a Medida en Lloret de Mar | Teselar Software',
    ca: 'Disseny Web i Programari a Mida a Lloret de Mar | Teselar Software',
    en: 'Web Design & Custom Software in Lloret de Mar | Teselar Software'
  };

  const currentKeywords = keywordsMap[lng as 'es' | 'ca' | 'en'] || keywordsMap.en;
  const currentTitle = titlesMap[lng as 'es' | 'ca' | 'en'] || titlesMap.en;

  return {
    metadataBase: new URL(baseUrl),
    title: currentTitle,
    description: t.hero.subtitle,
    keywords: currentKeywords,
    authors: [{ name: 'Teselar Software' }],
    creator: 'Teselar Software',
    publisher: 'Teselar Software',
    alternates: {
      canonical: `${baseUrl}/${lng}`,
      languages: {
        'es-ES': `${baseUrl}/es`,
        'ca-ES': `${baseUrl}/ca`,
        'en-US': `${baseUrl}/en`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lng === 'ca' ? 'ca_ES' : lng === 'es' ? 'es_ES' : 'en_US',
      url: `${baseUrl}/${lng}`,
      title: currentTitle,
      description: t.hero.subtitle,
      siteName: 'Teselar Software',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Teselar Software — La pieza que encaja',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentTitle,
      description: t.hero.subtitle,
      images: ['/og-image.png'],
    },
    icons: {
      icon: '/favicon.svg',
      apple: '/logo_600x400.jpeg',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lng } = await params;
  const locale = (['es', 'ca', 'en'] as const).includes(lng as 'es' | 'ca' | 'en') ? (lng as 'es' | 'ca' | 'en') : 'en';
  const t = dictionaries[locale];
  const baseUrl = 'https://www.teselarsoftware.com';

  // Identificadores estables del grafo (permiten referenciar entidades entre sí con @id,
  // en vez de repetir los datos — así un LLM/crawler entiende que la Organization, el
  // WebSite y el ProfessionalService son la misma empresa vista desde tres ángulos)
  const organizationId = `${baseUrl}/#organization`;
  const websiteId = `${baseUrl}/#website`;
  const localBusinessId = `${baseUrl}/#localbusiness`;

  const serviceIds = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'] as const;
  const faqIds = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'] as const;

  // Grafo de datos estructurados (GEO/AEO): sustituye al único ProfessionalService previo.
  // Fuente de verdad: la misma copia trilingüe de src/i18n/dictionaries.ts que ve el usuario
  // en pantalla (servicios en #services, preguntas en #faq), así nunca se desincroniza.
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Teselar Software',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo_1526x1224.jpeg`,
          width: 1526,
          height: 1224,
        },
        image: `${baseUrl}/logo_1526x1224.jpeg`,
        email: 'info@teselarsoftware.com',
        telephone: '+34653232735',
        founder: {
          '@type': 'Person',
          name: 'Rubén Reyes',
        },
        // TODO: añadir la ficha de Google Business en cuanto exista — ver ADR-009 del
        // Segundo Cerebro. (GitHub no se incluye: la cuenta no tiene repos públicos.)
        sameAs: [
          'https://www.linkedin.com/company/teselarsoftware/',
        ],
        knowsLanguage: ['es', 'ca', 'en'],
        areaServed: ['Lloret de Mar', 'Blanes', 'Tossa de Mar', 'Girona', 'Costa Brava'],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: baseUrl,
        name: 'Teselar Software',
        inLanguage: lng,
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': localBusinessId,
        name: 'Teselar Software',
        description: 'Diseño web, software a medida, automatización e integración de IA para pymes.',
        url: `${baseUrl}/${lng}`,
        parentOrganization: { '@id': organizationId },
        email: 'info@teselarsoftware.com',
        telephone: '+34653232735',
        priceRange: '150€ - 6.000€',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lloret de Mar',
          addressRegion: 'Girona',
          addressCountry: 'ES',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 41.6995,
          longitude: 2.8458,
        },
        areaServed: ['Lloret de Mar', 'Blanes', 'Tossa de Mar', 'Girona', 'Costa Brava'],
        knowsLanguage: ['es', 'ca', 'en'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Catálogo de Servicios Teselar Software',
          itemListElement: serviceIds.map((id, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: {
              '@type': 'Service',
              name: t.services[id].title.replace(/^\d+\.\s*/, ''),
              description: t.services[id].ideal,
            },
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: t.services[id].price,
              priceCurrency: 'EUR',
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/${lng}#faq`,
        mainEntity: faqIds.map((id) => ({
          '@type': 'Question',
          name: t.faq[id].q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: t.faq[id].a,
          },
        })),
      },
    ],
  };

  return (
    <html lang={lng} className={`${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        <script dangerouslySetInnerHTML={{__html: `
          try {
            if (sessionStorage.getItem('teselar_intro_seen') === 'true') {
              document.documentElement.classList.add('intro-seen');
            }
          } catch(e) {}
        `}} />
      </head>
      <body className="min-h-screen bg-teselar-dark text-claridad font-sans antialiased selection:bg-innovacion selection:text-teselar-dark">
        {children}
      </body>
    </html>
  );
}
