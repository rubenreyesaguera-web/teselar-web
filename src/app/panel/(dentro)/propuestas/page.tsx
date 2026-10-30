// Propuestas (decision 0): se miran todas; crear, sustituir e invalidar siguen siendo solo de scripts/propuesta.ts.
import { exigirSesion } from '@/lib/panel/acceso';
import { leerPropuestas } from '@/lib/panel/datos';
import { FilaPropuesta, Vacio } from '@/components/panel/Piezas';

export const dynamic = 'force-dynamic';

export default async function Propuestas() {
  await exigirSesion();
  const propuestas = await leerPropuestas();
  return (
    <>
      <div className="cabeza">
        <h1>Propuestas</h1>
        <span className="sub">Se crean, sustituyen e invalidan desde Claude Code</span>
      </div>
      {propuestas.length ? (
        <ul className="lista">
          {propuestas.map((p) => (
            <li key={p.referencia}>
              <FilaPropuesta p={p} />
            </li>
          ))}
        </ul>
      ) : (
        <Vacio>Todavía no hay propuestas en la base.</Vacio>
      )}
    </>
  );
}
