import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COLABORADORES } from './data/colaboradores';

const locales = ['es', 'ca', 'en'];

// Castellano por defecto. Lo era 'en', y con navegador real no se notaba -el idioma
// del visitante se respeta-, pero WhatsApp, Facebook, LinkedIn y Twitter NO mandan
// Accept-Language al generar la tarjeta de un enlace: la vista previa salia en ingles.
// Justo en el gesto del puerta a puerta, que es pegarle el enlace a un negocio de
// Tossa por WhatsApp. Comprobado con los cuatro agentes el 2026-09-10.
const defaultLocale = 'es';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map((lang) => {
      const [locale] = lang.split(';');
      return locale.trim().substring(0, 2).toLowerCase();
    });
    for (const lang of languages) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip standard files and next internal structures
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/logo.jpeg' ||
    pathname === '/logo_600x400.jpeg'
  ) {
    return NextResponse.next();
  }

  // El panel privado (/panel) no tiene idioma: es solo para Ruben y va en castellano.
  if (pathname === '/panel' || pathname.startsWith('/panel/')) return NextResponse.next();

  // Check if pathname has a supported locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Las paginas de colaborador sin idioma (/c/gis) van al idioma por defecto de ese colaborador, no al del navegador:
  // es el enlace corto que reparte el colaborador (fase 4 del doc 31).
  const colaborador = /^\/c\/([^/]+)/.exec(pathname);
  const porDefecto = colaborador ? COLABORADORES[colaborador[1]]?.idiomas[0] : undefined;

  // Redirect to language subpath
  const locale = porDefecto ?? getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

// `p/` va fuera: las propuestas (/p/P-2026-001, ADR-091) no tienen idioma en la ruta. Sin esto, el
// middleware las redirigiria a /es/p/..., que no existe. Con la barra, para no dejar fuera /precios ni nada
// que empiece por p.
export const config = {
  matcher: ['/((?!api|p/|_next/static|_next/image|favicon.ico|logo\\.jpeg|logo_600x400\\.jpeg|.*\\..*).*)'],
};
