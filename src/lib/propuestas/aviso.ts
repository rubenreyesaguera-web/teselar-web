// El correo que avisa a info@ de que alguien ha aceptado (ADR-091, decision 2). Solo avisa: la base es la unica
// verdad, y si el correo falla la aceptacion sigue guardada (el fallo queda como evento, hito 6.6).
import nodemailer from 'nodemailer';
import type { Identidad, Justificante } from './aceptar';

export const DESTINO_AVISOS = 'info@teselarsoftware.com';

export async function enviarAviso(asunto: string, texto: string): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error('Faltan GMAIL_USER o GMAIL_APP_PASSWORD');
  const transporte = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
  await transporte.sendMail({ from: `"Teselar propuestas" <${user}>`, to: DESTINO_AVISOS, subject: asunto, text: texto });
}

/** Las pruebas llevan [PRUEBAS] en el asunto: la base no es la de verdad. */
export function textoAceptacion(j: Justificante, quien: Identidad, base: string) {
  const etiqueta = base === 'neondb' ? '' : '[PRUEBAS] ';
  const hora = new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(j.accepted_at));
  return {
    asunto: `${etiqueta}Propuesta ${j.referencia} aceptada`,
    texto: [
      `${quien.nombre} ha aceptado la propuesta ${j.referencia} v${j.version} el ${hora} (hora de Lloret).`,
      '',
      `Firmante: ${quien.nombre} · DNI/NIE ${quien.dni}`,
      quien.tipo === 'sociedad' ? `En nombre de: ${quien.razon_social} · NIF ${quien.nif_sociedad}` : 'Como autónomo',
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
