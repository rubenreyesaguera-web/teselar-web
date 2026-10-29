// El PDF que recibe el cliente al aceptar (ADR-117): su ejemplar de la propuesta aceptada, de las condiciones
// generales y de su anexo (Ley 7/1998, art. 5.1), con el justificante. Va adjunto al correo que es tambien el acuse de
// la LSSI (art. 28). Solo servidor.
//
// Con las fuentes estandar de PDF (Helvetica), que solo saben escribir el juego WinAnsi: tildes, ç, l·l, «», ’, — y €
// entran; lo que no entra se cambia antes por su equivalente (`aWinAnsi`), y un test lo comprueba con los dos textos.
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import type { InstantaneaV1 } from './instantanea';
import type { Identidad, Justificante } from './aceptar';
import { CONDICIONES, huellaCondiciones, type Lengua } from './condiciones';
import { euros, fechaLarga, momento } from './formato';
import { TEXTOS } from './textos';

const ROTULOS = {
  es: {
    titulo: (ref: string) => `Propuesta ${ref} aceptada`,
    subtitulo: 'Copia para el cliente: propuesta aceptada, condiciones generales y anexo de encargo del tratamiento.',
    justificante: 'Justificante de la aceptación',
    referencia: 'Propuesta',
    aceptadaEl: 'Aceptada el',
    huellaOferta: 'Huella de la propuesta aceptada (SHA-256)',
    condiciones: (v: number) => `Condiciones generales aceptadas: versión ${v}`,
    huellaCondiciones: 'Huella de las condiciones (SHA-256)',
    partes: 'Partes',
    prestador: 'Prestador',
    cliente: 'Cliente',
    firmante: 'Acepta',
    enNombreDe: 'En nombre de',
    comoCargo: 'como',
    autonomo: 'como autónomo',
    declarado: 'Datos declarados por quien acepta: el control del DNI y del NIF cuadra, pero nadie ha verificado que sean suyos.',
    propuesta: 'La propuesta aceptada',
    pagina: (n: number, de: number) => `Página ${n} de ${de}`,
  },
  ca: {
    titulo: (ref: string) => `Proposta ${ref} acceptada`,
    subtitulo: 'Còpia per al client: proposta acceptada, condicions generals i annex d’encàrrec del tractament.',
    justificante: 'Justificant de l’acceptació',
    referencia: 'Proposta',
    aceptadaEl: 'Acceptada el',
    huellaOferta: 'Empremta de la proposta acceptada (SHA-256)',
    condiciones: (v: number) => `Condicions generals acceptades: versió ${v}`,
    huellaCondiciones: 'Empremta de les condicions (SHA-256)',
    partes: 'Parts',
    prestador: 'Prestador',
    cliente: 'Client',
    firmante: 'Accepta',
    enNombreDe: 'En nom de',
    comoCargo: 'com a',
    autonomo: 'com a autònom',
    declarado: 'Dades declarades per qui accepta: el control del DNI i del NIF quadra, però ningú no ha verificat que siguin seves.',
    propuesta: 'La proposta acceptada',
    pagina: (n: number, de: number) => `Pàgina ${n} de ${de}`,
  },
};

/** Lo que Helvetica no sabe escribir, cambiado por lo mas parecido que si. */
export function aWinAnsi(s: string): string {
  return s
    .replace(/[   ]/g, ' ')
    .replace(/[→⟶]/g, '->')
    .replace(/[✓✔]/g, 'Sí')
    .replace(/[‐‑‒–]/g, '-')
    .replace(/[^\u0000-ÿ€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•—˜™š›œžŸ]/g, '?');
}

const A4 = { ancho: 595.28, alto: 841.89 };
const MARGEN = 56;
const AZUL = rgb(8 / 255, 60 / 255, 88 / 255);
const GRIS = rgb(0.35, 0.42, 0.45);

class Escritor {
  private pagina!: PDFPage;
  private y = 0;
  readonly paginas: PDFPage[] = [];

  constructor(
    private doc: PDFDocument,
    private normal: PDFFont,
    private negrita: PDFFont,
  ) {
    this.nueva();
  }

