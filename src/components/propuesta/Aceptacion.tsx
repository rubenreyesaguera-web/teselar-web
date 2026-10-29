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
import type { Lengua } from '@/lib/propuestas/condiciones';
import { TEXTOS, type Textos } from '@/lib/propuestas/textos';
import Condiciones from './Condiciones';

/** Lo que el dialogo necesita de las condiciones generales; el texto entero se queda en el servidor. */
export interface DatosCondiciones {
  version: number;
  /** La pagina de las condiciones en la lengua de la propuesta, y en la otra. */
  ruta: string;
  otra: string;
}

interface Ctx {
  abrir: () => void;
  T: Textos;
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
  | { fase: 'hecho'; justificante: Justificante; yaEstaba: boolean; correo?: string };

export function ProveedorAceptacion({
  instantanea,
  offerHash,
  estado,
  condiciones,
  children,
}: {
  instantanea: InstantaneaV1;
  offerHash: string;
  estado: Estado;
  condiciones: DatosCondiciones;
  children: React.ReactNode;
}) {
  const l: Lengua = instantanea.idioma ?? 'es';
  const T = TEXTOS[l];
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
          casilla_condiciones: f.get('condiciones') === 'on',
          condiciones_version: condiciones.version,
          lengua: l,
          idempotency_key: claveDelIntento(instantanea.referencia, instantanea.version),
        }),
      });
      const datos = (await res.json()) as { mensaje: string; codigo: string; justificante?: Justificante };
      if (datos.justificante && (res.status === 201 || res.status === 200 || datos.codigo === 'ya_aceptada')) {
        setEnvio({ fase: 'hecho', justificante: datos.justificante, yaEstaba: datos.codigo === 'ya_aceptada', correo: String(f.get('correo') ?? '') });
      } else {
        setEnvio({ fase: 'formulario', error: datos.mensaje });
      }
    } catch {
      setEnvio({ fase: 'formulario', error: T.sinConexion });
    }
  }

  const primerPago = instantanea.pagos.hitos[0];

  return (
    <Contexto.Provider value={{ abrir, T, estado, alcanceAbierto, alternarAlcance }}>
      {children}
      {/* Solo si se puede aceptar: el dialogo cerrado tambien va en el HTML, con todas las condiciones dentro. */}
      {estado === 'vigente' && (
        <dialog ref={dialogo} lang={l} className="dialogo" aria-labelledby="dialogo-titulo" onClose={() => envio.fase === 'hecho' && router.refresh()}>
          <div className="dialogo-cabecera">
            <h2 id="dialogo-titulo">{envio.fase === 'hecho' ? T.propuestaAceptada : T.loQueAceptas}</h2>
            <button type="button" className="dialogo-cerrar" onClick={cerrar} aria-label={T.cerrar}>
              ×
            </button>
          </div>
          <div className="dialogo-cuerpo">
            {envio.fase === 'hecho' ? (
              <div className="justificante" role="status">
                <p className="justificante-ok">{envio.yaEstaba ? T.yaEstaba : T.gracias}</p>
                <dl>
                  <div>
                    <dt>{T.propuesta}</dt>
                    <dd>
                      {envio.justificante.referencia} · {T.versionN(envio.justificante.version)}
                    </dd>
                  </div>
                  <div>
                    <dt>{T.aceptadaElRotulo}</dt>
                    <dd>
                      {momento(new Date(envio.justificante.accepted_at), l)} · {envio.justificante.accepted_at} UTC
                    </dd>
                  </div>
                  <div>
                    <dt>{T.huellaAceptado}</dt>
                    <dd>
                      <code>{envio.justificante.offer_hash}</code>
                    </dd>
                  </div>
                </dl>
                {!envio.yaEstaba && envio.correo && <p>{T.correoEnviado(envio.correo)}</p>}
                {primerPago && <p>{T.primerPago(primerPago.hito, euros(primerPago.importe_centimos))}</p>}
                <button type="button" className="boton boton-principal" onClick={cerrar}>
                  {T.volver}
                </button>
              </div>
            ) : (
              <>
                <Condiciones instantanea={instantanea} offerHash={offerHash} />
                {/* La informacion previa de la LSSI (art. 27), antes de empezar a rellenar. */}
                <section className="antes" aria-labelledby="antes-t">
                  <h3 id="antes-t">{T.antesTitulo}</h3>
                  <ul>
                    {T.antes.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </section>
                {capacidad ? (
                  <form className="formulario" onSubmit={enviar}>
                    <h3>{T.quienAcepta}</h3>
                    <fieldset className="tipo">
                      <legend>{T.aceptasComo}</legend>
                      <label className="opcion">
                        <input type="radio" name="tipo" value="autonomo" required onChange={() => setTipo('autonomo')} />
                        {T.autonomo}
                      </label>
                      <label className="opcion">
                        <input type="radio" name="tipo" value="sociedad" required onChange={() => setTipo('sociedad')} />
                        {T.sociedad}
                      </label>
                    </fieldset>
                    {tipo === 'sociedad' && (
                      <div className="sociedad">
                        <label>
                          {T.razonSocial}
                          <input name="razon_social" required maxLength={200} autoComplete="organization" placeholder="Ejemplo, S.L." />
                        </label>
                        <label>
                          {T.nifSociedad}
                          <input name="nif_sociedad" required maxLength={12} autoCapitalize="characters" spellCheck={false} placeholder="B12345674" />
                        </label>
                      </div>
                    )}
                    <label>
                      {tipo === 'sociedad' ? T.domicilioSocial : T.domicilio} {T.domicilioAyuda}
                      <input name="domicilio" required minLength={5} maxLength={300} autoComplete="street-address" />
                    </label>
                    <label>
                      {T.nombre}
                      <input name="nombre" required maxLength={200} autoComplete="name" />
                    </label>
                    {tipo === 'sociedad' && (
                      <label>
                        {T.cargo}
                        <input name="cargo" required minLength={2} maxLength={100} autoComplete="organization-title" placeholder={T.cargoEjemplo} />
                      </label>
                    )}
                    <label>
                      {T.dni}
                      <input name="dni" required maxLength={12} autoCapitalize="characters" spellCheck={false} placeholder="12345678Z" />
                    </label>
                    <label>
                      {T.correo}
                      <input name="correo" type="email" required maxLength={254} autoComplete="email" />
                    </label>
                    <label className="casilla">
                      <input type="checkbox" name="leido" required />
                      {T.casillaLeido(instantanea.referencia, instantanea.version)}
                    </label>
                    <label className="casilla">
                      <input type="checkbox" name="condiciones" required />
                      <span>
                        {T.casillaCondiciones(condiciones.version)[0]}
                        {/* Pestana nueva: un enlace aqui no puede tocar el fragmento de esta pagina (la capacidad). */}
                        <a href={condiciones.ruta} target="_blank" rel="noopener">
                          {T.casillaCondiciones(condiciones.version)[1]}
                        </a>
                        {T.casillaCondiciones(condiciones.version)[2]}{' '}
                        <a href={condiciones.otra} target="_blank" rel="noopener" lang={l === 'es' ? 'ca' : 'es'}>
                          {l === 'es' ? '(en català)' : '(en castellano)'}
                        </a>
                      </span>
                    </label>
                    <label className="casilla">
                      <input type="checkbox" name="autoridad" required />
                      {tipo === 'sociedad' ? T.casillaAutoridadSociedad : T.casillaAutoridadAutonomo}
                    </label>
                    <p className="aviso-legal">
                      {T.avisoLegal(instantanea.partes.proveedor.nombre)[0]}
                      {T.avisoLegal(instantanea.partes.proveedor.nombre)[1]}
                      <a href={`/${l}/legal/privacidad`} target="_blank" rel="noopener">
                        {T.politica}
                      </a>
                      {T.avisoLegal(instantanea.partes.proveedor.nombre)[2]}
                    </p>
                    {envio.fase === 'formulario' && envio.error && (
                      <p className="error" role="alert">
                        {envio.error}
                      </p>
                    )}
                    <button type="submit" className="boton boton-principal" disabled={envio.fase === 'enviando'}>
                      {envio.fase === 'enviando' ? T.guardando : T.confirmar}
                    </button>
                  </form>
                ) : (
                  <p className="aviso aviso-alerta">{T.sinCapacidad}</p>
                )}
              </>
            )}
          </div>
        </dialog>
      )}
    </Contexto.Provider>
  );
}

export function BotonAceptar({ className = 'boton boton-principal', children }: { className?: string; children?: React.ReactNode }) {
  const ctx = useContext(Contexto);
  if (!ctx || ctx.estado !== 'vigente') return null;
  return (
    <button type="button" className={className} onClick={ctx.abrir}>
      {children ?? ctx.T.botonAceptar} <span aria-hidden="true">→</span>
    </button>
  );
}

/** «Ver alcance completo»: un boton, no un enlace a #ancla, para no tocar el fragmento (la capacidad). */
export function BotonAlcance() {
  const ctx = useContext(Contexto);
  if (!ctx) return null;
  return (
    <button type="button" className="boton boton-secundario" aria-expanded={ctx.alcanceAbierto} aria-controls="alcance-completo" onClick={ctx.alternarAlcance}>
      {ctx.alcanceAbierto ? ctx.T.ocultarAlcance : ctx.T.verAlcance}
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
