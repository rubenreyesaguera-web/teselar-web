// Las condiciones completas de una version, en compacto: es lo que se lee en «Lo que aceptas» antes de confirmar.
// Sale de la misma instantanea que la pagina y que el endpoint. Sin estado ni efectos: vale en servidor y cliente.
import React from 'react';
import type { InstantaneaV1 } from '@/lib/propuestas/instantanea';
import { euros, fechaLarga } from '@/lib/propuestas/formato';
import { TEXTOS } from '@/lib/propuestas/textos';

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
  const l = p.idioma ?? 'es';
  const T = TEXTOS[l];
  const B = T.bloques;
  return (
    <div className="condiciones">
      <p className="condiciones-cabecera">
        {T.propuesta} {p.referencia} · {T.versionN(p.version)} · {fechaLarga(p.fecha, l)}
        <br />
        {p.partes.proveedor.nombre} · {p.partes.proveedor.marca}
        {` · NIF ${p.partes.proveedor.nif}`} → {p.partes.cliente.nombre} · {p.partes.cliente.negocio}
      </p>
      <Bloque titulo={B.incluye} items={[...p.alcance, ...p.entregables]} />
      <Bloque titulo={B.noIncluye} items={p.exclusiones} />
      <Bloque titulo={B.necesito} items={p.dependencias} />
      <Bloque titulo={B.calendario} items={p.calendario.map((t) => `${t.tramo} — ${T.dependeDe.toLowerCase()} ${t.depende_de}: ${t.plazo}`)} />
      <Bloque
        titulo={B.precio}
        items={p.precio.conceptos.map((c) => `${c.concepto}: ${euros(c.importe_centimos)}${c.periodicidad === 'mensual' ? T.alMes : ''}${T.masIva}`)}
      />
      <Bloque
        titulo={B.pagos}
        items={[...p.pagos.hitos.map((h) => `${h.hito}: ${euros(h.importe_centimos)}${T.masIva} — ${h.cuando}`), ...p.pagos.notas]}
      />
      {p.garantia && <Bloque titulo={B.garantia} items={[p.garantia]} />}
      <Bloque titulo={B.vigencia} items={[T.vigenciaHasta(p.vigencia.dias, fechaLarga(p.vigencia.hasta, l))]} />
      <p className="condiciones-huella">
        {T.huellaVersion} <code>{offerHash}</code>
      </p>
    </div>
  );
}