  private nueva() {
    this.pagina = this.doc.addPage([A4.ancho, A4.alto]);
    this.paginas.push(this.pagina);
    this.y = A4.alto - MARGEN;
  }

  /** Corta el texto en lineas que caben en `ancho`. */
  private lineas(texto: string, fuente: PDFFont, tam: number, ancho: number): string[] {
    const fuera: string[] = [];
    for (const parrafo of aWinAnsi(texto).split('\n')) {
      let linea = '';
      for (const palabra of parrafo.split(' ')) {
        const prueba = linea ? `${linea} ${palabra}` : palabra;
        if (fuente.widthOfTextAtSize(prueba, tam) <= ancho || !linea) {
          // Una palabra sola mas ancha que la linea (una huella) se parte a la fuerza.
          if (!linea && fuente.widthOfTextAtSize(prueba, tam) > ancho) {
            let trozo = '';
            for (const c of prueba) {
              if (fuente.widthOfTextAtSize(trozo + c, tam) > ancho) {
                fuera.push(trozo);
                trozo = '';
              }
              trozo += c;
            }
            linea = trozo;
          } else linea = prueba;
        } else {
          fuera.push(linea);
          linea = palabra;
        }
      }
      fuera.push(linea);
    }
    return fuera;
  }

  texto(t: string, o: { tam?: number; negrita?: boolean; color?: ReturnType<typeof rgb>; sangria?: number; antes?: number } = {}) {
    const tam = o.tam ?? 10;
    const fuente = o.negrita ? this.negrita : this.normal;
    const sangria = o.sangria ?? 0;
    const interlinea = tam * 1.4;
    this.y -= o.antes ?? 0;
    for (const l of this.lineas(t, fuente, tam, A4.ancho - 2 * MARGEN - sangria)) {
      if (this.y - interlinea < MARGEN) this.nueva();
      this.y -= interlinea;
      this.pagina.drawText(l, { x: MARGEN + sangria, y: this.y, size: tam, font: fuente, color: o.color ?? AZUL });
    }
  }

  titulo(t: string) {
    if (this.y - 60 < MARGEN) this.nueva();
    this.texto(t, { tam: 13, negrita: true, antes: 14 });
    this.y -= 2;
  }

  punto(t: string, marca = '•') {
    const tam = 10;
    if (this.y - tam * 1.4 < MARGEN) this.nueva();
    this.pagina.drawText(aWinAnsi(marca), { x: MARGEN, y: this.y - tam * 1.4, size: tam, font: this.normal, color: AZUL });
    this.texto(t, { sangria: 14, tam });
  }

  pies(rotulo: (n: number, de: number) => string, ref: string) {
    this.paginas.forEach((p, i) => {
      p.drawText(aWinAnsi(`Teselar Software · ${ref} · ${rotulo(i + 1, this.paginas.length)}`), {
        x: MARGEN,
        y: MARGEN / 2,
        size: 8,
        font: this.normal,
        color: GRIS,
      });
    });
  }
}

export interface DatosPdf {
  instantanea: InstantaneaV1;
  justificante: Justificante;
  quien: Identidad;
  lengua: Lengua;
  /** El domicilio completo del prestador: solo va en el ejemplar de quien firma (Ruben, 6/10 y 29/10). */
  domicilioProveedor: string;
}

