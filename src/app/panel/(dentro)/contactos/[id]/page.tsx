import { notFound } from 'next/navigation';
import { exigirSesion } from '@/lib/panel/acceso';
import { leerContacto, leerPropuestas } from '@/lib/panel/datos';
import { dia } from '@/lib/panel/formato';
import FormContacto from '@/components/panel/FormContacto';
import { COLABORADORES } from '@/data/colaboradores';

export const dynamic = 'force-dynamic';

export default async function EditarContacto({ params }: { params: Promise<{ id: string }> }) {
  await exigirSesion();
  const c = await leerContacto(Number((await params).id));
  if (!c) notFound();
  const propuestas = await leerPropuestas();
  return (
    <>
      <div className="cabeza">
        <h1>{c.negocio}</h1>
        <span className="sub">Cambiado el {dia(c.actualizado)}</span>
      </div>
      <FormContacto
        contacto={c}
        propuestas={propuestas.map((p) => ({ referencia: p.referencia, negocio: p.negocio }))}
        colaboradores={Object.values(COLABORADORES).map((x) => x.nombre)}
      />
      <p className="sub">
        Para cerrarlo, cámbialo a «Ganado» o «Perdido»: deja de salir en curso y no se borra. Borrarlo de verdad solo si la
        persona lo pide (RGPD), desde Claude Code con <code>scripts/panel.ts borrar-contacto</code>.
      </p>
    </>
  );
}
