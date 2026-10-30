// El panel privado desde la terminal (07_Pendientes de la boveda, punto 7). Se ejecuta con bun:
//
//   bun scripts/panel.ts clave                        pide la contrasena dos veces sin ensenarla y saca PANEL_CLAVE_HASH
//   bun scripts/panel.ts secreto                      saca un PANEL_SECRETO nuevo (cambiarlo cierra todas las sesiones)
//   bun --env-file=<fichero> scripts/panel.ts [--base <nombre>] migrar
//                                                     aplica db/propuestas.sql y db/panel.sql (idempotente)
//   bun --env-file=<fichero> scripts/panel.ts [--base <nombre>] borrar-contacto <id> <motivo>
//                                                     borra un contacto de verdad: solo si el interesado lo pide (RGPD)
//
// `clave` y `secreto` no se conectan a nada: lo que imprimen se pega en Vercel como variable Secret y no se guarda en
// ningun otro sitio.
import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cifrarClave } from '../src/lib/panel/sesion';
import { conectar, migrar as migrarPropuestas, urlDeConexion } from './propuesta';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Lee una linea de la terminal sin hacer eco. Si no hay terminal (tuberia), lee la entrada entera. */
async function leerOculto(pregunta: string): Promise<string> {
  const stdin = process.stdin;
  if (!stdin.isTTY) {
    const trozos: Buffer[] = [];
    for await (const t of stdin) trozos.push(t as Buffer);
    return Buffer.concat(trozos).toString('utf8').replace(/\r?\n$/, '');
  }
  process.stderr.write(pregunta);
  stdin.setRawMode(true);
  stdin.resume();
  return new Promise((resolver, rechazar) => {
    let texto = '';
    const alLeer = (dato: Buffer) => {
      for (const c of dato.toString('utf8')) {
        if (c === '\r' || c === '\n') {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.off('data', alLeer);
          process.stderr.write('\n');
          resolver(texto);
          return;
        }
        if (c === '\u0003') {
          stdin.setRawMode(false);
          rechazar(new Error('Cancelado'));
          return;
        }
        if (c === '\u007f' || c === '\b') texto = texto.slice(0, -1);
        else texto += c;
      }
    };
    stdin.on('data', alLeer);
  });
}

async function main(argv: string[]): Promise<void> {
  const i = argv.indexOf('--base');
  const base = i === -1 ? undefined : argv.splice(i, 2)[1];
  const [orden, ...args] = argv;

  if (orden === 'clave') {
    const a = await leerOculto('Contraseña del panel (no se ve al escribir): ');
    if (process.stdin.isTTY) {
      const b = await leerOculto('Otra vez: ');
      if (a !== b) throw new Error('No coinciden; no se ha generado nada');
    }
    console.log(`PANEL_CLAVE_HASH=${cifrarClave(a)}`);
    console.error('Pégalo en Vercel (Production, Secret). La contraseña no se ha guardado en ningún sitio.');
    return;
  }
  if (orden === 'secreto') {
    console.log(`PANEL_SECRETO=${randomBytes(32).toString('base64url')}`);
    return;
  }

  const client = await conectar(urlDeConexion(base));
  try {
    const { rows } = await client.query('SELECT current_database() AS b');
    console.log(`Base: ${rows[0].b}`);
    switch (orden) {
      case 'migrar':
        await migrarPropuestas(client);
        await client.query(readFileSync(join(RAIZ, 'db', 'panel.sql'), 'utf8'));
        console.log('Esquema de propuestas y del panel aplicado.');
        break;
      case 'borrar-contacto': {
        const id = Number(args[0]);
        const motivo = args.slice(1).join(' ').trim();
        if (!Number.isSafeInteger(id) || !motivo) throw new Error('borrar-contacto pide el id y el motivo (quién lo pidió y cuándo)');
        const r = await client.query('DELETE FROM contacto WHERE id = $1 RETURNING negocio', [id]);
        if (!r.rows.length) throw new Error(`No hay ningún contacto ${id}`);
        // El motivo se dice aqui y se apunta en la boveda; en la base no queda nada del contacto, que es lo que pidio.
        console.log(`Contacto ${id} («${r.rows[0].negocio}») borrado. Motivo: ${motivo}`);
        break;
      }
      default:
        throw new Error('Órdenes: clave · secreto · migrar · borrar-contacto');
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
