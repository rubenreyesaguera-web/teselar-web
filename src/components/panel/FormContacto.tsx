'use client';
// Alta y edicion de un contacto (decision 3): los campos de la hoja de leads mas propuesta y colaborador.
import Link from 'next/link';
import { useActionState } from 'react';
import { guardarContacto, type Estado } from '@/app/panel/acciones';
import { ESTADOS_CONTACTO, NOMBRE_ESTADO, type Contacto } from '@/lib/panel/resumen';

interface Props {
  contacto?: Contacto;
  propuestas: { referencia: string; negocio: string }[];
  colaboradores: string[];
}

export default function FormContacto({ contacto: c, propuestas, colaboradores }: Props) {
  const [estado, accion, enviando] = useActionState<Estado, FormData>(guardarContacto, {});
  return (
    <form className="formulario" action={accion}>
      {c && <input type="hidden" name="id" value={c.id} />}
      <p className="sub">
        Solo lo que el negocio te dio para que le contestes. Mientras no esté resuelto cómo se informa a quien no llegó por
        la web (RGPD, art. 14), nada más.
      </p>
      <div className="campos">
        <label className="campo">
          Negocio
          <input name="negocio" required maxLength={200} defaultValue={c?.negocio ?? ''} />
        </label>
        <label className="campo">
          Persona
          <input name="persona" maxLength={200} defaultValue={c?.persona ?? ''} />
        </label>
        <label className="campo">
          Teléfono
          <input name="telefono" type="tel" maxLength={40} defaultValue={c?.telefono ?? ''} />
        </label>
        <label className="campo">
          Correo
          <input name="correo" type="email" maxLength={254} defaultValue={c?.correo ?? ''} />
        </label>
        <label className="campo">
          Origen
          <input name="origen" maxLength={200} defaultValue={c?.origen ?? ''} list="origenes" placeholder="Visita, Instagram, Malt…" />
          <datalist id="origenes">
            {['Visita', 'Instagram', 'WhatsApp', 'Web', 'Malt', 'Recomendación', 'Colaborador'].map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        </label>
        <label className="campo">
          Estado
          <select name="estado" defaultValue={c?.estado ?? 'en_conversacion'}>
            {ESTADOS_CONTACTO.map((e) => (
              <option key={e} value={e}>
                {NOMBRE_ESTADO[e]}
              </option>
            ))}
          </select>
        </label>
        <label className="campo ancho">
          Siguiente paso
          <input name="siguiente_accion" maxLength={500} defaultValue={c?.siguiente_accion ?? ''} placeholder="Llamar para cerrar la reunión" />
        </label>
        <label className="campo">
          Fecha del siguiente paso
          <input name="fecha" type="date" defaultValue={c?.fecha ?? ''} />
        </label>
        <label className="campo">
          Propuesta
          <select name="propuesta" defaultValue={c?.propuesta ?? ''}>
            <option value="">Ninguna</option>
            {propuestas.map((p) => (
              <option key={p.referencia} value={p.referencia}>
                {p.referencia} · {p.negocio}
              </option>
            ))}
          </select>
        </label>
        <label className="campo">
          Colaborador
          <input name="colaborador" maxLength={100} defaultValue={c?.colaborador ?? ''} list="colaboradores" />
          <small>La propuesta enlazada lo hereda en el panel; no entra en lo que ve el cliente.</small>
          <datalist id="colaboradores">
            {colaboradores.map((n) => (
              <option key={n} value={n} />
            ))}
          </datalist>
        </label>
        <label className="campo ancho">
          Notas
          <textarea name="notas" maxLength={5000} defaultValue={c?.notas ?? ''} />
        </label>
      </div>
      {estado.mensaje && (
        <p className="mensaje error" role="alert">
          {estado.mensaje}
        </p>
      )}
      <div className="botones">
        <button className="boton boton-principal" type="submit" disabled={enviando}>
          {enviando ? 'Guardando…' : c ? 'Guardar cambios' : 'Añadir contacto'}
        </button>
        <Link className="boton boton-secundario" href="/panel/contactos">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
