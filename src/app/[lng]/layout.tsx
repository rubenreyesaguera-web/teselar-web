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
  return {
    title: `Teselar Software | ${t.hero.title}`,
    description: t.hero.subtitle,
    icons: {
      icon: '/favicon.ico',
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
