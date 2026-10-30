// Piezas de servidor que comparten las paginas del panel.
import Link from 'next/link';
import { euros } from '@/lib/propuestas/formato';
import { dia, relativo } from '@/lib/panel/formato';
import { hoyEnMadrid, NOMBRE_ESTADO, type Contacto, type PropuestaPanel } from '@/lib/panel/resumen';

const ESTADO_PROPUESTA: Record<PropuestaPanel['estado'], { texto: string; clase: string }> = {
  vigente: { texto: 'Vigente', clase: '' },
  vencida: { texto: 'Vencida', clase: 'alerta' },
  aceptada: { texto: 'Aceptada', clase: 'ok' },
  retirada: { texto: 'Retirada', clase: '' },
};

export function EtiquetaPropuesta({ p }: { p: PropuestaPanel }) {
  const e = ESTADO_PROPUESTA[p.estado];
  return <span className={`etiqueta ${e.clase}`}>{e.texto}</span>;
}

export function EtiquetaContacto({ c }: { c: Contacto }) {
  return <span className={`etiqueta ${c.estado === 'ganado' ? 'ok' : ''}`}>{NOMBRE_ESTADO[c.estado]}</span>;
}

/** Lo que va a la derecha de una propuesta en las listas: cuando vence, o cuando se acepto. */
function ladoPropuesta(p: PropuestaPanel): string {
  if (p.estado === 'aceptada' && p.aceptada) return `aceptada el ${dia(p.aceptada)}`;
  if (p.estado === 'vigente') return `vence ${relativo(p.venceDia)}`;
  if (p.estado === 'vencida') return `venció el ${dia(p.venceDia)}`;
  return '';
}

export function FilaPropuesta({ p, detalle }: { p: PropuestaPanel; detalle?: string }) {
  const cobrados = p.hitos.filter((h) => h.cobrado).reduce((s, h) => s + h.importe_centimos, 0);
  const total = p.hitos.reduce((s, h) => s + h.importe_centimos, 0);
  const datos = [
    detalle,
    p.aperturas ? `abierta ${p.aperturas.veces === 1 ? '1 vez' : `${p.aperturas.veces} veces`}, la última el ${dia(p.aperturas.ultima)}` : p.estado === 'vigente' ? 'sin abrir con su enlace' : null,
    p.estado === 'aceptada' ? `cobrado ${euros(cobrados)} de ${euros(total)}` : null,
    p.contacto?.colaborador ? `de parte de ${p.contacto.colaborador}` : null,
  ].filter(Boolean);
  return (
    <Link className="fila" href={`/panel/propuestas/${p.referencia}`}>
      <span className="fila-titulo">
        {p.negocio} <span className="cuenta">{p.referencia}</span>
      </span>
      <span className="fila-lado">
        <EtiquetaPropuesta p={p} />
      </span>
      <span className="fila-dato">{[ladoPropuesta(p), ...datos].filter(Boolean).join(' · ')}</span>
    </Link>
  );
}

export function FilaContacto({ c }: { c: Contacto }) {
  const paso = [c.siguiente_accion, c.fecha ? (c.fecha < hoyEnMadrid() ? `vencido: ${dia(c.fecha)}` : relativo(c.fecha)) : null]
    .filter(Boolean)
    .join(' · ');
  return (
    <Link className="fila" href={`/panel/contactos/${c.id}`}>
      <span className="fila-titulo">
        {c.negocio}
        {c.persona ? <span className="cuenta"> · {c.persona}</span> : null}
      </span>
      <span className="fila-lado">
        <EtiquetaContacto c={c} />
      </span>
      <span className="fila-dato">{paso || 'Sin siguiente paso'}</span>
    </Link>
  );
}

export function Vacio({ children }: { children: React.ReactNode }) {
  return <p className="vacio">{children}</p>;
}
