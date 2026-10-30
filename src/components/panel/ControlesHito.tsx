'use client';
// Marcar un hito cumplido (lo ve el cliente en su pagina: se confirma antes y se puede deshacer despues) y apuntar
// «Cobrado el…» (solo lo ve Ruben, con deshacer). Addenda del 30/10 en ADR-091 y decision 3.
import { useActionState, useState } from 'react';
import { cambiarCobro, cambiarHito, type Estado } from '@/app/panel/acciones';
import { dia } from '@/lib/panel/formato';

interface Props {
  referencia: string;
  n: number;
  cumplido: string | null;
  cobrado: string | null;
  hoy: string;
}

function Mensaje({ estado }: { estado: Estado }) {
  if (!estado.mensaje) return null;
  return (
    <p className={`mensaje ${estado.ok ? 'ok' : 'error'}`} role="status">
      {estado.mensaje}
    </p>
  );
}

export default function ControlesHito({ referencia, n, cumplido, cobrado, hoy }: Props) {
  const [eHito, accionHito, enviandoHito] = useActionState<Estado, FormData>(cambiarHito, {});
  const [eCobro, accionCobro, enviandoCobro] = useActionState<Estado, FormData>(cambiarCobro, {});
  const [confirmando, setConfirmando] = useState(false);
  const [fechaCobro, setFechaCobro] = useState(hoy);

  return (
    <>
      <div className="hito-acciones">
        {cumplido ? (
          <form action={accionHito}>
            <input type="hidden" name="ref" value={referencia} />
            <input type="hidden" name="n" value={n} />
            <input type="hidden" name="deshacer" value="1" />
            <span className="etiqueta ok">Cumplido el {dia(cumplido)}</span>{' '}
            <button className="boton boton-secundario boton-peque" type="submit" disabled={enviandoHito}>
              Desmarcar
            </button>
          </form>
        ) : confirmando ? (
          <form action={accionHito} onSubmit={() => setConfirmando(false)}>
            <input type="hidden" name="ref" value={referencia} />
            <input type="hidden" name="n" value={n} />
            <p className="aviso-cliente">El cliente lo verá como cumplido en su página.</p>
            <div className="botones">
              <button className="boton boton-principal boton-peque" type="submit" disabled={enviandoHito}>
                Sí, marcar cumplido
              </button>
              <button className="boton boton-secundario boton-peque" type="button" onClick={() => setConfirmando(false)}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <button className="boton boton-secundario boton-peque" type="button" onClick={() => setConfirmando(true)} disabled={enviandoHito}>
            Marcar cumplido
          </button>
        )}
      </div>

      <div className="hito-acciones">
        {cobrado ? (
          <form action={accionCobro}>
            <input type="hidden" name="ref" value={referencia} />
            <input type="hidden" name="n" value={n} />
            <input type="hidden" name="deshacer" value="1" />
            <span className="etiqueta ok">Cobrado el {dia(cobrado)}</span>{' '}
            <button className="boton boton-secundario boton-peque" type="submit" disabled={enviandoCobro}>
              Deshacer cobro
            </button>
          </form>
        ) : (
          <form action={accionCobro} className="hito-acciones">
            <input type="hidden" name="ref" value={referencia} />
            <input type="hidden" name="n" value={n} />
            <label className="campo">
              <span className="sub">Cobrado el</span>
              <input type="date" name="fecha" value={fechaCobro} max={hoy} onChange={(e) => setFechaCobro(e.target.value)} required />
            </label>
            <button className="boton boton-secundario boton-peque" type="submit" disabled={enviandoCobro}>
              Apuntar cobro
            </button>
          </form>
        )}
      </div>
      <Mensaje estado={eHito} />
      <Mensaje estado={eCobro} />
    </>
  );
}
