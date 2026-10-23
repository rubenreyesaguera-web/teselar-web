-- Contador de la demo de gestion (ADR-113; decidido el 22/10 en la fase 1 del doc 31 de la boveda).
--
-- Se aplica con `bun scripts/demo.ts migrar` y es idempotente.
--
-- Una fila por paso de la demo. A proposito no hay columna para el nombre de la empresa, el texto de «Otro», la IP ni
-- nada que identifique a nadie: sin datos personales no hace falta aviso de cookies, y lo que no tiene columna no se
-- puede guardar aunque el codigo se equivoque.

CREATE TABLE IF NOT EXISTS demo_evento (
  id            bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  creado        timestamptz NOT NULL DEFAULT now(),
  paso          text        NOT NULL CHECK (paso IN ('abrir', 'panel', 'reservar')),
  lng           text        NOT NULL CHECK (lng IN ('es', 'ca', 'en')),
  sector        text        CHECK (sector IN ('inst', 'ref', 'tal', 'sal', 'est', 'inm', 'ges', 'otr')),
  partes        text[]      NOT NULL DEFAULT '{}' CHECK (partes <@ ARRAY['tec', 'cli', 'fac', 'cit', 'mat']::text[]),
  como          text[]      CHECK (como <@ ARRAY['papel', 'excel', 'whatsapp', 'programa']::text[]),
  desde_enlace  boolean     NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS demo_evento_creado ON demo_evento (creado);

-- 24/10: «¿Como lo llevas hoy?» pasa a admitir varias respuestas, porque WhatsApp lo usa casi todo el mundo ademas de
-- otra cosa (ADR-114, doc 32). En una base de antes, la columna era text: se convierte y cada respuesta suelta pasa a
-- ser una lista de un elemento. Sigue admitiendo NULL para que la pagina vieja, que manda null al abrir, no falle
-- mientras se despliega la nueva.
DO $$
BEGIN
  IF (SELECT data_type FROM information_schema.columns
      WHERE table_name = 'demo_evento' AND column_name = 'como') = 'text' THEN
    ALTER TABLE demo_evento DROP CONSTRAINT IF EXISTS demo_evento_como_check;
    ALTER TABLE demo_evento ALTER COLUMN como TYPE text[] USING CASE WHEN como IS NULL THEN NULL ELSE ARRAY[como] END;
    ALTER TABLE demo_evento ADD CONSTRAINT demo_evento_como_check
      CHECK (como <@ ARRAY['papel', 'excel', 'whatsapp', 'programa']::text[]);
  END IF;
END $$;
