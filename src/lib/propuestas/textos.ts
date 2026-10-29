// Las palabras propias de /p/ (titulos, avisos, botones y el formulario), en castellano y en catalan (decision de
// Ruben del 29/10: la pagina va en la lengua de la propuesta, y el contrato se puede formalizar en las dos). Todo lo
// demas sale de la instantanea, escrita ya en esa lengua. El catalan pasa por el corrector de Softcatala.
import type { Lengua } from './condiciones';
import type { Estado } from './leer';

export interface Textos {
  estado: Record<Estado, string>;
  alMes: string;
  masIva: string;
  aceptadaEl: (cuando: string) => string;
  vencio: (cuando: string) => string;
  retirada: string;
  inversion: string;
  validaHasta: (cuando: string) => string;
  propuesta: string;
  para: string;
  propuestaDe: string;
  secciones: {
    situacion: string;
    solucion: string;
    alcance: string;
    entregables: string;
    exclusiones: string;
    dependencias: string;
    calendario: string;
    inversion: string;
    garantia: string;
    vigencia: string;
    siguiente: string;
  };
  dependeDe: string;
  vigenciaDias: (dias: number, hasta: string) => string;
  huella: string;
  huellaNota: string;
  botonAceptar: string;
  verAlcance: string;
  ocultarAlcance: string;
  // Camino de pagos
  comoVa: string;
  comoSePaga: (n: number) => string;
  pasosCumplidos: (hechos: number, total: number) => string;
  pagos: string;
  cuandoSePaga: string;
  cumplidoEl: (cuando: string) => string;
  pendiente: string;
  // Dialogo y condiciones de la propuesta
  loQueAceptas: string;
  propuestaAceptada: string;
  cerrar: string;
  versionN: (n: number) => string;
  bloques: { incluye: string; noIncluye: string; necesito: string; calendario: string; precio: string; pagos: string; garantia: string; vigencia: string };
  vigenciaHasta: (dias: number, hasta: string) => string;
  huellaVersion: string;
  // Informacion previa (LSSI art. 27)
  antesTitulo: string;
  antes: string[];
  // Formulario
  quienAcepta: string;
  aceptasComo: string;
  autonomo: string;
  sociedad: string;
  razonSocial: string;
  nifSociedad: string;
  domicilioSocial: string;
  domicilio: string;
  domicilioAyuda: string;
  nombre: string;
  cargo: string;
  cargoEjemplo: string;
  dni: string;
  correo: string;
  casillaLeido: (ref: string, version: number) => string;
  casillaCondiciones: (version: number) => [string, string, string];
  casillaAutoridadSociedad: string;
  casillaAutoridadAutonomo: string;
  avisoLegal: (responsable: string) => [string, string, string];
  politica: string;
  confirmar: string;
  guardando: string;
  sinCapacidad: string;
  sinConexion: string;
  // Justificante
  gracias: string;
  yaEstaba: string;
  aceptadaElRotulo: string;
  horaLloret: string;
  huellaAceptado: string;
  correoEnviado: (correo: string) => string;
  primerPago: (hito: string, importe: string) => string;
  volver: string;
}

