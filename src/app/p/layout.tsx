// Layout raiz propio de las propuestas (ADR-091, hito 6.4). No hereda el de [lng] a proposito:
// - va siempre en claro, aunque la web sea oscura y aunque el movil de quien la abre este en modo oscuro
//   (es un documento que se lee con calma, se imprime y se guarda);
// - no carga nada de la web (TesS, animaciones, analitica): en esta pagina el enlace del cliente lleva la
//   capacidad en el fragmento, y cuanto menos codigo ajeno corra aqui, menos sitios por donde pueda salir;
// - nunca se indexa (la cabecera X-Robots-Tag la pone next.config.js para todo /p).
import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './propuesta.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--fuente',
  display: 'swap',
});

export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noarchive: true } },
  referrer: 'no-referrer',
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
};

export default function LayoutPropuesta({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
