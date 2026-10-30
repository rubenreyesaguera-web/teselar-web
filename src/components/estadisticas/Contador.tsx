'use client';
// Cuenta cada pagina vista de la web publica (fase 2 del panel, 30/10). Sin cookies ni almacenamiento: manda la ruta y,
// solo en la primera pagina, de donde se llego y la etiqueta ?origen=. Contar nunca puede romper la pagina.
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Contador() {
  const ruta = usePathname();
  const primera = useRef(true);
  useEffect(() => {
    const esPrimera = primera.current;
    primera.current = false;
    try {
      const cuerpo = esPrimera
        ? { ruta, primera: true, referente: document.referrer, origen: new URLSearchParams(location.search).get('origen') }
        : { ruta, primera: false };
      void fetch('/api/visita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpo),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // nada
    }
  }, [ruta]);
  return null;
}