const es: Textos = {
  estado: { vigente: 'Pendiente de aceptación', aceptada: 'Propuesta aceptada', vencida: 'Vencida', retirada: 'Retirada' },
  alMes: ' al mes',
  masIva: ' + IVA',
  aceptadaEl: (c) => `Aceptada el ${c} (hora de Lloret).`,
  vencio: (c) => `Esta propuesta venció el ${c}. Si te sigue interesando, pídeme una actualizada.`,
  retirada: 'Esta propuesta se ha retirado y ya no se puede consultar.',
  inversion: 'Inversión',
  validaHasta: (c) => `Válida hasta el ${c}`,
  propuesta: 'Propuesta',
  para: 'Para',
  propuestaDe: 'Propuesta de',
  secciones: {
    situacion: 'Lo que me contaste',
    solucion: 'Lo que te propongo',
    alcance: 'Qué incluye',
    entregables: 'Lo que te entrego',
    exclusiones: 'Qué no incluye',
    dependencias: 'Lo que necesito de ti',
    calendario: 'Calendario',
    inversion: 'Inversión y forma de pago',
    garantia: 'Garantía',
    vigencia: 'Vigencia',
    siguiente: 'Siguiente paso',
  },
  dependeDe: 'Depende de',
  vigenciaDias: (d, h) => `${d} días: hasta el ${h}.`,
  huella: 'Huella de esta versión (SHA-256):',
  huellaNota: 'Cualquier cambio en lo que dice esta propuesta da una versión nueva con otra huella.',
  botonAceptar: 'Aceptar propuesta',
  verAlcance: 'Ver alcance completo',
  ocultarAlcance: 'Ocultar alcance',
  comoVa: 'Cómo va',
  comoSePaga: (n) => `Cómo se paga · ${n === 1 ? 'un pago' : `${n} pagos`}`,
  pasosCumplidos: (h, t) => `${h} de ${t} pasos cumplidos`,
  pagos: 'Pagos',
  cuandoSePaga: 'Cuándo se paga',
  cumplidoEl: (c) => `Cumplido el ${c}`,
  pendiente: 'Pendiente',
  loQueAceptas: 'Lo que aceptas',
  propuestaAceptada: 'Propuesta aceptada',
  cerrar: 'Cerrar',
  versionN: (n) => `versión ${n}`,
  bloques: {
    incluye: 'Qué incluye',
    noIncluye: 'Qué no incluye',
    necesito: 'Lo que necesito de ti',
    calendario: 'Calendario',
    precio: 'Precio (todos los importes + IVA)',
    pagos: 'Pagos',
    garantia: 'Garantía',
    vigencia: 'Vigencia',
  },
  vigenciaHasta: (d, h) => `${d} días: hasta el ${h}.`,
  huellaVersion: 'Huella de esta versión (SHA-256):',
  antesTitulo: 'Antes de aceptar',
  antes: [
    'Pasos: revisas aquí lo que aceptas y las condiciones generales, rellenas tus datos, marcas las casillas y confirmas.',
    'Hasta que pulses «Confirmar aceptación» puedes revisar y cambiar todo lo que has escrito. Si después ves un error en tus datos, escríbeme a info@teselarsoftware.com.',
    'Se guarda la versión aceptada con su huella, la fecha, las casillas, la versión de las condiciones y tus datos. Al aceptar te llega por correo un PDF con todo: es tu copia y el acuse de recibo.',
    'El contrato se puede formalizar en castellano o en catalán; las condiciones están en los dos idiomas.',
  ],
  quienAcepta: 'Quién acepta',
  aceptasComo: 'Aceptas como',
  autonomo: 'Autónomo',
  sociedad: 'Sociedad',
  razonSocial: 'Razón social',
  nifSociedad: 'NIF de la sociedad',
  domicilioSocial: 'Domicilio social',
  domicilio: 'Domicilio',
  domicilioAyuda: '(calle, número, código postal y población)',
  nombre: 'Nombre y apellidos de quien acepta',
  cargo: 'Tu cargo en la sociedad',
  cargoEjemplo: 'Administradora, apoderado, gerente…',
  dni: 'DNI o NIE de quien acepta',
  correo: 'Correo',
  casillaLeido: (r, v) => `He leído y acepto esta propuesta (${r}, versión ${v}).`,
  casillaCondiciones: (v) => ['He leído y acepto las ', `condiciones generales (versión ${v})`, ' y su anexo de encargo del tratamiento de datos.'],
  casillaAutoridadSociedad: 'Actúo en nombre de la sociedad y tengo poderes para aceptarla.',
  casillaAutoridadAutonomo: 'Acepto en mi propio nombre, como autónomo.',
  avisoLegal: (resp) => [
    'Tus datos y tu autoridad para aceptar los declaras tú: se comprueba que el DNI y el NIF estén bien escritos, pero no que sean tuyos. Al confirmar, aceptas esta propuesta y las condiciones generales. ',
    `Responsable: ${resp}. Finalidad: registrar la aceptación de esta propuesta y gestionar el contrato (nombre, DNI, domicilio, correo y, si aceptas como sociedad, su razón social, su NIF y tu cargo). Se conserva lo que dure el contrato y sus obligaciones legales. Tus derechos y el resto de la información, en la `,
    '.',
  ],
  politica: 'política de privacidad',
  confirmar: 'Confirmar aceptación',
  guardando: 'Guardando…',
  sinCapacidad: 'Para aceptar, abre el enlace completo que te envié. Este enlace sirve para leer la propuesta, no para aceptarla.',
  sinConexion: 'No hay conexión o el servidor no responde. Vuelve a intentarlo: no se duplicará.',
  gracias: 'Gracias. Tu aceptación ha quedado registrada.',
  yaEstaba: 'Esta propuesta ya estaba aceptada.',
  aceptadaElRotulo: 'Aceptada el',
  horaLloret: '(hora de Lloret)',
  huellaAceptado: 'Huella de lo aceptado',
  correoEnviado: (c) => `En unos minutos te llega a ${c} un PDF con la propuesta, las condiciones generales y el justificante.`,
  primerPago: (h, i) => `En breve te escribo con los datos para el primer pago (${h}: ${i} + IVA).`,
  volver: 'Volver a la propuesta',
};

