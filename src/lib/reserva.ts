// El diagnóstico gratuito se reserva en la página de reservas propia de Teselar (Teselar Citas), no en Calendly
// (Rubén, 20/11). Enlace sin idioma: la página redirige al del navegador y conserva el origen.
//
// La página de reservas solo guarda el origen (web, google o ig): la demo y la tarjeta de colaborador ya no mandan
// la empresa, el sector ni el «De parte de …». Cuando la página acepte un mensaje por enlace (pendiente en
// teselar-citas), lo vuelven a mandar; el código que lo hacía con Calendly está en el historial (src/lib/demo/calendly.ts).
export const RESERVA_DIAGNOSTICO = 'https://reservas.teselarsoftware.com/teselarsoftware?o=web';
