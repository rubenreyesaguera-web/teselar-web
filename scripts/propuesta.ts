// Crear y gestionar propuestas desde Claude Code (ADR-091): no hay panel de administracion ni rutas publicas
// para crear o borrar. Se ejecuta con bun:
//
//   bun --env-file=<fichero> scripts/propuesta.ts [--base <nombre>] <orden> ...
//
//   migrar                          aplica db/propuestas.sql (idempotente)
//   crear <contenido.json>          publica la v1 de una propuesta nueva y devuelve los dos enlaces
//     (crear y sustituir comprueban que el primer pago sea la señal de ADR-061: 10 % de la puesta en marcha, minimo
//      150 €; para saltarselo a proposito, --senal-distinta "<motivo>", que queda en el evento de la version)
//   sustituir <ref> <contenido.json> publica la version siguiente y deja la anterior como sustituida
//   invalidar <ref> <motivo>        retira la version viva (fraude, error); queda el evento
//   avance <ref> <n> [--deshacer]   marca (o desmarca) el hito de pago n (1 = el primero) como cumplido
//   exportar <salida.json>          vuelca versiones, aceptaciones, identidades y eventos (copia propia)
//
// La conexion sale de DATABASE_URL_UNPOOLED (o DATABASE_URL). `--base` cambia solo el nombre de la base: las
// pruebas van con `--base propuestas_pruebas`, nunca contra la de verdad.
//
// La capacidad del enlace del cliente se imprime UNA vez, aqui, y no se guarda en ningun sitio: en la base solo
// queda su SHA-256. Si se pierde el enlace, se sustituye la version.
import { Client, neonConfig } from '@neondatabase/serverless';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashCapacidad, hashOferta, nuevaCapacidad } from '../src/lib/propuestas/canonico';
import {
  construirInstantanea,
  hoyEnMadrid,
  validarContenido,
  type ContenidoV1,
  type InstantaneaV1,
} from '../src/lib/propuestas/instantanea';

if (!neonConfig.webSocketConstructor) neonConfig.webSocketConstructor = WebSocket;

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

export function urlDeConexion(base?: string): string {
  const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
  if (!url) throw new Error('Falta DATABASE_URL_UNPOOLED (o DATABASE_URL)');
  const u = new URL(url);
  if (base) u.pathname = `/${base}`;
  return u.toString();
}

export async function conectar(url: string): Promise<Client> {
  const client = new Client(url);
  await client.connect();
  return client;
}

async function enTransaccion<T>(client: Client, fn: () => Promise<T>): Promise<T> {
  await client.query('BEGIN');
  try {
    const r = await fn();
    await client.query('COMMIT');
    return r;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  }
}

export async function migrar(client: Client): Promise<void> {
  await client.query(readFileSync(join(RAIZ, 'db', 'propuestas.sql'), 'utf8'));
}

export interface Publicada {
  referencia: string;
  version: number;
  offerHash: string;
  capacidad: string;
  instantanea: InstantaneaV1;
}

async function insertarVersion(
  client: Client,
  contenido: ContenidoV1,
  referencia: string,
  version: number,
  fecha: string,
  senalDistinta?: string,
): Promise<Publicada> {
  const instantanea = construirInstantanea(contenido, { referencia, version, fecha });
  const offerHash = hashOferta(instantanea);
  const capacidad = nuevaCapacidad();
  // Vale hasta el final del dia `hasta`, hora de Lloret.
  const { rows } = await client.query(
    `INSERT INTO propuesta_version
       (proposal_id, version, schema_version, snapshot, offer_hash, capability_hash, expires_at)
     VALUES ($1, $2, $3, $4::jsonb, $5, $6, (($7::date + 1)::timestamp AT TIME ZONE 'Europe/Madrid'))
     RETURNING snapshot`,
    [referencia, version, instantanea.schema_version, JSON.stringify(instantanea), offerHash, hashCapacidad(capacidad), instantanea.vigencia.hasta],
  );
  // Lo que ha guardado Postgres tiene que dar el mismo hash; si no, no se publica.
  if (hashOferta(rows[0].snapshot) !== offerHash) {
    throw new Error(`La instantanea de ${referencia} v${version} no sobrevive al viaje por jsonb: no se publica`);
  }
  await client.query(
    `INSERT INTO evento (proposal_id, version, tipo, detalle) VALUES ($1, $2, 'creada', $3::jsonb)`,
    [referencia, version, JSON.stringify({ offer_hash: offerHash, ...(senalDistinta ? { senal_distinta: senalDistinta } : {}) })],
  );
  return { referencia, version, offerHash, capacidad, instantanea };
}

export interface OpcionesPublicar {
  fecha?: string;
  senalDistinta?: string;
}

