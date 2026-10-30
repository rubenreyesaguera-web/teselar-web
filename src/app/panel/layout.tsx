// Layout raiz del panel privado (07_Pendientes, punto 7). Como el de /p, no hereda el de [lng]: no carga TesS, ni
// animaciones, ni la analitica de la web, y nunca se indexa (cabeceras en next.config.js).
import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './panel.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--fuente',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Panel · Teselar',
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noarchive: true } },
  referrer: 'no-referrer',
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1c25' },
  ],
};

export default function LayoutPanel({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
