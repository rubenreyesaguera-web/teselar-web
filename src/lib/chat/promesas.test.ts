import { describe, expect, test } from 'bun:test';
import { prometeWhatsAppAlCorreo } from './promesas';

describe('TesS no promete pasar el WhatsApp al correo', () => {
  test('lo que dijo en las baterías del 20 y el 23/11 se detecta, en los tres idiomas', () => {
    expect(prometeWhatsAppAlCorreo('Rubén monta un sistema para que los avisos de WhatsApp no se te pierdan y vayan directos a tu correo y a una hoja organizada, sin tocar tu número.')).toBe(true);
    expect(prometeWhatsAppAlCorreo('Te pasa los avisos del WhatsApp a tu correo.')).toBe(true);
    expect(prometeWhatsAppAlCorreo('Els missatges de WhatsApp et arriben al correu.')).toBe(true);
    expect(prometeWhatsAppAlCorreo('Your WhatsApp messages go straight to your email.')).toBe(true);
  });

  test('lo que sí puede decir no salta', () => {
    // La frase de la REGLA INSTALADORES: el formulario va al correo; el WhatsApp se queda donde está.
    expect(prometeWhatsAppAlCorreo('Un formulario de avisos en tu web que te llega a tu correo y a una hoja, y los que te escriban por WhatsApp los sigues teniendo ahí.')).toBe(false);
    // Citas: la versión con WhatsApp y el recordatorio por correo de la otra.
    expect(prometeWhatsAppAlCorreo('Tienes la versión con WhatsApp por 450€ o la de sin WhatsApp, con el recordatorio por correo el día antes.')).toBe(false);
    expect(prometeWhatsAppAlCorreo('Si quieres, Rubén lo mira contigo en una charla gratuita de 30 minutos. ¿Te paso el enlace?')).toBe(false);
    expect(prometeWhatsAppAlCorreo('Escríbele por WhatsApp al +34 653 232 735 y te contesta él.')).toBe(false);
  });
});
