// Estadisticas de la web (fase 2, 30/10): lo mas parecido a GA o Plausible sin cookies. Tarjetas con el % frente al
// periodo anterior, visitas por dia, «Ahora mismo», paginas, fuentes, campanas (?origen=), paises, dispositivos y el
// embudo de la demo. Cuenta visitas, no personas.
import Link from 'next/link';
import { exigirSesion } from '@/lib/panel/acceso';
import { esRango, leerEstadisticas, RANGOS, variacion, type Fila, type Rango } from '@/lib/panel/estadisticas';
import { dia } from '@/lib/panel/formato';
import GraficoVisitas from '@/components/panel/GraficoVisitas';

export const dynamic = 'force-dynamic';

const NOMBRE_RANGO: Record<Rango, string> = { '7': '7 días', '30': '30 días', '90': '90 días', todo: 'Todo' };
const NOMBRE_DISPOSITIVO: Record<string, string> = { movil: 'Móvil', escritorio: 'Escritorio', tableta: 'Tableta' };
const PAISES = new Intl.DisplayNames(['es'], { type: 'region' });
const pais = (c: string) => {
  try {
    return c.length === 2 ? (PAISES.of(c) ?? c) : c;
  } catch {
    return c;
  }
};

function Tarjeta({ titulo, valor, antes }: { titulo: string; valor: number; antes: number | null }) {
  const v = variacion(valor, antes);
  return (
    <div className="tarjeta">
      <span className="tarjeta-titulo">{titulo}</span>
      <span className="tarjeta-valor">{valor.toLocaleString('es-ES')}</span>
      {antes !== null && (
        <span className={`tarjeta-cambio ${v === null ? '' : v > 0 ? 'sube' : v < 0 ? 'baja' : ''}`}>
          {v === null ? `antes ${antes}` : `${v > 0 ? '▲' : v < 0 ? '▼' : '='} ${Math.abs(v)} % · antes ${antes}`}
        </span>
      )}
    </div>
  );
}

function Tabla({ titulo, columna, filas, nombre = (k) => k, vacio }: {
  titulo: string;
  columna: string;
  filas: Fila[];
  nombre?: (k: string) => string;
  vacio: string;
}) {
  const max = Math.max(1, ...filas.map((f) => f.n));
  return (
    <section className="bloque">
      <h2>{titulo}</h2>
      {filas.length ? (
        <table className="tabla">
          <thead>
            <tr>
              <th scope="col">{titulo}</th>
              <th scope="col">{columna}</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f.clave}>
                <td>
                  <span className="barra-dato" style={{ width: `${(f.n / max) * 100}%` }} aria-hidden="true" />
                  <span className="tabla-clave">{nombre(f.clave)}</span>
                </td>
                <td>{f.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="vacio">{vacio}</p>
      )}
    </section>
  );
}

export default async function Estadisticas({ searchParams }: { searchParams: Promise<{ rango?: string }> }) {
  await exigirSesion();
  const r = (await searchParams).rango;
  const rango: Rango = esRango(r) ? r : '30';
  const e = await leerEstadisticas(rango);
  const antes = e.totalesAntes;
  const { abrir, panel, reservar } = e.embudo;
  const pct = (n: number) => (abrir ? `${Math.round((n / abrir) * 100)} %` : '—');
  return (
    <>
      <div className="cabeza">
        <h1>Estadísticas</h1>
        <nav className="rangos" aria-label="Periodo">
          {RANGOS.map((x) => (
            <Link key={x} href={`/panel/estadisticas?rango=${x}`} aria-current={x === rango ? 'page' : undefined}>
              {NOMBRE_RANGO[x]}
            </Link>
          ))}
        </nav>
      </div>
      <p className="sub">
        Del {dia(e.periodo.desde)} al {dia(e.periodo.hasta)}
        {e.periodo.anterior && `, frente al ${dia(e.periodo.anterior.desde)}–${dia(e.periodo.anterior.hasta)}`}. Son visitas, no
        personas: sin cookies no se reconoce a nadie.
      </p>

      <div className="tarjetas">
        <Tarjeta titulo="Visitas" valor={e.totales.visitas} antes={antes?.visitas ?? null} />
        <Tarjeta titulo="Páginas vistas" valor={e.totales.vistas} antes={antes?.vistas ?? null} />
        <Tarjeta titulo="Pulsan reservar (demo)" valor={e.totales.reservas} antes={antes?.reservas ?? null} />
        <div className="tarjeta">
          <span className="tarjeta-titulo">
            <span className="vivo" aria-hidden="true" /> Ahora mismo
          </span>
          <span className="tarjeta-valor">{e.ahora.visitas}</span>
          <span className="tarjeta-cambio">{e.ahora.vistas} páginas en 30 min</span>
        </div>
      </div>

      <GraficoVisitas serie={e.serie} antes={e.serieAntes} />

      <div className="rejilla-tablas">
        <Tabla titulo="Páginas" columna="Vistas" filas={e.paginas} vacio="Aún no hay páginas vistas en este periodo." />
        <Tabla titulo="Fuentes" columna="Visitas" filas={e.fuentes} vacio="Aún no hay visitas en este periodo." />
        <Tabla
          titulo="Campañas"
          columna="Visitas"
          filas={e.campanas}
          vacio="Ninguna visita con etiqueta. Se etiqueta un enlace añadiendo ?origen=bio (o qr, betty…)."
        />
        <Tabla titulo="Países" columna="Visitas" filas={e.paises} nombre={pais} vacio="Aún no hay visitas en este periodo." />
        <Tabla
          titulo="Dispositivos"
          columna="Visitas"
          filas={e.dispositivos}
          nombre={(k) => NOMBRE_DISPOSITIVO[k] ?? k}
          vacio="Aún no hay visitas en este periodo."
        />
        <section className="bloque">
          <h2>Embudo de la demo</h2>
          <table className="tabla">
            <thead>
              <tr>
                <th scope="col">Paso</th>
                <th scope="col">Veces</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Abren la demo', abrir, ''],
                ['Llegan a su panel', panel, pct(panel)],
                ['Pulsan reservar', reservar, pct(reservar)],
              ].map(([paso, n, p]) => (
                <tr key={paso as string}>
                  <td>
                    <span className="barra-dato" style={{ width: `${abrir ? ((n as number) / abrir) * 100 : 0}%` }} aria-hidden="true" />
                    <span className="tabla-clave">
                      {paso}
                      {p ? <small> · {p}</small> : null}
                    </span>
                  </td>
                  <td>{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
