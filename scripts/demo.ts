// El contador de la demo de gestion (ADR-113, doc 31) desde Claude Code. Se ejecuta con bun:
//
//   bun --env-file=<fichero> scripts/demo.ts [--base <nombre>] <orden>
//
//   migrar     aplica db/demo.sql (idempotente)
//   embudo     cuantas veces se llego a cada paso, por sector, y lo marcado por quien llego al panel
//
// La conexion y `--base` funcionan igual que en scripts/propuesta.ts: las pruebas, con otra base, nunca con la de verdad.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { conectar, urlDeConexion } from './propuesta';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

function opcion(argv: string[], nombre: string): string | undefined {
  const i = argv.indexOf(nombre);
  if (i < 0) return undefined;
  const valor = argv[i + 1];
  argv.splice(i, 2);
  return valor;
}

async function main(argv: string[]): Promise<void> {
  const base = opcion(argv, '--base');
  const [orden] = argv;
  const client = await conectar(urlDeConexion(base));
  try {
    const { rows } = await client.query('SELECT current_database() AS b');
    console.log(`Base: ${rows[0].b}`);
    switch (orden) {
      case 'migrar':
        await client.query(readFileSync(join(RAIZ, 'db', 'demo.sql'), 'utf8'));
        console.log('Esquema aplicado.');
        break;
      case 'embudo': {
        const pasos = await client.query(`
          SELECT coalesce(sector, '-') AS sector,
                 count(*) FILTER (WHERE paso = 'abrir')    AS abrir,
                 count(*) FILTER (WHERE paso = 'panel')    AS panel,
                 count(*) FILTER (WHERE paso = 'reservar') AS reservar
          FROM demo_evento GROUP BY 1 ORDER BY 3 DESC, 1`);
        console.table(pasos.rows);
        const marcado = await client.query(`
          SELECT array_to_string(partes, '+') AS partes, coalesce(nullif(array_to_string(como, '+'), ''), '-') AS como, count(*) AS veces
          FROM demo_evento WHERE paso = 'panel' GROUP BY 1, 2 ORDER BY 3 DESC LIMIT 20`);
        console.table(marcado.rows);
        break;
      }
      default:
        throw new Error('Ordenes: migrar · embudo');
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
