// Colaboradores (fase 2, 30/10): de la visita a su pagina a la reserva «De parte de…» (los contactos con su nombre, que
// Ruben da de alta a mano) y al proyecto firmado, con la comision que toca y si esta saldada. Solo lo ve Ruben.
import Link from 'next/link';
import { exigirSesion } from '@/lib/panel/acceso';
import { leerContactos, leerPropuestas, visitasColaboradores } from '@/lib/panel/datos';
import { hoyEnMadrid, NOMBRE_COMISION, NOMBRE_ESTADO, resumenColaboradores } from '@/lib/panel/resumen';
import { euros } from '@/lib/propuestas/formato';
import { COLABORADORES } from '@/data/colaboradores';
import { EtiquetaPropuesta, Vacio } from '@/components/panel/Piezas';
import ControlesSaldo from '@/components/panel/ControlesSaldo';

export const dynamic = 'force-dynamic';

export default async function Colaboradores() {
  await exigirSesion();
  const [contactos, propuestas, visitas] = await Promise.all([leerContactos(true), leerPropuestas(), visitasColaboradores()]);
  const conPagina = Object.entries(COLABORADORES).map(([slug, c]) => ({ slug, nombre: c.nombre }));
  const resumen = resumenColaboradores(conPagina, contactos, propuestas, visitas);
  const hoy = hoyEnMadrid();
  return (
    <>
      <div className="cabeza">
        <h1>Colaboradores</h1>
        <span className="sub">La comisión se paga por proyecto firmado, no por visita.</span>
      </div>

      {!resumen.length && <Vacio>Aún no hay colaboradores. Salen aquí los que tienen página y los que pongas en un contacto.</Vacio>}

      {resumen.map((r) => (
        <section key={r.nombre} className="bloque">
          <h2>
            {r.nombre}
            {r.slug && <span className="cuenta">/c/{r.slug}</span>}
          </h2>
          <div className="ficha">
            <dl className="cifras">
              <div>
                <dt>Visitas a su página</dt>
                <dd>
                  {r.slug ? r.visitas30 : '—'}
                  {r.slug && <small> en 30 días · {r.visitas} en total</small>}
                </dd>
              </div>
              <div>
                <dt>Contactos</dt>
                <dd>{r.contactos}</dd>
              </div>
              <div>
                <dt>Firmados</dt>
                <dd>
                  {r.firmados}
                  {r.firmados > 0 && <small> · setup {euros(r.setupFirmado)}</small>}
                </dd>
              </div>
              <div>
                <dt>Comisión</dt>
                <dd>
                  {euros(r.debido)}
                  {r.debido > 0 && <small> · pendiente {euros(r.debido - r.saldado)}</small>}
                </dd>
              </div>
            </dl>

            {r.lineas.length > 0 ? (
              <ul className="lista">
                {r.lineas.map(({ contacto: c, propuesta: p, importe }) => (
                  <li key={c.id} className="linea-colaborador">
                    <div className="fila-plana">
                      <Link className="fila-titulo" href={`/panel/contactos/${c.id}`}>
                        {c.negocio}
                      </Link>
                      <span className="fila-lado">{importe > 0 ? euros(importe) : NOMBRE_COMISION[c.comision]}</span>
                      <span className="fila-dato">
                        {NOMBRE_ESTADO[c.estado]}
                        {c.comision !== 'ninguna' && importe > 0 ? ` · ${NOMBRE_COMISION[c.comision]}` : ''}
                        {p ? (
                          <>
                            {' · '}
                            <Link href={`/panel/propuestas/${p.referencia}`}>{p.referencia}</Link> <EtiquetaPropuesta p={p} />
                          </>
                        ) : (
                          ' · sin propuesta'
                        )}
                      </span>
                    </div>
                    {importe > 0 && <ControlesSaldo c={c} hoy={hoy} />}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sub">Nadie ha llegado todavía de su parte.</p>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