export async function crear(client: Client, entrada: unknown, opciones: OpcionesPublicar = {}): Promise<Publicada> {
  const contenido = validarContenido(entrada, { senalDistinta: opciones.senalDistinta });
  const fecha = opciones.fecha ?? hoyEnMadrid();
  return enTransaccion(client, async () => {
    // Numeracion por año sin huecos ni carreras: nadie mas inserta mientras se elige el numero.
    await client.query('LOCK TABLE propuesta_version IN SHARE ROW EXCLUSIVE MODE');
    const anio = fecha.slice(0, 4);
    const { rows } = await client.query(
      `SELECT coalesce(max(substring(proposal_id from 8)::int), 0) + 1 AS n
         FROM propuesta_version WHERE proposal_id LIKE $1`,
      [`P-${anio}-%`],
    );
    const n: number = rows[0].n;
    if (n > 999) throw new Error(`Se acabaron las referencias de ${anio}`);
    return insertarVersion(client, contenido, `P-${anio}-${String(n).padStart(3, '0')}`, 1, fecha, opciones.senalDistinta?.trim());
  });
}

export async function sustituir(
  client: Client,
  referencia: string,
  entrada: unknown,
  opciones: OpcionesPublicar = {},
): Promise<Publicada> {
  const contenido = validarContenido(entrada, { senalDistinta: opciones.senalDistinta });
  const fecha = opciones.fecha ?? hoyEnMadrid();
  return enTransaccion(client, async () => {
    const { rows } = await client.query(
      `SELECT version FROM propuesta_version WHERE proposal_id = $1 AND status = 'publicada' FOR UPDATE`,
      [referencia],
    );
    if (rows.length === 0) throw new Error(`${referencia} no tiene ninguna version publicada`);
    const anterior: number = rows[0].version;
    const aceptada = await client.query(`SELECT 1 FROM aceptacion WHERE proposal_id = $1`, [referencia]);
    if (aceptada.rows.length > 0) throw new Error(`${referencia} ya esta aceptada: no se sustituye`);
    await client.query(
      `UPDATE propuesta_version SET status = 'sustituida' WHERE proposal_id = $1 AND version = $2`,
      [referencia, anterior],
    );
    await client.query(
      `INSERT INTO evento (proposal_id, version, tipo, detalle) VALUES ($1, $2, 'sustituida', $3::jsonb)`,
      [referencia, anterior, JSON.stringify({ por: anterior + 1 })],
    );
    return insertarVersion(client, contenido, referencia, anterior + 1, fecha, opciones.senalDistinta?.trim());
  });
}

export async function invalidar(client: Client, referencia: string, motivo: string): Promise<number> {
  if (!motivo.trim()) throw new Error('Invalidar pide un motivo');
  return enTransaccion(client, async () => {
    const { rows } = await client.query(
      `UPDATE propuesta_version SET status = 'invalidada'
        WHERE proposal_id = $1 AND status = 'publicada' RETURNING version`,
      [referencia],
    );
    if (rows.length === 0) throw new Error(`${referencia} no tiene ninguna version publicada`);
    await client.query(
      `INSERT INTO evento (proposal_id, version, tipo, detalle) VALUES ($1, $2, 'invalidada', $3::jsonb)`,
      [referencia, rows[0].version, JSON.stringify({ motivo: motivo.trim() })],
    );
    return rows[0].version as number;
  });
}

/**
 * Seguimiento: marca el hito de pago `n` (desde 1) de una propuesta aceptada como cumplido, o lo desmarca. Solo
 * anade eventos; la pagina enseña el ultimo de cada hito.
 */
export async function avance(client: Client, referencia: string, n: number, deshacer = false): Promise<string> {
  return enTransaccion(client, async () => {
    const { rows } = await client.query(
      `SELECT a.version, a.snapshot FROM aceptacion a WHERE a.proposal_id = $1 FOR SHARE`,
      [referencia],
    );
    if (rows.length === 0) throw new Error(`${referencia} no esta aceptada: el seguimiento empieza al aceptar`);
    const hitos = (rows[0].snapshot as InstantaneaV1).pagos.hitos;
    if (!Number.isSafeInteger(n) || n < 1 || n > hitos.length) throw new Error(`El hito va de 1 a ${hitos.length}`);
    const ultimo = await client.query(
      `SELECT tipo FROM evento WHERE proposal_id = $1 AND tipo IN ('hito_cumplido', 'hito_deshecho')
         AND (detalle->>'hito')::int = $2 ORDER BY evento_id DESC LIMIT 1`,
      [referencia, n],
    );
    const cumplido = ultimo.rows[0]?.tipo === 'hito_cumplido';
    if (cumplido !== deshacer) throw new Error(`El hito ${n} ${cumplido ? 'ya esta cumplido' : 'no esta cumplido'}`);
    await client.query(
      `INSERT INTO evento (proposal_id, version, tipo, detalle) VALUES ($1, $2, $3, $4::jsonb)`,
      [referencia, rows[0].version, deshacer ? 'hito_deshecho' : 'hito_cumplido', JSON.stringify({ hito: n })],
    );
    return hitos[n - 1].hito;
  });
}

