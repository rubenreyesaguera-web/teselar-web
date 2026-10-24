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

// Las cajas del panel que llevan «Como funciona» y «Te ahorras» (los textos comunes estan en el diccionario).
export type Caja = 'tec' | 'parte' | 'cli' | 'fac' | 'cit' | 'mat';
export interface Explicacion { como: string; ahorro: string }

export interface EjemploSector {
  nombre: string;
  // Los textos de este sector (opcion B del ensayo del 24/10, doc 32): cada caja dice que se puede hacer y a quien le
  // llega. La demo sirve para todo el catalogo, no solo para el 09: el producto lo decide Ruben al leer la reserva.
  // «Otro» no lleva: usa los comunes del diccionario.
  explica?: Partial<Record<Caja, Partial<Explicacion>>>;
  tec: { titulo: string; tecnicos: Tecnico[]; parte: { titulo: string; filas: Fila[]; firma: string } };
  cli: { titulo: string; avisos: Aviso[] };
  fac: { titulo: string; filas: Fila[] };
  cit: { titulo: string; citas: Parada[] };
  mat: { titulo: string; filas: Fila[] };
}

// El orden de «¿Que llevas?» segun el sector elegido: lo suyo primero. Sin sector, empieza por clientes, que lleva
// todo el mundo; con «Tecnicos» primero, los que no son instaladores creian que la pagina no era para ellos (24/10).
export const ORDEN_INICIAL: readonly Parte[] = ['cli', 'fac', 'cit', 'tec', 'mat'];
export const ORDEN_PARTES: Record<Sector, readonly Parte[]> = {
  inst: ['tec', 'cli', 'fac', 'mat', 'cit'],
  ref: ['tec', 'cli', 'fac', 'mat', 'cit'],
  tal: ['cli', 'fac', 'mat', 'cit', 'tec'],
  sal: ['cit', 'cli', 'fac', 'tec', 'mat'],
  est: ['cit', 'cli', 'fac', 'mat', 'tec'],
  inm: ['cli', 'cit', 'fac', 'tec', 'mat'],
  ges: ['cli', 'fac', 'cit', 'tec', 'mat'],
  otr: ORDEN_INICIAL,
};

const p = (hora: string, texto: string): Parada => ({ hora, texto });
const f = (etiqueta: string, valor: string): Fila => ({ etiqueta, valor });
const t = (nombre: string, resumen: string, paradas: Parada[]): Tecnico => ({ nombre, resumen, paradas });
const a = (tipo: string, cuando: string, cliente: string, detalle: string, siguiente: string, urgente: boolean): Aviso =>
  ({ tipo, cuando, cliente, detalle, siguiente, urgente });

