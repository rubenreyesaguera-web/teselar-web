// Todo lo de dentro del panel pide sesion. Cada pagina vuelve a comprobarla (y cada accion), por si un dia se mueve
// algo de sitio: este layout no es la unica puerta.
import React from 'react';
import Link from 'next/link';
import { exigirSesion } from '@/lib/panel/acceso';
import Nav from '@/components/panel/Nav';

export const dynamic = 'force-dynamic';

export default async function LayoutDentro({ children }: { children: React.ReactNode }) {
  await exigirSesion();
  return (
    <>
      <header className="barra">
        <div className="barra-dentro">
          <Link className="marca" href="/panel">
            Teselar <span>· panel</span>
          </Link>
          <Nav />
        </div>
      </header>
      <main className="pagina">{children}</main>
    </>
  );
}
