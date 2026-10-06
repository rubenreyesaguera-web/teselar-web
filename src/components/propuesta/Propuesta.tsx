// La propuesta tal y como se publico (ADR-091, hito 6.4): todo lo que se lee aqui sale de la instantanea
// canonica. Si un texto no esta en el JSON, no esta en la pagina; las unicas palabras propias son los titulos de
// las secciones del doc 24 y los avisos de estado.
import React from 'react';
import type { Concepto, InstantaneaV1 } from '@/lib/propuestas/instantanea';
import type { Estado } from '@/lib/propuestas/leer';
import { euros, fechaLarga, momento } from '@/lib/propuestas/formato';

interface Props {
  instantanea: InstantaneaV1;
  offerHash: string;
  estado: Estado;
  aceptadaEl: Date | null;
}

function Seccion({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <section className="seccion" aria-labelledby={`s${n}`}>
      <h2 id={`s${n}`}>
        <span className="num" aria-hidden="true">{String(n).padStart(2, '0')}</span>
        {titulo}
      </h2>
      {children}
    </section>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

function precioDe(c: Concepto): string {
  return `${euros(c.importe_centimos)}${c.periodicidad === 'mensual' ? ' al mes' : ''} + IVA`;
}

function Aviso({ estado, instantanea, aceptadaEl }: Omit<Props, 'offerHash'>) {
  switch (estado) {
    case 'aceptada':
      return (
        <p className="aviso aviso-ok" role="status">
          Aceptada el {aceptadaEl ? momento(aceptadaEl) : ''} (hora de Lloret).
        </p>
      );
    case 'vencida':
      return (
        <p className="aviso aviso-alerta" role="status">
          Esta propuesta venció el {fechaLarga(instantanea.vigencia.hasta)}. Si te sigue interesando, pídeme una
          actualizada.
        </p>
      );
    case 'retirada':
      return (
        <p className="aviso aviso-alerta" role="status">
          Esta propuesta se ha retirado y ya no se puede consultar.
        </p>
      );
    default:
      return (
        <p className="aviso" role="status">
          Válida hasta el {fechaLarga(instantanea.vigencia.hasta)}.
        </p>
      );
  }
}

export default function Propuesta({ instantanea: p, offerHash, estado, aceptadaEl }: Props) {
  const { cliente, proveedor } = p.partes;
  return (
    <article className="hoja">
      <header className="cabecera">
        <p className="marca">{proveedor.marca}</p>
        <h1>Propuesta para {cliente.negocio}</h1>
        <dl className="datos">
          <div>
            <dt>Para</dt>
            <dd>
              {cliente.nombre} · {cliente.negocio}
            </dd>
          </div>
          <div>
            <dt>De</dt>
            <dd>
              {proveedor.nombre} · {proveedor.marca}
              {proveedor.nif ? ` · NIF ${proveedor.nif}` : ''}
            </dd>
          </div>
          <div>
            <dt>Referencia</dt>
            <dd>
              {p.referencia} · v{p.version}
            </dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>{fechaLarga(p.fecha)}</dd>
          </div>
        </dl>
        <Aviso estado={estado} instantanea={p} aceptadaEl={aceptadaEl} />
      </header>

      {estado !== 'retirada' && (
        <>
          <Seccion n={1} titulo="Lo que me contaste">
            {p.situacion.palabras_del_cliente.map((t, i) => (
              <blockquote key={i}>{t}</blockquote>
            ))}
            {p.situacion.lo_que_funciona && <p className="nota">{p.situacion.lo_que_funciona}</p>}
          </Seccion>

          <Seccion n={2} titulo="Lo que te propongo">
            <p className="destacado">{p.solucion.resumen}</p>
            <Lista items={p.solucion.dia_a_dia} />
          </Seccion>

          <Seccion n={3} titulo="Qué incluye">
            <Lista items={p.alcance} />
            <h3>Lo que te entrego</h3>
            <Lista items={p.entregables} />
          </Seccion>

          <Seccion n={4} titulo="Qué no incluye">
            <Lista items={p.exclusiones} />
          </Seccion>

          <Seccion n={5} titulo="Lo que necesito de ti">
            <Lista items={p.dependencias} />
          </Seccion>

          <Seccion n={6} titulo="Calendario">
            <div className="tabla">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Qué</th>
                    <th scope="col">Depende de</th>
                    <th scope="col">Plazo</th>
                  </tr>
                </thead>
                <tbody>
                  {p.calendario.map((t, i) => (
                    <tr key={i}>
                      <td>{t.tramo}</td>
                      <td>{t.depende_de}</td>
                      <td>{t.plazo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Seccion>

          <Seccion n={7} titulo="Inversión y forma de pago">
            <dl className="precios">
              {p.precio.conceptos.map((c, i) => (
                <div key={i}>
                  <dt>{c.concepto}</dt>
                  <dd>{precioDe(c)}</dd>
                </div>
              ))}
            </dl>
            {p.impuestos.nota && <p className="nota">{p.impuestos.nota}</p>}
            <h3>Cómo se paga</h3>
            <div className="tabla">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Pago</th>
                    <th scope="col">Cuándo</th>
                    <th scope="col" className="importe">Importe</th>
                  </tr>
                </thead>
                <tbody>
                  {p.pagos.hitos.map((h, i) => (
                    <tr key={i}>
                      <td className="sin-corte">{h.hito}</td>
                      <td>{h.cuando}</td>
                      <td className="importe">{euros(h.importe_centimos)} + IVA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {p.pagos.notas.length > 0 && <Lista items={p.pagos.notas} />}
          </Seccion>

          {p.garantia && (
            <Seccion n={8} titulo="Garantía">
              <p>{p.garantia}</p>
            </Seccion>
          )}

          <Seccion n={p.garantia ? 9 : 8} titulo="Vigencia">
            <p>
              {p.vigencia.dias} días: hasta el {fechaLarga(p.vigencia.hasta)}.
            </p>
          </Seccion>

          <Seccion n={p.garantia ? 10 : 9} titulo="Siguiente paso">
            <p className="destacado">{p.siguiente_paso}</p>
          </Seccion>
        </>
      )}

      <footer className="pie">
        <p>
          Huella de esta versión (SHA-256): <code>{offerHash}</code>
        </p>
        <p>Cualquier cambio en lo que dice esta propuesta da una versión nueva con otra huella.</p>
      </footer>
    </article>
  );
}
