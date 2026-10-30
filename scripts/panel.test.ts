// El panel contra Postgres de verdad, en la base `propuestas_tests` (la misma que usa propuesta.test.ts, y como ella
// se BORRA y se crea de nuevo en cada pasada). Se salta si no hay URL:
//
//   bun --env-file=<fichero de vercel env pull> test scripts/panel.test.ts
import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { neon } from '@neondatabase/serverless';
import type { Client, NeonQueryFunction } from '@neondatabase/serverless';
import { CONDICIONES, huellaCondiciones } from '../src/lib/propuestas/condiciones';
import { leerPropuesta } from '../src/lib/propuestas/leer';
import {
  actualizarContacto, apuntarCobro, borrarCaducados, crearContacto, guardarAcceso, leerAcceso, leerContacto, leerContactos, leerPropuestas,
  marcarHito, registrarApertura, saldarComision, visitasColaboradores,
} from '../src/lib/panel/datos';
import { leerEstadisticas, limpiarVisitas } from '../src/lib/panel/estadisticas';
import { guardarVisita, validarVisita } from '../src/lib/estadisticas/visita';
import { validarContacto, type CamposContacto } from '../src/lib/panel/resumen';
import ejemplo from './propuesta.ejemplo.json';
import { conectar, crear, migrar, urlDeConexion, type Publicada } from './propuesta';

const BASE = 'propuestas_tests';
const hayBase = Boolean(process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL);