export async function generarPdf({ instantanea: p, justificante: j, quien, lengua: l, domicilioProveedor }: DatosPdf): Promise<Uint8Array> {
  const R = ROTULOS[l];
  const T = TEXTOS[l];
  const doc = await PDFDocument.create();
  // Metadatos propios: ni el nombre de la libreria ni nada que no sea Teselar.
  doc.setTitle(R.titulo(j.referencia));
  doc.setAuthor('Teselar Software');
  doc.setSubject(R.subtitulo);
  doc.setCreator('Teselar Software');
  doc.setProducer('Teselar Software');
  doc.setLanguage(l === 'ca' ? 'ca-ES' : 'es-ES');
  doc.setCreationDate(new Date(j.accepted_at));
  doc.setModificationDate(new Date(j.accepted_at));

  const e = new Escritor(doc, await doc.embedFont(StandardFonts.Helvetica), await doc.embedFont(StandardFonts.HelveticaBold));
  const ahora = new Date(j.accepted_at);

  e.texto(R.titulo(j.referencia), { tam: 18, negrita: true });
  e.texto(R.subtitulo, { color: GRIS, antes: 4 });

  e.titulo(R.justificante);
  e.texto(`${R.referencia}: ${j.referencia} · ${T.versionN(j.version)}`);
  e.texto(`${R.aceptadaEl}: ${momento(ahora, l)} ${T.horaLloret} · ${j.accepted_at} UTC`);
  e.texto(`${R.huellaOferta}: ${j.offer_hash}`);
  e.texto(R.condiciones(CONDICIONES.version));
  e.texto(`${R.huellaCondiciones}: ${huellaCondiciones(l)}`);

  e.titulo(R.partes);
  const prov = p.partes.proveedor;
  e.texto(`${R.prestador}: ${prov.nombre} · ${prov.marca} · NIF ${prov.nif} · ${domicilioProveedor} · info@teselarsoftware.com`);
  const cliente =
    quien.tipo === 'sociedad'
      ? `${R.cliente}: ${quien.razon_social} · NIF ${quien.nif_sociedad} · ${quien.domicilio}`
      : `${R.cliente}: ${quien.nombre} · DNI/NIE ${quien.dni} · ${quien.domicilio}`;
  e.texto(cliente);
  e.texto(
    quien.tipo === 'sociedad'
      ? `${R.firmante}: ${quien.nombre} · DNI/NIE ${quien.dni} · ${R.comoCargo} ${quien.cargo} · ${quien.correo}`
      : `${R.firmante}: ${quien.nombre} ${R.autonomo} · ${quien.correo}`,
  );
  e.texto(R.declarado, { tam: 8, color: GRIS, antes: 2 });

  e.titulo(R.propuesta);
  e.texto(p.portada.titular, { negrita: true });
  e.texto(p.portada.subtitulo);
  e.texto(p.solucion.resumen, { antes: 4 });
  const B = T.bloques;
  const bloque = (titulo: string, items: string[]) => {
    if (!items.length) return;
    e.texto(titulo, { negrita: true, antes: 8 });
    items.forEach((t) => e.punto(t));
  };
  bloque(B.incluye, [...p.alcance, ...p.entregables]);
  bloque(B.noIncluye, p.exclusiones);
  bloque(B.necesito, p.dependencias);
  bloque(B.calendario, p.calendario.map((t) => `${t.tramo} — ${T.dependeDe.toLowerCase()} ${t.depende_de}: ${t.plazo}`));
  bloque(B.precio, p.precio.conceptos.map((c) => `${c.concepto}: ${euros(c.importe_centimos)}${c.periodicidad === 'mensual' ? T.alMes : ''}${T.masIva}`));
  bloque(B.pagos, [...p.pagos.hitos.map((h) => `${h.hito}: ${euros(h.importe_centimos)}${T.masIva} — ${h.cuando}`), ...p.pagos.notas]);
  if (p.impuestos.nota) bloque('IVA', [p.impuestos.nota]);
  if (p.garantia) bloque(B.garantia, [p.garantia]);
  bloque(B.vigencia, [T.vigenciaHasta(p.vigencia.dias, fechaLarga(p.vigencia.hasta, l))]);

  const c = CONDICIONES.texto[l];
  e.titulo(`${c.titulo} · ${T.versionN(CONDICIONES.version)}`);
  c.intro.forEach((t) => e.texto(t));
  for (const cl of c.clausulas) {
    e.texto(cl.titulo, { negrita: true, antes: 8 });
    if (cl.puntos.length === 1) e.texto(cl.puntos[0]);
    else cl.puntos.forEach((t) => e.punto(t));
  }
  e.titulo(c.anexo.titulo);
  c.anexo.puntos.forEach((t, i) => e.punto(t, `${i + 1}.`));

  e.pies(R.pagina, j.referencia);
  return doc.save();
}
