// Lo que ve el cliente al escanear el QR de un colaborador (fase 4 del doc 31): Ruben de protagonista y el
// colaborador arriba, en pequeno, para dar confianza. Todo lleva a Ruben. No se indexa (cabeceras en next.config.js).
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { COLABORADORES } from '../../../../data/colaboradores';
import { RUBEN, calendlyDeParteDe, whatsappARuben } from '../../../../lib/colaboradores/enlaces';
import { textos, type IdiomaColaborador } from '../../../../lib/colaboradores/textos';
import { CabeceraIdioma } from '../../../../components/colaboradores/CabeceraIdioma';

type Params = Promise<{ lng: string; slug: string }>;

export const dynamicParams = false;

// El idioma y el colaborador juntos: solo existen las paginas de los idiomas de cada uno (Gis, es y ca; /en/c/gis da 404).
export function generateStaticParams() {
  return Object.entries(COLABORADORES).flatMap(([slug, c]) => c.idiomas.map((lng) => ({ lng, slug })));
}

function cargar(lng: string, slug: string) {
  const c = COLABORADORES[slug];
  if (!c || !(c.idiomas as string[]).includes(lng)) notFound();
  return { c, t: textos(lng as IdiomaColaborador, c), lng: lng as IdiomaColaborador };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lng, slug } = await params;
  const { t } = cargar(lng, slug);
  return {
    title: t.titulo,
    description: t.quien,
    robots: { index: false, follow: false },
    alternates: { canonical: null, languages: {} },
  };
}

const boton =
  'flex min-h-[52px] items-center rounded-xl px-4 font-semibold no-underline transition-transform duration-150 ease-out ' +
  'active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA5]';

export default async function PaginaColaborador({ params }: { params: Params }) {
  const { lng, slug } = await params;
  const { c, t } = cargar(lng, slug);

  return (
    <div className="min-h-screen bg-[#EEF2F5] font-sans text-[#031622] antialiased">
      <main className="mx-auto max-w-[440px] pb-10">
        <CabeceraIdioma lng={lng as IdiomaColaborador} idiomas={c.idiomas} ruta={`/c/${slug}`} />

        <section className="relative mx-4 -mt-10 flex flex-col gap-1 rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(3,22,34,.08)]">
          <div className="flex items-center gap-2 text-[13px] text-[#33434F]">
            <Image src={c.foto} alt="" width={30} height={30} className="h-[30px] w-[30px] flex-none rounded-full object-cover" />
            <span>{t.te_presenta}</span>
          </div>
          <div className="mt-3 flex items-center gap-3.5">
            <Image src={RUBEN.foto} alt={RUBEN.nombre} width={60} height={60} priority className="h-[60px] w-[60px] flex-none rounded-full object-cover" />
            <div className="flex flex-col gap-0.5">
              <h1 className="m-0 text-2xl font-bold text-[#083C58]">{RUBEN.nombre}</h1>
              <span className="text-[15px] text-[#33434F]">{t.oficio}</span>
            </div>
          </div>
          <p className="m-0 mt-2 text-sm leading-relaxed text-[#4A5A66] [text-wrap:pretty]">{t.quien}</p>
        </section>

        <div className="flex flex-col gap-2.5 p-4">
          <a href={calendlyDeParteDe(t.de_parte_de)} target="_blank" rel="noopener" className={`${boton} bg-[#00BFA5] text-[#031622]`}>
            <span className="flex flex-col">
              <span className="text-[15px]">{t.reservar}</span>
              <span className="text-xs font-normal">{t.reservar_sub}</span>
            </span>
          </a>
          <a href={whatsappARuben(t.whatsapp_texto)} target="_blank" rel="noopener" className={`${boton} border border-[#D5DEE4] bg-white text-[#083C58]`}>
            <span className="flex flex-col">
              <span className="text-[15px]">{t.whatsapp}</span>
              <span className="text-xs font-normal text-[#4A5A66]">{t.whatsapp_sub}</span>
            </span>
          </a>
          <div className="grid grid-cols-2 gap-2.5">
            <a href={`/api/contacto/${slug}?lng=${lng}`} className={`${boton} justify-center bg-[#083C58] text-sm text-white`}>
              {t.guardar}
            </a>
            <a href={`/${lng}/demo`} className={`${boton} justify-center border border-[#D5DEE4] bg-white text-sm text-[#083C58]`}>
              {t.que_hace}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
