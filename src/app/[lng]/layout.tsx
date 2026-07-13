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
          url: '/logo_1526x1224.jpeg', // Using the existing high-res logo in the repository
          width: 1526,
          height: 1224,
          alt: 'Teselar Software Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentTitle,
      description: t.hero.subtitle,
      images: ['/logo_1526x1224.jpeg'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/logo_600x400.jpeg',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lng } = await params;
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Teselar Software',
    description: 'Diseño web, software a medida, automatización e integración de IA para pymes.',
    url: `https://www.teselarsoftware.com/${lng}`,
    email: 'info@teselarsoftware.com',
    telephone: '+34653232735',
    priceRange: '150€ - 6.000€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lloret de Mar',
      addressRegion: 'Girona',
      addressCountry: 'ES'
    },
    areaServed: ['Lloret de Mar', 'Blanes', 'Tossa de Mar', 'Girona', 'Costa Brava'],
    knowsLanguage: ['es', 'ca', 'en']
  };
  return (
    <html lang={lng} className={`${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
