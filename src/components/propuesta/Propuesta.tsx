// La propuesta tal y como se publico (ADR-091 y ADR-092): todo lo que se lee aqui sale de la instantanea canonica.
// Si un texto no esta en el JSON, no esta en la pagina; las unicas palabras propias son los titulos de las secciones
// del doc 24, los avisos de estado y los botones.
//
// Una landing, como la demo del dia 3 del curso, y comun a todos los clientes: a la vista solo la portada y la
// tarjeta de inversion (con el camino de pagos, que despues de aceptar es el seguimiento). El resto, en el HTML pero
// plegado, hasta que se pulsa «Ver alcance completo».
import React from 'react';
import type { Concepto, InstantaneaV1 } from '@/lib/propuestas/instantanea';
import type { Estado } from '@/lib/propuestas/leer';
import { euros, fechaLarga, momento } from '@/lib/propuestas/formato';
import { BotonAceptar, BotonAlcance, ProveedorAceptacion, ZonaAlcance } from './Aceptacion';
import CaminoDePagos from './CaminoDePagos';

interface Props {
  instantanea: InstantaneaV1;
  offerHash: string;
  estado: Estado;
  aceptadaEl: Date | null;
  cumplidos?: Record<number, string>;
}

const ETIQUETA_ESTADO: Record<Estado, string> = {
  vigente: 'Pendiente de aceptación',
  aceptada: 'Propuesta aceptada',
  vencida: 'Vencida',
  retirada: 'Retirada',
};

function Pastilla({ estado }: { estado: Estado }) {
  return <span className={`pastilla pastilla-${estado}`}>{ETIQUETA_ESTADO[estado]}</span>;
}

function Seccion({ id, n, titulo, children }: { id: string; n: number; titulo: string; children: React.ReactNode }) {
  return (
    <section className="seccion" id={id} aria-labelledby={`${id}-t`}>
      <h2 id={`${id}-t`}>
        <span className="num" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </span>
        {titulo}
      </h2>
      {children}
    </section>
  );
}

function Lista({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

function precioDe(c: Concepto): string {
  return `${euros(c.importe_centimos)}${c.periodicidad === 'mensual' ? ' al mes' : ''} + IVA`;
}

function Aviso({ estado, instantanea, aceptadaEl }: Pick<Props, 'estado' | 'instantanea' | 'aceptadaEl'>) {
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
          Esta propuesta venció el {fechaLarga(instantanea.vigencia.hasta)}. Si te sigue interesando, pídeme una actualizada.
        </p>
      );
    case 'retirada':
      return (
        <p className="aviso aviso-alerta" role="status">
          Esta propuesta se ha retirado y ya no se puede consultar.
        </p>
      );
    default:
      return null;
  }
}

function TarjetaInversion({ p, estado, cumplidos }: { p: InstantaneaV1; estado: Estado; cumplidos: Record<number, string> }) {
  const unicos = p.precio.conceptos.filter((c) => c.periodicidad === 'unico');
  const mensuales = p.precio.conceptos.filter((c) => c.periodicidad === 'mensual');
  const total = unicos.reduce((s, c) => s + c.importe_centimos, 0);
  return (
    <aside className="tarjeta" aria-label="Inversión">
      <p className="tarjeta-etiqueta">Inversión</p>
      {unicos.length > 0 && (
        <p className="tarjeta-total">
          {euros(total)}
          <span> + IVA</span>
        </p>
      )}
      {unicos.length > 1 && <p className="tarjeta-linea">{unicos.map((c) => `${c.concepto}: ${euros(c.importe_centimos)}`).join(' · ')}</p>}
      {mensuales.map((c, i) => (
        <p className="tarjeta-mensual" key={i}>
          {unicos.length === 0 ? <strong>{precioDe(c)}</strong> : <>+ {precioDe(c)}</>}
          <span>{c.concepto}</span>
        </p>
      ))}
      {p.pagos.hitos.length > 0 && <CaminoDePagos hitos={p.pagos.hitos} seguimiento={estado === 'aceptada'} cumplidos={cumplidos} />}
      <div className="tarjeta-pie">
        <Pastilla estado={estado} />
        {estado === 'vigente' && <span className="tarjeta-linea">Válida hasta el {fechaLarga(p.vigencia.hasta)}</span>}
      </div>
    </aside>
  );
}

