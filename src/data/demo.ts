// Datos de ejemplo de la demo de gestion (/[lng]/demo, ADR-113 y doc 31 de la boveda).
//
// El sector solo cambia los ejemplos; lo que el visitante marca decide que partes se ven. Aqui no hay ninguna regla que
// traduzca lo marcado a un producto: esa la aplica Ruben al leer la reserva, y no se manda al navegador.

import type { Locale } from '../i18n/dictionaries';

export const SECTORES = ['inst', 'ref', 'tal', 'sal', 'est', 'inm', 'ges', 'otr'] as const;
export type Sector = (typeof SECTORES)[number];

export const PARTES = ['tec', 'cli', 'fac', 'cit', 'mat'] as const;
export type Parte = (typeof PARTES)[number];

// Como lo lleva hoy. Los textos de cada uno estan en el diccionario (demo.como).
export const COMO = ['papel', 'excel', 'whatsapp', 'programa'] as const;
export type Como = (typeof COMO)[number];

export interface Parada { hora: string; texto: string }
export interface Fila { etiqueta: string; valor: string }
export interface Tecnico { nombre: string; resumen: string; paradas: Parada[] }
export interface Aviso { tipo: string; cuando: string; cliente: string; detalle: string; siguiente: string; urgente: boolean }

export interface EjemploSector {
  nombre: string;
  tec: { titulo: string; tecnicos: Tecnico[]; parte: { titulo: string; filas: Fila[]; firma: string } };
  cli: { titulo: string; avisos: Aviso[] };
  fac: { titulo: string; filas: Fila[] };
  cit: { titulo: string; citas: Parada[] };
  mat: { titulo: string; filas: Fila[] };
}

const p = (hora: string, texto: string): Parada => ({ hora, texto });
const f = (etiqueta: string, valor: string): Fila => ({ etiqueta, valor });
const t = (nombre: string, resumen: string, paradas: Parada[]): Tecnico => ({ nombre, resumen, paradas });
const a = (tipo: string, cuando: string, cliente: string, detalle: string, siguiente: string, urgente: boolean): Aviso =>
  ({ tipo, cuando, cliente, detalle, siguiente, urgente });

