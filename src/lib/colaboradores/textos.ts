// Textos de la tarjeta de colaborador, en castellano y catalan (fase 4 del doc 31). Aparte del diccionario de la web
// para que estas paginas no carguen el resto.
import type { Colaborador } from '@/data/colaboradores';

export type IdiomaColaborador = 'es' | 'ca';

export function textos(lng: IdiomaColaborador, c: Colaborador) {
  const f = c.genero === 'f';
  if (lng === 'ca') {
    return {
      titulo: `Rubén Reyes · de part de ${c.nombre}`,
      te_presenta: `Et presenta ${c.nombre}`,
      oficio: 'Programari a mida · Lloret de Mar',
      quien: 'Ordeno els clients, els avisos i els tècnics d’empreses de la zona. Ho munto jo, en persona.',
      reservar: 'Reservar diagnòstic gratuït',
      reservar_sub: 'Calendly · 30 minuts, sense compromís',
      whatsapp: 'Escriure al Rubén per WhatsApp',
      whatsapp_sub: `Ja va escrit: «Vinc de part de ${c.nombre}»`,
      whatsapp_texto: `Hola Rubén, vinc de part de ${c.nombre}.`,
      guardar: 'Guardar el Rubén',
      que_hace: 'Què fa Teselar',
      nota_vcard: `Te'l va presentar ${c.nombre}`,
      // La tarjeta que ensena el colaborador
      tarjeta_titulo: `${c.nombre} · ${f ? 'col·laboradora' : 'col·laborador'} de Teselar`,
      etiqueta: f ? 'COL·LABORADORA DE TESELAR' : 'COL·LABORADOR DE TESELAR',
      escanea: 'Escaneja i et presento el Rubén',
      tarjeta_texto: 'Organitza els clients, els avisos i els tècnics d’empreses de la zona. El diagnòstic és gratuït.',
      reenviar: 'Enviar per WhatsApp',
      reenviar_sub: 'Per a qui no tinguis davant',
      reenviar_texto: (url: string) => `T'envio el contacte del Rubén, de Teselar Software. Fa programes a mida per a empreses de la zona i el diagnòstic és gratuït: ${url}`,
      qr_alt: `Codi QR a la pàgina del Rubén de part de ${c.nombre}`,
    };
  }
  return {
    titulo: `Rubén Reyes · de parte de ${c.nombre}`,
    te_presenta: `Te presenta ${c.nombre}`,
    oficio: 'Software a medida · Lloret de Mar',
    quien: 'Ordeno los clientes, los avisos y los técnicos de empresas de la zona. Lo monto yo, en persona.',
    reservar: 'Reservar diagnóstico gratis',
    reservar_sub: 'Calendly · 30 minutos, sin compromiso',
    whatsapp: 'Escribir a Rubén por WhatsApp',
    whatsapp_sub: `Ya va escrito: «Vengo de parte de ${c.nombre}»`,
    whatsapp_texto: `Hola Rubén, vengo de parte de ${c.nombre}.`,
    guardar: 'Guardar a Rubén',
    que_hace: 'Qué hace Teselar',
    nota_vcard: `Te lo presentó ${c.nombre}`,
    tarjeta_titulo: `${c.nombre} · ${f ? 'colaboradora' : 'colaborador'} de Teselar`,
    etiqueta: f ? 'COLABORADORA DE TESELAR' : 'COLABORADOR DE TESELAR',
    escanea: 'Escanea y te presento a Rubén',
    tarjeta_texto: 'Organiza los clientes, los avisos y los técnicos de empresas de la zona. El diagnóstico es gratis.',
    reenviar: 'Enviar por WhatsApp',
    reenviar_sub: 'Para quien no tengas delante',
    reenviar_texto: (url: string) => `Te paso el contacto de Rubén, de Teselar Software. Hace programas a medida para empresas de la zona y el diagnóstico es gratis: ${url}`,
    qr_alt: `Código QR a la página de Rubén de parte de ${c.nombre}`,
  };
}
