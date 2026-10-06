// Pruebas contra Postgres de verdad, en la base `propuestas_pruebas` del mismo Neon (nunca en la de las
// propuestas reales). Se saltan si no hay URL de conexion:
//
//   bun --env-file=<fichero de vercel env pull> test
//
// Cada pasada BORRA las tablas de esa base y las crea de nuevo. Antes de borrar se comprueba el nombre.
import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { randomUUID } from 'node:crypto';
import type { Client } from '@neondatabase/serverless';
import { hashOferta, jsonCanonico } from '../src/lib/propuestas/canonico';
import { leerPropuesta } from '../src/lib/propuestas/leer';
import ejemplo from './propuesta.ejemplo.json';
import { conectar, crear, exportar, invalidar, migrar, sustituir, urlDeConexion } from './propuesta';

const BASE = 'propuestas_pruebas';
const hayBase = Boolean(process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL);

describe.skipIf(!hayBase)(`contra la base ${BASE}`, () => {
  let db: Client;

  beforeAll(async () => {
    db = await conectar(urlDeConexion(BASE));
    const { rows } = await db.query('SELECT current_database() AS b');
    if (rows[0].b !== BASE) throw new Error(`Conectado a ${rows[0].b}, no a ${BASE}: no se borra nada`);
    await db.query('DROP TABLE IF EXISTS aceptacion_identidad, aceptacion, evento, propuesta_version CASCADE');
    await migrar(db);
    await migrar(db); // idempotente
  });

  afterAll(async () => {
    await db?.end();
  });

  const otra = () => {
    const c = structuredClone(ejemplo);
    c.precio.conceptos[1].importe_centimos = 17500;
    return c;
  };

  const aceptar = (ref: string, version: number, snapshot: unknown, hash: string, clave = randomUUID()) =>
    db.query(
      `INSERT INTO aceptacion (proposal_id, version, snapshot, offer_hash, casilla_leido, casilla_autoridad, idempotency_key)
       VALUES ($1, $2, $3::jsonb, $4, true, true, $5) RETURNING acceptance_id, accepted_at`,
      [ref, version, JSON.stringify(snapshot), hash, clave],
    );

  test('criterio del hito 6.3: dos versiones, dos hashes, y la v1 intacta tras crear la v2', async () => {
    const v1 = await crear(db, ejemplo, { fecha: '2026-10-06' });
    expect(v1.referencia).toBe('P-2026-001');
    const antes = (await db.query(`SELECT snapshot, offer_hash FROM propuesta_version WHERE proposal_id = $1 AND version = 1`, [v1.referencia])).rows[0];

    const v2 = await sustituir(db, v1.referencia, otra(), { fecha: '2026-10-07' });
    expect(v2.version).toBe(2);
    expect(v2.offerHash).not.toBe(v1.offerHash);
    expect(v2.capacidad).not.toBe(v1.capacidad);

    const { rows } = await db.query(
      `SELECT version, status, snapshot, offer_hash FROM propuesta_version WHERE proposal_id = $1 ORDER BY version`,
      [v1.referencia],
    );
    expect(rows.map((r) => [r.version, r.status])).toEqual([[1, 'sustituida'], [2, 'publicada']]);
    // La v1 devuelve exactamente lo que se publico, y su hash se recalcula igual desde lo guardado.
    expect(jsonCanonico(rows[0].snapshot)).toBe(jsonCanonico(v1.instantanea));
    expect(jsonCanonico(rows[0].snapshot)).toBe(jsonCanonico(antes.snapshot));
    expect(rows[0].offer_hash).toBe(v1.offerHash);
    expect(hashOferta(rows[0].snapshot)).toBe(v1.offerHash);
    expect(hashOferta(rows[1].snapshot)).toBe(v2.offerHash);
    expect(rows[1].snapshot.precio.conceptos[1].importe_centimos).toBe(17500);
    expect(rows[0].snapshot.precio.conceptos[1].importe_centimos).toBe(15000);
  });

  test('la vigencia acaba al final del dia «hasta», hora de Lloret', async () => {
    const { rows } = await db.query(
      `SELECT to_char(expires_at AT TIME ZONE 'Europe/Madrid', 'YYYY-MM-DD HH24:MI') AS fin, snapshot->'vigencia'->>'hasta' AS hasta
         FROM propuesta_version WHERE proposal_id = 'P-2026-001' AND version = 1`,
    );
    expect(rows[0]).toEqual({ fin: '2026-11-06 00:00', hasta: '2026-11-05' });
  });

  test('la base no deja cambiar ni borrar una version', async () => {
    await expect(db.query(`UPDATE propuesta_version SET snapshot = '{}'::jsonb WHERE proposal_id = 'P-2026-001' AND version = 1`)).rejects.toThrow('no cambia');
    await expect(db.query(`UPDATE propuesta_version SET offer_hash = repeat('0', 64) WHERE proposal_id = 'P-2026-001' AND version = 1`)).rejects.toThrow('no cambia');
    await expect(db.query(`UPDATE propuesta_version SET status = 'publicada' WHERE proposal_id = 'P-2026-001' AND version = 1`)).rejects.toThrow('no cambia de estado');
    await expect(db.query(`DELETE FROM propuesta_version WHERE proposal_id = 'P-2026-001'`)).rejects.toThrow('no se borran');
  });

  test('no puede haber dos versiones publicadas a la vez', async () => {
    const x = (await db.query(`SELECT * FROM propuesta_version WHERE proposal_id = 'P-2026-001' AND version = 2`)).rows[0];
    await expect(
      db.query(
        `INSERT INTO propuesta_version (proposal_id, version, schema_version, snapshot, offer_hash, capability_hash, expires_at)
         VALUES ('P-2026-001', 3, 1, $1::jsonb, $2, repeat('a', 64), now() + interval '1 day')`,
        [JSON.stringify(x.snapshot), x.offer_hash],
      ),
    ).rejects.toThrow('propuesta_version_una_publicada');
  });

  test('la capacidad no se guarda en claro en ningun sitio', async () => {
    const p = await crear(db, ejemplo, { fecha: '2026-10-06' });
    expect(p.referencia).toBe('P-2026-002');
    const volcado = JSON.stringify(await exportar(db));
    expect(volcado).not.toContain(p.capacidad);
    expect(volcado).toContain(p.offerHash);
  });

  test('la aceptacion: solo la version viva, con su misma instantanea y hash, y una sola vez', async () => {
    const vivas = (await db.query(`SELECT version, snapshot, offer_hash FROM propuesta_version WHERE proposal_id = 'P-2026-001' ORDER BY version`)).rows;
    const [v1, v2] = vivas;

    await expect(aceptar('P-2026-001', 1, v1.snapshot, v1.offer_hash)).rejects.toThrow('esta sustituida');
    await expect(aceptar('P-2026-001', 2, v1.snapshot, v2.offer_hash)).rejects.toThrow('no son los de la version');
    await expect(aceptar('P-2026-001', 2, v2.snapshot, v1.offer_hash)).rejects.toThrow('no son los de la version');
    await expect(
      db.query(
        `INSERT INTO aceptacion (proposal_id, version, snapshot, offer_hash, casilla_leido, casilla_autoridad, idempotency_key)
         VALUES ('P-2026-001', 2, $1::jsonb, $2, true, false, $3)`,
        [JSON.stringify(v2.snapshot), v2.offer_hash, randomUUID()],
      ),
    ).rejects.toThrow('aceptacion_check');

    const ok = await aceptar('P-2026-001', 2, v2.snapshot, v2.offer_hash);
    expect(ok.rows).toHaveLength(1);
    // La hora es la del servidor, aunque se intente poner otra.
    expect(Math.abs(new Date(ok.rows[0].accepted_at).getTime() - Date.now())).toBeLessThan(5 * 60_000);

    await expect(aceptar('P-2026-001', 2, v2.snapshot, v2.offer_hash)).rejects.toThrow('aceptacion_proposal_id_key');
  });

  test('lo aceptado no se cambia, no se borra y no se sustituye', async () => {
    await expect(db.query(`UPDATE aceptacion SET casilla_leido = true`)).rejects.toThrow('solo anadir');
    await expect(db.query(`DELETE FROM aceptacion`)).rejects.toThrow('solo anadir');
    await expect(sustituir(db, 'P-2026-001', otra())).rejects.toThrow('ya esta aceptada');
    await expect(db.query(`UPDATE propuesta_version SET status = 'sustituida' WHERE proposal_id = 'P-2026-001' AND version = 2`)).rejects.toThrow('ya esta aceptada');
    await expect(db.query(`DELETE FROM evento`)).rejects.toThrow('solo anadir');
  });

  test('una version vencida no se acepta', async () => {
    const p = await crear(db, ejemplo, { fecha: '2026-01-01' });
    await expect(aceptar(p.referencia, 1, p.instantanea, p.offerHash)).rejects.toThrow('vencio');
  });

  test('invalidar retira la version viva y deja el evento con su motivo', async () => {
    expect(await invalidar(db, 'P-2026-002', 'Prueba: enviada a quien no era')).toBe(1);
    await expect(invalidar(db, 'P-2026-002', 'otra vez')).rejects.toThrow('ninguna version publicada');
    const { rows } = await db.query(`SELECT tipo, detalle FROM evento WHERE proposal_id = 'P-2026-002' ORDER BY evento_id`);
    expect(rows.map((r) => r.tipo)).toEqual(['creada', 'invalidada']);
    expect(rows[1].detalle.motivo).toBe('Prueba: enviada a quien no era');
  });

  test('la pagina lee la ultima version de cada una, con su estado y su hash comprobado (hito 6.4)', async () => {
    const antes = process.env.DATABASE_URL;
    process.env.DATABASE_URL = urlDeConexion(BASE);
    try {
      const aceptada = await leerPropuesta('P-2026-001');
      expect(aceptada?.estado).toBe('aceptada');
      expect(aceptada?.instantanea.version).toBe(2);
      expect(aceptada?.instantanea.precio.conceptos[1].importe_centimos).toBe(17500);
      expect((await leerPropuesta('P-2026-002'))?.estado).toBe('retirada');
      expect((await leerPropuesta('P-2026-003'))?.estado).toBe('vencida');
      expect(await leerPropuesta('P-2026-999')).toBeNull();
      const vigente = await crear(db, ejemplo);
      const leida = await leerPropuesta(vigente.referencia);
      expect(leida?.estado).toBe('vigente');
      expect(leida?.offerHash).toBe(vigente.offerHash);
      expect(jsonCanonico(leida?.instantanea)).toBe(jsonCanonico(vigente.instantanea));
    } finally {
      if (antes === undefined) delete process.env.DATABASE_URL;
      else process.env.DATABASE_URL = antes;
    }
  });

  test('un contenido invalido no deja nada a medias', async () => {
    const antes = (await db.query(`SELECT count(*)::int AS n FROM propuesta_version`)).rows[0].n;
    await expect(crear(db, { ...ejemplo, vigencia_dias: 0 })).rejects.toThrow('vigencia_dias');
    expect((await db.query(`SELECT count(*)::int AS n FROM propuesta_version`)).rows[0].n).toBe(antes);
  });
});
