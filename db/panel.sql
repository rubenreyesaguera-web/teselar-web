-- Panel privado con contrasena (07_Pendientes de la boveda, punto 7; decisiones del «1 a 1» del 30/10 y addenda del
-- 30/10 en ADR-091).
--
-- Se aplica con `bun scripts/panel.ts migrar`, DESPUES de db/propuestas.sql (amplia su lista de eventos), y es
-- idempotente.
--
-- Lo que guarda el panel y lo que no:
--   - Los contactos en curso (decision 3): los campos de la hoja de leads mas propuesta y colaborador. Ganados y
--     perdidos se ocultan, no se borran; borrar de verdad solo si el interesado lo pide (RGPD), con el script.
--   - Los cobros (decision 3) y los hitos marcados desde el panel (decision 0) son eventos de la tabla `evento`, de
--     solo anadir, como lo que ya hace `avance` del script.
--   - Las aperturas de la propuesta (decision 4): primera, ultima y cuantas veces. A proposito sin columna para IP,
--     navegador ni cookie: lo que no tiene columna no se puede guardar aunque el codigo se equivoque.
--   - El bloqueo de la entrada (decision 1): una sola fila con los fallos seguidos y hasta cuando esta bloqueada.

CREATE TABLE IF NOT EXISTS contacto (
  id               bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  negocio          text        NOT NULL CHECK (length(btrim(negocio)) BETWEEN 1 AND 200),
  persona          text        CHECK (length(persona) <= 200),
  telefono         text        CHECK (length(telefono) <= 40),
  correo           text        CHECK (length(correo) <= 254),
  origen           text        CHECK (length(origen) <= 200),
  estado           text        NOT NULL DEFAULT 'en_conversacion' CHECK (estado IN (
                     'en_conversacion', 'reunion_hecha', 'diagnostico_enviado', 'propuesta_enviada', 'ganado', 'perdido')),
  siguiente_accion text        CHECK (length(siguiente_accion) <= 500),
  fecha            date,
  notas            text        CHECK (length(notas) <= 5000),
  propuesta        text        CHECK (propuesta ~ '^P-[0-9]{4}-[0-9]{3}$'),
  colaborador      text        CHECK (length(colaborador) <= 100),
  creado           timestamptz NOT NULL DEFAULT now(),
  actualizado      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contacto_abiertos ON contacto (fecha) WHERE estado NOT IN ('ganado', 'perdido');

CREATE TABLE IF NOT EXISTS propuesta_apertura (
  proposal_id text        PRIMARY KEY CHECK (proposal_id ~ '^P-[0-9]{4}-[0-9]{3}$'),
  primera     timestamptz NOT NULL DEFAULT now(),
  ultima      timestamptz NOT NULL DEFAULT now(),
  veces       integer     NOT NULL DEFAULT 1 CHECK (veces >= 1)
);

CREATE TABLE IF NOT EXISTS panel_acceso (
  id               integer     PRIMARY KEY CHECK (id = 1),
  fallos_seguidos  integer     NOT NULL DEFAULT 0 CHECK (fallos_seguidos >= 0),
  bloqueado_hasta  timestamptz
);

INSERT INTO panel_acceso (id) VALUES (1) ON CONFLICT DO NOTHING;

-- Los cobros: «Cobrado el…» por hito, con deshacer. Solo los ve Ruben; la pagina del cliente lee unicamente
-- `hito_cumplido` y `hito_deshecho` (src/lib/propuestas/leer.ts). Es un apunte, no una factura.
ALTER TABLE evento DROP CONSTRAINT IF EXISTS evento_tipo_check;
ALTER TABLE evento ADD CONSTRAINT evento_tipo_check CHECK (tipo IN (
  'creada', 'sustituida', 'invalidada', 'aceptada', 'aviso_fallido', 'error_aceptacion', 'hito_cumplido', 'hito_deshecho',
  'acuse_enviado', 'acuse_fallido',
  'cobro_apuntado', 'cobro_deshecho'));

-- ——— Fase 2 (decidida el 30/10 por la tarde, 07_Pendientes punto 7) ———

-- Comision del colaborador (decision 2): el porcentaje va en cada contacto, no en el colaborador, para poder pasar del
-- 10 % al 20 % en un proyecto concreto. «Saldado el…» con deshacer (se vacian las cuatro columnas). Si se paga con un
-- canje o un descuento, el valor acordado en euros (LIVA art. 79.Uno; doc 31 de la boveda). Es un apunte, no una factura.
ALTER TABLE contacto ADD COLUMN IF NOT EXISTS comision text NOT NULL DEFAULT 'ninguna'
  CHECK (comision IN ('ninguna', 'puente', 'acompana'));
ALTER TABLE contacto ADD COLUMN IF NOT EXISTS comision_saldada date;
ALTER TABLE contacto ADD COLUMN IF NOT EXISTS comision_forma text
  CHECK (comision_forma IN ('transferencia', 'canje', 'descuento'));
ALTER TABLE contacto ADD COLUMN IF NOT EXISTS comision_valor_centimos integer CHECK (comision_valor_centimos >= 0);
ALTER TABLE contacto ADD COLUMN IF NOT EXISTS comision_nota text CHECK (length(comision_nota) <= 500);

-- El contador de toda la web: una fila por pagina vista. A proposito sin columna para IP, navegador, cookie ni la
-- direccion completa de la web de origen: solo el dominio, la etiqueta ?origen= (letras, numeros y guiones), el pais de
-- la cabecera de Vercel y el tipo de dispositivo. `entrada`: la primera pagina de quien llega (de fuera o sin origen);
-- las «visitas» son las entradas y las «paginas vistas», todas las filas. Cuenta visitas, no personas.
-- Conservacion (guia de la AEPD de medicion de audiencia, enero de 2024): la hora exacta solo 48 horas, despues el dia;
-- todo se borra a los 25 meses. Lo hace `limpiarVisitas` (src/lib/panel/estadisticas.ts) al abrir el panel.
CREATE TABLE IF NOT EXISTS visita (
  id           bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  creado       timestamptz NOT NULL DEFAULT now(),
  ruta         text        NOT NULL CHECK (ruta ~ '^/(es|ca|en)(/[a-z0-9/-]*)?$' AND length(ruta) <= 200),
  entrada      boolean     NOT NULL,
  dominio      text        CHECK (dominio ~ '^[a-z0-9.-]{1,100}$'),
  origen       text        CHECK (origen ~ '^[a-z0-9-]{1,30}$'),
  pais         text        CHECK (pais ~ '^[A-Z]{2}$'),
  dispositivo  text        NOT NULL CHECK (dispositivo IN ('movil', 'escritorio', 'tableta'))
);

CREATE INDEX IF NOT EXISTS visita_creado ON visita (creado);
