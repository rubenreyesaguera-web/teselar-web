// Una propuesta en el panel: todo lo que se sabe de ella, y los hitos que se marcan (lo ve el cliente) y se cobran
// (solo Ruben). Ni DNI, ni NIF, ni domicilio de quien acepto (decision 2): estan en el PDF del acuse y en `exportar`.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { exigirSesion } from '@/lib/panel/acceso';
import { leerPropuestas } from '@/lib/panel/datos';
import { dia, diaYHora, relativo } from '@/lib/panel/formato';
import { hoyEnMadrid } from '@/lib/panel/resumen';
import { euros } from '@/lib/propuestas/formato';
import { EtiquetaPropuesta } from '@/components/panel/Piezas';
import ControlesHito from '@/components/panel/ControlesHito';

export const dynamic = 'force-dynamic';

const ACUSE = {
  enviado: { texto: 'Enviado', clase: 'ok' },
  fallido: { texto: 'Falló: mándalo a mano', clase: 'error' },
  pendiente: { texto: 'Sin constancia todavía', clase: 'alerta' },
} as const;

export default async function FichaPropuesta({ params }: { params: Promise<{ ref: string }> }) {
  await exigirSesion();
  const [p] = await leerPropuestas((await params).ref);
  if (!p) notFound();
  const total = p.hitos.reduce((s, h) => s + h.importe_centimos, 0);
  const cobrado = p.hitos.filter((h) => h.cobrado).reduce((s, h) => s + h.importe_centimos, 0);
  return (
    <>
      <div className="cabeza">
        <h1>{p.negocio}</h1>
        <EtiquetaPropuesta p={p} />
      </div>

      <section className="ficha">
        <dl className="datos">
          <dt>Referencia</dt>
          <dd>
            {p.referencia} · versión {p.version} ·{' '}
            <a href={`/p/${p.referencia}`} target="_blank" rel="noreferrer">
              ver como el cliente
            </a>
          </dd>
          <dt>Cliente</dt>
          <dd>{p.cliente}</dd>
          <dt>Creada</dt>
          <dd>{dia(p.creada)}</dd>
          <dt>{p.estado === 'aceptada' ? 'Valía hasta' : 'Vale hasta'}</dt>
          <dd>
            {dia(p.venceDia)}
            {p.estado === 'vigente' ? ` (${relativo(p.venceDia)})` : ''}
          </dd>
          <dt>Abierta con su enlace</dt>
          <dd>
            {p.aperturas
              ? `${p.aperturas.veces === 1 ? '1 vez' : `${p.aperturas.veces} veces`}: la primera el ${diaYHora(p.aperturas.primera)}, la última el ${diaYHora(p.aperturas.ultima)}`
              : 'Todavía no'}
          </dd>
          {p.contacto && (
            <>
              <dt>Contacto</dt>
              <dd>
                <Link href={`/panel/contactos/${p.contacto.id}`}>{p.contacto.negocio}</Link>
                {p.contacto.colaborador ? ` · de parte de ${p.contacto.colaborador}` : ''}
              </dd>
            </>
          )}
          {p.aceptada && (
            <>
              <dt>Aceptada</dt>
              <dd>{diaYHora(p.aceptada)}</dd>
            </>
          )}
          {p.aceptante && (
            <>
              <dt>Quién aceptó</dt>
              <dd>
                {p.aceptante.nombre}
                {p.aceptante.cargo ? `, ${p.aceptante.cargo}` : ''}
                {p.aceptante.razon_social ? ` de ${p.aceptante.razon_social}` : ''} ·{' '}
                <a href={`mailto:${p.aceptante.correo}`}>{p.aceptante.correo}</a>
              </dd>
            </>
          )}
          {p.acuse && (
            <>
              <dt>PDF al cliente</dt>
              <dd>
                <span className={`etiqueta ${ACUSE[p.acuse].clase}`}>{ACUSE[p.acuse].texto}</span>
              </dd>
            </>
          )}
        </dl>
      </section>

      <section className="bloque">
        <h2>
          Pagos <span className="cuenta">{p.estado === 'aceptada' ? `cobrado ${euros(cobrado)} de ${euros(total)}` : euros(total)}</span>
        </h2>
        {p.estado !== 'aceptada' && <p className="sub">Los hitos se marcan y se cobran cuando la propuesta está aceptada.</p>}
        <ul className="lista">
          {p.hitos.map((h) => (
            <li key={h.n} id={`hito-${h.n}`} className="hito">
              <div className="hito-cabeza">
                <span className="fila-titulo">{h.hito}</span>
                <span>{euros(h.importe_centimos)}</span>
              </div>
              <span className="sub">{h.cuando}</span>
              {p.estado === 'aceptada' && (
                <ControlesHito referencia={p.referencia} n={h.n} cumplido={h.cumplido} cobrado={h.cobrado} hoy={hoyEnMadrid()} />
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
