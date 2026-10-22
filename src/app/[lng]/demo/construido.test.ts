// La regla que decide que necesita cada cliente (FSM, CRM, el 09, citas, automatizacion) no puede llegar al navegador
// (ADR-113, punto 5): la aplica Ruben al leer la reserva. Este test mira lo construido por `npm run build`, asi que va
// despues del build; sin build se salta.
//
// Ojo con el HTML: todas las paginas llevan en el layout los datos estructurados del catalogo publico, donde sale
// «Sistema de Gestion a Medida (ERP/CRM/FSM)». Eso es publico y no es la regla, asi que en el HTML se miran «FSM» y
// «CRM» fuera de esos bloques, y en el HTML y el RSC, las frases de la regla del boceto.
import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const NEXT = join(import.meta.dir, '..', '..', '..', '..', '.next');
const MANIFIESTO = join(NEXT, 'app-build-manifest.json');
const hayBuild = existsSync(MANIFIESTO);

const SIGLAS = /\bFSM\b|\bCRM\b|probablemente/i;
// Las frases de la regla del boceto (bocetos/2026-10-22_propuestas.html): ninguna puede aparecer.
const REGLA =
  /probablemente|Gestión de técnicos \(FSM\)|Un CRM|Gestión a medida \(el 09\)|Lleva casi todo|Tiene gente trabajando fuera|que no se pueden escapar|Lo suyo es la agenda|Una tarea concreta que hoy hace a mano/i;

describe.skipIf(!hayBuild)('lo que la demo manda al navegador', () => {
  test('los JS de la demo no nombran FSM, CRM ni «probablemente»', () => {
    const paginas = JSON.parse(readFileSync(MANIFIESTO, 'utf8')).pages as Record<string, string[]>;
    const chunks = paginas['/[lng]/demo/page'];
    expect(chunks?.length).toBeGreaterThan(0);
    for (const c of chunks) {
      if (!c.endsWith('.js')) continue;
      expect({ c, encontrado: readFileSync(join(NEXT, c), 'utf8').match(SIGLAS)?.[0] ?? null }).toEqual({ c, encontrado: null });
    }
  });

  for (const lng of ['es', 'ca', 'en']) {
    test(`/${lng}/demo: sin la regla en el HTML ni en el RSC`, () => {
      const html = readFileSync(join(NEXT, 'server', 'app', lng, 'demo.html'), 'utf8');
      const rsc = readFileSync(join(NEXT, 'server', 'app', lng, 'demo.rsc'), 'utf8');
      const sinCatalogo = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
      expect(sinCatalogo.match(REGLA)?.[0] ?? null).toBeNull();
      expect(rsc.match(REGLA)?.[0] ?? null).toBeNull();
      // Fuera del catalogo y de su copia en el RSC (self.__next_f), tampoco las siglas.
      const visible = sinCatalogo.replace(/<script>self\.__next_f[\s\S]*?<\/script>/g, '');
      expect(visible.match(SIGLAS)?.[0] ?? null).toBeNull();
    });
  }
});
