// La automatización sencilla de 690 € es un formulario en la web del cliente que le llega a su correo y a una hoja; lo que
// le escriben por WhatsApp sigue en su WhatsApp (REGLA INSTALADORES del prompt). Aun así, TesS prometió que los avisos de
// WhatsApp «vayan directos a tu correo y a una hoja» (baterías del 20 y del 23/11, ADR-122), así que el servidor lo mira en
// cada respuesta. Se mira frase a frase y trozo a trozo (entre comas): la frase permitida, «un formulario que te llega a tu
// correo y a una hoja, y los que te escriban por WhatsApp los sigues teniendo ahí», junta las dos cosas en trozos distintos.
const plano = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const WHATSAPP = /\b(whatsapp|whatsapps|wasap|wasaps|wassap)\b/;
// Que lo que se mueve sean los mensajes o avisos (no un recordatorio de citas, que sí sale por correo).
const MENSAJES = /\b(aviso|avisos|mensaje|mensajes|avis|missatge|missatges|message|messages|notice|notices|request|requests)\b/;
// A dónde se promete que van.
const DESTINO = /\b(correo|correos|email|e-mail|mail|hoja|hojas|excel|correu|full|inbox|spreadsheet|sheet)\b/;

export function prometeWhatsAppAlCorreo(texto: string): boolean {
  return plano(texto)
    .split(/[.!?;:\n]+|,/)
    .some(trozo => WHATSAPP.test(trozo) && MENSAJES.test(trozo) && DESTINO.test(trozo));
}
