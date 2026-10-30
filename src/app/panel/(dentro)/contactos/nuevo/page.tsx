import { exigirSesion } from '@/lib/panel/acceso';
import { leerPropuestas } from '@/lib/panel/datos';
import FormContacto from '@/components/panel/FormContacto';
import { COLABORADORES } from '@/data/colaboradores';

export const dynamic = 'force-dynamic';

export default async function NuevoContacto() {
  await exigirSesion();
  const propuestas = await leerPropuestas();
  return (
    <>
      <div className="cabeza">
        <h1>Nuevo contacto</h1>
      </div>
      <FormContacto
        propuestas={propuestas.map((p) => ({ referencia: p.referencia, negocio: p.negocio }))}
        colaboradores={Object.values(COLABORADORES).map((c) => c.nombre)}
      />
    </>
  );
}