export async function exportar(client: Client) {
  const q = async (sql: string) => (await client.query(sql)).rows;
  return {
    exportado_en: new Date().toISOString(),
    base: (await q('SELECT current_database() AS b'))[0].b as string,
    versiones: await q('SELECT * FROM propuesta_version ORDER BY proposal_id, version'),
    aceptaciones: await q('SELECT * FROM aceptacion ORDER BY accepted_at'),
    identidades: await q('SELECT * FROM aceptacion_identidad ORDER BY acceptance_id'),
    eventos: await q('SELECT * FROM evento ORDER BY evento_id'),
  };
}

export function enlaces(referencia: string, capacidad: string) {
  const base = (process.env.PROPUESTAS_URL_BASE ?? 'https://www.teselarsoftware.com').replace(/\/$/, '');
  const lectura = `${base}/p/${referencia}`;
  return { lectura, cliente: `${lectura}#${capacidad}` };
}

function imprimir(p: Publicada): void {
  const { lectura, cliente } = enlaces(p.referencia, p.capacidad);
  console.log(`${p.referencia} v${p.version} publicada · vale hasta el ${p.instantanea.vigencia.hasta}`);
  console.log(`offer_hash ${p.offerHash}`);
  console.log(`Solo lectura:  ${lectura}`);
  console.log(`Para aceptar:  ${cliente}`);
  console.log('El enlace para aceptar no se guarda en ningun sitio: o se envia ahora o se sustituye la version.');
}

/** Saca `--nombre valor` de los argumentos y devuelve el valor (o undefined si no esta). */
function opcion(argv: string[], nombre: string): string | undefined {
  const i = argv.indexOf(nombre);
  if (i === -1) return undefined;
  const valor = argv[i + 1];
  if (!valor || valor.startsWith('--')) throw new Error(`${nombre} pide un valor`);
  argv.splice(i, 2);
  return valor;
}

async function main(argv: string[]): Promise<void> {
  const base = opcion(argv, '--base');
  const senalDistinta = opcion(argv, '--senal-distinta');
  const [orden, ...args] = argv;
  const leerJson = (ruta: string | undefined) => {
    if (!ruta) throw new Error(`${orden} pide un fichero JSON`);
    return JSON.parse(readFileSync(ruta, 'utf8')) as unknown;
  };

  const client = await conectar(urlDeConexion(base));
  try {
    const { rows } = await client.query('SELECT current_database() AS b');
    console.log(`Base: ${rows[0].b}`);
    switch (orden) {
      case 'migrar':
        await migrar(client);
        console.log('Esquema aplicado.');
        break;
      case 'crear':
        imprimir(await crear(client, leerJson(args[0]), { senalDistinta }));
        break;
      case 'sustituir':
        if (!args[0]) throw new Error('sustituir pide la referencia');
        imprimir(await sustituir(client, args[0], leerJson(args[1]), { senalDistinta }));
        break;
      case 'invalidar': {
        if (!args[0]) throw new Error('invalidar pide la referencia');
        const v = await invalidar(client, args[0], args.slice(1).join(' '));
        console.log(`${args[0]} v${v} invalidada.`);
        break;
      }
      case 'avance': {
        if (!args[0] || !args[1]) throw new Error('avance pide la referencia y el numero de hito');
        const deshacer = args.includes('--deshacer');
        const hito = await avance(client, args[0], Number(args[1]), deshacer);
        console.log(`${args[0]}: «${hito}» ${deshacer ? 'desmarcado' : 'cumplido'}.`);
        break;
      }
      case 'exportar': {
        if (!args[0]) throw new Error('exportar pide el fichero de salida');
        const datos = await exportar(client);
        // Lleva nombres y correos de quien acepto: solo lo lee el dueño del fichero.
        writeFileSync(args[0], JSON.stringify(datos, null, 2), { mode: 0o600 });
        console.log(`${datos.versiones.length} versiones, ${datos.aceptaciones.length} aceptaciones, ${datos.eventos.length} eventos → ${args[0]}`);
        break;
      }
      default:
        throw new Error('Ordenes: migrar · crear · sustituir · invalidar · avance · exportar');
    }
  } finally {
    await client.end();
  }
}

if (import.meta.main) {
  main(process.argv.slice(2)).catch((e: unknown) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