const es: Record<Sector, EjemploSector> = {
  inst: {
    nombre: 'Instalaciones',
    tec: {
      titulo: 'Ruta de cada técnico',
      tecnicos: [
        t('Marc', '3 visitas · Lloret', [p('08:30', 'Hotel Mirador · revisión trimestral del contrato'), p('11:30', 'Bar Ca la Rosa · avería de cámara')]),
        t('Jordi', '2 visitas · Blanes', [p('09:00', 'Comunidad Carrer del Mar 8 · revisión anual'), p('12:00', 'Piso particular · instalación de split')]),
      ],
      parte: {
        titulo: 'Parte de mantenimiento',
        filas: [f('Contrato', 'Hotel Mirador · revisión 3 de 4'), f('Técnico', 'Marc · 2 h 10 min'), f('Revisado', '12 máquinas · 1 con fuga'), f('Material', 'Gas R32, filtros')],
        firma: 'Firma del cliente en el móvil',
      },
    },
    cli: {
      titulo: 'Contratos de mantenimiento',
      avisos: [
        a('Contrato anual', '4 revisiones', 'Hotel Mirador', 'Revisión de hoy · 12 máquinas', 'Asignada a Marc', false),
        a('Contrato anual', '1 revisión', 'Comunidad Carrer del Mar 8', 'Vence en enero · renovar', 'Avisar al presidente', true),
        a('Presupuesto enviado', 'hace 3 días', 'Restaurante Es Racó', 'Contrato de mantenimiento · sin respuesta', 'Toca llamar hoy', true),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Revisiones de ayer', '3 facturas listas'), f('Cuotas de contrato del mes', '14 emitidas'), f('Vencidas', '1 · aviso enviado')] },
    cit: { titulo: 'Citas y agenda', citas: [p('10:00', 'Visita para presupuesto · Tossa'), p('17:30', 'Revisión de caldera · Sra. Puig · reservada por WhatsApp')] },
    mat: { titulo: 'Material y almacén', filas: [f('Gas R32', 'Quedan 2 · pedir'), f('Filtros de máquinas', 'Faltan para la revisión del viernes')] },
  },
  ref: {
    nombre: 'Reformas y obras',
    tec: {
      titulo: 'Dónde está cada equipo',
      tecnicos: [
        t('Equipo de Pau', 'Obra · Lloret', [p('08:00', 'Baño completo · día 3 de 5'), p('15:00', 'Cliente nuevo · medir cocina')]),
        t('Equipo de Oriol', 'Obra · Blanes', [p('08:00', 'Reforma de local · alicatado'), p('13:00', 'Recoger material en almacén')]),
      ],
      parte: {
        titulo: 'Parte del día',
        filas: [f('Obra', 'Baño de la Sra. Vidal'), f('Horas', '2 personas · 8 h'), f('Material', 'Azulejo 30×60, cola')],
        firma: 'Conformidad del cliente en el móvil',
      },
    },
    cli: {
      titulo: 'Clientes y presupuestos',
      avisos: [
        a('Presupuesto enviado', 'hace 5 días', 'Sr. Martí', 'Cocina completa · sin respuesta', 'Toca llamar hoy', true),
        a('Obra en curso', 'día 3 de 5', 'Sra. Vidal', 'Ha añadido cambiar la ventana', 'Ampliación de presupuesto', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Certificaciones de obra', '2 listas para enviar'), f('Pendientes de cobro', '5'), f('Vencidas', '1 · aviso enviado')] },
    cit: { titulo: 'Citas y agenda', citas: [p('09:30', 'Medir cocina · Tossa'), p('18:00', 'Elegir azulejos en tienda · Sra. Vidal')] },
    mat: { titulo: 'Material y almacén', filas: [f('Azulejo 30×60', 'Faltan 4 m²'), f('Sacos de cola', 'Quedan 6')] },
  },
  tal: {
    nombre: 'Taller mecánico',
    tec: {
      titulo: 'Trabajo de cada mecánico',
      tecnicos: [
        t('Sergi', 'Elevador 1', [p('08:30', 'Seat León · aceite y filtros'), p('11:00', 'Ford Transit · frenos')]),
        t('Laia', 'Elevador 2', [p('09:00', 'Renault Clio · diagnosis'), p('12:30', 'Toyota Yaris · revisión antes de la ITV')]),
      ],
      parte: {
        titulo: 'Orden de trabajo',
        filas: [f('Vehículo', 'Ford Transit'), f('Horas', '1 h 30 min'), f('Piezas', 'Pastillas y discos delanteros')],
        firma: 'Firma del cliente al recoger',
      },
    },
    cli: {
      titulo: 'Clientes y presupuestos',
      avisos: [
        a('Presupuesto enviado', 'ayer', 'Sr. Roca', 'Cambio de embrague · esperando respuesta', 'Toca llamar hoy', true),
        a('Cliente desde 2019', '3 furgonetas', 'Repartos Costa', 'ITV de las tres en diciembre', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Coches entregados ayer', '4 facturas listas'), f('Pendientes de cobro', '3'), f('Vencidas', '1 · aviso enviado')] },
    cit: { titulo: 'Citas y agenda', citas: [p('08:00', 'Recepción · Seat León'), p('16:00', 'Cambio de neumáticos · reservada por WhatsApp')] },
    mat: { titulo: 'Piezas y almacén', filas: [f('Filtros de aceite', 'Quedan 3 · pedir'), f('Pastillas de freno', '6 juegos')] },
  },
  sal: {
    nombre: 'Fisio o clínica',
    tec: {
      titulo: 'Visitas a domicilio',
      tecnicos: [
        t('Núria', '2 domicilios · Lloret', [p('10:00', 'Sr. Ferrer · rehabilitación de rodilla'), p('12:00', 'Sra. Coll · tratamiento de espalda')]),
      ],
      parte: {
        titulo: 'Hoja de sesión',
        filas: [f('Paciente', 'Sr. Ferrer'), f('Duración', '45 min'), f('Tratamiento', 'Rodilla · sesión 4 de 10')],
        firma: 'Firma del paciente en el móvil',
      },
    },
    cli: {
      titulo: 'Pacientes y bonos',
      avisos: [
        a('Bono de 10 sesiones', 'quedan 2', 'Sra. Coll', 'Se le acaba el bono la semana que viene', 'Ofrecer renovarlo', true),
        a('Paciente desde 2022', '8 visitas', 'Sr. Ferrer', 'Revisión dentro de un mes', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Sesiones de ayer', '6 cobradas'), f('Bonos pendientes de pago', '2'), f('Facturas para mutuas', '3 por enviar')] },
    cit: { titulo: 'Citas y agenda', citas: [p('09:00', 'Primera visita · dolor cervical'), p('18:30', 'Sesión de fisioterapia · reservada por WhatsApp')] },
    mat: { titulo: 'Material', filas: [f('Vendaje neuromuscular', 'Quedan 2 rollos'), f('Agujas de punción', '1 caja · pedir')] },
  },
  est: {
    nombre: 'Peluquería y estética',
    tec: {
      titulo: 'Servicios a domicilio',
      tecnicos: [t('Clara', '1 servicio · Tossa', [p('09:00', 'Boda · peinado y maquillaje de la novia')])],
      parte: {
        titulo: 'Servicio hecho',
        filas: [f('Clienta', 'Novia · boda en Tossa'), f('Duración', '2 h 30 min'), f('Productos', 'Laca, horquillas, base')],
        firma: 'Conformidad de la clienta',
      },
    },
    cli: {
      titulo: 'Clientas y presupuestos',
      avisos: [
        a('Presupuesto enviado', 'hace 4 días', 'Boda de junio', 'Prueba de peinado sin fecha', 'Toca llamar hoy', true),
        a('Clienta desde 2020', 'cada 8 semanas', 'Sra. Pons', 'Le tocan las mechas la semana que viene', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Caja de ayer', '23 servicios'), f('Señales de bodas cobradas', '2 de 3'), f('Pendientes', '1 · aviso enviado')] },
    cit: { titulo: 'Citas y agenda', citas: [p('10:00', 'Corte y color · Sra. Pons'), p('17:00', 'Manicura · reservada por WhatsApp')] },
    mat: { titulo: 'Productos', filas: [f('Tinte 7.1', 'Quedan 2 · pedir'), f('Champú profesional', '4 botes')] },
  },
  inm: {
    nombre: 'Inmobiliaria',
    tec: {
      titulo: 'Agenda de cada agente',
      tecnicos: [
        t('Anna', '3 visitas · Lloret', [p('10:00', 'Piso en Fenals · visita con comprador'), p('12:30', 'Casa en Lloret · captación y fotos')]),
        t('Marc', '2 visitas · Blanes', [p('11:00', 'Ático en el centro · segunda visita'), p('17:00', 'Local comercial · valoración')]),
      ],
      parte: {
        titulo: 'Hoja de visita',
        filas: [f('Inmueble', 'Piso en Fenals'), f('Comprador', 'Familia Soler'), f('Interés', 'Alto · quiere ver el parking')],
        firma: 'Firma de la hoja de visita',
      },
    },
    cli: {
      titulo: 'Compradores y propietarios',
      avisos: [
        a('Oferta presentada', 'ayer', 'Familia Soler', 'Piso en Fenals · esperando al propietario', 'Llamar al propietario hoy', true),
        a('Propietario en exclusiva', 'desde 2025', 'Sr. Bosch', 'La exclusiva vence en diciembre', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Comisiones de este mes', '2 firmadas en notaría'), f('Pendientes de cobro', '1'), f('Alquileres gestionados', '18 recibos emitidos')] },
    cit: { titulo: 'Citas y agenda', citas: [p('10:00', 'Visita · piso en Fenals'), p('18:00', 'Valoración gratis · reservada por WhatsApp')] },
    mat: { titulo: 'Llaves y documentación', filas: [f('Llaves del piso de Fenals', 'Con Anna · devolver hoy'), f('Nota simple del ático', 'Pendiente de pedir')] },
  },
  ges: {
    nombre: 'Gestoría o asesoría',
    tec: {
      titulo: 'Visitas y gestiones fuera',
      tecnicos: [t('Laura', '2 salidas', [p('09:30', 'Bar Ca la Rosa · recoger facturas del trimestre'), p('12:00', 'Notaría · constitución de una SL')])],
      parte: {
        titulo: 'Hoja de encargo',
        filas: [f('Cliente', 'Bar Ca la Rosa'), f('Encargo', 'IVA del cuarto trimestre'), f('Tiempo', '1 h 15 min')],
        firma: 'Conformidad del cliente',
      },
    },
    cli: {
      titulo: 'Clientes y encargos',
      avisos: [
        a('Falta documentación', 'IVA 4T', 'Bar Ca la Rosa', 'Faltan las facturas de diciembre', 'Reclamar hoy', true),
        a('Cliente desde 2018', 'autónomo', 'Sr. Puig', 'Renta en abril', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Cuotas mensuales', '42 emitidas'), f('Pendientes de cobro', '4'), f('Devueltas por el banco', '1 · aviso enviado')] },
    cit: { titulo: 'Citas y agenda', citas: [p('09:00', 'Alta de autónomo · cliente nuevo'), p('16:30', 'Revisión de la renta · reservada por WhatsApp')] },
    mat: { titulo: 'Documentación pendiente', filas: [f('Facturas de diciembre', 'Faltan de 4 clientes'), f('Certificados digitales', '2 caducan este mes')] },
  },
  otr: {
    nombre: 'Otro',
    tec: {
      titulo: 'Ruta de cada persona',
      tecnicos: [
        t('Persona 1', '3 trabajos · Lloret', [p('09:00', 'Cliente A · trabajo programado'), p('12:00', 'Cliente B · primera visita')]),
        t('Persona 2', '2 trabajos · Blanes', [p('10:00', 'Cliente C · seguimiento'), p('16:00', 'Cliente D · entrega')]),
      ],
      parte: {
        titulo: 'Parte de trabajo',
        filas: [f('Persona', 'Persona 2'), f('Horas', '2 h'), f('Material', 'Lo que se haya usado')],
        firma: 'Firma del cliente en el móvil',
      },
    },
    cli: {
      titulo: 'Clientes y presupuestos',
      avisos: [
        a('Presupuesto enviado', 'hace 3 días', 'Cliente B', 'Sin respuesta todavía', 'Toca llamar hoy', true),
        a('Cliente desde 2022', '6 trabajos', 'Cliente A', 'Toca repetir el servicio en noviembre', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Del trabajo de ayer', '3 facturas listas'), f('Pendientes de cobro', '5'), f('Vencidas', '1 · aviso enviado')] },
    cit: { titulo: 'Citas y agenda', citas: [p('10:00', 'Cita con cliente nuevo'), p('17:00', 'Cita reservada por WhatsApp')] },
    mat: { titulo: 'Material y almacén', filas: [f('Material principal', 'Queda poco · pedir'), f('Material de uso diario', 'Suficiente para 2 semanas')] },
  },
};

const ca: Record<Sector, EjemploSector> = {
  inst: {
    nombre: 'Instal·lacions',
    tec: {
      titulo: 'Ruta de cada tècnic',
      tecnicos: [
        t('Marc', '3 visites · Lloret', [p('08:30', 'Hotel Mirador · revisió trimestral del contracte'), p('11:30', 'Bar Ca la Rosa · avaria de cambra')]),
        t('Jordi', '2 visites · Blanes', [p('09:00', 'Comunitat Carrer del Mar 8 · revisió anual'), p('12:00', 'Pis particular · instal·lació de split')]),
      ],
      parte: {
        titulo: 'Full de manteniment',
        filas: [f('Contracte', 'Hotel Mirador · revisió 3 de 4'), f('Tècnic', 'Marc · 2 h 10 min'), f('Revisat', '12 màquines · 1 amb fuita'), f('Material', 'Gas R32, filtres')],
        firma: 'Signatura del client al mòbil',
      },
    },
    cli: {
      titulo: 'Contractes de manteniment',
      avisos: [
        a('Contracte anual', '4 revisions', 'Hotel Mirador', 'Revisió d’avui · 12 màquines', 'Assignada al Marc', false),
        a('Contracte anual', '1 revisió', 'Comunitat Carrer del Mar 8', 'Venç al gener · renovar', 'Avisar el president', true),
        a('Pressupost enviat', 'fa 3 dies', 'Restaurant Es Racó', 'Contracte de manteniment · sense resposta', 'Cal trucar avui', true),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Revisions d’ahir', '3 factures llestes'), f('Quotes de contracte del mes', '14 emeses'), f('Vençudes', '1 · avís enviat')] },
    cit: { titulo: 'Cites i agenda', citas: [p('10:00', 'Visita per a pressupost · Tossa'), p('17:30', 'Revisió de caldera · Sra. Puig · reservada per WhatsApp')] },
    mat: { titulo: 'Material i magatzem', filas: [f('Gas R32', 'En queden 2 · demanar'), f('Filtres de màquines', 'Falten per a la revisió de divendres')] },
  },
  ref: {
    nombre: 'Reformes i obres',
    tec: {
      titulo: 'On és cada equip',
      tecnicos: [
        t('Equip d’en Pau', 'Obra · Lloret', [p('08:00', 'Bany complet · dia 3 de 5'), p('15:00', 'Client nou · mesurar la cuina')]),
        t('Equip de l’Oriol', 'Obra · Blanes', [p('08:00', 'Reforma de local · enrajolat'), p('13:00', 'Recollir material al magatzem')]),
      ],
      parte: {
        titulo: 'Full del dia',
        filas: [f('Obra', 'Bany de la Sra. Vidal'), f('Hores', '2 persones · 8 h'), f('Material', 'Rajola 30×60, ciment cola')],
        firma: 'Conformitat del client al mòbil',
      },
    },
    cli: {
      titulo: 'Clients i pressupostos',
      avisos: [
        a('Pressupost enviat', 'fa 5 dies', 'Sr. Martí', 'Cuina completa · sense resposta', 'Cal trucar avui', true),
        a('Obra en curs', 'dia 3 de 5', 'Sra. Vidal', 'Hi ha afegit canviar la finestra', 'Ampliació de pressupost', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Certificacions d’obra', '2 llestes per enviar'), f('Pendents de cobrament', '5'), f('Vençudes', '1 · avís enviat')] },
    cit: { titulo: 'Cites i agenda', citas: [p('09:30', 'Mesurar la cuina · Tossa'), p('18:00', 'Triar rajoles a la botiga · Sra. Vidal')] },
    mat: { titulo: 'Material i magatzem', filas: [f('Rajola 30×60', 'En falten 4 m²'), f('Sacs de ciment cola', 'En queden 6')] },
  },
  tal: {
    nombre: 'Taller mecànic',
    tec: {
      titulo: 'Feina de cada mecànic',
      tecnicos: [
        t('Sergi', 'Elevador 1', [p('08:30', 'Seat León · oli i filtres'), p('11:00', 'Ford Transit · frens')]),
        t('Laia', 'Elevador 2', [p('09:00', 'Renault Clio · diagnosi'), p('12:30', 'Toyota Yaris · revisió abans de l’ITV')]),
      ],
      parte: {
        titulo: 'Ordre de treball',
        filas: [f('Vehicle', 'Ford Transit'), f('Hores', '1 h 30 min'), f('Peces', 'Pastilles i discos davanters')],
        firma: 'Signatura del client en recollir-lo',
      },
    },
    cli: {
      titulo: 'Clients i pressupostos',
      avisos: [
        a('Pressupost enviat', 'ahir', 'Sr. Roca', 'Canvi d’embragatge · esperant resposta', 'Cal trucar avui', true),
        a('Client des del 2019', '3 furgonetes', 'Repartos Costa', 'ITV de les tres al desembre', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Cotxes lliurats ahir', '4 factures llestes'), f('Pendents de cobrament', '3'), f('Vençudes', '1 · avís enviat')] },
    cit: { titulo: 'Cites i agenda', citas: [p('08:00', 'Recepció · Seat León'), p('16:00', 'Canvi de pneumàtics · reservada per WhatsApp')] },
    mat: { titulo: 'Peces i magatzem', filas: [f('Filtres d’oli', 'En queden 3 · demanar'), f('Pastilles de fre', '6 jocs')] },
  },
  sal: {
    nombre: 'Fisio o clínica',
    tec: {
      titulo: 'Visites a domicili',
      tecnicos: [
        t('Núria', '2 domicilis · Lloret', [p('10:00', 'Sr. Ferrer · rehabilitació de genoll'), p('12:00', 'Sra. Coll · tractament d’esquena')]),
      ],
      parte: {
        titulo: 'Full de sessió',
        filas: [f('Pacient', 'Sr. Ferrer'), f('Durada', '45 min'), f('Tractament', 'Genoll · sessió 4 de 10')],
        firma: 'Signatura del pacient al mòbil',
      },
    },
    cli: {
      titulo: 'Pacients i bons',
      avisos: [
        a('Bo de 10 sessions', 'en queden 2', 'Sra. Coll', 'Se li acaba el bo la setmana que ve', 'Oferir-li renovar-lo', true),
        a('Pacient des del 2022', '8 visites', 'Sr. Ferrer', 'Revisió d’aquí a un mes', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Sessions d’ahir', '6 cobrades'), f('Bons pendents de pagament', '2'), f('Factures per a mútues', '3 per enviar')] },
    cit: { titulo: 'Cites i agenda', citas: [p('09:00', 'Primera visita · dolor cervical'), p('18:30', 'Sessió de fisioteràpia · reservada per WhatsApp')] },
    mat: { titulo: 'Material', filas: [f('Embenatge neuromuscular', 'En queden 2 rotllos'), f('Agulles de punció', '1 capsa · demanar')] },
  },
  est: {
    nombre: 'Perruqueria i estètica',
    tec: {
      titulo: 'Serveis a domicili',
      tecnicos: [t('Clara', '1 servei · Tossa', [p('09:00', 'Casament · pentinat i maquillatge de la núvia')])],
      parte: {
        titulo: 'Servei fet',
        filas: [f('Clienta', 'Núvia · casament a Tossa'), f('Durada', '2 h 30 min'), f('Productes', 'Laca, forquetes, base')],
        firma: 'Conformitat de la clienta',
      },
    },
    cli: {
      titulo: 'Clientes i pressupostos',
      avisos: [
        a('Pressupost enviat', 'fa 4 dies', 'Casament de juny', 'Prova de pentinat sense data', 'Cal trucar avui', true),
        a('Clienta des del 2020', 'cada 8 setmanes', 'Sra. Pons', 'Li toquen les metxes la setmana que ve', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Caixa d’ahir', '23 serveis'), f('Paga i senyal de casaments', '2 de 3'), f('Pendents', '1 · avís enviat')] },
    cit: { titulo: 'Cites i agenda', citas: [p('10:00', 'Tall i color · Sra. Pons'), p('17:00', 'Manicura · reservada per WhatsApp')] },
    mat: { titulo: 'Productes', filas: [f('Tint 7.1', 'En queden 2 · demanar'), f('Xampú professional', '4 pots')] },
  },
  inm: {
    nombre: 'Immobiliària',
    tec: {
      titulo: 'Agenda de cada agent',
      tecnicos: [
        t('Anna', '3 visites · Lloret', [p('10:00', 'Pis a Fenals · visita amb comprador'), p('12:30', 'Casa a Lloret · captació i fotos')]),
        t('Marc', '2 visites · Blanes', [p('11:00', 'Àtic al centre · segona visita'), p('17:00', 'Local comercial · valoració')]),
      ],
      parte: {
        titulo: 'Full de visita',
        filas: [f('Immoble', 'Pis a Fenals'), f('Comprador', 'Família Soler'), f('Interès', 'Alt · vol veure el pàrquing')],
        firma: 'Signatura del full de visita',
      },
    },
    cli: {
      titulo: 'Compradors i propietaris',
      avisos: [
        a('Oferta presentada', 'ahir', 'Família Soler', 'Pis a Fenals · esperant el propietari', 'Trucar al propietari avui', true),
        a('Propietari en exclusiva', 'des del 2025', 'Sr. Bosch', 'L’exclusiva venç al desembre', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Comissions d’aquest mes', '2 signades a la notaria'), f('Pendents de cobrament', '1'), f('Lloguers gestionats', '18 rebuts emesos')] },
    cit: { titulo: 'Cites i agenda', citas: [p('10:00', 'Visita · pis a Fenals'), p('18:00', 'Valoració gratuïta · reservada per WhatsApp')] },
    mat: { titulo: 'Claus i documentació', filas: [f('Claus del pis de Fenals', 'Les té l’Anna · tornar-les avui'), f('Nota simple de l’àtic', 'Pendent de demanar')] },
  },
  ges: {
    nombre: 'Gestoria o assessoria',
    tec: {
      titulo: 'Visites i gestions fora',
      tecnicos: [t('Laura', '2 sortides', [p('09:30', 'Bar Ca la Rosa · recollir factures del trimestre'), p('12:00', 'Notaria · constitució d’una SL')])],
      parte: {
        titulo: 'Full d’encàrrec',
        filas: [f('Client', 'Bar Ca la Rosa'), f('Encàrrec', 'IVA del quart trimestre'), f('Temps', '1 h 15 min')],
        firma: 'Conformitat del client',
      },
    },
    cli: {
      titulo: 'Clients i encàrrecs',
      avisos: [
        a('Falta documentació', 'IVA 4T', 'Bar Ca la Rosa', 'Falten les factures de desembre', 'Reclamar-les avui', true),
        a('Client des del 2018', 'autònom', 'Sr. Puig', 'Renda a l’abril', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Quotes mensuals', '42 emeses'), f('Pendents de cobrament', '4'), f('Retornades pel banc', '1 · avís enviat')] },
    cit: { titulo: 'Cites i agenda', citas: [p('09:00', 'Alta d’autònom · client nou'), p('16:30', 'Revisió de la renda · reservada per WhatsApp')] },
    mat: { titulo: 'Documentació pendent', filas: [f('Factures de desembre', 'Falten de 4 clients'), f('Certificats digitals', '2 caduquen aquest mes')] },
  },
  otr: {
    nombre: 'Un altre',
    tec: {
      titulo: 'Ruta de cada persona',
      tecnicos: [
        t('Persona 1', '3 feines · Lloret', [p('09:00', 'Client A · feina programada'), p('12:00', 'Client B · primera visita')]),
        t('Persona 2', '2 feines · Blanes', [p('10:00', 'Client C · seguiment'), p('16:00', 'Client D · lliurament')]),
      ],
      parte: {
        titulo: 'Full de feina',
        filas: [f('Persona', 'Persona 2'), f('Hores', '2 h'), f('Material', 'El que s’hagi fet servir')],
        firma: 'Signatura del client al mòbil',
      },
    },
    cli: {
      titulo: 'Clients i pressupostos',
      avisos: [
        a('Pressupost enviat', 'fa 3 dies', 'Client B', 'Encara sense resposta', 'Cal trucar avui', true),
        a('Client des del 2022', '6 feines', 'Client A', 'Toca repetir el servei al novembre', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('De la feina d’ahir', '3 factures llestes'), f('Pendents de cobrament', '5'), f('Vençudes', '1 · avís enviat')] },
    cit: { titulo: 'Cites i agenda', citas: [p('10:00', 'Cita amb un client nou'), p('17:00', 'Cita reservada per WhatsApp')] },
    mat: { titulo: 'Material i magatzem', filas: [f('Material principal', 'En queda poc · demanar'), f('Material d’ús diari', 'N’hi ha per a 2 setmanes')] },
  },
};

const en: Record<Sector, EjemploSector> = {
  inst: {
    nombre: 'Installations',
    tec: {
      titulo: 'Each technician’s route',
      tecnicos: [
        t('Marc', '3 visits · Lloret', [p('08:30', 'Hotel Mirador · quarterly contract service'), p('11:30', 'Bar Ca la Rosa · cold room breakdown')]),
        t('Jordi', '2 visits · Blanes', [p('09:00', 'Carrer del Mar 8 residents’ association · annual service'), p('12:00', 'Private flat · split unit installation')]),
      ],
      parte: {
        titulo: 'Maintenance report',
        filas: [f('Contract', 'Hotel Mirador · service 3 of 4'), f('Technician', 'Marc · 2 h 10 min'), f('Checked', '12 units · 1 leaking'), f('Materials', 'R32 gas, filters')],
        firma: 'Customer signs on the phone',
      },
    },
    cli: {
      titulo: 'Maintenance contracts',
      avisos: [
        a('Annual contract', '4 services', 'Hotel Mirador', 'Today’s service · 12 units', 'Assigned to Marc', false),
        a('Annual contract', '1 service', 'Carrer del Mar 8 residents’ association', 'Expires in January · renew', 'Let the chairman know', true),
        a('Quote sent', '3 days ago', 'Es Racó restaurant', 'Maintenance contract · no reply', 'Call today', true),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Yesterday’s services', '3 invoices ready'), f('Contract fees this month', '14 issued'), f('Overdue', '1 · reminder sent')] },
    cit: { titulo: 'Appointments', citas: [p('10:00', 'Visit for a quote · Tossa'), p('17:30', 'Boiler service · Mrs. Puig · booked on WhatsApp')] },
    mat: { titulo: 'Materials and stock', filas: [f('R32 gas', '2 left · reorder'), f('Unit filters', 'Short for Friday’s service')] },
  },
  ref: {
    nombre: 'Renovation and building',
    tec: {
      titulo: 'Where each crew is',
      tecnicos: [
        t('Pau’s crew', 'Site · Lloret', [p('08:00', 'Full bathroom · day 3 of 5'), p('15:00', 'New customer · measure kitchen')]),
        t('Oriol’s crew', 'Site · Blanes', [p('08:00', 'Shop refit · tiling'), p('13:00', 'Pick up materials at the warehouse')]),
      ],
      parte: {
        titulo: 'Daily report',
        filas: [f('Job', 'Mrs. Vidal’s bathroom'), f('Hours', '2 people · 8 h'), f('Materials', '30×60 tiles, tile adhesive')],
        firma: 'Customer approves on the phone',
      },
    },
    cli: {
      titulo: 'Customers and quotes',
      avisos: [
        a('Quote sent', '5 days ago', 'Mr. Martí', 'Full kitchen · no reply', 'Call today', true),
        a('Job in progress', 'day 3 of 5', 'Mrs. Vidal', 'Has added replacing the window', 'Extend the quote', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Progress invoices', '2 ready to send'), f('Awaiting payment', '5'), f('Overdue', '1 · reminder sent')] },
    cit: { titulo: 'Appointments', citas: [p('09:30', 'Measure kitchen · Tossa'), p('18:00', 'Choose tiles at the shop · Mrs. Vidal')] },
    mat: { titulo: 'Materials and stock', filas: [f('30×60 tiles', '4 m² short'), f('Bags of adhesive', '6 left')] },
  },
  tal: {
    nombre: 'Car repair shop',
    tec: {
      titulo: 'Each mechanic’s work',
      tecnicos: [
        t('Sergi', 'Lift 1', [p('08:30', 'Seat León · oil and filters'), p('11:00', 'Ford Transit · brakes')]),
        t('Laia', 'Lift 2', [p('09:00', 'Renault Clio · diagnostics'), p('12:30', 'Toyota Yaris · pre-MOT check')]),
      ],
      parte: {
        titulo: 'Work order',
        filas: [f('Vehicle', 'Ford Transit'), f('Hours', '1 h 30 min'), f('Parts', 'Front pads and discs')],
        firma: 'Customer signs on pickup',
      },
    },
    cli: {
      titulo: 'Customers and quotes',
      avisos: [
        a('Quote sent', 'yesterday', 'Mr. Roca', 'Clutch replacement · awaiting reply', 'Call today', true),
        a('Customer since 2019', '3 vans', 'Repartos Costa', 'All three due for MOT in December', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Cars handed back yesterday', '4 invoices ready'), f('Awaiting payment', '3'), f('Overdue', '1 · reminder sent')] },
    cit: { titulo: 'Appointments', citas: [p('08:00', 'Check-in · Seat León'), p('16:00', 'Tyre change · booked on WhatsApp')] },
    mat: { titulo: 'Parts and stock', filas: [f('Oil filters', '3 left · reorder'), f('Brake pads', '6 sets')] },
  },
  sal: {
    nombre: 'Physio or clinic',
    tec: {
      titulo: 'Home visits',
      tecnicos: [
        t('Núria', '2 home visits · Lloret', [p('10:00', 'Mr. Ferrer · knee rehab'), p('12:00', 'Mrs. Coll · back treatment')]),
      ],
      parte: {
        titulo: 'Session sheet',
        filas: [f('Patient', 'Mr. Ferrer'), f('Length', '45 min'), f('Treatment', 'Knee · session 4 of 10')],
        firma: 'Patient signs on the phone',
      },
    },
    cli: {
      titulo: 'Patients and session packs',
      avisos: [
        a('10-session pack', '2 left', 'Mrs. Coll', 'Her pack runs out next week', 'Offer a renewal', true),
        a('Patient since 2022', '8 visits', 'Mr. Ferrer', 'Check-up in a month', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Yesterday’s sessions', '6 paid'), f('Packs awaiting payment', '2'), f('Insurer invoices', '3 to send')] },
    cit: { titulo: 'Appointments', citas: [p('09:00', 'First visit · neck pain'), p('18:30', 'Physio session · booked on WhatsApp')] },
    mat: { titulo: 'Supplies', filas: [f('Kinesiology tape', '2 rolls left'), f('Dry needling needles', '1 box · reorder')] },
  },
  est: {
    nombre: 'Hair and beauty',
    tec: {
      titulo: 'Home services',
      tecnicos: [t('Clara', '1 service · Tossa', [p('09:00', 'Wedding · bride’s hair and make-up')])],
      parte: {
        titulo: 'Service done',
        filas: [f('Client', 'Bride · wedding in Tossa'), f('Length', '2 h 30 min'), f('Products', 'Hairspray, pins, foundation')],
        firma: 'Client approval',
      },
    },
    cli: {
      titulo: 'Clients and quotes',
      avisos: [
        a('Quote sent', '4 days ago', 'June wedding', 'Hair trial not booked yet', 'Call today', true),
        a('Client since 2020', 'every 8 weeks', 'Mrs. Pons', 'Due for highlights next week', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Yesterday’s till', '23 services'), f('Wedding deposits paid', '2 of 3'), f('Outstanding', '1 · reminder sent')] },
    cit: { titulo: 'Appointments', citas: [p('10:00', 'Cut and colour · Mrs. Pons'), p('17:00', 'Manicure · booked on WhatsApp')] },
    mat: { titulo: 'Products', filas: [f('Dye 7.1', '2 left · reorder'), f('Salon shampoo', '4 bottles')] },
  },
  inm: {
    nombre: 'Real estate',
    tec: {
      titulo: 'Each agent’s diary',
      tecnicos: [
        t('Anna', '3 viewings · Lloret', [p('10:00', 'Flat in Fenals · viewing with buyer'), p('12:30', 'House in Lloret · new listing and photos')]),
        t('Marc', '2 viewings · Blanes', [p('11:00', 'Penthouse in the centre · second viewing'), p('17:00', 'Retail unit · valuation')]),
      ],
      parte: {
        titulo: 'Viewing sheet',
        filas: [f('Property', 'Flat in Fenals'), f('Buyer', 'Soler family'), f('Interest', 'High · wants to see the parking')],
        firma: 'Viewing sheet signed',
      },
    },
    cli: {
      titulo: 'Buyers and owners',
      avisos: [
        a('Offer made', 'yesterday', 'Soler family', 'Flat in Fenals · waiting for the owner', 'Call the owner today', true),
        a('Exclusive listing', 'since 2025', 'Mr. Bosch', 'Exclusivity ends in December', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Commissions this month', '2 signed at the notary'), f('Awaiting payment', '1'), f('Managed rentals', '18 receipts issued')] },
    cit: { titulo: 'Appointments', citas: [p('10:00', 'Viewing · flat in Fenals'), p('18:00', 'Free valuation · booked on WhatsApp')] },
    mat: { titulo: 'Keys and paperwork', filas: [f('Keys to the Fenals flat', 'Anna has them · return today'), f('Land registry extract for the penthouse', 'Still to request')] },
  },
  ges: {
    nombre: 'Accounting or advisory',
    tec: {
      titulo: 'Visits and errands',
      tecnicos: [t('Laura', '2 trips out', [p('09:30', 'Bar Ca la Rosa · collect quarterly invoices'), p('12:00', 'Notary · setting up an SL company')])],
      parte: {
        titulo: 'Job sheet',
        filas: [f('Client', 'Bar Ca la Rosa'), f('Job', 'Fourth-quarter VAT'), f('Time', '1 h 15 min')],
        firma: 'Client approval',
      },
    },
    cli: {
      titulo: 'Clients and jobs',
      avisos: [
        a('Missing paperwork', 'Q4 VAT', 'Bar Ca la Rosa', 'December invoices missing', 'Chase today', true),
        a('Client since 2018', 'self-employed', 'Mr. Puig', 'Income tax in April', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Monthly fees', '42 issued'), f('Awaiting payment', '4'), f('Returned by the bank', '1 · reminder sent')] },
    cit: { titulo: 'Appointments', citas: [p('09:00', 'Self-employed registration · new client'), p('16:30', 'Income tax review · booked on WhatsApp')] },
    mat: { titulo: 'Pending paperwork', filas: [f('December invoices', 'Missing from 4 clients'), f('Digital certificates', '2 expire this month')] },
  },
  otr: {
    nombre: 'Other',
    tec: {
      titulo: 'Each person’s route',
      tecnicos: [
        t('Person 1', '3 jobs · Lloret', [p('09:00', 'Customer A · scheduled job'), p('12:00', 'Customer B · first visit')]),
        t('Person 2', '2 jobs · Blanes', [p('10:00', 'Customer C · follow-up'), p('16:00', 'Customer D · delivery')]),
      ],
      parte: {
        titulo: 'Job report',
        filas: [f('Person', 'Person 2'), f('Hours', '2 h'), f('Materials', 'Whatever was used')],
        firma: 'Customer signs on the phone',
      },
    },
    cli: {
      titulo: 'Customers and quotes',
      avisos: [
        a('Quote sent', '3 days ago', 'Customer B', 'No reply yet', 'Call today', true),
        a('Customer since 2022', '6 jobs', 'Customer A', 'Service due again in November', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('From yesterday’s work', '3 invoices ready'), f('Awaiting payment', '5'), f('Overdue', '1 · reminder sent')] },
    cit: { titulo: 'Appointments', citas: [p('10:00', 'Appointment with a new customer'), p('17:00', 'Appointment booked on WhatsApp')] },
    mat: { titulo: 'Materials and stock', filas: [f('Main material', 'Running low · reorder'), f('Everyday supplies', 'Enough for 2 weeks')] },
  },
};

export const EJEMPLOS: Record<Locale, Record<Sector, EjemploSector>> = { es, ca, en };

export function esSector(valor: unknown): valor is Sector {
  return typeof valor === 'string' && (SECTORES as readonly string[]).includes(valor);
}

export function esParte(valor: unknown): valor is Parte {
  return typeof valor === 'string' && (PARTES as readonly string[]).includes(valor);
}

export function esComo(valor: unknown): valor is Como {
  return typeof valor === 'string' && (COMO as readonly string[]).includes(valor);
}
