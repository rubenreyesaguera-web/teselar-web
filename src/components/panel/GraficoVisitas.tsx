'use client';
// Visitas por dia del periodo, con el anterior en gris discontinuo detras (como GA). Una sola escala; al pasar el dedo o
// el raton, una guia vertical y el dato del dia y del dia equivalente del periodo anterior. Colores validados con el
// script de la skill dataviz: el actual es el acento de marca y el anterior un gris de menos peso (rebajado a proposito;
// en claro no llega a 3:1, por eso la linea es discontinua y la tabla de abajo da las cifras).
import { useId, useRef, useState } from 'react';

interface Punto {
  dia: string;
  n: number;
}

const ANCHO = 640;
const ALTO = 200;
const M = { arriba: 12, derecha: 12, abajo: 28, izquierda: 32 };
const DIA = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const fecha = (d: string) => DIA.format(new Date(`${d}T12:00:00Z`));

/** Marcas «redondas» para el eje: 0 y hasta 3 lineas mas. */
function marcas(max: number): number[] {
  if (max <= 3) return [0, 1, 2, 3].filter((v) => v <= Math.max(max, 1));
  const paso = Math.ceil(max / 3 / Math.pow(10, Math.floor(Math.log10(max / 3)))) * Math.pow(10, Math.floor(Math.log10(max / 3)));
  return [0, paso, paso * 2, paso * 3];
}

export default function GraficoVisitas({ serie, antes }: { serie: Punto[]; antes: Punto[] | null }) {
  const [activo, setActivo] = useState<number | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const id = useId();
  const ejes = marcas(Math.max(1, ...serie.map((p) => p.n), ...(antes ?? []).map((p) => p.n)));
  const tope = ejes[ejes.length - 1];
  const w = ANCHO - M.izquierda - M.derecha;
  const h = ALTO - M.arriba - M.abajo;
  const x = (i: number) => M.izquierda + (serie.length <= 1 ? w / 2 : (i * w) / (serie.length - 1));
  const y = (n: number) => M.arriba + h - (n / tope) * h;
  const linea = (pts: Punto[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.n).toFixed(1)}`).join('');
  const cada = Math.max(1, Math.ceil(serie.length / 6));

  function mover(clientX: number) {
    const r = svg.current?.getBoundingClientRect();
    if (!r || !serie.length) return;
    const px = ((clientX - r.left) / r.width) * ANCHO;
    const i = Math.round(((px - M.izquierda) / w) * (serie.length - 1));
    setActivo(Math.min(serie.length - 1, Math.max(0, i)));
  }

  const a = activo !== null ? serie[activo] : null;
  const b = activo !== null && antes ? antes[activo] : null;

  return (
    <figure className="grafico" aria-labelledby={`${id}-t`}>
      <figcaption id={`${id}-t`} className="grafico-cabeza">
        <span>Visitas por día</span>
        <span className="leyenda">
          <span className="clave clave-actual" aria-hidden="true" /> Este periodo
          {antes && (
            <>
              <span className="clave clave-antes" aria-hidden="true" /> Periodo anterior
            </>
          )}
        </span>
      </figcaption>
      <div className="grafico-lienzo">
        <svg
          ref={svg}
          viewBox={`0 0 ${ANCHO} ${ALTO}`}
          role="img"
          aria-label={`Visitas por día: ${serie.reduce((t, p) => t + p.n, 0)} en el periodo`}
          onPointerMove={(e) => mover(e.clientX)}
          onPointerDown={(e) => mover(e.clientX)}
          onPointerLeave={() => setActivo(null)}
        >
          {ejes.map((v) => (
            <g key={v}>
              <line className="rejilla" x1={M.izquierda} x2={ANCHO - M.derecha} y1={y(v)} y2={y(v)} />
              <text className="eje" x={M.izquierda - 8} y={y(v)} dy="0.32em" textAnchor="end">
                {v}
              </text>
            </g>
          ))}
          {serie.map((p, i) =>
            i % cada === 0 || i === serie.length - 1 ? (
              <text key={p.dia} className="eje" x={x(i)} y={ALTO - 8} textAnchor={i === 0 ? 'start' : i === serie.length - 1 ? 'end' : 'middle'}>
                {fecha(p.dia)}
              </text>
            ) : null,
          )}
          {antes && <path className="serie-antes" d={linea(antes)} />}
          <path className="serie-actual" d={linea(serie)} />
          {a && activo !== null && (
            <g>
              <line className="guia" x1={x(activo)} x2={x(activo)} y1={M.arriba} y2={M.arriba + h} />
              {b && <circle className="punto-antes" cx={x(activo)} cy={y(b.n)} r={4} />}
              <circle className="punto-actual" cx={x(activo)} cy={y(a.n)} r={5} />
            </g>
          )}
        </svg>
        {a && activo !== null && (
          <div
            className="burbuja"
            role="status"
            style={{ left: `${(x(activo) / ANCHO) * 100}%`, transform: `translateX(${activo > serie.length / 2 ? '-105%' : '5%'})` }}
          >
            <strong>{fecha(a.dia)}</strong>
            <span>
              <span className="clave clave-actual" aria-hidden="true" /> {a.n} {a.n === 1 ? 'visita' : 'visitas'}
            </span>
            {b && (
              <span>
                <span className="clave clave-antes" aria-hidden="true" /> {b.n} el {fecha(b.dia)}
              </span>
            )}
          </div>
        )}
      </div>
      <details className="grafico-tabla">
        <summary>Ver como tabla</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">Día</th>
              <th scope="col">Visitas</th>
              {antes && <th scope="col">Periodo anterior</th>}
            </tr>
          </thead>
          <tbody>
            {serie.map((p, i) => (
              <tr key={p.dia}>
                <td>{fecha(p.dia)}</td>
                <td>{p.n}</td>
                {antes && <td>{antes[i]?.n ?? 0}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
