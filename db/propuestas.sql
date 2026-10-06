-- Propuestas con aceptacion versionada (ADR-091, hito 6.3 del plan del curso).
--
-- Se aplica con `bun scripts/propuesta.ts migrar` y es idempotente: se puede pasar las veces que haga falta.
--
-- Tres reglas que no dependen de que el codigo se porte bien, porque las hace cumplir la base:
--   1. Una version publicada no cambia nunca de contenido: solo su estado (publicada -> sustituida/invalidada)
--      y su contador de intentos fallidos. No se borra.
--   2. Una propuesta se acepta una sola vez, sea la version que sea, y la aceptacion copia la instantanea y el
--      hash de la version aceptada (si no coinciden, no entra). Tampoco se cambia ni se borra.
--   3. Los eventos son de solo anadir.
--
-- Importes en centimos y enteros: lo exige `src/lib/propuestas/canonico.ts`, que es quien calcula el hash.

CREATE TABLE IF NOT EXISTS propuesta_version (
  proposal_id       text        NOT NULL CHECK (proposal_id ~ '^P-[0-9]{4}-[0-9]{3}$'),
  version           integer     NOT NULL CHECK (version >= 1),
  schema_version    integer     NOT NULL CHECK (schema_version >= 1),
  snapshot          jsonb       NOT NULL CHECK (jsonb_typeof(snapshot) = 'object'),
  offer_hash        char(64)    NOT NULL CHECK (offer_hash ~ '^[0-9a-f]{64}$'),
  -- Solo el SHA-256 de la capacidad del enlace del cliente; la capacidad en claro no se guarda nunca.
  capability_hash   char(64)    NOT NULL UNIQUE CHECK (capability_hash ~ '^[0-9a-f]{64}$'),
  status            text        NOT NULL DEFAULT 'publicada'
                                CHECK (status IN ('publicada', 'sustituida', 'invalidada')),
  created_at        timestamptz NOT NULL DEFAULT now(),
  expires_at        timestamptz NOT NULL,
  intentos_fallidos integer     NOT NULL DEFAULT 0 CHECK (intentos_fallidos >= 0),
  PRIMARY KEY (proposal_id, version)
);

-- Como mucho una version viva por propuesta.
CREATE UNIQUE INDEX IF NOT EXISTS propuesta_version_una_publicada
  ON propuesta_version (proposal_id) WHERE status = 'publicada';

CREATE TABLE IF NOT EXISTS aceptacion (
  acceptance_id     uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id       text        NOT NULL,
  version           integer     NOT NULL,
  snapshot          jsonb       NOT NULL,
  offer_hash        char(64)    NOT NULL,
  casilla_leido     boolean     NOT NULL,
  casilla_autoridad boolean     NOT NULL,
  accepted_at       timestamptz NOT NULL DEFAULT now(),
  idempotency_key   text        NOT NULL UNIQUE CHECK (length(idempotency_key) BETWEEN 16 AND 128),
  -- Una sola aceptacion por propuesta, sea la version que sea.
  UNIQUE (proposal_id),
  CHECK (casilla_leido AND casilla_autoridad),
  FOREIGN KEY (proposal_id, version) REFERENCES propuesta_version (proposal_id, version) ON DELETE RESTRICT
);

