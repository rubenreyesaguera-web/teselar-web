// El correo que avisa a info@ de que alguien ha aceptado (ADR-091, decision 2). Solo avisa: la base es la unica
// verdad, y si el correo falla la aceptacion sigue guardada (el fallo queda como evento, hito 6.6).
import nodemailer from 'nodemailer';
import type { Identidad, Justificante } from './aceptar';
import { CONDICIONES, type Lengua } from './condiciones';
import { fechaLarga } from './formato';

export const DESTINO_AVISOS = 'info@teselarsoftware.com';

function transporte() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error('Faltan GMAIL_USER o GMAIL_APP_PASSWORD');
  return { user, t: nodemailer.createTransport({ service: 'gmail', auth: { user, pass } }) };
}

export async function enviarAviso(asunto: string, texto: string): Promise<void> {
  const { user, t } = transporte();
  await t.sendMail({ from: `"Teselar propuestas" <${user}>`, to: DESTINO_AVISOS, subject: asunto, text: texto });
}

/**
 * El correo al cliente con su PDF (ADR-117): su ejemplar de la propuesta y de las condiciones (Ley 7/1998, art. 5.1)
 * y el acuse de recibo de la aceptacion (LSSI, art. 28). Con copia oculta a info@, para tener lo mismo que el cliente.
 */
export async function enviarAcuse(a: { para: string; asunto: string; texto: string; html: string; pdf: Uint8Array; nombrePdf: string }) {
  const { user, t } = transporte();
  await t.sendMail({
    from: `"Teselar Software" <${user}>`,
    to: a.para,
    bcc: DESTINO_AVISOS,
    replyTo: DESTINO_AVISOS,
    subject: a.asunto,
    text: a.texto,
    html: a.html,
    attachments: [{ filename: a.nombrePdf, content: Buffer.from(a.pdf), contentType: 'application/pdf' }],
  });
}

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapar = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]);

/** La firma de `firma-email.html` (sin imagenes, fondo blanco fijo); Gmail no la pone en lo que sale por SMTP. */
function firmaHtml(l: Lengua): string {
  const lema = l === 'ca' ? 'Solucions de desenvolupament a mida' : 'Soluciones de desarrollo a medida';
  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;background-color:#FFFFFF;"><tr><td style="background-color:#00BFA5;width:3px;line-height:1px;font-size:0;">&nbsp;</td><td style="background-color:#FFFFFF;padding:12px 18px 12px 14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#083C58;"><div style="font-size:15px;font-weight:bold;color:#083C58;">Rubén Reyes</div><div style="font-size:12px;color:#083C58;padding-top:2px;"><span style="font-weight:bold;">TESELAR</span> <span style="letter-spacing:0.18em;">SOFTWARE</span></div><div style="font-size:11px;color:#5A6B73;padding-top:1px;">${lema}</div><div style="font-size:12px;padding-top:9px;color:#083C58;"><a href="tel:+34653232735" style="color:#083C58;text-decoration:none;">+34&nbsp;653&nbsp;232&nbsp;735</a><span style="color:#00BFA5;">&nbsp;·&nbsp;</span><a href="mailto:info@teselarsoftware.com" style="color:#083C58;text-decoration:none;">info@teselarsoftware.com</a></div><div style="font-size:12px;padding-top:2px;"><a href="https://www.teselarsoftware.com" style="color:#083C58;text-decoration:none;font-weight:bold;">teselarsoftware.com</a><span style="color:#00BFA5;">&nbsp;·&nbsp;</span><a href="https://www.instagram.com/teselarsoftware" style="color:#5A6B73;text-decoration:none;">Instagram</a><span style="color:#00BFA5;">&nbsp;·&nbsp;</span><a href="https://www.linkedin.com/company/teselarsoftware" style="color:#5A6B73;text-decoration:none;">LinkedIn</a></div></td></tr></table>`;
}

