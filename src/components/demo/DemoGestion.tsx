'use client';

// Demo de gestion (ADR-113, doc 31). Pagina fija: sin IA y sin servidor salvo el contador de pasos, que no guarda ni el
// nombre de la empresa ni el texto de «Otro». Recibe del servidor solo sus textos y los ejemplos de su idioma, para que
// al navegador no llegue el diccionario entero.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { dictionaries } from '../../i18n/dictionaries';
import { COMO, PARTES, esSector, type Como, type EjemploSector, type Parte, type Sector, SECTORES } from '../../data/demo';
import { enlaceCalendly } from '../../lib/demo/calendly';
import type { Paso } from '../../lib/demo/evento';

export type TextosDemo = (typeof dictionaries)['es']['demo'];

interface Props {
  lng: 'es' | 'ca' | 'en';
  t: TextosDemo;
  ejemplos: Record<Sector, EjemploSector>;
}

const MAXIMO_EMPRESA = 80;

function contar(paso: Paso, datos: { lng: string; sector: Sector | null; partes: Parte[]; como: Como | null; desdeEnlace: boolean }) {
  try {
    void fetch('/api/demo/evento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paso, ...datos }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Contar nunca puede romper la demo.
  }
}

const chip =
  'min-h-11 px-4 rounded-full border text-sm transition-colors duration-150 ease-out cursor-pointer ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA5] ' +
  'aria-pressed:bg-[#083C58] aria-pressed:border-[#083C58] aria-pressed:text-white aria-pressed:font-semibold ' +
  'border-[#B9C6CF] bg-white text-[#083C58] hover:border-[#083C58]';

const campo =
  'min-h-[50px] w-full rounded-[10px] border border-[#B9C6CF] bg-white px-3.5 text-base text-[#031622] ' +
  'placeholder:text-[#6B7C88] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA5]';

function Caja({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col gap-2.5 rounded-[14px] bg-white p-4 shadow-[0_1px_2px_rgba(3,22,34,.06)]">
      <h3 className="m-0 text-[15px] font-semibold text-[#083C58]">{titulo}</h3>
      {children}
    </section>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-[#33434F]">{etiqueta}</span>
      <b className="text-right font-semibold">{valor}</b>
    </div>
  );
}

function Parada({ hora, texto }: { hora: string; texto: string }) {
  return (
    <div className="flex gap-2.5 text-[13px] text-[#33434F]">
      <b className="w-11 flex-none font-semibold text-[#083C58] tabular-nums">{hora}</b>
      <span>{texto}</span>
    </div>
  );
}

export function DemoGestion({ lng, t, ejemplos }: Props) {
  const [empresa, setEmpresa] = useState('');
  const [sector, setSector] = useState<Sector | null>(null);
  const [otro, setOtro] = useState('');
  const [partes, setPartes] = useState<Parte[]>([]);
  const [como, setComo] = useState<Como | null>(null);
  const [desdeEnlace, setDesdeEnlace] = useState(false);
  const contado = useRef<Set<Paso>>(new Set());
  const panel = useRef<HTMLDivElement>(null);

  // El nombre y el sector pueden venir en el enlace (?empresa=...&sector=...), para mandarla preparada a un lead. Se lee
  // aqui y no en el servidor para que la pagina siga siendo estatica.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const e = (q.get('empresa') ?? '').trim().slice(0, MAXIMO_EMPRESA);
    const s = q.get('sector');
    const valido = esSector(s) ? s : null;
    if (e) setEmpresa(e);
    if (valido) setSector(valido);
    const enlace = !!e || !!valido;
    setDesdeEnlace(enlace);
    if (!contado.current.has('abrir')) {
      contado.current.add('abrir');
      contar('abrir', { lng, sector: valido, partes: [], como: null, desdeEnlace: enlace });
    }
  }, [lng]);

  const ej = ejemplos[sector ?? 'otr'];
  const nombre = empresa.trim() || t.tu_empresa;
  const sectorTexto = sector === null ? '' : sector === 'otr' ? `${t.otro_prefijo}: ${otro.trim()}`.replace(/:\s*$/, '') : ej.nombre;
  const marcadas = PARTES.filter((p) => partes.includes(p));
  const llevaTexto = marcadas.map((p) => t.partes[p]).join(', ');

  const calendly = useMemo(
    () => enlaceCalendly({ empresa: empresa.trim(), sector: sectorTexto, lleva: llevaTexto, como: como ? t.como[como] : '' }),
    [empresa, sectorTexto, llevaTexto, como, t],
  );

  const datos = { lng, sector, partes: marcadas, como, desdeEnlace };
  const contarUnaVez = (paso: Paso) => {
    if (contado.current.has(paso)) return;
    contado.current.add(paso);
    contar(paso, datos);
  };

  const alternar = (p: Parte) => setPartes((ps) => (ps.includes(p) ? ps.filter((x) => x !== p) : [...ps, p]));

  const verPanel = () => {
    contarUnaVez('panel');
    panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    panel.current?.focus({ preventScroll: true });
  };

  return (
    <div className="min-h-screen bg-[#EEF2F5] font-sans text-[#031622] antialiased">
      <div className="bg-[#FFF4DB] px-4 py-2.5 text-center text-xs font-semibold text-[#4D3800]">{t.banda}</div>

      <header className="bg-[#083C58] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href={`/${lng}`} className="text-[13px] font-bold tracking-[0.22em] text-white no-underline">
            TESELAR <span className="font-normal">SOFTWARE</span>
          </Link>
          <Link href={`/${lng}`} className="text-sm text-[#D9E4EA] underline-offset-4 hover:underline">
            {t.volver}
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start lg:py-10">
        {/* Lo que contesta el visitante */}
        <div className="flex flex-col gap-5 rounded-[18px] bg-white p-5 sm:p-6 lg:sticky lg:top-6">
          <div className="flex flex-col gap-2">
            <h1 className="m-0 text-[28px] font-bold leading-[1.1] text-[#083C58] [text-wrap:balance]">{t.titulo}</h1>
            <p className="m-0 text-[15px] leading-normal text-[#33434F] [text-wrap:pretty]">{t.intro}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="demo-empresa" className="text-[13px] font-semibold text-[#33434F]">{t.empresa_label}</label>
            <input
              id="demo-empresa"
              type="text"
              className={campo}
              placeholder={t.empresa_placeholder}
              autoComplete="organization"
              maxLength={MAXIMO_EMPRESA}
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
          </div>

          <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
            <legend className="mb-2 text-[13px] font-semibold text-[#33434F]">{t.sector_legend}</legend>
            <div className="flex flex-wrap gap-2">
              {SECTORES.map((s) => (
                <button key={s} type="button" className={chip} aria-pressed={sector === s} onClick={() => setSector(s)}>
                  {ejemplos[s].nombre}
                </button>
              ))}
            </div>
            {sector === 'otr' && (
              <div className="mt-1 flex flex-col gap-1.5">
                <label htmlFor="demo-otro" className="text-[13px] font-semibold text-[#33434F]">{t.otro_label}</label>
                <input
                  id="demo-otro"
                  type="text"
                  className={campo}
                  placeholder={t.otro_placeholder}
                  autoComplete="off"
                  maxLength={MAXIMO_EMPRESA}
                  value={otro}
                  onChange={(e) => setOtro(e.target.value)}
                />
              </div>
            )}
          </fieldset>

          <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
            <legend className="mb-2 text-[13px] font-semibold text-[#33434F]">
              {t.lleva_legend} <span className="font-normal">· {t.lleva_hint}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {PARTES.map((p) => (
                <button key={p} type="button" className={chip} aria-pressed={partes.includes(p)} onClick={() => alternar(p)}>
                  {t.partes[p]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
            <legend className="mb-2 text-[13px] font-semibold text-[#33434F]">{t.como_legend}</legend>
            <div className="flex flex-wrap gap-2">
              {COMO.map((c) => (
                <button key={c} type="button" className={chip} aria-pressed={como === c} onClick={() => setComo(c)}>
                  {t.como[c]}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-1 rounded-[14px] bg-[#083C58] p-[18px] text-white" aria-live="polite">
            <div className="text-[11px] tracking-[0.18em] text-[#B8E9E1] uppercase">{t.ejemplar}</div>
            <div className="text-[19px] font-bold [overflow-wrap:anywhere]">
              {t.preparado} {nombre}
            </div>
            <div className="text-[13px] text-[#D9E4EA]">
              {(sectorTexto || t.sin_sector) + ' · ' + (llevaTexto || t.sin_partes)}
            </div>
          </div>

          <button
            type="button"
            onClick={verPanel}
            className="min-h-[52px] cursor-pointer rounded-xl bg-[#00BFA5] px-4 text-[15px] font-bold text-[#031622] transition-transform duration-150 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#083C58]"
          >
            {t.ver}
          </button>
        </div>

        {/* Lo que ve en el panel: solo lo que ha marcado */}
        <div ref={panel} tabIndex={-1} className="scroll-mt-4 overflow-hidden rounded-[18px] border border-[#C9D3DA] bg-[#F4F7F9] outline-none" id="panel">
          <div className="bg-[#083C58] px-[18px] py-4 text-white">
            <div className="text-xl font-bold [overflow-wrap:anywhere]">{nombre}</div>
            <div className="text-[13px] text-[#D9E4EA]">{t.panel_dia}</div>
          </div>

          {marcadas.length === 0 ? (
            <p className="m-0 px-[18px] py-10 text-center text-[15px] text-[#4A5A66]">{t.panel_vacio}</p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-4 p-[18px]">
              {partes.includes('tec') && (
                <>
                  <Caja titulo={ej.tec.titulo}>
                    {ej.tec.tecnicos.map((tec, i) => (
                      <div key={tec.nombre} className={'flex flex-col gap-1.5 pb-2.5 ' + (i < ej.tec.tecnicos.length - 1 ? 'border-b border-[#E2E9EE]' : '')}>
                        <div className="flex justify-between gap-2 text-sm">
                          <b className="font-semibold">{tec.nombre}</b>
                          <span className="text-[#4A5A66]">{tec.resumen}</span>
                        </div>
                        {tec.paradas.map((p) => <Parada key={p.hora + p.texto} {...p} />)}
                      </div>
                    ))}
                  </Caja>
                  <Caja titulo={ej.tec.parte.titulo}>
                    {ej.tec.parte.filas.map((f) => <Fila key={f.etiqueta} {...f} />)}
                    <div className="flex h-20 items-center justify-center rounded-[10px] border border-dashed border-[#8FA3B0] text-[13px] text-[#4A5A66]">
                      {ej.tec.parte.firma}
                    </div>
                  </Caja>
                </>
              )}
              {partes.includes('cli') && (
                <Caja titulo={ej.cli.titulo}>
                  {ej.cli.avisos.map((a) => (
                    <div key={a.cliente + a.tipo} className="flex flex-col gap-0.5 rounded-[10px] border border-[#E2E9EE] p-2.5">
                      <div className="flex justify-between gap-2 text-xs text-[#4A5A66]"><span>{a.tipo}</span><span>{a.cuando}</span></div>
                      <div className="text-[15px] font-semibold">{a.cliente}</div>
                      <div className="text-sm text-[#33434F]">{a.detalle}</div>
                      <div className={'mt-1 self-start rounded-[10px] px-2.5 py-0.5 text-xs font-semibold text-[#031622] ' + (a.urgente ? 'bg-[#FFF4DB]' : 'bg-[#CCF2EC]')}>
                        {a.siguiente}
                      </div>
                    </div>
                  ))}
                </Caja>
              )}
              {partes.includes('fac') && (
                <Caja titulo={ej.fac.titulo}>{ej.fac.filas.map((f) => <Fila key={f.etiqueta} {...f} />)}</Caja>
              )}
              {partes.includes('cit') && (
                <Caja titulo={ej.cit.titulo}>{ej.cit.citas.map((p) => <Parada key={p.hora + p.texto} {...p} />)}</Caja>
              )}
              {partes.includes('mat') && (
                <Caja titulo={ej.mat.titulo}>{ej.mat.filas.map((f) => <Fila key={f.etiqueta} {...f} />)}</Caja>
              )}
            </div>
          )}

          <div className="px-[18px] pb-[18px]">
            <div className="flex flex-col gap-3 rounded-[14px] bg-[#083C58] p-4 text-white sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[17px] font-semibold">{t.cta_titulo}</span>
                <span className="text-[13px] text-[#D9E4EA] [text-wrap:pretty]">{t.cta_texto}</span>
              </div>
              <a
                href={calendly}
                target="_blank"
                rel="noopener"
                onClick={() => contarUnaVez('reservar')}
                className="flex min-h-12 flex-none flex-col justify-center rounded-xl bg-[#00BFA5] px-4 py-2 font-semibold text-[#031622] no-underline transition-transform duration-150 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="text-[15px]">{t.cta_btn}</span>
                <span className="text-xs font-normal">{t.cta_sub}</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
