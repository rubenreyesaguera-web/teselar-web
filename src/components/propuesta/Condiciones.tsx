// Las condiciones completas de una version, en compacto: es lo que se lee en «Lo que aceptas» antes de confirmar.
// Sale de la misma instantanea que la pagina y que el endpoint. Sin estado ni efectos: vale en servidor y cliente.
import React from 'react';
import type { InstantaneaV1 } from '@/lib/propuestas/instantanea';
import { euros, fechaLarga } from '@/lib/propuestas/formato';

function Bloque({ titulo, items }: { titulo: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h3>{titulo}</h3>
      <ul>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </section>
  );
}

export default function Condiciones({ instantanea: p, offerHash }: { instantanea: InstantaneaV1; offerHash: string }) {
  return (
    <div className="condiciones">
      <p className="condiciones-cabecera">
        Propuesta {p.referencia} · versión {p.version} · {fechaLarga(p.fecha)}
        <br />
        {p.partes.proveedor.nombre} · {p.partes.proveedor.marca}
        {` · NIF ${p.partes.proveedor.nif}`} → {p.partes.cliente.nombre} · {p.partes.cliente.negocio}
      </p>
      <Bloque titulo="Qué incluye" items={[...p.alcance, ...p.entregables]} />
      <Bloque titulo="Qué no incluye" items={p.exclusiones} />
      <Bloque titulo="Lo que necesito de ti" items={p.dependencias} />
      <Bloque titulo="Calendario" items={p.calendario.map((t) => `${t.tramo} — depende de ${t.depende_de}: ${t.plazo}`)} />
      <Bloque
        titulo="Precio (todos los importes + IVA)"
        items={p.precio.conceptos.map((c) => `${c.concepto}: ${euros(c.importe_centimos)}${c.periodicidad === 'mensual' ? ' al mes' : ''} + IVA`)}
      />
      <Bloque
        titulo="Pagos"
        items={[...p.pagos.hitos.map((h) => `${h.hito}: ${euros(h.importe_centimos)} + IVA — ${h.cuando}`), ...p.pagos.notas]}
      />
      {p.garantia && <Bloque titulo="Garantía" items={[p.garantia]} />}
      <Bloque titulo="Vigencia" items={[`${p.vigencia.dias} días: hasta el ${fechaLarga(p.vigencia.hasta)}.`]} />
      <p className="condiciones-huella">
        Huella de esta versión (SHA-256): <code>{offerHash}</code>
      </p>
    </div>
  );
}
