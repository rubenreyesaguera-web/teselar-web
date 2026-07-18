import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Landing de captura de lead magnets: no debe indexarse, no aporta contenido propio de
// busqueda y solo tiene sentido llegando desde el enlace del primer comentario de LinkedIn.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function RecursoLayout({ children }: { children: ReactNode }) {
  return children;
}
