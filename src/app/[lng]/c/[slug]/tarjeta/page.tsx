// Lo que ensena el colaborador en su movil, delante del cliente o reenviado por WhatsApp (fase 4 del doc 31). El QR se
// genera al construir, en el servidor: al navegador no llega ninguna libreria. No se indexa.
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { COLABORADORES } from '../../../../../data/colaboradores';
import { enlaceColaborador, whatsappParaReenviar } from '../../../../../lib/colaboradores/enlaces';
import { textos, type IdiomaColaborador } from '../../../../../lib/colaboradores/textos';

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
  return { title: t.tarjeta_titulo, robots: { index: false, follow: false }, alternates: { canonical: null, languages: {} } };
}

export default async function TarjetaColaborador({ params }: { params: Params }) {
  const { lng, slug } = await params;
  const { c, t } = cargar(lng, slug);
  const url = enlaceColaborador(lng as IdiomaColaborador, slug);
  // Correccion Q, como los QR de las visitas (qr/ en el repo TESELAR).
  const qr = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'Q', margin: 2, color: { dark: '#083C58', light: '#FFFFFF' } });

  return (
    <div className="min-h-screen bg-[#EEF2F5] font-sans text-[#031622] antialiased">
      <main className="mx-auto max-w-[440px] pb-10">
        <div className="bg-[#083C58] px-5 pb-14 pt-6 text-[13px] font-bold tracking-[0.22em] text-white">
          TESELAR <span className="font-normal">SOFTWARE</span>
        </div>

        <section className="relative mx-4 -mt-10 flex flex-col items-center gap-2.5 rounded-2xl bg-white p-5 text-center shadow-[0_8px_24px_rgba(3,22,34,.08)]">
          <div className="flex items-center gap-3 self-stretch text-left">
            <Image src={c.foto} alt={c.nombre} width={52} height={52} className="h-[52px] w-[52px] flex-none rounded-full object-cover" />
            <div className="flex flex-col gap-1">
              <b className="text-lg text-[#083C58]">{c.nombre}</b>
              <span className="self-start rounded-xl bg-[#CCF2EC] px-2 py-0.5 text-[11px] font-bold tracking-[0.12em] text-[#031622]">{t.etiqueta}</span>
            </div>
          </div>
          <h1 className="m-0 mt-2.5 text-[22px] font-bold leading-tight text-[#083C58] [text-wrap:balance]">{t.escanea}</h1>
          <p className="m-0 text-sm leading-relaxed text-[#4A5A66] [text-wrap:pretty]">{t.tarjeta_texto}</p>
          <div
            role="img"
            aria-label={t.qr_alt}
            className="mt-1.5 w-[240px] max-w-full rounded-xl border border-[#D5DEE4] bg-white p-2 [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
          <div className="text-[13px] text-[#4A5A66]">{url.replace(/^https:\/\/www\./, '')}</div>
        </section>

        <div className="p-4">
          <a
            href={whatsappParaReenviar(t.reenviar_texto(url))}
            target="_blank"
            rel="noopener"
            className="flex min-h-[52px] items-center rounded-xl bg-[#00BFA5] px-4 font-semibold text-[#031622] no-underline transition-transform duration-150 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#083C58]"
          >
            <span className="flex flex-col">
              <span className="text-[15px]">{t.reenviar}</span>
              <span className="text-xs font-normal">{t.reenviar_sub}</span>
            </span>
          </a>
        </div>
      </main>
    </div>
  );
}