const es: Record<Sector, EjemploSector> = {
  inst: {
    nombre: 'Instalaciones',
    explica: {
      tec: { como: 'Asignas cada aviso desde el móvil, estés donde estés, y cada técnico ve en el suyo a dónde va, qué tiene que hacer y el historial de esa instalación.', ahorro: 'Repartir el trabajo por teléfono a primera hora y los cambios que se pierden en el grupo de WhatsApp.' },
      parte: { como: 'El técnico apunta en el móvil las horas, el material y las fotos, y el cliente firma en la pantalla. Te llega a ti en cuanto hay cobertura.', ahorro: 'Pasar a limpio partes de papel y buscar fotos y horas en el grupo de WhatsApp.' },
      cli: { como: 'Cada cliente con sus instalaciones, sus avisos y su contrato de mantenimiento. Te avisa a ti de las revisiones que tocan y de los contratos que vencen.', ahorro: 'Las revisiones que se pasan, los contratos que vencen sin renovar y los presupuestos que nadie volvió a llamar.' },
      fac: { como: 'La factura sale del parte, sin volver a escribirlo, y las cuotas de los contratos se emiten cada mes. Ves de un vistazo qué falta por cobrar.', ahorro: 'Hacer las facturas a mano copiando lo que ya te mandaron y los cobros que nadie reclama.' },
      cit: { como: 'Las visitas para presupuesto y las revisiones en una agenda que ve todo el equipo. Al cliente le puede llegar un recordatorio el día antes, por WhatsApp o por correo.', ahorro: 'Visitas apuntadas en varios sitios y clientes que no están en casa cuando llega el técnico.' },
      mat: { como: 'Sabes qué material hay en el almacén y en cada furgoneta, y te avisa a ti antes de que falte, con el pedido preparado para enviarlo.', ahorro: 'Que el técnico llegue sin la pieza y los viajes de más al proveedor.' },
    },
    tec: {
      titulo: 'Ruta de cada técnico',
      tecnicos: [
        t('Marc', '2 visitas · Lloret', [p('08:00', 'Bar Ca la Rosa · avería de cámara'), p('11:30', 'Hotel Mirador · revisión trimestral del contrato')]),
        t('Jordi', '2 visitas · Blanes', [p('09:00', 'Comunidad Carrer del Mar 8 · revisión anual'), p('12:00', 'Piso particular · instalación de split')]),
      ],
      parte: {
        titulo: 'Parte de trabajo',
        filas: [f('Aviso', 'Bar Ca la Rosa · avería de cámara'), f('Técnico', 'Marc · 1 h 40 min'), f('Hecho', 'Ventilador cambiado · cámara a 2 °C'), f('Material', 'Ventilador, gas R32')],
        firma: 'Firma del cliente en el móvil',
      },
    },
    cli: {
      titulo: 'Avisos y contratos',
      avisos: [
        a('Aviso urgente', 'esta mañana', 'Bar Ca la Rosa', 'Avería de cámara · resuelta por Marc', 'Facturar hoy', true),
        a('Contrato anual', '4 revisiones', 'Hotel Mirador', 'Revisión de hoy · 12 máquinas', 'Asignada a Marc', false),
        a('Contrato anual', '1 revisión', 'Comunidad Carrer Major 3', 'Vence en enero · renovar', 'Avisar al presidente', true),
        a('Presupuesto enviado', 'hace 3 días', 'Restaurante Es Racó', 'Contrato de mantenimiento · sin respuesta', 'Toca llamar hoy', true),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Avisos y revisiones de ayer', '3 facturas listas'), f('Cuotas de contrato del mes', '14 emitidas'), f('Vencidas', '1 · aviso enviado')] },
    cit: { titulo: 'Citas y agenda', citas: [p('10:00', 'Visita para presupuesto · Tossa'), p('17:30', 'Revisión de caldera · Sra. Puig · reservada por WhatsApp')] },
    mat: { titulo: 'Material y almacén', filas: [f('Gas R32', 'Quedan 2 · pedir'), f('Filtros de máquinas', 'Faltan para la revisión del viernes')] },
  },
  ref: {
    nombre: 'Reformas y obras',
    explica: {
      tec: { como: 'Cada equipo ve en el móvil en qué obra está hoy y qué toca hacer; si cambias algo, les llega al momento.', ahorro: 'Las llamadas de primera hora para repartir los equipos y los cambios que se pierden en el WhatsApp.' },
      parte: { como: 'El encargado apunta en el móvil las horas de cada persona y el material de la obra, aunque no haya cobertura; te llega en cuanto la hay.', ahorro: 'Perseguir horas a final de semana y no saber cuánto se ha ido en cada obra.' },
      cli: { como: 'Cada cliente con su obra, su presupuesto y los extras que va pidiendo. Te avisa a ti de los presupuestos que siguen sin respuesta.', ahorro: 'Los presupuestos que se enfrían y los extras que se hacen y nunca se cobran.' },
      fac: { como: 'Las certificaciones y las facturas salen de lo que se ha hecho en la obra, con los extras incluidos, y ves qué falta por cobrar.', ahorro: 'Calcular a mano qué facturar cada mes y los cobros que se quedan sin reclamar.' },
      cit: { como: 'Las visitas para medir y las citas en tienda en una agenda común; al cliente le puede llegar un recordatorio el día antes.', ahorro: 'Visitas que se solapan con la obra y clientes que se olvidan de la cita.' },
      mat: { como: 'Sabes qué material hay para cada obra y qué falta, y te avisa a ti antes de que te quedes corto.', ahorro: 'Parar una obra por falta de material y los viajes de más al almacén.' },
    },
    tec: {
      titulo: 'Dónde está cada equipo',
      tecnicos: [
        t('Equipo de Pau', 'Obra · Lloret', [p('08:00', 'Baño completo · día 3 de 5'), p('15:00', 'Cliente nuevo · medir cocina')]),
        t('Equipo de Oriol', 'Obra · Blanes', [p('08:00', 'Reforma de local · alicatado'), p('13:00', 'Recoger material en almacén')]),
      ],
      parte: {
        titulo: 'Parte del día',
        filas: [f('Obra', 'Baño de la Sra. Vidal'), f('Horas', '2 personas · 6 h'), f('Material', 'Azulejo 30×60, cola')],
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
    explica: {
      tec: { como: 'Cada mecánico ve en su pantalla qué coche tiene en el elevador y qué le toca después.', ahorro: 'Ir preguntando quién está con qué coche y los trabajos que se quedan a medias sin que nadie lo sepa.' },
      parte: { como: 'La orden de trabajo recoge las horas y las piezas mientras se trabaja, y el cliente firma al recoger el coche.', ahorro: 'Rehacer a mano lo que se ha hecho en cada coche para poder facturarlo.' },
      cli: { como: 'Cada coche por su matrícula, con su historial, sus presupuestos y lo que le toca después. Al cliente le puede llegar el aviso de la revisión o de la ITV.', ahorro: 'Los presupuestos que se enfrían y las revisiones e ITV que se pasan sin que nadie avise.' },
      fac: { como: 'La factura sale de la orden de trabajo al entregar el coche, sin volver a escribirla, y ves qué falta por cobrar.', ahorro: 'Pasar las órdenes al Excel para facturar y los cobros que se olvidan.' },
      cit: { como: 'Las citas del taller en una agenda por elevador; las que te piden por WhatsApp pueden entrar solas.', ahorro: 'Coches que llegan sin cita a la vez y huecos que se quedan vacíos.' },
      mat: { como: 'Sabes qué piezas tienes y cuáles se acaban; te avisa a ti antes de que falten y te deja el pedido preparado para enviarlo.', ahorro: 'Quedarte sin la pieza con el coche en el elevador y los pedidos hechos a última hora.' },
    },
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
      titulo: 'Coches y presupuestos',
      avisos: [
        a('Presupuesto enviado', 'ayer', 'Peugeot 308 · 1234 KLM', 'Sr. Roca · cambio de embrague · esperando respuesta', 'Toca llamar hoy', true),
        a('Revisión anual', 'hace 11 meses', 'Renault Clio · 5678 LMN', 'Sra. Serra · le toca la revisión', 'Recordatorio programado', false),
        a('ITV', 'en diciembre', 'Repartos Costa · 3 furgonetas', 'Las tres pasan la ITV el mismo mes', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Coches entregados ayer', '4 facturas listas'), f('Pendientes de cobro', '3'), f('Vencidas', '1 · aviso enviado')] },
    cit: { titulo: 'Citas y agenda', citas: [p('08:00', 'Recepción · Seat León'), p('16:00', 'Cambio de neumáticos · reservada por WhatsApp')] },
    mat: { titulo: 'Piezas y almacén', filas: [f('Filtros de aceite', 'Quedan 3 · pedir'), f('Pastillas de freno', '6 juegos')] },
  },
  sal: {
    nombre: 'Fisio o clínica',
    explica: {
      tec: { como: 'Las visitas a domicilio de cada fisio en su móvil, con la dirección y lo que toca en cada sesión.', ahorro: 'Coordinar por teléfono quién va a cada casa y las visitas que se solapan.' },
      parte: { como: 'Al acabar la sesión se apunta en el móvil lo que se ha hecho y el paciente firma. Queda en su historial.', ahorro: 'Pasar a limpio las notas de cada sesión al final del día.' },
      cli: { como: 'Cada paciente con su historial, sus bonos y sus revisiones, y solo lo ve quien tú decidas. Te avisa a ti de los bonos que se acaban.', ahorro: 'Los bonos que se acaban sin que nadie lo comente y las revisiones que se pasan.' },
      fac: { como: 'Las sesiones y los bonos se cobran desde el mismo sitio, y las facturas para las mutuas salen de las sesiones hechas.', ahorro: 'Preparar a mano las facturas de las mutuas y los bonos pendientes de pago.' },
      cit: { como: 'Una agenda para todos los fisios; las citas que te piden por WhatsApp pueden entrar solas, y al paciente le llega un recordatorio el día antes.', ahorro: 'Citas apuntadas en varios sitios y pacientes que se olvidan de venir.' },
      mat: { como: 'Sabes qué material de consulta queda y te avisa a ti antes de que se acabe.', ahorro: 'Quedarte sin vendaje o sin agujas a media semana.' },
    },
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
        a('Bono de 10 sesiones', 'quedan 2', 'Sra. Coll', 'Se le acaba el bono la semana que viene', 'Comentarlo en su próxima sesión', true),
        a('Paciente desde 2022', '8 visitas', 'Sr. Ferrer', 'Revisión dentro de un mes', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Sesiones de ayer', '6 cobradas'), f('Bonos pendientes de pago', '2'), f('Facturas para mutuas', '3 por enviar')] },
    cit: { titulo: 'Citas y agenda', citas: [p('09:00', 'Primera visita · dolor cervical'), p('18:30', 'Sesión de fisioterapia · reservada por WhatsApp')] },
    mat: { titulo: 'Material', filas: [f('Vendaje neuromuscular', 'Quedan 2 rollos'), f('Agujas de punción', '1 caja · pedir')] },
  },
  est: {
    nombre: 'Peluquería y estética',
    explica: {
      tec: { como: 'Los servicios fuera del salón, como bodas o eventos, con su hora, su sitio y quién va.', ahorro: 'Organizar por WhatsApp quién va a cada boda y con qué.' },
      parte: { como: 'Al acabar se apunta lo que se ha hecho y los productos usados, y la clienta da su conformidad.', ahorro: 'Recordar de memoria qué se hizo y qué se gastó en cada servicio.' },
      cli: { como: 'Cada clienta con su historial (el tinte, el corte, lo que le va bien) y lo que le toca después. Te avisa a ti de las clientas a las que les toca volver.', ahorro: 'Apuntar en la libreta el color de cada clienta y las que dejan de venir sin que te des cuenta.' },
      fac: { como: 'La caja del día, las señales de las bodas y lo que queda pendiente, en el mismo sitio.', ahorro: 'Cuadrar la caja a mano y las señales que nadie recuerda haber cobrado.' },
      cit: { como: 'Una agenda para el salón; las citas que te piden por WhatsApp pueden entrar solas y a la clienta le llega un recordatorio el día antes, sin que lo mandes tú.', ahorro: 'Pasarte el día de descanso contestando y mandando recordatorios uno a uno.' },
      mat: { como: 'Sabes qué tintes y productos quedan y te avisa antes de que se acaben.', ahorro: 'Quedarte sin el tinte de una clienta el día de su cita.' },
    },
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
    explica: {
      tec: { como: 'Las visitas y las captaciones de cada agente en su móvil, con el inmueble y el comprador.', ahorro: 'Coordinar por WhatsApp quién enseña cada piso y las visitas que se solapan.' },
      parte: { como: 'Al acabar la visita se apunta en el móvil el interés del comprador y lo que ha pedido, y el comprador firma la hoja de visita.', ahorro: 'Recordar de memoria qué dijo cada comprador y las hojas de visita en papel.' },
      cli: { como: 'Cada comprador con lo que busca, su idioma y sus visitas; cada propietario con su inmueble y su exclusiva. Los contactos de los portales pueden entrar solos.', ahorro: 'Los compradores que se enfrían porque nadie volvió a llamar y las exclusivas que vencen sin renovar.' },
      fac: { como: 'Las comisiones de cada venta y los recibos de los alquileres gestionados, y ves qué falta por cobrar.', ahorro: 'Llevar las comisiones y los alquileres en hojas distintas y los recibos que nadie reclama.' },
      cit: { como: 'Las visitas y las valoraciones en una agenda común; al comprador le llega un recordatorio el día antes, en su idioma.', ahorro: 'Visitas que se solapan y compradores que no se presentan.' },
      mat: { como: 'Sabes quién tiene las llaves de cada inmueble y qué documentación falta, y te avisa a ti antes de la firma.', ahorro: 'Buscar llaves que no aparecen y descubrir el día de la firma que falta un papel.' },
    },
    tec: {
      titulo: 'Agenda de cada agente',
      tecnicos: [
        t('Anna', '2 visitas · Lloret', [p('10:00', 'Piso en Fenals · visita con comprador'), p('12:30', 'Casa en Lloret · captación y fotos')]),
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
        a('Propietario en exclusiva', 'desde julio', 'Sr. Bosch', 'La exclusiva vence en diciembre', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Comisiones de este mes', '2 firmadas en notaría'), f('Pendientes de cobro', '1'), f('Alquileres gestionados', '18 recibos emitidos')] },
    cit: { titulo: 'Citas y agenda', citas: [p('10:00', 'Visita · piso en Fenals'), p('18:00', 'Valoración gratis · reservada por WhatsApp')] },
    mat: { titulo: 'Llaves y documentación', filas: [f('Llaves del piso de Fenals', 'Con Anna · devolver hoy'), f('Nota simple del ático', 'Pendiente de pedir')] },
  },
  ges: {
    nombre: 'Gestoría o asesoría',
    explica: {
      tec: { como: 'Las salidas del despacho (recoger papeles, la notaría, Hacienda) con su hora y quién va.', ahorro: 'Coordinar las salidas por teléfono y los recados que se quedan sin hacer.' },
      parte: { como: 'Cada encargo con el tiempo dedicado y lo que se ha hecho, para saber qué te cuesta cada cliente.', ahorro: 'No saber cuánto tiempo te lleva cada cliente ni si la cuota lo cubre.' },
      cli: { como: 'Cada cliente con su historial, sus encargos y lo que toca hacer después. Te avisa a ti de la documentación que falta antes de cada plazo.', ahorro: 'La documentación que nadie reclamó a tiempo y los trámites que se pasan de plazo.' },
      fac: { como: 'Las cuotas de cada mes y los encargos sueltos en el mismo sitio, y ves de un vistazo qué falta por cobrar.', ahorro: 'Los encargos sueltos que se quedan sin facturar y los recibos devueltos que nadie reclama.' },
      cit: { como: 'Las citas del despacho en una agenda común; las que te piden por WhatsApp pueden entrar solas y al cliente le llega un recordatorio el día antes.', ahorro: 'Citas apuntadas en varios sitios y clientes que llegan sin los papeles.' },
      mat: { como: 'Sabes qué documentación falta de cada cliente y qué certificados caducan, y te avisa a ti con tiempo.', ahorro: 'Perseguir papeles el último día del plazo y certificados que caducan sin darte cuenta.' },
    },
    tec: {
      titulo: 'Visitas y gestiones fuera',
      tecnicos: [t('Laura', '2 salidas', [p('09:30', 'Bar Ca la Rosa · recoger facturas del trimestre'), p('12:00', 'Notaría · constitución de una SL')])],
      parte: {
        titulo: 'Hoja de encargo',
        filas: [f('Cliente', 'Bar Ca la Rosa'), f('Encargo', 'IVA del trimestre'), f('Tiempo', '1 h 15 min')],
        firma: 'Conformidad del cliente',
      },
    },
    cli: {
      titulo: 'Clientes y encargos',
      avisos: [
        a('Falta documentación', 'IVA del trimestre', 'Bar Ca la Rosa', 'Faltan las facturas del último mes', 'Reclamar hoy', true),
        a('Cliente desde 2018', 'autónomo', 'Sr. Puig', 'Renta en abril', 'Recordatorio programado', false),
      ],
    },
    fac: { titulo: 'Facturas y cobros', filas: [f('Cuotas mensuales', '42 emitidas'), f('Pendientes de cobro', '4'), f('Devueltas por el banco', '1 · aviso enviado')] },
    cit: { titulo: 'Citas y agenda', citas: [p('09:00', 'Alta de autónomo · cliente nuevo'), p('16:30', 'Revisión de la renta · reservada por WhatsApp')] },
    mat: { titulo: 'Documentación pendiente', filas: [f('Facturas del último mes', 'Faltan de 4 clientes'), f('Certificados digitales', '2 caducan este mes')] },
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
    explica: {
      tec: { como: 'Assignes cada avís des del mòbil, siguis on siguis, i cada tècnic veu al seu on va, què ha de fer i l’historial d’aquella instal·lació.', ahorro: 'Repartir la feina per telèfon a primera hora i els canvis que es perden al grup de WhatsApp.' },
      parte: { como: 'El tècnic apunta al mòbil les hores, el material i les fotos, i el client signa a la pantalla. T’arriba a tu tan bon punt hi ha cobertura.', ahorro: 'Passar a net fulls de paper i buscar fotos i hores al grup de WhatsApp.' },
      cli: { como: 'Cada client amb les seves instal·lacions, els seus avisos i el seu contracte de manteniment. T’avisa a tu de les revisions que toquen i dels contractes que vencen.', ahorro: 'Les revisions que es passen, els contractes que vencen sense renovar i els pressupostos que ningú no va tornar a trucar.' },
      fac: { como: 'La factura surt del full de feina, sense tornar-lo a escriure, i les quotes dels contractes s’emeten cada mes. Veus d’un cop d’ull què falta cobrar.', ahorro: 'Fer les factures a mà copiant el que ja et van enviar i els cobraments que ningú no reclama.' },
      cit: { como: 'Les visites per a pressupost i les revisions en una agenda que veu tot l’equip. Al client li pot arribar un recordatori el dia abans, per WhatsApp o per correu.', ahorro: 'Visites apuntades a diversos llocs i clients que no són a casa quan arriba el tècnic.' },
      mat: { como: 'Saps quin material hi ha al magatzem i a cada furgoneta, i t’avisa a tu abans que falti, amb la comanda preparada per enviar-la.', ahorro: 'Que el tècnic arribi sense la peça i els viatges de més al proveïdor.' },
    },
    tec: {
      titulo: 'Ruta de cada tècnic',
      tecnicos: [
        t('Marc', '2 visites · Lloret', [p('08:00', 'Bar Ca la Rosa · avaria de cambra'), p('11:30', 'Hotel Mirador · revisió trimestral del contracte')]),
        t('Jordi', '2 visites · Blanes', [p('09:00', 'Comunitat Carrer del Mar 8 · revisió anual'), p('12:00', 'Pis particular · instal·lació de split')]),
      ],
      parte: {
        titulo: 'Full de feina',
        filas: [f('Avís', 'Bar Ca la Rosa · avaria de cambra'), f('Tècnic', 'Marc · 1 h 40 min'), f('Fet', 'Ventilador canviat · cambra a 2 °C'), f('Material', 'Ventilador, gas R32')],
        firma: 'Signatura del client al mòbil',
      },
    },
    cli: {
      titulo: 'Avisos i contractes',
      avisos: [
        a('Avís urgent', 'aquest matí', 'Bar Ca la Rosa', 'Avaria de cambra · resolta pel Marc', 'Facturar avui', true),
        a('Contracte anual', '4 revisions', 'Hotel Mirador', 'Revisió d’avui · 12 màquines', 'Assignada al Marc', false),
        a('Contracte anual', '1 revisió', 'Comunitat Carrer Major 3', 'Venç al gener · renovar', 'Avisar el president', true),
        a('Pressupost enviat', 'fa 3 dies', 'Restaurant Es Racó', 'Contracte de manteniment · sense resposta', 'Cal trucar avui', true),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Avisos i revisions d’ahir', '3 factures llestes'), f('Quotes de contracte del mes', '14 emeses'), f('Vençudes', '1 · avís enviat')] },
    cit: { titulo: 'Cites i agenda', citas: [p('10:00', 'Visita per a pressupost · Tossa'), p('17:30', 'Revisió de caldera · Sra. Puig · reservada per WhatsApp')] },
    mat: { titulo: 'Material i magatzem', filas: [f('Gas R32', 'En queden 2 · demanar'), f('Filtres de màquines', 'Falten per a la revisió de divendres')] },
  },
  ref: {
    nombre: 'Reformes i obres',
    explica: {
      tec: { como: 'Cada equip veu al mòbil a quina obra és avui i què toca fer; si canvies alguna cosa, els arriba al moment.', ahorro: 'Les trucades de primera hora per repartir els equips i els canvis que es perden al WhatsApp.' },
      parte: { como: 'L’encarregat apunta al mòbil les hores de cada persona i el material de l’obra, encara que no hi hagi cobertura; t’arriba tan bon punt n’hi ha.', ahorro: 'Perseguir hores a final de setmana i no saber quant se n’ha anat a cada obra.' },
      cli: { como: 'Cada client amb la seva obra, el seu pressupost i els extres que va demanant. T’avisa a tu dels pressupostos que continuen sense resposta.', ahorro: 'Els pressupostos que es refreden i els extres que es fan i no es cobren mai.' },
      fac: { como: 'Les certificacions i les factures surten del que s’ha fet a l’obra, amb els extres inclosos, i veus què falta cobrar.', ahorro: 'Calcular a mà què facturar cada mes i els cobraments que es queden sense reclamar.' },
      cit: { como: 'Les visites per mesurar i les cites a botiga en una agenda comuna; al client li pot arribar un recordatori el dia abans.', ahorro: 'Visites que se solapen amb l’obra i clients que s’obliden de la cita.' },
      mat: { como: 'Saps quin material hi ha per a cada obra i què falta, i t’avisa a tu abans que te’n quedis curt.', ahorro: 'Aturar una obra per falta de material i els viatges de més al magatzem.' },
    },
    tec: {
      titulo: 'On és cada equip',
      tecnicos: [
        t('Equip d’en Pau', 'Obra · Lloret', [p('08:00', 'Bany complet · dia 3 de 5'), p('15:00', 'Client nou · mesurar la cuina')]),
        t('Equip de l’Oriol', 'Obra · Blanes', [p('08:00', 'Reforma de local · enrajolat'), p('13:00', 'Recollir material al magatzem')]),
      ],
      parte: {
        titulo: 'Full del dia',
        filas: [f('Obra', 'Bany de la Sra. Vidal'), f('Hores', '2 persones · 6 h'), f('Material', 'Rajola 30×60, ciment cola')],
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
    explica: {
      tec: { como: 'Cada mecànic veu a la seva pantalla quin cotxe té a l’elevador i què li toca després.', ahorro: 'Anar preguntant qui és amb quin cotxe i les feines que es queden a mitges sense que ningú ho sàpiga.' },
      parte: { como: 'L’ordre de treball recull les hores i les peces mentre es treballa, i el client signa en recollir el cotxe.', ahorro: 'Refer a mà el que s’ha fet a cada cotxe per poder-ho facturar.' },
      cli: { como: 'Cada cotxe per la seva matrícula, amb el seu historial, els seus pressupostos i el que li toca després. Al client li pot arribar l’avís de la revisió o de l’ITV.', ahorro: 'Els pressupostos que es refreden i les revisions i ITV que es passen sense que ningú avisi.' },
      fac: { como: 'La factura surt de l’ordre de treball en lliurar el cotxe, sense tornar-la a escriure, i veus què falta cobrar.', ahorro: 'Passar les ordres a l’Excel per facturar i els cobraments que s’obliden.' },
      cit: { como: 'Les cites del taller en una agenda per elevador; les que et demanen per WhatsApp poden entrar soles.', ahorro: 'Cotxes que arriben sense cita alhora i forats que es queden buits.' },
      mat: { como: 'Saps quines peces tens i quines s’acaben; t’avisa a tu abans que faltin i et deixa la comanda preparada per enviar-la.', ahorro: 'Quedar-te sense la peça amb el cotxe a l’elevador i les comandes fetes a última hora.' },
    },
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
      titulo: 'Cotxes i pressupostos',
      avisos: [
        a('Pressupost enviat', 'ahir', 'Peugeot 308 · 1234 KLM', 'Sr. Roca · canvi d’embragatge · esperant resposta', 'Cal trucar avui', true),
        a('Revisió anual', 'fa 11 mesos', 'Renault Clio · 5678 LMN', 'Sra. Serra · li toca la revisió', 'Recordatori programat', false),
        a('ITV', 'al desembre', 'Repartos Costa · 3 furgonetes', 'Les tres passen l’ITV el mateix mes', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Cotxes lliurats ahir', '4 factures llestes'), f('Pendents de cobrament', '3'), f('Vençudes', '1 · avís enviat')] },
    cit: { titulo: 'Cites i agenda', citas: [p('08:00', 'Recepció · Seat León'), p('16:00', 'Canvi de pneumàtics · reservada per WhatsApp')] },
    mat: { titulo: 'Peces i magatzem', filas: [f('Filtres d’oli', 'En queden 3 · demanar'), f('Pastilles de fre', '6 jocs')] },
  },
  sal: {
    nombre: 'Fisio o clínica',
    explica: {
      tec: { como: 'Les visites a domicili de cada fisio al seu mòbil, amb l’adreça i el que toca a cada sessió.', ahorro: 'Coordinar per telèfon qui va a cada casa i les visites que se solapen.' },
      parte: { como: 'En acabar la sessió s’apunta al mòbil el que s’ha fet i el pacient signa. Queda al seu historial.', ahorro: 'Passar a net les notes de cada sessió al final del dia.' },
      cli: { como: 'Cada pacient amb el seu historial, els seus bons i les seves revisions, i només ho veu qui tu decideixis. T’avisa a tu dels bons que s’acaben.', ahorro: 'Els bons que s’acaben sense que ningú ho comenti i les revisions que es passen.' },
      fac: { como: 'Les sessions i els bons es cobren des del mateix lloc, i les factures per a les mútues surten de les sessions fetes.', ahorro: 'Preparar a mà les factures de les mútues i els bons pendents de pagament.' },
      cit: { como: 'Una agenda per a tots els fisios; les cites que et demanen per WhatsApp poden entrar soles, i al pacient li arriba un recordatori el dia abans.', ahorro: 'Cites apuntades a diversos llocs i pacients que s’obliden de venir.' },
      mat: { como: 'Saps quin material de consulta queda i t’avisa a tu abans que s’acabi.', ahorro: 'Quedar-te sense embenat o sense agulles a mitja setmana.' },
    },
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
        a('Bo de 10 sessions', 'en queden 2', 'Sra. Coll', 'Se li acaba el bo la setmana que ve', 'Comentar-ho a la propera sessió', true),
        a('Pacient des del 2022', '8 visites', 'Sr. Ferrer', 'Revisió d’aquí a un mes', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Sessions d’ahir', '6 cobrades'), f('Bons pendents de pagament', '2'), f('Factures per a mútues', '3 per enviar')] },
    cit: { titulo: 'Cites i agenda', citas: [p('09:00', 'Primera visita · dolor cervical'), p('18:30', 'Sessió de fisioteràpia · reservada per WhatsApp')] },
    mat: { titulo: 'Material', filas: [f('Embenatge neuromuscular', 'En queden 2 rotllos'), f('Agulles de punció', '1 capsa · demanar')] },
  },
  est: {
    nombre: 'Perruqueria i estètica',
    explica: {
      tec: { como: 'Els serveis fora del saló, com casaments o esdeveniments, amb la seva hora, el lloc i qui hi va.', ahorro: 'Organitzar per WhatsApp qui va a cada casament i amb què.' },
      parte: { como: 'En acabar s’apunta el que s’ha fet i els productes usats, i la clienta hi dona la conformitat.', ahorro: 'Recordar de memòria què es va fer i què es va gastar en cada servei.' },
      cli: { como: 'Cada clienta amb el seu historial (el tint, el tall, el que li va bé) i el que li toca després. T’avisa a tu de les clientes a qui toca tornar.', ahorro: 'Apuntar a la llibreta el color de cada clienta i les que deixen de venir sense que te n’adonis.' },
      fac: { como: 'La caixa del dia, les paga-i-senyals dels casaments i el que queda pendent, al mateix lloc.', ahorro: 'Quadrar la caixa a mà i les paga-i-senyals que ningú no recorda haver cobrat.' },
      cit: { como: 'Una agenda per al saló; les cites que et demanen per WhatsApp poden entrar soles i a la clienta li arriba un recordatori el dia abans, sense que l’hagis d’enviar tu.', ahorro: 'Passar-te el dia de descans contestant i enviant recordatoris un per un.' },
      mat: { como: 'Saps quins tints i productes queden i t’avisa abans que s’acabin.', ahorro: 'Quedar-te sense el tint d’una clienta el dia de la seva cita.' },
    },
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
    explica: {
      tec: { como: 'Les visites i les captacions de cada agent al seu mòbil, amb l’immoble i el comprador.', ahorro: 'Coordinar per WhatsApp qui ensenya cada pis i les visites que se solapen.' },
      parte: { como: 'En acabar la visita s’apunta al mòbil l’interès del comprador i el que ha demanat, i el comprador signa el full de visita.', ahorro: 'Recordar de memòria què va dir cada comprador i els fulls de visita en paper.' },
      cli: { como: 'Cada comprador amb el que busca, el seu idioma i les seves visites; cada propietari amb el seu immoble i la seva exclusiva. Els contactes dels portals poden entrar sols.', ahorro: 'Els compradors que es refreden perquè ningú no els va tornar a trucar i les exclusives que vencen sense renovar.' },
      fac: { como: 'Les comissions de cada venda i els rebuts dels lloguers gestionats, i veus què falta cobrar.', ahorro: 'Portar les comissions i els lloguers en fulls diferents i els rebuts que ningú no reclama.' },
      cit: { como: 'Les visites i les valoracions en una agenda comuna; al comprador li arriba un recordatori el dia abans, en el seu idioma.', ahorro: 'Visites que se solapen i compradors que no es presenten.' },
      mat: { como: 'Saps qui té les claus de cada immoble i quina documentació falta, i t’avisa a tu abans de la signatura.', ahorro: 'Buscar claus que no apareixen i descobrir el dia de la signatura que falta un paper.' },
    },
    tec: {
      titulo: 'Agenda de cada agent',
      tecnicos: [
        t('Anna', '2 visites · Lloret', [p('10:00', 'Pis a Fenals · visita amb comprador'), p('12:30', 'Casa a Lloret · captació i fotos')]),
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
        a('Propietari en exclusiva', 'des del juliol', 'Sr. Bosch', 'L’exclusiva venç al desembre', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Comissions d’aquest mes', '2 signades a la notaria'), f('Pendents de cobrament', '1'), f('Lloguers gestionats', '18 rebuts emesos')] },
    cit: { titulo: 'Cites i agenda', citas: [p('10:00', 'Visita · pis a Fenals'), p('18:00', 'Valoració gratuïta · reservada per WhatsApp')] },
    mat: { titulo: 'Claus i documentació', filas: [f('Claus del pis de Fenals', 'Les té l’Anna · tornar-les avui'), f('Nota simple de l’àtic', 'Pendent de demanar')] },
  },
  ges: {
    nombre: 'Gestoria o assessoria',
    explica: {
      tec: { como: 'Les sortides del despatx (recollir papers, la notaria, Hisenda) amb la seva hora i qui hi va.', ahorro: 'Coordinar les sortides per telèfon i els encàrrecs que es queden per fer.' },
      parte: { como: 'Cada encàrrec amb el temps dedicat i el que s’ha fet, per saber què et costa cada client.', ahorro: 'No saber quant de temps et porta cada client ni si la quota ho cobreix.' },
      cli: { como: 'Cada client amb el seu historial, els seus encàrrecs i el que toca fer després. T’avisa a tu de la documentació que falta abans de cada termini.', ahorro: 'La documentació que ningú no va reclamar a temps i els tràmits que passen de termini.' },
      fac: { como: 'Les quotes de cada mes i els encàrrecs solts al mateix lloc, i veus d’un cop d’ull què falta cobrar.', ahorro: 'Els encàrrecs solts que es queden sense facturar i els rebuts retornats que ningú no reclama.' },
      cit: { como: 'Les cites del despatx en una agenda comuna; les que et demanen per WhatsApp poden entrar soles i al client li arriba un recordatori el dia abans.', ahorro: 'Cites apuntades a diversos llocs i clients que arriben sense els papers.' },
      mat: { como: 'Saps quina documentació falta de cada client i quins certificats caduquen, i t’avisa a tu amb temps.', ahorro: 'Perseguir papers l’últim dia del termini i certificats que caduquen sense adonar-te’n.' },
    },
    tec: {
      titulo: 'Visites i gestions fora',
      tecnicos: [t('Laura', '2 sortides', [p('09:30', 'Bar Ca la Rosa · recollir factures del trimestre'), p('12:00', 'Notaria · constitució d’una SL')])],
      parte: {
        titulo: 'Full d’encàrrec',
        filas: [f('Client', 'Bar Ca la Rosa'), f('Encàrrec', 'IVA del trimestre'), f('Temps', '1 h 15 min')],
        firma: 'Conformitat del client',
      },
    },
    cli: {
      titulo: 'Clients i encàrrecs',
      avisos: [
        a('Falta documentació', 'IVA del trimestre', 'Bar Ca la Rosa', 'Falten les factures de l’últim mes', 'Reclamar-les avui', true),
        a('Client des del 2018', 'autònom', 'Sr. Puig', 'Renda a l’abril', 'Recordatori programat', false),
      ],
    },
    fac: { titulo: 'Factures i cobraments', filas: [f('Quotes mensuals', '42 emeses'), f('Pendents de cobrament', '4'), f('Retornades pel banc', '1 · avís enviat')] },
    cit: { titulo: 'Cites i agenda', citas: [p('09:00', 'Alta d’autònom · client nou'), p('16:30', 'Revisió de la renda · reservada per WhatsApp')] },
    mat: { titulo: 'Documentació pendent', filas: [f('Factures de l’últim mes', 'Falten de 4 clients'), f('Certificats digitals', '2 caduquen aquest mes')] },
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
    explica: {
      tec: { como: 'You assign each call-out from your phone, wherever you are, and each technician sees on theirs where they’re going, what to do and that installation’s history.', ahorro: 'Sharing out the work by phone first thing, and the changes that get lost in the WhatsApp group.' },
      parte: { como: 'The technician logs hours, materials and photos on the phone, and the customer signs on the screen. It reaches you as soon as there’s signal.', ahorro: 'Copying up paper job sheets and hunting for photos and hours in the WhatsApp group.' },
      cli: { como: 'Every customer with their installations, their call-outs and their maintenance contract. It reminds you of services that are due and contracts that are expiring.', ahorro: 'Services that slip by, contracts that lapse without renewal and quotes nobody followed up.' },
      fac: { como: 'The invoice comes from the job report without typing it again, and contract fees go out every month. You see at a glance what’s still unpaid.', ahorro: 'Doing invoices by hand, copying what you were already sent, and payments nobody chases.' },
      cit: { como: 'Quote visits and services in one diary the whole team can see. The customer can get a reminder the day before, by WhatsApp or email.', ahorro: 'Visits written down in several places, and customers who aren’t home when the technician arrives.' },
      mat: { como: 'You know what’s in the warehouse and in each van, and it warns you before something runs out, with the order ready to send.', ahorro: 'The technician turning up without the part, and extra trips to the supplier.' },
    },
    tec: {
      titulo: 'Each technician’s route',
      tecnicos: [
        t('Marc', '2 visits · Lloret', [p('08:00', 'Bar Ca la Rosa · cold room breakdown'), p('11:30', 'Hotel Mirador · quarterly contract service')]),
        t('Jordi', '2 visits · Blanes', [p('09:00', 'Carrer del Mar 8 residents’ association · annual service'), p('12:00', 'Private flat · split unit installation')]),
      ],
      parte: {
        titulo: 'Job report',
        filas: [f('Call-out', 'Bar Ca la Rosa · cold room breakdown'), f('Technician', 'Marc · 1 h 40 min'), f('Done', 'Fan replaced · cold room at 2 °C'), f('Materials', 'Fan, R32 gas')],
        firma: 'Customer signs on the phone',
      },
    },
    cli: {
      titulo: 'Call-outs and contracts',
      avisos: [
        a('Urgent call-out', 'this morning', 'Bar Ca la Rosa', 'Cold room breakdown · fixed by Marc', 'Invoice today', true),
        a('Annual contract', '4 services', 'Hotel Mirador', 'Today’s service · 12 units', 'Assigned to Marc', false),
        a('Annual contract', '1 service', 'Carrer Major 3 residents’ association', 'Expires in January · renew', 'Let the chairman know', true),
        a('Quote sent', '3 days ago', 'Es Racó restaurant', 'Maintenance contract · no reply', 'Call today', true),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Yesterday’s call-outs and services', '3 invoices ready'), f('Contract fees this month', '14 issued'), f('Overdue', '1 · reminder sent')] },
    cit: { titulo: 'Appointments', citas: [p('10:00', 'Visit for a quote · Tossa'), p('17:30', 'Boiler service · Mrs. Puig · booked on WhatsApp')] },
    mat: { titulo: 'Materials and stock', filas: [f('R32 gas', '2 left · reorder'), f('Unit filters', 'Short for Friday’s service')] },
  },
  ref: {
    nombre: 'Renovation and building',
    explica: {
      tec: { como: 'Each crew sees on the phone which site they’re on today and what needs doing; if you change something, they get it straight away.', ahorro: 'The early-morning calls to share out the crews, and the changes that get lost in WhatsApp.' },
      parte: { como: 'The foreman logs each person’s hours and the site materials on the phone, even without signal; it reaches you as soon as there is.', ahorro: 'Chasing hours at the end of the week and not knowing how much each job has cost.' },
      cli: { como: 'Every customer with their job, their quote and the extras they keep asking for. It reminds you of quotes still waiting for a reply.', ahorro: 'Quotes that go cold, and extras that get done and never charged.' },
      fac: { como: 'Progress invoices and final invoices come from the work done on site, extras included, and you see what’s still unpaid.', ahorro: 'Working out by hand what to invoice each month, and payments nobody chases.' },
      cit: { como: 'Measuring visits and showroom appointments in a shared diary; the customer can get a reminder the day before.', ahorro: 'Visits that clash with the job, and customers who forget the appointment.' },
      mat: { como: 'You know what materials there are for each job and what’s missing, and it warns you before you run short.', ahorro: 'Stopping a job for lack of materials, and extra trips to the warehouse.' },
    },
    tec: {
      titulo: 'Where each crew is',
      tecnicos: [
        t('Pau’s crew', 'Site · Lloret', [p('08:00', 'Full bathroom · day 3 of 5'), p('15:00', 'New customer · measure kitchen')]),
        t('Oriol’s crew', 'Site · Blanes', [p('08:00', 'Shop refit · tiling'), p('13:00', 'Pick up materials at the warehouse')]),
      ],
      parte: {
        titulo: 'Daily report',
        filas: [f('Job', 'Mrs. Vidal’s bathroom'), f('Hours', '2 people · 6 h'), f('Materials', '30×60 tiles, tile adhesive')],
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
    explica: {
      tec: { como: 'Each mechanic sees on their screen which car is on their lift and what comes next.', ahorro: 'Asking around who’s on which car, and jobs left half-done without anyone knowing.' },
      parte: { como: 'The work order collects hours and parts as the work is done, and the customer signs when collecting the car.', ahorro: 'Redoing by hand what was done to each car so you can invoice it.' },
      cli: { como: 'Each car by its number plate, with its history, its quotes and what it needs next. The customer can get a reminder for the service or the MOT.', ahorro: 'Quotes that go cold, and services and MOTs that slip by without anyone saying anything.' },
      fac: { como: 'The invoice comes from the work order when the car is handed back, without typing it again, and you see what’s still unpaid.', ahorro: 'Copying work orders into Excel to invoice them, and payments that get forgotten.' },
      cit: { como: 'Workshop bookings in a diary by lift; the ones you get on WhatsApp can go in on their own.', ahorro: 'Cars turning up without a booking at the same time, and slots left empty.' },
      mat: { como: 'You know which parts you have and which are running low; it warns you before they run out and leaves the order ready to send.', ahorro: 'Running out of a part with the car on the lift, and orders placed at the last minute.' },
    },
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
      titulo: 'Cars and quotes',
      avisos: [
        a('Quote sent', 'yesterday', 'Peugeot 308 · 1234 KLM', 'Mr. Roca · clutch replacement · awaiting reply', 'Call today', true),
        a('Annual service', '11 months ago', 'Renault Clio · 5678 LMN', 'Mrs. Serra · service due', 'Reminder scheduled', false),
        a('MOT', 'in December', 'Repartos Costa · 3 vans', 'All three are due for their MOT the same month', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Cars handed back yesterday', '4 invoices ready'), f('Awaiting payment', '3'), f('Overdue', '1 · reminder sent')] },
    cit: { titulo: 'Appointments', citas: [p('08:00', 'Check-in · Seat León'), p('16:00', 'Tyre change · booked on WhatsApp')] },
    mat: { titulo: 'Parts and stock', filas: [f('Oil filters', '3 left · reorder'), f('Brake pads', '6 sets')] },
  },
  sal: {
    nombre: 'Physio or clinic',
    explica: {
      tec: { como: 'Each physio’s home visits on their phone, with the address and what each session involves.', ahorro: 'Coordinating by phone who goes to which home, and visits that overlap.' },
      parte: { como: 'At the end of the session, what was done is noted on the phone and the patient signs. It stays in their record.', ahorro: 'Writing up each session’s notes at the end of the day.' },
      cli: { como: 'Every patient with their record, their session packs and their check-ups, and only the people you choose can see it. It reminds you of packs running out.', ahorro: 'Session packs that run out without anyone mentioning it, and check-ups that slip by.' },
      fac: { como: 'Sessions and packs are charged from the same place, and invoices for insurers come from the sessions done.', ahorro: 'Preparing insurer invoices by hand, and packs still waiting to be paid.' },
      cit: { como: 'One diary for all the physios; bookings you get on WhatsApp can go in on their own, and the patient gets a reminder the day before.', ahorro: 'Appointments written down in several places, and patients who forget to turn up.' },
      mat: { como: 'You know what clinic supplies are left and it warns you before they run out.', ahorro: 'Running out of tape or needles mid-week.' },
    },
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
        a('10-session pack', '2 left', 'Mrs. Coll', 'Her pack runs out next week', 'Mention it at her next session', true),
        a('Patient since 2022', '8 visits', 'Mr. Ferrer', 'Check-up in a month', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Yesterday’s sessions', '6 paid'), f('Packs awaiting payment', '2'), f('Insurer invoices', '3 to send')] },
    cit: { titulo: 'Appointments', citas: [p('09:00', 'First visit · neck pain'), p('18:30', 'Physio session · booked on WhatsApp')] },
    mat: { titulo: 'Supplies', filas: [f('Kinesiology tape', '2 rolls left'), f('Dry needling needles', '1 box · reorder')] },
  },
  est: {
    nombre: 'Hair and beauty',
    explica: {
      tec: { como: 'Services away from the salon, like weddings or events, with the time, the place and who’s going.', ahorro: 'Organising on WhatsApp who goes to each wedding and with what.' },
      parte: { como: 'At the end, what was done and the products used are noted, and the client gives her approval.', ahorro: 'Remembering what was done and what was used in each service.' },
      cli: { como: 'Every client with her history (the colour, the cut, what suits her) and what’s due next. It reminds you of clients who are due back.', ahorro: 'Writing each client’s colour in a notebook, and clients who stop coming without you noticing.' },
      fac: { como: 'The day’s takings, wedding deposits and anything outstanding, all in one place.', ahorro: 'Balancing the till by hand, and deposits nobody remembers taking.' },
      cit: { como: 'One diary for the salon; bookings you get on WhatsApp can go in on their own, and the client gets a reminder the day before without you sending it.', ahorro: 'Spending your day off answering messages and sending reminders one by one.' },
      mat: { como: 'You know which colours and products are left and it warns you before they run out.', ahorro: 'Running out of a client’s colour on the day of her appointment.' },
    },
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
    explica: {
      tec: { como: 'Each agent’s viewings and listings on their phone, with the property and the buyer.', ahorro: 'Coordinating on WhatsApp who shows each flat, and viewings that overlap.' },
      parte: { como: 'After the viewing, the buyer’s interest and requests are noted on the phone, and the buyer signs the viewing sheet.', ahorro: 'Remembering what each buyer said, and viewing sheets on paper.' },
      cli: { como: 'Every buyer with what they’re looking for, their language and their viewings; every owner with their property and their exclusivity. Leads from the portals can come in on their own.', ahorro: 'Buyers who go cold because nobody called back, and exclusive listings that lapse without renewal.' },
      fac: { como: 'Commissions on each sale and receipts for managed rentals, and you see what’s still unpaid.', ahorro: 'Keeping commissions and rentals on separate sheets, and receipts nobody chases.' },
      cit: { como: 'Viewings and valuations in a shared diary; the buyer gets a reminder the day before, in their language.', ahorro: 'Viewings that clash, and buyers who don’t turn up.' },
      mat: { como: 'You know who has the keys to each property and what paperwork is missing, and it warns you before the signing.', ahorro: 'Looking for keys that won’t turn up, and finding out on signing day that a document is missing.' },
    },
    tec: {
      titulo: 'Each agent’s diary',
      tecnicos: [
        t('Anna', '2 viewings · Lloret', [p('10:00', 'Flat in Fenals · viewing with buyer'), p('12:30', 'House in Lloret · new listing and photos')]),
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
        a('Exclusive listing', 'since July', 'Mr. Bosch', 'Exclusivity ends in December', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Commissions this month', '2 signed at the notary'), f('Awaiting payment', '1'), f('Managed rentals', '18 receipts issued')] },
    cit: { titulo: 'Appointments', citas: [p('10:00', 'Viewing · flat in Fenals'), p('18:00', 'Free valuation · booked on WhatsApp')] },
    mat: { titulo: 'Keys and paperwork', filas: [f('Keys to the Fenals flat', 'Anna has them · return today'), f('Land registry extract for the penthouse', 'Still to request')] },
  },
  ges: {
    nombre: 'Accounting or advisory',
    explica: {
      tec: { como: 'Trips out of the office (collecting paperwork, the notary, the tax office) with the time and who’s going.', ahorro: 'Coordinating trips by phone, and errands that never get done.' },
      parte: { como: 'Each job with the time spent and what was done, so you know what each client costs you.', ahorro: 'Not knowing how much time each client takes or whether their fee covers it.' },
      cli: { como: 'Every client with their history, their jobs and what comes next. It warns you of missing paperwork before each deadline.', ahorro: 'Paperwork nobody chased in time, and filings that miss their deadline.' },
      fac: { como: 'Monthly fees and one-off jobs in the same place, and you see at a glance what’s still unpaid.', ahorro: 'One-off jobs that never get invoiced, and returned direct debits nobody chases.' },
      cit: { como: 'Office appointments in a shared diary; the ones you get on WhatsApp can go in on their own, and the client gets a reminder the day before.', ahorro: 'Appointments written down in several places, and clients who turn up without their paperwork.' },
      mat: { como: 'You know what paperwork is missing from each client and which certificates are expiring, and it warns you in good time.', ahorro: 'Chasing paperwork on the last day of the deadline, and certificates that expire without you noticing.' },
    },
    tec: {
      titulo: 'Visits and errands',
      tecnicos: [t('Laura', '2 trips out', [p('09:30', 'Bar Ca la Rosa · collect quarterly invoices'), p('12:00', 'Notary · setting up an SL company')])],
      parte: {
        titulo: 'Job sheet',
        filas: [f('Client', 'Bar Ca la Rosa'), f('Job', 'Quarterly VAT'), f('Time', '1 h 15 min')],
        firma: 'Client approval',
      },
    },
    cli: {
      titulo: 'Clients and jobs',
      avisos: [
        a('Missing paperwork', 'Quarterly VAT', 'Bar Ca la Rosa', 'Last month’s invoices missing', 'Chase today', true),
        a('Client since 2018', 'self-employed', 'Mr. Puig', 'Income tax in April', 'Reminder scheduled', false),
      ],
    },
    fac: { titulo: 'Invoices and payments', filas: [f('Monthly fees', '42 issued'), f('Awaiting payment', '4'), f('Returned by the bank', '1 · reminder sent')] },
    cit: { titulo: 'Appointments', citas: [p('09:00', 'Self-employed registration · new client'), p('16:30', 'Income tax review · booked on WhatsApp')] },
    mat: { titulo: 'Pending paperwork', filas: [f('Last month’s invoices', 'Missing from 4 clients'), f('Digital certificates', '2 expire this month')] },
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
