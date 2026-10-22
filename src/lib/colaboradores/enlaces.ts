// Los enlaces de la tarjeta de colaborador (fase 4 del doc 31). Todos llevan a Ruben: el Calendly, su WhatsApp y su
// contacto. El nombre del colaborador solo viaja como «de parte de», para saber quien lo presento.
import { CALENDLY_DIAGNOSTICO } from '@/lib/demo/calendly';
import { WHATSAPP_RUBEN } from '@/lib/demo/enlace';

export const BASE = 'https://www.teselarsoftware.com';

export const RUBEN = {
  nombre: 'Rubén Reyes',
  empresa: 'Teselar Software',
  telefono: '+34653232735',
  correo: 'info@teselarsoftware.com',
  web: BASE,
  // Generada con Google Flow a partir de sus fotos y elegida por el el 22/10 (ojos y canas corregidos), sin metadatos.
  foto: '/colaboradores/ruben.jpg',
} as const;

/** La pagina que ve el cliente al escanear. */
export function enlaceColaborador(lng: 'es' | 'ca', slug: string): string {
  return `${BASE}/${lng}/c/${slug}`;
}

/** El Calendly con la pregunta 7, «¿Quien te ha presentado?», ya rellena. */
export function calendlyDeParteDe(nombre: string): string {
  return `${CALENDLY_DIAGNOSTICO}?a7=${encodeURIComponent(nombre)}`;
}

export function whatsappARuben(texto: string): string {
  return `https://wa.me/${WHATSAPP_RUBEN}?text=${encodeURIComponent(texto)}`;
}

/** Para que el colaborador lo reenvie: sin numero, elige el a quien en su WhatsApp. */
export function whatsappParaReenviar(texto: string): string {
  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}

// vCard 3.0: la que mejor abren a la vez el iPhone y Android. Los ; , y \ del texto van escapados.
function escapar(t: string): string {
  return t.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([;,])/g, '\\$1');
}

/** La ficha de contacto de Ruben, con la nota de quien se lo presento. Nunca lleva datos del colaborador. */
export function vcardRuben(nota: string): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Reyes;Rubén;;;',
    `FN:${escapar(RUBEN.nombre)}`,
    `ORG:${escapar(RUBEN.empresa)}`,
    `TEL;TYPE=CELL:${RUBEN.telefono}`,
    `EMAIL;TYPE=WORK:${RUBEN.correo}`,
    `URL:${RUBEN.web}`,
    `NOTE:${escapar(nota)}`,
    'END:VCARD',
    '',
  ].join('\r\n');
}