describe.skipIf(!hayBase)(`panel contra la base ${BASE}`, () => {
  let db: Client;
  let sql: NeonQueryFunction<false, false>;
  let aceptada: Publicada;
  let vigente: Publicada;
  const antes = process.env.DATABASE_URL;

  beforeAll(async () => {
    const url = urlDeConexion(BASE);
    // Todo lo que lea DATABASE_URL por su cuenta (la pagina del cliente, conexion() del panel) va tambien a la de pruebas.
    process.env.DATABASE_URL = url;
    db = await conectar(url);
    const { rows } = await db.query('SELECT current_database() AS b');
    if (rows[0].b !== BASE) throw new Error(`Conectado a ${rows[0].b}, no a ${BASE}: no se borra nada`);
    await db.query('DROP TABLE IF EXISTS aceptacion_identidad, aceptacion, evento, propuesta_version, contacto, propuesta_apertura, panel_acceso, visita, demo_evento CASCADE');
    const panel = readFileSync(join(import.meta.dir, '..', 'db', 'panel.sql'), 'utf8');
    await migrar(db);
    await db.query(panel);
    await migrar(db); // idempotentes, y en cualquier orden: la de propuestas no tumba los tipos de cobro
    await db.query(panel);
    await db.query(readFileSync(join(import.meta.dir, '..', 'db', 'demo.sql'), 'utf8'));
    sql = neon(url);

    aceptada = await crear(db, ejemplo, { fecha: '2099-01-01' });
    vigente = await crear(db, ejemplo, { fecha: '2099-01-02' });
    const { rows: a } = await db.query(
      `INSERT INTO aceptacion (proposal_id, version, snapshot, offer_hash, casilla_leido, casilla_autoridad, idempotency_key,
                               casilla_condiciones, condiciones_version, condiciones_hash, lengua)
       VALUES ($1, 1, $2::jsonb, $3, true, true, $4, true, $5, $6, 'es') RETURNING acceptance_id`,
      [aceptada.referencia, JSON.stringify(aceptada.instantanea), aceptada.offerHash, randomUUID(), CONDICIONES.version, huellaCondiciones('es')],
    );
    await db.query(
      `INSERT INTO aceptacion_identidad (acceptance_id, nombre, dni, correo, tipo, razon_social, nif_sociedad, domicilio, cargo)
       VALUES ($1, 'Ana Prueba', '12345678Z', 'ana@example.com', 'sociedad', 'Prueba SL', 'B12345674', 'Calle Falsa 123, Lloret', 'Administradora')`,
      [a[0].acceptance_id],
    );
    await db.query(`INSERT INTO evento (proposal_id, version, tipo, detalle) VALUES ($1, 1, 'acuse_enviado', '{}')`, [aceptada.referencia]);
  });

  afterAll(async () => {
    await db?.end();
    if (antes === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = antes;
  });

  test('las propuestas salen con su estado, quién aceptó (sin DNI, NIF ni domicilio) y el acuse', async () => {
    const todas = await leerPropuestas(undefined, sql);
    expect(todas.map((p) => p.referencia)).toEqual([vigente.referencia, aceptada.referencia]);
    const [a] = await leerPropuestas(aceptada.referencia, sql);
    expect(a.estado).toBe('aceptada');
    expect(a.aceptante).toEqual({ nombre: 'Ana Prueba', correo: 'ana@example.com', razon_social: 'Prueba SL', cargo: 'Administradora' });
    const texto = JSON.stringify(a);
    for (const prohibido of ['12345678Z', 'B12345674', 'Calle Falsa']) expect(texto).not.toContain(prohibido);
    expect(a.acuse).toBe('enviado');
    expect(a.hitos.length).toBe(ejemplo.pagos.hitos.length);
    expect(await leerPropuestas('no-es-una-referencia', sql)).toEqual([]);
  });

  test('marcar un hito: lo ve el cliente, no se marca dos veces, se deshace, y solo en aceptadas', async () => {
    const r = await marcarHito(aceptada.referencia, 1, false, sql);
    expect(r.ok).toBe(true);
    expect((await marcarHito(aceptada.referencia, 1, false, sql)).ok).toBe(false);
    expect(Object.keys((await leerPropuesta(aceptada.referencia))?.cumplidos ?? {})).toEqual(['1']);
    const { rows } = await db.query(`SELECT detalle FROM evento WHERE proposal_id = $1 AND tipo = 'hito_cumplido'`, [aceptada.referencia]);
    expect(rows[0].detalle).toEqual({ hito: 1, origen: 'panel' });
    expect((await marcarHito(aceptada.referencia, 1, true, sql)).ok).toBe(true);
    expect((await marcarHito(aceptada.referencia, 1, true, sql)).ok).toBe(false);
    expect((await marcarHito(aceptada.referencia, 99, false, sql)).ok).toBe(false);
    expect((await marcarHito(vigente.referencia, 1, false, sql)).ok).toBe(false);
  });

  test('cobros: se apuntan con fecha y se deshacen; el cliente no los ve', async () => {
    expect((await apuntarCobro(aceptada.referencia, 1, '2099-01-05', sql)).ok).toBe(true);
    expect((await apuntarCobro(aceptada.referencia, 1, '2099-01-06', sql)).ok).toBe(false);
    let [a] = await leerPropuestas(aceptada.referencia, sql);
    expect(a.hitos[0].cobrado).toBe('2099-01-05');
    // La pagina del cliente solo lee hitos cumplidos: un cobro no le cambia nada.
    expect((await leerPropuesta(aceptada.referencia))?.cumplidos).toEqual({});
    expect((await apuntarCobro(aceptada.referencia, 1, null, sql)).ok).toBe(true);
    [a] = await leerPropuestas(aceptada.referencia, sql);
    expect(a.hitos[0].cobrado).toBeNull();
    expect((await apuntarCobro(aceptada.referencia, 1, '05/01/2099', sql)).ok).toBe(false);
    expect((await apuntarCobro(vigente.referencia, 1, '2099-01-05', sql)).ok).toBe(false);
  });

  test('aperturas: solo con la capacidad buena, y sin nada más que la hora', async () => {
    expect(await registrarApertura(vigente.referencia, 'A'.repeat(43), sql)).toBe(false);
    expect(await registrarApertura(vigente.referencia, aceptada.capacidad, sql)).toBe(false);
    expect(await registrarApertura(vigente.referencia, vigente.capacidad, sql)).toBe(true);
    expect(await registrarApertura(vigente.referencia, vigente.capacidad, sql)).toBe(true);
    const [v] = await leerPropuestas(vigente.referencia, sql);
    expect(v.aperturas?.veces).toBe(2);
    const { rows } = await db.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'propuesta_apertura' ORDER BY ordinal_position`);
    expect(rows.map((r) => r.column_name)).toEqual(['proposal_id', 'primera', 'ultima', 'veces']);
  });

  test('contactos: alta, edición, cierre que oculta sin borrar, y la propuesta hereda el colaborador', async () => {
    const campos = validarContacto({ negocio: 'Bar Prueba', fecha: '2099-01-10', propuesta: vigente.referencia, colaborador: 'Gis' }) as CamposContacto;
    const id = await crearContacto(campos, sql);
    expect((await leerContactos(false, sql)).map((c) => c.id)).toContain(id);
    const [v] = await leerPropuestas(vigente.referencia, sql);
    expect(v.contacto).toEqual({ id, negocio: 'Bar Prueba', colaborador: 'Gis' });
    expect(await actualizarContacto(id, { ...campos, estado: 'perdido' }, sql)).toBe(true);
    expect((await leerContactos(false, sql)).map((c) => c.id)).not.toContain(id);
    expect((await leerContactos(true, sql)).map((c) => c.id)).toContain(id);
    expect((await leerContacto(id, sql))?.fecha).toBe('2099-01-10');
    expect(await actualizarContacto(999999, campos, sql)).toBe(false);
  });

  test('borrado a los 12 meses: se lleva los vencidos (también perdidos) y devuelve sus negocios; ganados y recientes se quedan', async () => {
    // now() - 13 meses lleva microsegundos: comprueba que la condicion de `actualizado` casa con lo que lee el panel
    const { rows } = await db.query(
      `INSERT INTO contacto (negocio, estado, actualizado) VALUES
         ('Viejo', 'en_conversacion', now() - interval '13 months'),
         ('Viejo perdido', 'perdido', now() - interval '13 months'),
         ('Viejo ganado', 'ganado', now() - interval '13 months'),
         ('Viejo con paso', 'en_conversacion', now() - interval '13 months'),
         ('Reciente', 'en_conversacion', now() - interval '11 months')
       RETURNING id, negocio`,
    );
    const ids = Object.fromEntries(rows.map((r) => [r.negocio, Number(r.id)]));
    await db.query(`UPDATE contacto SET fecha = (now() + interval '1 month')::date WHERE id = $1`, [ids['Viejo con paso']]);
    expect((await borrarCaducados(new Date(), sql)).sort()).toEqual(['Viejo', 'Viejo perdido']);
    const quedan = (await leerContactos(true, sql)).map((c) => c.negocio);
    expect(quedan).toEqual(expect.arrayContaining(['Viejo ganado', 'Viejo con paso', 'Reciente']));
    expect(quedan).not.toContain('Viejo');
    expect(await borrarCaducados(new Date(), sql)).toEqual([]);
  });

  test('visitas: se guardan las que pasan la validacion, y la base rechaza lo que no tiene forma', async () => {
    const url = process.env.DATABASE_URL as string;
    const movil = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile/15E148 Safari/604.1';
    const v = (c: object) => validarVisita(c, movil, 'ES');
    await guardarVisita(url, v({ ruta: '/es', primera: true, referente: 'https://www.google.com/', origen: 'bio' })!);
    await guardarVisita(url, v({ ruta: '/es/demo', primera: false })!);
    await guardarVisita(url, v({ ruta: '/ca/c/gis', primera: true, referente: '' })!);
    await guardarVisita(url, v({ ruta: '/ca/c/gis/tarjeta', primera: false })!);
    await db.query(`INSERT INTO demo_evento (paso, lng) VALUES ('abrir', 'es'), ('panel', 'es'), ('reservar', 'es')`);
    for (const malo of [
      `INSERT INTO visita (ruta, entrada, dispositivo) VALUES ('/panel', true, 'movil')`,
      `INSERT INTO visita (ruta, entrada, origen, dispositivo) VALUES ('/es', true, 'Bar Pepe', 'movil')`,
      `INSERT INTO visita (ruta, entrada, dominio, dispositivo) VALUES ('/es', true, 'https://google.com/search?q=x', 'movil')`,
      `INSERT INTO visita (ruta, entrada, dispositivo) VALUES ('/es', true, 'Mozilla/5.0')`,
    ]) {
      expect(db.query(malo)).rejects.toThrow();
    }

    const e = await leerEstadisticas('7', new Date(), sql);
    expect(e.totales).toEqual({ visitas: 2, vistas: 4, reservas: 1 });
    expect(e.totalesAntes).toEqual({ visitas: 0, vistas: 0, reservas: 0 });
    expect(e.serie).toHaveLength(7);
    expect(e.serie.at(-1)?.n).toBe(2);
    expect(e.ahora).toEqual({ visitas: 2, vistas: 4 });
    expect(e.fuentes).toEqual([{ clave: 'google.com', n: 1 }, { clave: 'Directo', n: 1 }]);
    expect(e.campanas).toEqual([{ clave: 'bio', n: 1 }]);
    expect(e.paises).toEqual([{ clave: 'ES', n: 2 }]);
    expect(e.dispositivos).toEqual([{ clave: 'movil', n: 2 }]);
    expect(e.paginas).toHaveLength(4);
    expect(e.embudo).toEqual({ abrir: 1, panel: 1, reservar: 1 });
    // La pagina del colaborador cuenta; su tarjeta, no
    expect(await visitasColaboradores(sql)).toEqual({ gis: { total: 1, ultimos30: 1 } });
  });

  test('limpieza del contador: a los 25 meses se borra y pasadas 48 horas se queda en el dia de Lloret', async () => {
    const { rows } = await db.query(
      `INSERT INTO visita (creado, ruta, entrada, dispositivo) VALUES
         (now() - interval '26 months', '/es/recursos/vieja', true, 'movil'),
         (now() - interval '3 days', '/es/recursos/de-hace-dias', true, 'movil'),
         (now() - interval '1 hour', '/es/recursos/reciente', true, 'movil')
       RETURNING id, ruta, creado`,
    );
    const recienteAntes = rows.find((r) => r.ruta.endsWith('reciente')).creado.getTime();
    const r = await limpiarVisitas(sql);
    expect(r.borradas).toBe(1);
    expect(r.sinHora).toBeGreaterThanOrEqual(1);
    const { rows: quedan } = await db.query(
      `SELECT ruta, creado, to_char(creado AT TIME ZONE 'Europe/Madrid', 'HH24:MI:SS.US') AS hora FROM visita
        WHERE ruta LIKE '/es/recursos/%' ORDER BY ruta`,
    );
    expect(quedan.map((q) => q.ruta)).toEqual(['/es/recursos/de-hace-dias', '/es/recursos/reciente']);
    expect(quedan[0].hora).toBe('00:00:00.000000');
    expect(quedan[1].creado.getTime()).toBe(recienteAntes);
    expect(await limpiarVisitas(sql)).toEqual({ borradas: 0, sinHora: 0 });
    await db.query(`DELETE FROM visita WHERE ruta LIKE '/es/recursos/%'`);
  });

  test('comision: se guarda con el contacto, se salda con canje y valor, se deshace, y saldar no reinicia el plazo de borrado', async () => {
    const campos = validarContacto({ negocio: 'Bar Comision', colaborador: 'Betty', comision: 'puente', propuesta: aceptada.referencia }) as CamposContacto;
    const id = await crearContacto(campos, sql);
    const antes = (await leerContacto(id, sql))!;
    expect(antes.comision).toBe('puente');
    const [p] = await leerPropuestas(aceptada.referencia, sql);
    expect(p.setup_centimos).toBeGreaterThan(0);
    expect(await saldarComision(id, { fecha: '2026-11-10', forma: 'canje', valor_centimos: 30000, nota: '3 meses' }, sql)).toBe(true);
    const saldado = (await leerContacto(id, sql))!;
    expect(saldado).toMatchObject({ comision_saldada: '2026-11-10', comision_forma: 'canje', comision_valor_centimos: 30000, comision_nota: '3 meses' });
    expect(saldado.actualizado).toBe(antes.actualizado);
    expect(await saldarComision(id, null, sql)).toBe(true);
    expect(await leerContacto(id, sql)).toMatchObject({ comision_saldada: null, comision_forma: null, comision_valor_centimos: null });
    // Sin comision no se puede saldar
    const sin = await crearContacto(validarContacto({ negocio: 'Bar Sin' }) as CamposContacto, sql);
    expect(await saldarComision(sin, { fecha: '2026-11-10', forma: 'transferencia', valor_centimos: null, nota: null }, sql)).toBe(false);
    expect(db.query(`UPDATE contacto SET comision_forma = 'bizum' WHERE id = $1`, [id])).rejects.toThrow();
  });

  test('la base rechaza un estado de contacto fuera de la lista', async () => {
    expect(db.query(`INSERT INTO contacto (negocio, estado) VALUES ('x', 'borrado')`)).rejects.toThrow();
  });

  test('el contador de la entrada se guarda y se lee', async () => {
    const hasta = new Date(Date.now() + 60_000);
    await guardarAcceso({ fallos_seguidos: 0, bloqueado_hasta: hasta }, sql);
    expect((await leerAcceso(sql)).bloqueado_hasta?.getTime()).toBe(hasta.getTime());
    await guardarAcceso({ fallos_seguidos: 2, bloqueado_hasta: null }, sql);
    expect(await leerAcceso(sql)).toEqual({ fallos_seguidos: 2, bloqueado_hasta: null });
  });
});
