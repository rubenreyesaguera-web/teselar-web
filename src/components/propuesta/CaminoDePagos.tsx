'use client';
// El camino de los pagos, dentro de la tarjeta de inversion: antes de aceptar explica que tiene que estar hecho
// para cada pago; despues de aceptar es el seguimiento del proyecto (cada hito, cumplido con su fecha o pendiente).
// Sale de `pagos.hitos`, que tienen todas las propuestas, asi que vale para cualquier cliente (ADR-092).
import React, { useState } from 'react';
import type { HitoDePago } from '@/lib/propuestas/instantanea';
import { euros, momento } from '@/lib/propuestas/formato';

export default function CaminoDePagos({
  hitos,
  seguimiento,
  cumplidos,
}: {
  hitos: HitoDePago[];
  seguimiento: boolean;
  cumplidos: Record<number, string>;
}) {
  const primeroPendiente = hitos.findIndex((_, i) => !cumplidos[i + 1]);
  const [activo, setActivo] = useState(seguimiento && primeroPendiente >= 0 ? primeroPendiente : 0);
  const hechos = Object.keys(cumplidos).length;

  return (
    <div className="camino">
      <p className="camino-titulo">{seguimiento ? 'Cómo va' : `Cómo se paga · ${hitos.length === 1 ? 'un pago' : `${hitos.length} pagos`}`}</p>
      {seguimiento && (
        <p className="camino-progreso">
          <span className="camino-barra" aria-hidden="true">
            <span style={{ width: `${(hechos / hitos.length) * 100}%` }} />
          </span>
          {hechos} de {hitos.length} pasos cumplidos
        </p>
      )}
      <ol className="camino-pasos" role="tablist" aria-label="Pagos">
        {hitos.map((x, i) => {
          const hecho = Boolean(cumplidos[i + 1]);
          return (
            <li key={i}>
              <button
                type="button"
                role="tab"
                id={`paso-${i}`}
                aria-selected={i === activo}
                aria-controls={`paso-detalle-${i}`}
                className={`camino-paso${i === activo ? ' activo' : ''}${hecho ? ' hecho' : ''}`}
                onClick={() => setActivo(i)}
              >
                <span className="camino-punto" aria-hidden="true">
                  {hecho ? '✓' : i + 1}
                </span>
                <span className="camino-nombre">{x.hito}</span>
                <span className="camino-importe">{euros(x.importe_centimos)}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {/* Todos los detalles van en el HTML (impresion, sin JavaScript); solo se ve el del paso elegido. */}
      {hitos.map((x, i) => {
        const cumplidoEl = cumplidos[i + 1];
        return (
          <div className="camino-detalle" id={`paso-detalle-${i}`} role="tabpanel" aria-labelledby={`paso-${i}`} hidden={i !== activo} key={i}>
            <p className="camino-cuando">
              <span>Cuándo se paga</span>
              {x.cuando}
            </p>
            <p className="camino-cifra">{euros(x.importe_centimos)} + IVA</p>
            {seguimiento && (
              <p className={`estado-paso${cumplidoEl ? ' ok' : ''}`}>
                {cumplidoEl ? `Cumplido el ${momento(new Date(cumplidoEl))}` : 'Pendiente'}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
