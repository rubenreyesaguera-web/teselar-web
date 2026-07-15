import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Página de agradecimiento post-formulario: no debe indexarse ni citarse — no aporta
// contenido propio y duplicaría intención de búsqueda con la home.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function GraciasLayout({ children }: { children: ReactNode }) {
  return children;
}
