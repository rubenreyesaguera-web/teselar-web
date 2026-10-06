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
import { aceptarPropuesta, MAX_INTENTOS_FALLIDOS, type Justificante } from '../src/lib/propuestas/aceptar';
import { nuevaCapacidad } from '../src/lib/propuestas/canonico';
import ejemplo from './propuesta.ejemplo.json';
import { avance, conectar, crear, exportar, invalidar, migrar, sustituir, urlDeConexion, type Publicada } from './propuesta';

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

  describe('aceptar (hito 6.5)', () => {
    const url = () => urlDeConexion(BASE);
    const datos = (p: Publicada, cambios: Record<string, unknown> = {}) => ({
      referencia: p.referencia,
      version: p.version,
      offer_hash: p.offerHash,
      tipo: 'autonomo',
      nombre: 'Persona de Prueba',
      dni: '12.345.678-z',
      correo: 'prueba@example.com',
      casilla_leido: true,
      casilla_autoridad: true,
      idempotency_key: randomUUID().replace(/-/g, ''),
      ...cambios,
    });

    test('datos mal: 400, y no cuenta como intento fallido', async () => {
      const p = await crear(db, ejemplo);
      for (const malo of [
        { casilla_leido: false }, { casilla_autoridad: false }, { correo: 'no-es-correo' }, { nombre: '  ' }, { idempotency_key: 'corta' },
        { tipo: undefined }, { tipo: 'particular' }, { dni: '12345678A' }, { dni: '' },
        { tipo: 'sociedad' },
        { tipo: 'sociedad', razon_social: 'Ejemplo, S.L.', nif_sociedad: 'B12345670' },
        { tipo: 'sociedad', razon_social: '', nif_sociedad: 'B12345674' },
      ]) {
        expect((await aceptarPropuesta(url(), p.capacidad, datos(p, malo))).status).toBe(400);
      }
      const { rows } = await db.query(`SELECT intentos_fallidos FROM propuesta_version WHERE proposal_id = $1`, [p.referencia]);
      expect(rows[0].intentos_fallidos).toBe(0);
    });

    test('sin la capacidad buena: 403, se cuenta, y no se crea nada', async () => {
      const p = await crear(db, ejemplo);
      expect((await aceptarPropuesta(url(), '', datos(p))).status).toBe(403);
      expect((await aceptarPropuesta(url(), nuevaCapacidad(), datos(p))).status).toBe(403);
      expect((await aceptarPropuesta(url(), p.offerHash, datos(p))).status).toBe(403);
      const { rows } = await db.query(
        `SELECT intentos_fallidos, (SELECT count(*)::int FROM aceptacion WHERE proposal_id = $1) AS n FROM propuesta_version WHERE proposal_id = $1`,
        [p.referencia],
      );
      expect(rows[0]).toEqual({ intentos_fallidos: 3, n: 0 });
    });

    test('demasiados intentos fallidos: 429 aunque luego llegue la buena', async () => {
      const p = await crear(db, ejemplo);
      for (let i = 0; i < MAX_INTENTOS_FALLIDOS; i++) await aceptarPropuesta(url(), nuevaCapacidad(), datos(p));
      expect((await aceptarPropuesta(url(), p.capacidad, datos(p))).status).toBe(429);
    });

    test('version sustituida: 409 con la capacidad vieja y con la nueva sobre la vieja', async () => {
      const v1 = await crear(db, ejemplo);
      const v2 = await sustituir(db, v1.referencia, ejemplo);
      expect((await aceptarPropuesta(url(), v1.capacidad, datos(v1))).status).toBe(403);
      const r = await aceptarPropuesta(url(), v2.capacidad, datos(v1));
      expect([r.status, r.body.codigo]).toEqual([409, 'version_nueva']);
    });

    test('vencida: 410; retirada: 410', async () => {
      const vieja = await crear(db, ejemplo, { fecha: '2026-01-01' });
      expect((await aceptarPropuesta(url(), vieja.capacidad, datos(vieja))).body.codigo).toBe('vencida');
      const p = await crear(db, ejemplo);
      await invalidar(db, p.referencia, 'prueba');
      const r = await aceptarPropuesta(url(), p.capacidad, datos(p));
      expect([r.status, r.body.codigo]).toEqual([410, 'retirada']);
    });

    test('201 una vez; repetir el mismo intento da 200 sin duplicar; otro intento, 409 «ya estaba aceptada»', async () => {
      const p = await crear(db, ejemplo);
      const avisos: Justificante[] = [];
      const intento = datos(p);
      const r1 = await aceptarPropuesta(url(), p.capacidad, intento, (j) => avisos.push(j));
      expect(r1.status).toBe(201);
      expect(r1.body.justificante).toMatchObject({ referencia: p.referencia, version: 1, offer_hash: p.offerHash });
      const r2 = await aceptarPropuesta(url(), p.capacidad, intento, (j) => avisos.push(j));
      expect([r2.status, r2.body.justificante]).toEqual([200, r1.body.justificante]);
      const r3 = await aceptarPropuesta(url(), p.capacidad, datos(p, { nombre: 'Otra Persona' }), (j) => avisos.push(j));
      expect([r3.status, r3.body.mensaje, r3.body.justificante]).toEqual([409, 'Esta propuesta ya estaba aceptada', r1.body.justificante]);
      expect(avisos).toHaveLength(1);

      // Lo guardado: la instantanea de la base (no la del navegador), una sola fila, la identidad aparte y el evento.
      const a = (await db.query(`SELECT * FROM aceptacion WHERE proposal_id = $1`, [p.referencia])).rows;
      expect(a).toHaveLength(1);
      expect(hashOferta(a[0].snapshot)).toBe(p.offerHash);
      const quien = (await db.query(`SELECT nombre, dni, correo, tipo, razon_social, nif_sociedad FROM aceptacion_identidad WHERE acceptance_id = $1`, [a[0].acceptance_id])).rows;
      expect(quien).toEqual([{ nombre: 'Persona de Prueba', dni: '12345678Z', correo: 'prueba@example.com', tipo: 'autonomo', razon_social: null, nif_sociedad: null }]);
      const ev = (await db.query(`SELECT tipo FROM evento WHERE proposal_id = $1 ORDER BY evento_id`, [p.referencia])).rows.map((x) => x.tipo);
      expect(ev).toEqual(['creada', 'aceptada']);
      // El justificante no lleva datos personales.
      expect(JSON.stringify(r1.body)).not.toMatch(/Persona de Prueba|example\.com|12345678Z/);
    });

    test('una sociedad guarda razon social y NIF normalizado; un autonomo no los guarda aunque lleguen', async () => {
      const p = await crear(db, ejemplo);
      expect((await aceptarPropuesta(url(), p.capacidad, datos(p, { tipo: 'sociedad', razon_social: 'Ejemplo, S.L.', nif_sociedad: 'b-12345674' }))).status).toBe(201);
      const q = await crear(db, ejemplo);
      expect((await aceptarPropuesta(url(), q.capacidad, datos(q, { razon_social: 'Colada, S.L.', nif_sociedad: 'B12345674' }))).status).toBe(201);
      const filas = (
        await db.query(
          `SELECT a.proposal_id, i.tipo, i.razon_social, i.nif_sociedad FROM aceptacion_identidad i JOIN aceptacion a USING (acceptance_id)
            WHERE a.proposal_id IN ($1, $2) ORDER BY a.proposal_id`,
          [p.referencia, q.referencia],
        )
      ).rows;
      expect(filas).toEqual([
        { proposal_id: p.referencia, tipo: 'sociedad', razon_social: 'Ejemplo, S.L.', nif_sociedad: 'B12345674' },
        { proposal_id: q.referencia, tipo: 'autonomo', razon_social: null, nif_sociedad: null },
      ]);
    });

    test('la base rechaza por si sola una sociedad sin NIF o un DNI con forma mala', async () => {
      // Los CHECK de aceptacion_identidad, sobre una tabla temporal con la misma definicion (sin la clave ajena).
      await db.query(`CREATE TEMP TABLE id_prueba (LIKE aceptacion_identidad INCLUDING CONSTRAINTS)`);
      const prueba = (dni: string, tipo: string, razon: string | null, nif: string | null) =>
        db.query(`INSERT INTO id_prueba VALUES ($1::uuid, 'X', $2, 'x@example.com', $3, $4, $5)`, [randomUUID(), dni, tipo, razon, nif]);
      await expect(prueba('12345678Z', 'sociedad', 'Y, S.L.', null)).rejects.toThrow();
      await expect(prueba('1234', 'autonomo', null, null)).rejects.toThrow();
      await expect(prueba('12345678Z', 'autonomo', 'Y, S.L.', 'B12345674')).rejects.toThrow();
      await expect(prueba('12345678Z', 'particular', null, null)).rejects.toThrow();
      await prueba('X1234567L', 'autonomo', null, null);
      await prueba('12345678Z', 'sociedad', 'Y, S.L.', 'B12345674');
    });

    test('dos aceptaciones a la vez: entra una y la otra recibe 409', async () => {
      const p = await crear(db, ejemplo);
      const rs = await Promise.all([aceptarPropuesta(url(), p.capacidad, datos(p)), aceptarPropuesta(url(), p.capacidad, datos(p))]);
      expect(rs.map((r) => r.status).sort()).toEqual([201, 409]);
    });

    test('seguimiento: avance marca y desmarca hitos y la pagina lo lee', async () => {
      const p = await crear(db, ejemplo);
      await expect(avance(db, p.referencia, 1)).rejects.toThrow('no esta aceptada');
      await aceptarPropuesta(url(), p.capacidad, datos(p));
      expect(await avance(db, p.referencia, 1)).toBe('Señal');
      await expect(avance(db, p.referencia, 1)).rejects.toThrow('ya esta cumplido');
      await expect(avance(db, p.referencia, 9)).rejects.toThrow('de 1 a 4');
      await avance(db, p.referencia, 2);
      await avance(db, p.referencia, 2, true);
      await expect(avance(db, p.referencia, 2, true)).rejects.toThrow('no esta cumplido');
      const antes = process.env.DATABASE_URL;
      process.env.DATABASE_URL = url();
      try {
        const leida = await leerPropuesta(p.referencia);
        expect(leida?.estado).toBe('aceptada');
        expect(Object.keys(leida?.cumplidos ?? {})).toEqual(['1']);
      } finally {
        if (antes === undefined) delete process.env.DATABASE_URL;
        else process.env.DATABASE_URL = antes;
      }
    });
  });

  test('un contenido invalido no deja nada a medias', async () => {
    const antes = (await db.query(`SELECT count(*)::int AS n FROM propuesta_version`)).rows[0].n;
    await expect(crear(db, { ...ejemplo, vigencia_dias: 0 })).rejects.toThrow('vigencia_dias');
    expect((await db.query(`SELECT count(*)::int AS n FROM propuesta_version`)).rows[0].n).toBe(antes);
  });
});