const ca: Textos = {
  estado: { vigente: 'Pendent d’acceptació', aceptada: 'Proposta acceptada', vencida: 'Vençuda', retirada: 'Retirada' },
  alMes: ' al mes',
  masIva: ' + IVA',
  aceptadaEl: (c) => `Acceptada el ${c} (hora de Lloret).`,
  vencio: (c) => `Aquesta proposta va vèncer el ${c}. Si encara t’interessa, demana-me’n una d’actualitzada.`,
  retirada: 'Aquesta proposta s’ha retirat i ja no es pot consultar.',
  inversion: 'Inversió',
  validaHasta: (c) => `Vàlida fins al ${c}`,
  propuesta: 'Proposta',
  para: 'Per a',
  propuestaDe: 'Proposta de',
  secciones: {
    situacion: 'El que em vas explicar',
    solucion: 'El que et proposo',
    alcance: 'Què inclou',
    entregables: 'El que et lliuro',
    exclusiones: 'Què no inclou',
    dependencias: 'El que necessito de tu',
    calendario: 'Calendari',
    inversion: 'Inversió i forma de pagament',
    garantia: 'Garantia',
    vigencia: 'Vigència',
    siguiente: 'Següent pas',
  },
  dependeDe: 'Depèn de',
  vigenciaDias: (d, h) => `${d} dies: fins al ${h}.`,
  huella: 'Empremta d’aquesta versió (SHA-256):',
  huellaNota: 'Qualsevol canvi en el que diu aquesta proposta en dona una versió nova amb una altra empremta.',
  botonAceptar: 'Acceptar la proposta',
  verAlcance: 'Veure l’abast complet',
  ocultarAlcance: 'Amagar l’abast',
  comoVa: 'Com va',
  comoSePaga: (n) => `Com es paga · ${n === 1 ? 'un pagament' : `${n} pagaments`}`,
  pasosCumplidos: (h, t) => `${h} de ${t} passos complerts`,
  pagos: 'Pagaments',
  cuandoSePaga: 'Quan es paga',
  cumplidoEl: (c) => `Complert el ${c}`,
  pendiente: 'Pendent',
  loQueAceptas: 'El que acceptes',
  propuestaAceptada: 'Proposta acceptada',
  cerrar: 'Tancar',
  versionN: (n) => `versió ${n}`,
  bloques: {
    incluye: 'Què inclou',
    noIncluye: 'Què no inclou',
    necesito: 'El que necessito de tu',
    calendario: 'Calendari',
    precio: 'Preu (tots els imports + IVA)',
    pagos: 'Pagaments',
    garantia: 'Garantia',
    vigencia: 'Vigència',
  },
  vigenciaHasta: (d, h) => `${d} dies: fins al ${h}.`,
  huellaVersion: 'Empremta d’aquesta versió (SHA-256):',
  antesTitulo: 'Abans d’acceptar',
  antes: [
    'Passos: revises aquí el que acceptes i les condicions generals, omples les teves dades, marques les caselles i confirmes.',
    'Fins que premis «Confirmar l’acceptació» pots revisar i canviar tot el que has escrit. Si després veus un error a les teves dades, escriu-me a info@teselarsoftware.com.',
    'Es guarda la versió acceptada amb la seva empremta, la data, les caselles, la versió de les condicions i les teves dades. En acceptar, t’arriba per correu un PDF amb tot: és la teva còpia i la confirmació de recepció.',
    'El contracte es pot formalitzar en castellà o en català; les condicions són en les dues llengües.',
  ],
  quienAcepta: 'Qui accepta',
  aceptasComo: 'Acceptes com a',
  autonomo: 'Autònom',
  sociedad: 'Societat',
  razonSocial: 'Raó social',
  nifSociedad: 'NIF de la societat',
  domicilioSocial: 'Domicili social',
  domicilio: 'Domicili',
  domicilioAyuda: '(carrer, número, codi postal i població)',
  nombre: 'Nom i cognoms de qui accepta',
  cargo: 'El teu càrrec a la societat',
  cargoEjemplo: 'Administradora, apoderat, gerent…',
  dni: 'DNI o NIE de qui accepta',
  correo: 'Correu',
  casillaLeido: (r, v) => `He llegit i accepto aquesta proposta (${r}, versió ${v}).`,
  casillaCondiciones: (v) => ['He llegit i accepto les ', `condicions generals (versió ${v})`, ' i el seu annex d’encàrrec del tractament de dades.'],
  casillaAutoridadSociedad: 'Actuo en nom de la societat i tinc poders per acceptar-la.',
  casillaAutoridadAutonomo: 'Accepto en nom meu, com a autònom.',
  avisoLegal: (resp) => [
    'Les teves dades i la teva autoritat per acceptar les declares tu: es comprova que el DNI i el NIF estiguin ben escrits, però no que siguin teus. En confirmar, acceptes aquesta proposta i les condicions generals. ',
    `Responsable: ${resp}. Finalitat: registrar l’acceptació d’aquesta proposta i gestionar el contracte (nom, DNI, domicili, correu i, si acceptes com a societat, la seva raó social, el seu NIF i el teu càrrec). Es conserva mentre duri el contracte i les seves obligacions legals. Els teus drets i la resta de la informació, a la `,
    '.',
  ],
  politica: 'política de privadesa',
  confirmar: 'Confirmar l’acceptació',
  guardando: 'Desant…',
  sinCapacidad: 'Per acceptar, obre l’enllaç complet que et vaig enviar. Aquest enllaç serveix per llegir la proposta, no per acceptar-la.',
  sinConexion: 'No hi ha connexió o el servidor no respon. Torna-ho a provar: no es duplicarà.',
  gracias: 'Gràcies. La teva acceptació ha quedat registrada.',
  yaEstaba: 'Aquesta proposta ja estava acceptada.',
  aceptadaElRotulo: 'Acceptada el',
  horaLloret: '(hora de Lloret)',
  huellaAceptado: 'Empremta del que s’ha acceptat',
  correoEnviado: (c) => `D’aquí a uns minuts t’arribarà a ${c} un PDF amb la proposta, les condicions generals i el justificant.`,
  primerPago: (h, i) => `Aviat t’escric amb les dades per al primer pagament (${h}: ${i} + IVA).`,
  volver: 'Tornar a la proposta',
};

export const TEXTOS: Record<Lengua, Textos> = { es, ca };
