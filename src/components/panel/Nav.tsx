'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { salir } from '@/app/panel/acciones';

const SECCIONES = [
  { href: '/panel', texto: 'Hoy' },
  { href: '/panel/contactos', texto: 'Contactos' },
  { href: '/panel/propuestas', texto: 'Propuestas' },
  { href: '/panel/colaboradores', texto: 'Colaboradores' },
  { href: '/panel/estadisticas', texto: 'Estadísticas' },
];

export default function Nav() {
  const ruta = usePathname();
  const actual = (href: string) => (href === '/panel' ? ruta === '/panel' : ruta.startsWith(href));
  return (
    <nav className="nav" aria-label="Secciones del panel">
      {SECCIONES.map((s) => (
        <Link key={s.href} href={s.href} aria-current={actual(s.href) ? 'page' : undefined}>
          {s.texto}
        </Link>
      ))}
      <form action={salir}>
        <button type="submit">Salir</button>
      </form>
    </nav>
  );
}
