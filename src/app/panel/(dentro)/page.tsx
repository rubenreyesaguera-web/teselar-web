// «Hoy»: lo que pide hacer algo (decision del 29/10, orden 1): propuestas que vencen en 7 dias, PDF no entregados,
// contactos con el paso vencido o para hoy, e hitos cumplidos sin cobrar. Antes de pintar, limpia el contador y borra los contactos que
// han cumplido el plazo de la politica (apartado 8) y los ensena una sola vez; y avisa de los que se borran en 30 dias.
import Link from 'next/link';
import { exigirSesion } from '@/lib/panel/acceso';
import { borrarCaducados, leerContactos, leerPropuestas } from '@/lib/panel/datos';
import { limpiarVisitas } from '@/lib/panel/estadisticas';
import { dia, relativo } from '@/lib/panel/formato';
import { euros } from '@/lib/propuestas/formato';
import { AVISO_DIAS, PLAZO_MESES, hoyEnMadrid, resumenHoy } from '@/lib/panel/resumen';
import { FilaContacto, FilaPropuesta, Vacio } from '@/components/panel/Piezas';

export const dynamic = 'force-dynamic';

const FECHA_HOY = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Madrid' });

export default async function Hoy() {
  await exigirSesion();
  const [borrados] = await Promise.all([borrarCaducados(), limpiarVisitas()]);
  const [propuestas, contactos] = await Promise.all([leerPropuestas(), leerContactos(true)]);
  const hoy = resumenHoy(propuestas, contactos);
  const nada = !hoy.vencen.length && !hoy.sinPdf.length && !hoy.pasos.length && !hoy.sinCobrar.length && !hoy.seBorran.length;
  return (
    <>
      <div className="cabeza">
        <h1>Hoy</h1>
        <span className="sub">{FECHA_HOY.format(new Date())}</span>
      </div>

      {borrados.length > 0 && (
        <section className="bloque">
          <h2>
            Borrados por plazo <span className="cuenta">{borrados.length}</span>
          </h2>
          <p className="sub">
            {PLAZO_MESES} meses sin contacto y sin contrato, como dice la política de privacidad. No queda copia: este aviso
            no vuelve a salir.
          </p>
          <ul className="lista">
            {borrados.map((negocio, i) => (
              <li key={i} className="fila">
                <span className="fila-titulo">{negocio}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

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

      {hoy.seBorran.length > 0 && (
        <section className="bloque">
          <h2>
            Se borran en {AVISO_DIAS} días o menos <span className="cuenta">{hoy.seBorran.length}</span>
          </h2>
          <p className="sub">
            Llevan casi {PLAZO_MESES} meses sin contacto. Si sigues hablando con alguno, guarda su ficha y el plazo vuelve a
            empezar.
          </p>
          <ul className="lista">
            {hoy.seBorran.map(({ contacto: c, dia: d }) => (
              <li key={c.id}>
                <Link className="fila" href={`/panel/contactos/${c.id}`}>
                  <span className="fila-titulo">{c.negocio}</span>
                  <span className="fila-lado">{relativo(d)}</span>
                  <span className="fila-dato">se borra el {dia(d)}</span>
                </Link>
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
