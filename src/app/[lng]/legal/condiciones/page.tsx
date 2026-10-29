// Condiciones generales de contratacion (ADR-117): las que se aceptan con cada propuesta de /p/. En castellano y en
// catalan, en ejemplares separados (Ley 1/1998, art. 15.3); la version inglesa ensena la castellana, que es la que
// vale. El texto sale de `src/lib/propuestas/condiciones.ts` y es el mismo que va en el PDF del cliente.
import React from 'react';
import type { Metadata } from 'next';
import { CONDICIONES, rutaCondiciones, type Lengua } from '@/lib/propuestas/condiciones';
import { fechaLarga } from '@/lib/propuestas/formato';

interface Props {
  params: Promise<{ lng: string }>;
}

const lenguaDe = (lng: string): Lengua => (lng === 'ca' ? 'ca' : 'es');

const ROTULOS = {
  es: { version: 'Versión', vigor: 'en vigor desde el', otra: 'Llegeix-les en català', volver: 'Volver al inicio' },
  ca: { version: 'Versió', vigor: 'en vigor des del', otra: 'Léelas en castellano', volver: "Tornar a l'inici" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng } = await params;
  const l = lenguaDe(lng);
  return {
    title: `${CONDICIONES.texto[l].titulo} · v${CONDICIONES.version}`,
    alternates: { languages: { es: rutaCondiciones('es'), ca: rutaCondiciones('ca') } },
  };
}

export default async function PaginaCondiciones({ params }: Props) {
  const { lng } = await params;
  const l = lenguaDe(lng);
  const t = CONDICIONES.texto[l];
  const r = ROTULOS[l];
  const otra: Lengua = l === 'es' ? 'ca' : 'es';

  return (
    <div className="min-h-screen bg-teselar-dark text-claridad font-sans antialiased py-16 px-4 md:px-8" lang={l}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm font-bold">
          <a href={`/${lng}`} className="text-innovacion hover:text-claridad transition-colors">
            ← {r.volver}
          </a>
          <a href={rutaCondiciones(otra)} hrefLang={otra} lang={otra} className="text-innovacion hover:text-claridad transition-colors">
            {r.otra}
          </a>
        </div>

        <article className="glass-card p-8 md:p-12 rounded-3xl border border-claridad/5 shadow-2xl space-y-8">
          <header>
            <h1 className="text-3xl md:text-4xl font-extrabold text-innovacion mb-3 [text-wrap:balance]">{t.titulo}</h1>
            <p className="text-sm text-claridad/70">
              {r.version} {CONDICIONES.version} · {r.vigor} {fechaLarga(CONDICIONES.enVigor, l)}
            </p>
          </header>

          <div className="max-w-[58ch] space-y-6 text-sm md:text-base text-claridad/85 leading-relaxed [&_li]:[text-wrap:pretty] [&_p]:[text-wrap:pretty]">
            {t.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {[...t.clausulas, t.anexo].map((c, i) => {
              const anexo = c === t.anexo;
              const Lista = anexo ? 'ol' : 'ul';
              return (
                <section key={i} className="border-t border-claridad/10 pt-6">
                  <h2 className="text-xl font-bold text-claridad mb-3 [text-wrap:balance]">{c.titulo}</h2>
                  {c.puntos.length === 1 ? (
                    <p>{c.puntos[0]}</p>
                  ) : (
                    <Lista className={`${anexo ? 'list-decimal' : 'list-disc'} pl-5 space-y-2`}>
                      {c.puntos.map((p, j) => (
                        <li key={j}>{p}</li>
                      ))}
                    </Lista>
                  )}
                </section>
              );
            })}
          </div>
        </article>
      </div>
    </div>
  );
}
