'use client';
// La parte interactiva de la propuesta (ADR-091 y ADR-092): un contexto que comparten los botones «Aceptar propuesta»,
// el dialogo «Lo que aceptas» y el desplegable «Ver alcance completo».
//
// La capacidad se lee del fragmento de la URL aqui, en el navegador, y solo sale en la cabecera del POST. Por eso
// nada en la pagina puede cambiar el fragmento (ni un enlace a #ancla): se perderia el permiso para aceptar.
// Nada finge: sin respuesta 201/200/409 del servidor, no se dice que esta aceptada.
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { InstantaneaV1 } from '@/lib/propuestas/instantanea';
import type { Justificante } from '@/lib/propuestas/aceptar';
import type { Estado } from '@/lib/propuestas/leer';
import { euros, momento } from '@/lib/propuestas/formato';
import Condiciones from './Condiciones';

interface Ctx {
  abrir: () => void;
  estado: Estado;
  alcanceAbierto: boolean;
  alternarAlcance: () => void;
}

const Contexto = createContext<Ctx | null>(null);

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
  const [tipo, setTipo] = useState<'autonomo' | 'sociedad' | null>(null);
  const [alcanceAbierto, setAlcanceAbierto] = useState(false);

  useEffect(() => {
    const c = window.location.hash.slice(1);
    setCapacidad(FORMA_CAPACIDAD.test(c) ? c : null);
  }, []);

  const abrir = useCallback(() => {
    if (estado !== 'vigente') return;
    dialogo.current?.showModal();
  }, [estado]);

  const alternarAlcance = useCallback(() => {
    setAlcanceAbierto((abierto) => {
      if (!abierto) requestAnimationFrame(() => document.getElementById('alcance-completo')?.scrollIntoView({ behavior: 'smooth' }));
      return !abierto;
    });
  }, []);

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
          tipo: f.get('tipo'),
          nombre: f.get('nombre'),
          dni: f.get('dni'),
          correo: f.get('correo'),
          razon_social: f.get('razon_social'),
          nif_sociedad: f.get('nif_sociedad'),
          domicilio: f.get('domicilio'),
          cargo: f.get('cargo'),
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

  const primerPago = instantanea.pagos.hitos[0];

  return (
    <Contexto.Provider value={{ abrir, estado, alcanceAbierto, alternarAlcance }}>
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
                {primerPago && (
                  <p>
                    En breve te escribo con los datos para el primer pago ({primerPago.hito}: {euros(primerPago.importe_centimos)} + IVA).
                  </p>
                )}
                <button type="button" className="boton boton-principal" onClick={cerrar}>
                  Volver a la propuesta
                </button>
              </div>
            ) : (
              <>
                <Condiciones instantanea={instantanea} offerHash={offerHash} />
                {capacidad ? (
                  <form className="formulario" onSubmit={enviar}>
                    <h3>Quién acepta</h3>
                    <fieldset className="tipo">
                      <legend>Aceptas como</legend>
                      <label className="opcion">
                        <input type="radio" name="tipo" value="autonomo" required onChange={() => setTipo('autonomo')} />
                        Autónomo
                      </label>
                      <label className="opcion">
                        <input type="radio" name="tipo" value="sociedad" required onChange={() => setTipo('sociedad')} />
                        Sociedad
                      </label>
                    </fieldset>
                    {tipo === 'sociedad' && (
                      <div className="sociedad">
                        <label>
                          Razón social
                          <input name="razon_social" required maxLength={200} autoComplete="organization" placeholder="Ejemplo, S.L." />
                        </label>
                        <label>
                          NIF de la sociedad
                          <input name="nif_sociedad" required maxLength={12} autoCapitalize="characters" spellCheck={false} placeholder="B12345674" />
                        </label>
                      </div>
                    )}
                    <label>
                      {tipo === 'sociedad' ? 'Domicilio social' : 'Domicilio'} (calle, número, código postal y población)
                      <input name="domicilio" required minLength={5} maxLength={300} autoComplete="street-address" />
                    </label>
                    <label>
                      Nombre y apellidos de quien acepta
                      <input name="nombre" required maxLength={200} autoComplete="name" />
                    </label>
                    {tipo === 'sociedad' && (
                      <label>
                        Tu cargo en la sociedad
                        <input name="cargo" required minLength={2} maxLength={100} autoComplete="organization-title" placeholder="Administradora, apoderado, gerente…" />
                      </label>
                    )}
                    <label>
                      DNI o NIE de quien acepta
                      <input name="dni" required maxLength={12} autoCapitalize="characters" spellCheck={false} placeholder="12345678Z" />
                    </label>
                    <label>
                      Correo
                      <input name="correo" type="email" required maxLength={254} autoComplete="email" />
                    </label>
                    <label className="casilla">
                      <input type="checkbox" name="leido" required />
                      He leído y acepto esta propuesta ({instantanea.referencia}, versión {instantanea.version}).
                    </label>
                    <label className="casilla">
                      <input type="checkbox" name="autoridad" required />
                      {tipo === 'sociedad' ? 'Actúo en nombre de la sociedad y tengo poderes para aceptarla.' : 'Acepto en mi propio nombre, como autónomo.'}
                    </label>
                    <p className="aviso-legal">
                      Tus datos y tu autoridad para aceptar los declaras tú: se comprueba que el DNI y el NIF estén bien
                      escritos, pero no que sean tuyos. Esto registra tu aceptación como evidencia comercial;{' '}
                      <strong>no es una firma electrónica</strong>. Responsable: {instantanea.partes.proveedor.nombre}.
                      Finalidad: registrar la aceptación de esta propuesta y preparar el acuerdo (nombre, DNI, domicilio, correo
                      y, si aceptas como sociedad, su razón social, su NIF y tu cargo). Se conserva lo que dure el acuerdo y sus obligaciones
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

/** «Ver alcance completo»: un boton, no un enlace a #ancla, para no tocar el fragmento (la capacidad). */
export function BotonAlcance() {
  const ctx = useContext(Contexto);
  if (!ctx) return null;
  return (
    <button type="button" className="boton boton-secundario" aria-expanded={ctx.alcanceAbierto} aria-controls="alcance-completo" onClick={ctx.alternarAlcance}>
      {ctx.alcanceAbierto ? 'Ocultar alcance' : 'Ver alcance completo'}
    </button>
  );
}

/** El detalle de la propuesta: siempre en el HTML (para imprimir y para lectores de pantalla), visible al desplegarlo. */
export function ZonaAlcance({ children }: { children: React.ReactNode }) {
  const ctx = useContext(Contexto);
  return (
    <div id="alcance-completo" className="zona-alcance" hidden={!ctx?.alcanceAbierto}>
      {children}
    </div>
  );
}
