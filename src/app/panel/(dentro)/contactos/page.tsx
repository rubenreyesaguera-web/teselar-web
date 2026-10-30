// «Contactos en curso» (decision 3): los 5-10 con quien se habla. Ganados y perdidos se ocultan, no se borran.
import Link from 'next/link';
import { exigirSesion } from '@/lib/panel/acceso';
import { leerContactos } from '@/lib/panel/datos';
import { cerrado } from '@/lib/panel/resumen';
import { FilaContacto, Vacio } from '@/components/panel/Piezas';

export const dynamic = 'force-dynamic';

export default async function Contactos({ searchParams }: { searchParams: Promise<{ todos?: string }> }) {
  await exigirSesion();
  const todos = (await searchParams).todos === '1';
  const contactos = await leerContactos(todos);
  const abiertos = contactos.filter((c) => !cerrado(c.estado));
  const cerrados = contactos.filter((c) => cerrado(c.estado));
  return (
    <>
      <div className="cabeza">
        <h1>Contactos en curso</h1>
        <Link className="boton boton-principal" href="/panel/contactos/nuevo">
          Nuevo contacto
        </Link>
      </div>

      {abiertos.length ? (
        <ul className="lista">
          {abiertos.map((c) => (
            <li key={c.id}>
              <FilaContacto c={c} />
            </li>
          ))}
        </ul>
      ) : (
        <Vacio>Ningún contacto en curso. Aquí entra quien pasa a conversación; la captación sigue en la hoja de leads.</Vacio>
      )}

      {todos ? (
        <section className="bloque">
          <h2>
            Ganados y perdidos <span className="cuenta">{cerrados.length}</span>
          </h2>
          {cerrados.length ? (
            <ul className="lista">
              {cerrados.map((c) => (
                <li key={c.id}>
                  <FilaContacto c={c} />
                </li>
              ))}
            </ul>
          ) : (
            <Vacio>Todavía no hay ninguno cerrado.</Vacio>
          )}
          <Link href="/panel/contactos">Ocultar ganados y perdidos</Link>
        </section>
      ) : (
        <Link href="/panel/contactos?todos=1">Ver también ganados y perdidos</Link>
      )}
    </>
  );
}