export default function Propuesta({ instantanea: p, offerHash, estado, aceptadaEl, cumplidos = {} }: Props) {
  const { cliente, proveedor } = p.partes;
  const unicos = p.precio.conceptos.filter((c) => c.periodicidad === 'unico');
  const resumenPrecio = unicos.length
    ? `${euros(unicos.reduce((s, c) => s + c.importe_centimos, 0))} + IVA`
    : p.precio.conceptos.map(precioDe).join(' · ');
  const retirada = estado === 'retirada';
  let n = 0;
  const sig = () => ++n;

  return (
    <ProveedorAceptacion instantanea={p} offerHash={offerHash} estado={estado}>
      <header className="barra">
        <div className="barra-dentro">
          <span className="barra-marca">{proveedor.marca}</span>
          <span className="barra-ref">
            Propuesta {p.referencia} · v{p.version}
            {!retirada && <span className="barra-fecha"> · {fechaLarga(p.fecha)}</span>}
          </span>
          <BotonAceptar className="boton boton-principal boton-pequeno" />
        </div>
      </header>

      <main className="pagina">
        <section className="portada" aria-labelledby="titular">
          <div className="portada-texto">
            {!retirada && (
              <p className="para">
                Para {cliente.nombre} · {cliente.negocio}
              </p>
            )}
            <h1 id="titular">{retirada ? `Propuesta ${p.referencia}` : p.portada.titular}</h1>
            {!retirada && <p className="subtitulo">{p.portada.subtitulo}</p>}
            {!retirada && (
              <div className="acciones">
                <BotonAceptar />
                <BotonAlcance />
              </div>
            )}
            {!retirada && (
              <p className="de">
                Propuesta de {proveedor.nombre} · {proveedor.marca}
                {proveedor.nif ? ` · NIF ${proveedor.nif}` : ''} · {fechaLarga(p.fecha)}
              </p>
            )}
            <Aviso estado={estado} instantanea={p} aceptadaEl={aceptadaEl} />
          </div>
          {!retirada && <TarjetaInversion p={p} estado={estado} cumplidos={cumplidos} />}
        </section>

        {!retirada && (
          <ZonaAlcance>
            <div className="detalle">
              <Seccion id="situacion" n={sig()} titulo="Lo que me contaste">
                {p.situacion.palabras_del_cliente.map((t, i) => (
                  <blockquote key={i}>{t}</blockquote>
                ))}
                {p.situacion.lo_que_funciona && <p className="nota">{p.situacion.lo_que_funciona}</p>}
              </Seccion>

              <Seccion id="solucion" n={sig()} titulo="Lo que te propongo">
                <p className="destacado">{p.solucion.resumen}</p>
                <Lista items={p.solucion.dia_a_dia} className="marcas" />
              </Seccion>

              <Seccion id="alcance" n={sig()} titulo="Qué incluye">
                <Lista items={p.alcance} className="marcas" />
                <h3>Lo que te entrego</h3>
                <Lista items={p.entregables} className="marcas" />
              </Seccion>

              <Seccion id="exclusiones" n={sig()} titulo="Qué no incluye">
                <Lista items={p.exclusiones} />
              </Seccion>

              <Seccion id="dependencias" n={sig()} titulo="Lo que necesito de ti">
                <Lista items={p.dependencias} />
              </Seccion>

              <Seccion id="calendario" n={sig()} titulo="Calendario">
                <ol className="linea-tiempo">
                  {p.calendario.map((t, i) => (
                    <li key={i}>
                      <p className="lt-tramo">{t.tramo}</p>
                      <p className="lt-meta">
                        <span className="lt-depende">Depende de {t.depende_de}</span>
                        <span>{t.plazo}</span>
                      </p>
                    </li>
                  ))}
                </ol>
              </Seccion>

              <Seccion id="inversion" n={sig()} titulo="Inversión y forma de pago">
                <dl className="precios">
                  {p.precio.conceptos.map((c, i) => (
                    <div key={i}>
                      <dt>{c.concepto}</dt>
                      <dd>{precioDe(c)}</dd>
                    </div>
                  ))}
                </dl>
                {p.impuestos.nota && <p className="nota">{p.impuestos.nota}</p>}
                {p.pagos.notas.length > 0 && <Lista items={p.pagos.notas} />}
              </Seccion>

              {p.garantia && (
                <Seccion id="garantia" n={sig()} titulo="Garantía">
                  <p>{p.garantia}</p>
                </Seccion>
              )}

              <Seccion id="vigencia" n={sig()} titulo="Vigencia">
                <p>
                  {p.vigencia.dias} días: hasta el {fechaLarga(p.vigencia.hasta)}.
                </p>
              </Seccion>

              {estado === 'vigente' && (
                <section className="cierre" aria-labelledby="cierre-t">
                  <h2 id="cierre-t">Siguiente paso</h2>
                  <p className="destacado">{p.siguiente_paso}</p>
                  <BotonAceptar />
                </section>
              )}
            </div>
          </ZonaAlcance>
        )}

        <footer className="pie">
          <p>
            Huella de esta versión (SHA-256): <code>{offerHash}</code>
          </p>
          <p>Cualquier cambio en lo que dice esta propuesta da una versión nueva con otra huella.</p>
        </footer>
      </main>

      {estado === 'vigente' && (
        <div className="barra-movil">
          <span className="barra-movil-precio">{resumenPrecio}</span>
          <BotonAceptar className="boton boton-principal boton-pequeno" />
        </div>
      )}
    </ProveedorAceptacion>
  );
}