-- Quien acepto, aparte: el justificante publico lee `aceptacion` y nunca esta tabla.
CREATE TABLE IF NOT EXISTS aceptacion_identidad (
  acceptance_id uuid PRIMARY KEY REFERENCES aceptacion (acceptance_id) ON DELETE RESTRICT,
  nombre        text NOT NULL CHECK (length(btrim(nombre)) BETWEEN 1 AND 200),
  correo        text NOT NULL CHECK (length(correo) BETWEEN 3 AND 254 AND correo ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  empresa       text NOT NULL CHECK (length(btrim(empresa)) BETWEEN 1 AND 200)
);

CREATE TABLE IF NOT EXISTS evento (
  evento_id   bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  proposal_id text        NOT NULL,
  version     integer,
  tipo        text        NOT NULL CHECK (tipo IN ('creada', 'sustituida', 'invalidada', 'aceptada', 'aviso_fallido', 'error_aceptacion')),
  detalle     jsonb       NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS evento_por_propuesta ON evento (proposal_id, created_at);

-- Seguimiento (6/10): los hitos de pago cumplidos (`hito_cumplido`) y su correccion (`hito_deshecho`), con el
-- numero de hito en `detalle`. Se redefine la lista para que la migracion valga tambien sobre una base ya creada.
ALTER TABLE evento DROP CONSTRAINT IF EXISTS evento_tipo_check;
ALTER TABLE evento ADD CONSTRAINT evento_tipo_check CHECK (tipo IN (
  'creada', 'sustituida', 'invalidada', 'aceptada', 'aviso_fallido', 'error_aceptacion', 'hito_cumplido', 'hito_deshecho'));

-- 1. La version: solo cambian `status` (hacia delante) e `intentos_fallidos`; no se borra.
CREATE OR REPLACE FUNCTION propuesta_version_inmutable() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'propuesta_version: las versiones no se borran (%, v%)', OLD.proposal_id, OLD.version;
  END IF;
  IF NEW.proposal_id    IS DISTINCT FROM OLD.proposal_id
  OR NEW.version        IS DISTINCT FROM OLD.version
  OR NEW.schema_version IS DISTINCT FROM OLD.schema_version
  OR NEW.snapshot       IS DISTINCT FROM OLD.snapshot
  OR NEW.offer_hash     IS DISTINCT FROM OLD.offer_hash
  OR NEW.capability_hash IS DISTINCT FROM OLD.capability_hash
  OR NEW.created_at     IS DISTINCT FROM OLD.created_at
  OR NEW.expires_at     IS DISTINCT FROM OLD.expires_at THEN
    RAISE EXCEPTION 'propuesta_version: el contenido de una version no cambia; se crea una version nueva (%, v%)',
      OLD.proposal_id, OLD.version;
  END IF;
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF OLD.status <> 'publicada' THEN
      RAISE EXCEPTION 'propuesta_version: una version % no cambia de estado (%, v%)', OLD.status, OLD.proposal_id, OLD.version;
    END IF;
    IF NEW.status = 'sustituida' AND EXISTS (SELECT 1 FROM aceptacion a WHERE a.proposal_id = OLD.proposal_id) THEN
      RAISE EXCEPTION 'propuesta_version: % ya esta aceptada y no se sustituye', OLD.proposal_id;
    END IF;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS propuesta_version_inmutable ON propuesta_version;
CREATE TRIGGER propuesta_version_inmutable
  BEFORE UPDATE OR DELETE ON propuesta_version
  FOR EACH ROW EXECUTE FUNCTION propuesta_version_inmutable();

-- 2. La aceptacion: solo sobre la version viva y sin vencer, con su misma instantanea y hash, y la hora del servidor.
CREATE OR REPLACE FUNCTION aceptacion_comprobar() RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE
  v propuesta_version%ROWTYPE;
BEGIN
  SELECT * INTO v FROM propuesta_version WHERE proposal_id = NEW.proposal_id AND version = NEW.version FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'aceptacion: no existe la version % v%', NEW.proposal_id, NEW.version;
  END IF;
  IF v.status <> 'publicada' THEN
    RAISE EXCEPTION 'aceptacion: la version % v% esta %', NEW.proposal_id, NEW.version, v.status;
  END IF;
  IF v.expires_at <= now() THEN
    RAISE EXCEPTION 'aceptacion: la version % v% vencio el %', NEW.proposal_id, NEW.version, v.expires_at;
  END IF;
  IF NEW.offer_hash <> v.offer_hash OR NEW.snapshot <> v.snapshot THEN
    RAISE EXCEPTION 'aceptacion: la instantanea o el hash no son los de la version % v%', NEW.proposal_id, NEW.version;
  END IF;
  NEW.accepted_at := now();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS aceptacion_comprobar ON aceptacion;
CREATE TRIGGER aceptacion_comprobar
  BEFORE INSERT ON aceptacion
  FOR EACH ROW EXECUTE FUNCTION aceptacion_comprobar();

-- 2 y 3. Lo aceptado y los eventos no se cambian ni se borran.
CREATE OR REPLACE FUNCTION solo_anadir() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION '%: es de solo anadir (% rechazado)', TG_TABLE_NAME, TG_OP;
END $$;

DROP TRIGGER IF EXISTS aceptacion_solo_anadir ON aceptacion;
CREATE TRIGGER aceptacion_solo_anadir
  BEFORE UPDATE OR DELETE ON aceptacion
  FOR EACH ROW EXECUTE FUNCTION solo_anadir();

DROP TRIGGER IF EXISTS aceptacion_identidad_solo_anadir ON aceptacion_identidad;
CREATE TRIGGER aceptacion_identidad_solo_anadir
  BEFORE UPDATE OR DELETE ON aceptacion_identidad
  FOR EACH ROW EXECUTE FUNCTION solo_anadir();

DROP TRIGGER IF EXISTS evento_solo_anadir ON evento;
CREATE TRIGGER evento_solo_anadir
  BEFORE UPDATE OR DELETE ON evento
  FOR EACH ROW EXECUTE FUNCTION solo_anadir();
