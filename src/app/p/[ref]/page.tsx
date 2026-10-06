// La pagina publica de una propuesta (ADR-091, hito 6.4): /p/P-2026-001.
//
// La URL base solo lee. El formulario de aceptacion (hito 6.5) usara la capacidad del fragmento, que el
// servidor nunca ve: esta pagina no la necesita para nada.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Propuesta from '@/components/propuesta/Propuesta';
import { FORMA_REFERENCIA, leerPropuesta } from '@/lib/propuestas/leer';

// Se lee de la base en cada visita: el estado (vigente, vencida, aceptada, retirada) cambia sin recompilar.
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ ref: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ref } = await params;
  // Solo la referencia: ni el nombre del negocio ni nada del contenido en la vista previa de un enlace.
  return { title: FORMA_REFERENCIA.test(ref) ? `Propuesta ${ref} · Teselar Software` : 'Teselar Software' };
}

export default async function PaginaPropuesta({ params }: Props) {
  const { ref } = await params;
  const p = await leerPropuesta(ref);
  if (!p) notFound();
  return (
    <main className="fondo">
      <Propuesta instantanea={p.instantanea} offerHash={p.offerHash} estado={p.estado} aceptadaEl={p.aceptadaEl} />
    </main>
  );
}
