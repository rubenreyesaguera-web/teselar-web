'use client';
// «Saldado el…» de la comision de un contacto (fase 2, decision 2): fecha, forma de pago, valor acordado si no es dinero
// (LIVA art. 79.Uno) y una nota. Con deshacer. Solo lo ve Ruben; es un apunte, no una factura.
import { useActionState, useState } from 'react';
import { cambiarSaldo, type Estado } from '@/app/panel/acciones';
import { dia } from '@/lib/panel/formato';
import { FORMAS_PAGO, NOMBRE_FORMA, type Contacto, type FormaPago } from '@/lib/panel/resumen';
import { euros } from '@/lib/propuestas/formato';

export default function ControlesSaldo({ c, hoy }: { c: Contacto; hoy: string }) {
  const [estado, accion, enviando] = useActionState<Estado, FormData>(cambiarSaldo, {});
  const [forma, setForma] = useState<FormaPago>('transferencia');
  const mensaje = estado.mensaje ? (
    <p className={`mensaje ${estado.ok ? 'ok' : 'error'}`} role="status">
      {estado.mensaje}
    </p>
  ) : null;

  if (c.comision_saldada) {
    const como = c.comision_forma ? NOMBRE_FORMA[c.comision_forma].toLowerCase() : '';
    const valor = c.comision_valor_centimos !== null ? ` (${euros(c.comision_valor_centimos)})` : '';
    return (
      <>
        <form action={accion} className="hito-acciones">
          <input type="hidden" name="id" value={c.id} />
          <input type="hidden" name="deshacer" value="1" />
          <span className="etiqueta ok">
            Saldado el {dia(c.comision_saldada)} · {como}
            {valor}
          </span>
          <button className="boton boton-secundario boton-peque" type="submit" disabled={enviando}>
            Deshacer pago
          </button>
        </form>
        {c.comision_nota && <p className="sub">{c.comision_nota}</p>}
        {mensaje}
      </>
    );
  }

  return (
    <>
      <form action={accion} className="saldo">
        <input type="hidden" name="id" value={c.id} />
        <label className="campo">
          <span className="sub">Saldado el</span>
          <input type="date" name="fecha" defaultValue={hoy} max={hoy} required />
        </label>
        <label className="campo">
          <span className="sub">Cómo</span>
          <select name="forma" value={forma} onChange={(e) => setForma(e.target.value as FormaPago)}>
            {FORMAS_PAGO.map((f) => (
              <option key={f} value={f}>
                {NOMBRE_FORMA[f]}
              </option>
            ))}
          </select>
        </label>
        {forma !== 'transferencia' && (
          <label className="campo">
            <span className="sub">Valor acordado (€)</span>
            <input name="valor" inputMode="decimal" required placeholder="300" />
          </label>
        )}
        <label className="campo">
          <span className="sub">Nota</span>
          <input name="nota" maxLength={500} placeholder={forma === 'canje' ? '3 meses de mantenimiento de su web' : ''} />
        </label>
        <button className="boton boton-secundario boton-peque" type="submit" disabled={enviando}>
          Apuntar pago
        </button>
      </form>
      {mensaje}
    </>
  );
}
