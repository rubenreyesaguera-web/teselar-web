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
  const baseUrl = 'https://teselarsoftware.com';
  
  // Custom metadata based on current language
  const keywordsMap = {
    es: ['desarrollo de software', 'software a medida', 'desarrollo web', 'consultoría tecnológica', 'Teselar Software', 'automatización', 'IA'],
    ca: ['desenvolupament de programari', 'programari a mida', 'desenvolupament web', 'consultoria tecnològica', 'Teselar Software', 'automatització', 'IA'],
    en: ['custom software development', 'software engineering', 'web development', 'tech consulting', 'Teselar Software', 'automation', 'AI']
  };

  const currentKeywords = keywordsMap[lng as 'es' | 'ca' | 'en'] || keywordsMap.en;

  return {
    metadataBase: new URL(baseUrl),
    title: `Teselar Software | ${t.hero.title}`,
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
      title: `Teselar Software | ${t.hero.title}`,
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
      title: `Teselar Software | ${t.hero.title}`,
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
  return (
    <html lang={lng} className={`${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
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