/** El texto del correo al cliente, en la lengua de su propuesta. Despedida sin nombre: la firma ya empieza por el. */
export function textoAcuse(j: Justificante, quien: Identidad, l: Lengua, base: string) {
  const etiqueta = base === 'neondb' ? '' : '[PRUEBAS] ';
  // En el correo, fecha y hora a secas: el cliente y Teselar estan en la misma zona (Ruben, 29/10).
  const d = new Date(j.accepted_at);
  const hora = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(d);
  const dia = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(d);
  const cuando = `${fechaLarga(dia, l)} ${l === 'ca' ? 'a les' : 'a las'} ${hora}`;
  const nombre = quien.nombre.split(/\s+/)[0];
  const parrafos =
    l === 'ca'
      ? [
          `Hola, ${nombre}:`,
          `Gràcies per acceptar la proposta ${j.referencia} (versió ${j.version}). Et confirmo que he rebut la teva acceptació el ${cuando}.`,
          `T’adjunto un PDF amb la proposta acceptada, les condicions generals (versió ${CONDICIONES.version}) i l’annex d’encàrrec del tractament de dades. És la teva còpia: guarda-la.`,
          'Aviat t’escric amb les dades per al primer pagament. Si veus algun error a les teves dades, respon a aquest correu.',
          'Salutacions,',
        ]
      : [
          `Hola, ${nombre}:`,
          `Gracias por aceptar la propuesta ${j.referencia} (versión ${j.version}). Te confirmo que he recibido tu aceptación el ${cuando}.`,
          `Te adjunto un PDF con la propuesta aceptada, las condiciones generales (versión ${CONDICIONES.version}) y el anexo de encargo del tratamiento de datos. Es tu copia: guárdala.`,
          'En breve te escribo con los datos para el primer pago. Si ves algún error en tus datos, contesta a este correo.',
          'Un saludo,',
        ];
  return {
    asunto:
      l === 'ca'
        ? `${etiqueta}Proposta ${j.referencia} acceptada: la teva còpia i el justificant`
        : `${etiqueta}Propuesta ${j.referencia} aceptada: tu copia y el justificante`,
    texto: `${parrafos.join('\n\n')}\n\n-- \nRubén Reyes · Teselar Software\n+34 653 232 735 · info@teselarsoftware.com · teselarsoftware.com`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#0f2533;">${parrafos
      .map((p) => `<p>${escapar(p)}</p>`)
      .join('')}</div>${firmaHtml(l)}`,
    nombrePdf: `${l === 'ca' ? 'Proposta' : 'Propuesta'}-${j.referencia}-v${j.version}.pdf`,
  };
}

/** Las pruebas llevan [PRUEBAS] en el asunto: la base no es la de verdad. */
export function textoAceptacion(j: Justificante, quien: Identidad, base: string) {
  const etiqueta = base === 'neondb' ? '' : '[PRUEBAS] ';
  const hora = new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(j.accepted_at));
  return {
    asunto: `${etiqueta}Propuesta ${j.referencia} aceptada`,
    texto: [
      `${quien.nombre} ha aceptado la propuesta ${j.referencia} v${j.version} el ${hora}.`,
      '',
      `Firmante: ${quien.nombre} · DNI/NIE ${quien.dni}`,
      quien.tipo === 'sociedad'
        ? `En nombre de: ${quien.razon_social} · NIF ${quien.nif_sociedad} · como ${quien.cargo} (declara tener poderes)`
        : 'Como autónomo',
      `Domicilio: ${quien.domicilio}`,
      `Correo: ${quien.correo}`,
      '(Todo autodeclarado: el control de los documentos cuadra, pero nadie ha verificado que sean suyos.)',
      '',
      `Huella de la versión aceptada: ${j.offer_hash}`,
      `Base: ${base}`,
      '',
      'Siguiente paso: pasarle los datos para la señal.',
    ].join('\n'),
  };
}
