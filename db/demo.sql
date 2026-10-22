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
  como          text        CHECK (como IN ('papel', 'excel', 'whatsapp', 'programa')),
  desde_enlace  boolean     NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS demo_evento_creado ON demo_evento (creado);
