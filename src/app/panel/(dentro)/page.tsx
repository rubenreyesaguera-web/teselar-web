// «Hoy»: lo que pide hacer algo (decision del 29/10, orden 1): propuestas que vencen en 7 dias, PDF no entregados,
// contactos con el paso vencido o para hoy, e hitos cumplidos sin cobrar.
import Link from 'next/link';
import { exigirSesion } from '@/lib/panel/acceso';
import { leerContactos, leerPropuestas } from '@/lib/panel/datos';
import { dia, relativo } from '@/lib/panel/formato';
import { euros } from '@/lib/propuestas/formato';
import { hoyEnMadrid, resumenHoy } from '@/lib/panel/resumen';
import { FilaContacto, FilaPropuesta, Vacio } from '@/components/panel/Piezas';

export const dynamic = 'force-dynamic';

const FECHA_HOY = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Madrid' });

export default async function Hoy() {
  await exigirSesion();
  const [propuestas, contactos] = await Promise.all([leerPropuestas(), leerContactos()]);
  const hoy = resumenHoy(propuestas, contactos);
  const nada = !hoy.vencen.length && !hoy.sinPdf.length && !hoy.pasos.length && !hoy.sinCobrar.length;
  return (
    <>
      <div className="cabeza">
        <h1>Hoy</h1>
        <span className="sub">{FECHA_HOY.format(new Date())}</span>
      </div>

      {nada && <Vacio>Nada pendiente. Los contactos con fecha de hoy o vencida, las propuestas a punto de vencer y los cobros por apuntar aparecen aquí.</Vacio>}

      {hoy.pasos.length > 0 && (
        <section className="bloque">
          <h2>
            Contactos con el paso para hoy o vencido <span className="cuenta">{hoy.pasos.length}</span>
          </h2>
          <ul className="lista">
            {hoy.pasos.map(({ contacto }) => (
              <li key={contacto.id}>
                <FilaContacto c={contacto} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {hoy.sinPdf.length > 0 && (
        <section className="bloque">
          <h2>
            PDF sin entregar <span className="cuenta">{hoy.sinPdf.length}</span>
          </h2>
          <p className="sub">El cliente aceptó y no consta que le llegara su copia. La ley pide mandársela en 24 horas (LSSI, art. 28): hazlo a mano.</p>
          <ul className="lista">
            {hoy.sinPdf.map((p) => (
              <li key={p.referencia}>
                <FilaPropuesta p={p} detalle={p.acuse === 'fallido' ? 'el envío falló' : 'sin constancia del envío'} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {hoy.vencen.length > 0 && (
        <section className="bloque">
          <h2>
            Propuestas que vencen en 7 días <span className="cuenta">{hoy.vencen.length}</span>
          </h2>
          <ul className="lista">
            {hoy.vencen.map((p) => (
              <li key={p.referencia}>
                <FilaPropuesta p={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {hoy.sinCobrar.length > 0 && (
        <section className="bloque">
          <h2>
            Hitos cumplidos sin cobrar <span className="cuenta">{hoy.sinCobrar.length}</span>
          </h2>
          <ul className="lista">
            {hoy.sinCobrar.map(({ propuesta: p, hito: h }) => (
              <li key={`${p.referencia}-${h.n}`}>
                <Link className="fila" href={`/panel/propuestas/${p.referencia}#hito-${h.n}`}>
                  <span className="fila-titulo">{p.negocio}</span>
                  <span className="fila-lado">{euros(h.importe_centimos)}</span>
                  <span className="fila-dato">
                    {h.hito}
                    {h.cumplido ? ` · cumplido ${relativo(hoyEnMadrid(new Date(h.cumplido)))} (${dia(h.cumplido)})` : ''}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
