// La franja de arriba de las paginas de colaborador, con el cambio de idioma (Ruben, 22/10: «¿no se puede cambiar el
// idioma de otra manera que no sea cambiando el link?»). En la tarjeta que ensena el colaborador, cambiar de idioma
// cambia tambien el QR: asi ensena a cada cliente la pagina en su idioma. Enlaces normales, sin JavaScript.
import Link from 'next/link';

const NOMBRE = { es: 'Castellano', ca: 'Català' } as const;

export function CabeceraIdioma({ lng, idiomas, ruta }: { lng: 'es' | 'ca'; idiomas: ('es' | 'ca')[]; ruta: string }) {
  return (
    <div className="flex items-center justify-between bg-[#083C58] px-5 pb-14 pt-5 text-white">
      <span className="text-[13px] font-bold tracking-[0.22em]">
        TESELAR <span className="font-normal">SOFTWARE</span>
      </span>
      {idiomas.length > 1 && (
        <nav aria-label="Idioma" className="flex gap-1">
          {idiomas.map((i) => (
            <Link
              key={i}
              href={`/${i}${ruta}`}
              hrefLang={i}
              lang={i}
              title={NOMBRE[i]}
              aria-current={i === lng ? 'page' : undefined}
              className={
                'flex min-h-9 min-w-11 items-center justify-center rounded-full px-3 text-xs font-bold no-underline transition-colors duration-150 ' +
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA5] ' +
                (i === lng ? 'bg-white text-[#083C58]' : 'text-[#D9E4EA] hover:bg-white/10')
              }
            >
              {i.toUpperCase()}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
