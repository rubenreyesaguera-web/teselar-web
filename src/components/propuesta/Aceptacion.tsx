'use client';
// La aceptacion (ADR-091, hito 6.5): un contexto que comparten todos los botones «Aceptar propuesta» de la pagina
// y el dialogo «Lo que aceptas». La capacidad se lee del fragmento de la URL aqui, en el navegador, y solo sale en la
// cabecera del POST. Nada de esto finge: sin respuesta 201/200/409 del servidor, no se dice que esta aceptada.
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { InstantaneaV1 } from '@/lib/propuestas/instantanea';
import type { Justificante } from '@/lib/propuestas/aceptar';
import type { Estado } from '@/lib/propuestas/leer';
import { momento } from '@/lib/propuestas/formato';
import Condiciones from './Condiciones';

const Contexto = createContext<{ abrir: () => void; estado: Estado } | null>(null);

const FORMA_CAPACIDAD = /^[A-Za-z0-9_-]{43}$/;

function nuevaClave(): string {
  const b = new Uint8Array(24);
  crypto.getRandomValues(b);
  return btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** La misma clave para el mismo intento, aunque se recargue: asi repetir no duplica. */
function claveDelIntento(ref: string, version: number): string {
  const k = `propuesta:${ref}:v${version}:intento`;
  try {
    const guardada = sessionStorage.getItem(k);
    if (guardada) return guardada;
    const nueva = nuevaClave();
    sessionStorage.setItem(k, nueva);
    return nueva;
  } catch {
    return nuevaClave();
  }
}

type Envio =
  | { fase: 'formulario'; error?: string }
  | { fase: 'enviando' }
  | { fase: 'hecho'; justificante: Justificante; yaEstaba: boolean };

export function ProveedorAceptacion({
  instantanea,
  offerHash,
  estado,
  children,
}: {
  instantanea: InstantaneaV1;
  offerHash: string;
  estado: Estado;
  children: React.ReactNode;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [capacidad, setCapacidad] = useState<string | null>(null);
  const [envio, setEnvio] = useState<Envio>({ fase: 'formulario' });

  useEffect(() => {
    const c = window.location.hash.slice(1);
    setCapacidad(FORMA_CAPACIDAD.test(c) ? c : null);
  }, []);

  const abrir = useCallback(() => {
    if (estado !== 'vigente') return;
    dialogo.current?.showModal();
  }, [estado]);

  // Al cerrar despues de aceptar, `onClose` vuelve a pedir la pagina al servidor: el estado lo dice la base.
  const cerrar = () => dialogo.current?.close();

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!capacidad || envio.fase === 'enviando') return;
    const f = new FormData(e.currentTarget);
    setEnvio({ fase: 'enviando' });
    try {
      const res = await fetch('/api/propuestas/aceptar', {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', 'X-Propuesta-Capacidad': capacidad },
        body: JSON.stringify({
          referencia: instantanea.referencia,
          version: instantanea.version,
          offer_hash: offerHash,
          nombre: f.get('nombre'),
          correo: f.get('correo'),
          empresa: f.get('empresa'),
          casilla_leido: f.get('leido') === 'on',
          casilla_autoridad: f.get('autoridad') === 'on',
          idempotency_key: claveDelIntento(instantanea.referencia, instantanea.version),
        }),
      });
      const datos = (await res.json()) as { mensaje: string; codigo: string; justificante?: Justificante };
      if (datos.justificante && (res.status === 201 || res.status === 200 || datos.codigo === 'ya_aceptada')) {
        setEnvio({ fase: 'hecho', justificante: datos.justificante, yaEstaba: datos.codigo === 'ya_aceptada' });
      } else {
        setEnvio({ fase: 'formulario', error: datos.mensaje });
      }
    } catch {
      setEnvio({ fase: 'formulario', error: 'No hay conexión o el servidor no responde. Vuelve a intentarlo: no se duplicará.' });
    }
  }

  return (
    <Contexto.Provider value={{ abrir, estado }}>
      {children}
      {/* Solo si se puede aceptar: el dialogo cerrado tambien va en el HTML, con todas las condiciones dentro. */}
      {estado === 'vigente' && (
        <dialog ref={dialogo} className="dialogo" aria-labelledby="dialogo-titulo" onClose={() => envio.fase === 'hecho' && router.refresh()}>
          <div className="dialogo-cabecera">
            <h2 id="dialogo-titulo">{envio.fase === 'hecho' ? 'Propuesta aceptada' : 'Lo que aceptas'}</h2>
            <button type="button" className="dialogo-cerrar" onClick={cerrar} aria-label="Cerrar">
              ×
            </button>
          </div>
          <div className="dialogo-cuerpo">
            {envio.fase === 'hecho' ? (
              <div className="justificante" role="status">
                <p className="justificante-ok">{envio.yaEstaba ? 'Esta propuesta ya estaba aceptada.' : 'Gracias. Tu aceptación ha quedado registrada.'}</p>
                <dl>
                  <div>
                    <dt>Propuesta</dt>
                    <dd>
                      {envio.justificante.referencia} · versión {envio.justificante.version}
                    </dd>
                  </div>
                  <div>
                    <dt>Aceptada el</dt>
                    <dd>
                      {momento(new Date(envio.justificante.accepted_at))} (hora de Lloret) · {envio.justificante.accepted_at} UTC
                    </dd>
                  </div>
                  <div>
                    <dt>Huella de lo aceptado</dt>
                    <dd>
                      <code>{envio.justificante.offer_hash}</code>
                    </dd>
                  </div>
                </dl>
                <p>{instantanea.siguiente_paso}</p>
                <button type="button" className="boton boton-principal" onClick={cerrar}>
                  Volver a la propuesta
                </button>
              </div>
            ) : (
              <>
                <Condiciones instantanea={instantanea} offerHash={offerHash} />
                {capacidad ? (
                  <form className="formulario" onSubmit={enviar} noValidate={false}>
                    <h3>Tus datos</h3>
                    <label>
                      Nombre y apellidos
                      <input name="nombre" required maxLength={200} autoComplete="name" />
                    </label>
                    <label>
                      Correo
                      <input name="correo" type="email" required maxLength={254} autoComplete="email" />
                    </label>
                    <label>
                      Negocio
                      <input name="empresa" required maxLength={200} autoComplete="organization" defaultValue={instantanea.partes.cliente.negocio} />
                    </label>
                    <label className="casilla">
                      <input type="checkbox" name="leido" required />
                      He leído y acepto esta propuesta ({instantanea.referencia}, versión {instantanea.version}).
                    </label>
                    <label className="casilla">
                      <input type="checkbox" name="autoridad" required />
                      Actúo en nombre del negocio y puedo aceptarla.
                    </label>
                    <p className="aviso-legal">
                      Tu identidad y tu autoridad para aceptar las declaras tú y no se verifican. Esto registra tu aceptación como
                      evidencia comercial; <strong>no es una firma electrónica</strong>. Responsable: {instantanea.partes.proveedor.nombre}.
                      Finalidad: registrar la aceptación de esta propuesta. Se conserva lo que dure el acuerdo y sus obligaciones
                      legales. Tus derechos y el resto de la información, en la{' '}
                      <a href="/es/legal/privacidad" target="_blank" rel="noopener">
                        política de privacidad
                      </a>
                      .
                    </p>
                    {envio.fase === 'formulario' && envio.error && (
                      <p className="error" role="alert">
                        {envio.error}
                      </p>
                    )}
                    <button type="submit" className="boton boton-principal" disabled={envio.fase === 'enviando'}>
                      {envio.fase === 'enviando' ? 'Guardando…' : 'Confirmar aceptación'}
                    </button>
                  </form>
                ) : (
                  <p className="aviso aviso-alerta">
                    Para aceptar, abre el enlace completo que te envié. Este enlace sirve para leer la propuesta, no para aceptarla.
                  </p>
                )}
              </>
            )}
          </div>
        </dialog>
      )}
    </Contexto.Provider>
  );
}

export function BotonAceptar({ className = 'boton boton-principal', children = 'Aceptar propuesta' }: { className?: string; children?: React.ReactNode }) {
  const ctx = useContext(Contexto);
  if (!ctx || ctx.estado !== 'vigente') return null;
  return (
    <button type="button" className={className} onClick={ctx.abrir}>
      {children} <span aria-hidden="true">→</span>
    </button>
  );
}
