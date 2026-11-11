export type Locale = 'es' | 'ca' | 'en';

export const dictionaries = {
  es: {
    nav: {
      services: 'Servicios',
      pricing: 'Precios',
      values: '¿Por qué TESELAR?',
      process: 'Proceso',
      faq: 'Preguntas Frecuentes',
      contact: 'Agendar Cita'
    },
    a11y: {
      abrir_menu: 'Abrir menú',
      cerrar_menu: 'Cerrar menú',
      cambiar_idioma: 'Cambiar idioma',
      cerrar: 'Cerrar'
    },
    hero: {
      tagline: 'Teselar Software',
      title: 'La pieza exacta donde la tecnología y tu negocio encajan perfectamente',
      subtitle: 'Programas para llevar clientes, presupuestos, facturas y técnicos en un solo sitio, asistentes que atienden tu WhatsApp y webs hechas a mano. Para instaladores, reformas, talleres, clínicas, peluquerías, inmobiliarias y gestorías. Los hago yo, aquí en Lloret de Mar.',
      meta_description: 'Asistentes con inteligencia artificial, automatizaciones y programas a medida para negocios de Lloret de Mar y la Costa Brava. Los hago yo, de principio a fin.',
      cta: 'Solicitar información',
      cta_alt: 'Diagnóstico gratis · 30 min',
      cta_note: 'Gratis y sin compromiso. Antes de hablar miro tu web, tu ficha de Google y cómo te contactan tus clientes, para no empezar de cero.',
      quien: 'Soy Rubén Reyes, de Teselar Software. Te atiendo yo.',
      piezas: ['Clientes', 'Facturas', 'Agenda', 'Web', 'WhatsApp', 'Equipo'],
      pieza_texto: 'Lo que te falta, hecho a la medida del hueco',
      piezas_desc: ['Tus clientes y su historial, en un solo sitio', 'Presupuestos y facturas que salen solos', 'Citas que se reservan sin llamar', 'Una web hecha a mano, rápida', 'Respuestas y recordatorios automáticos', 'Avisos, técnicos y partes desde el móvil'],
      piezas_alt: 'Las piezas de un negocio encajadas, con la de Teselar en el hueco que faltaba'
    },
    concept: {
      title: 'La Pieza que Encaja',
      text1: 'Una teselación es un mosaico de piezas que encajan sin dejar huecos, como las baldosas de un suelo.',
      text2: 'Tu negocio ya tiene sus piezas: clientes, facturas, agenda, WhatsApp, tu equipo. Lo que hago es la que falta para que encajen y dejes de pasar datos de una a otra a mano.'
    },
    services: {
      title: 'Catálogo de Servicios',
      subtitle: 'Soluciones modulares adaptadas a tu tamaño y presupuesto. Lo que no entra lo tienes escrito aquí abajo y, otra vez, en tu propuesta.',
      ideal: 'Ideal para:',
      pricing: 'Precio',
      features: 'Lo que incluye:',
      live_adjustments: 'Todos mis proyectos de desarrollo web y de software incluyen 1 semana de ajustes en vivo sin coste adicional tras el lanzamiento.',
      interest: 'Me interesa este servicio',
      tres_ia: {
        title: 'Tres servicios hablan por WhatsApp y no son lo mismo',
        c1_title: 'Chatbot guiado · dentro del 03',
        c1_desc: 'Sigue un guion de botones y respuestas previstas. Barato y suficiente si las preguntas son siempre las mismas; en cuanto se salen del guion, se atasca.',
        c2_title: 'Asistente de IA · el 06',
        c2_desc: 'Entiende lo que le escriben con palabras normales y responde con la información de tu negocio. Informa y orienta, pero no toca tu agenda. Se construye a medida sobre tu documentación, tus canales y tus sistemas: por eso el rango es amplio. Es el chat que tienes en la esquina de esta web: TesS. Pregúntale lo que quieras.',
        c3_title: 'Citas que se reservan solas · el 02',
        c3_desc: 'Un asistente de IA que además actúa: mira los huecos que tienes libres de verdad, reserva la cita, la confirma y manda el recordatorio. Es un producto, el mismo para todos los negocios: se configura con tus servicios y tus horarios, y por eso es más barato que un desarrollo a medida y puede llevar garantía.',
        nota: 'La pregunta para elegir es sencilla: ¿lo que pierdes son consultas sin responder, o citas sin coger? Y si son citas, no pagues un desarrollo a medida: el producto de citas te sale más barato.'
      },
      categories: {
        web: 'Desarrollo Web',
        automation: 'Automatización e IA',
        systems: 'Programas de gestión'
      },
      vat: '+ IVA',
      s1: {
        title: '01. Auditoría de Procesos',
        ideal: 'Negocios que sospechan que pierden tiempo o dinero en su operativa y quieren saber dónde, por escrito, antes de invertir. Es el segundo paso cuando lo que necesitas va a medida: la puerta de entrada es el diagnóstico gratuito de 30 minutos, y si de ahí sale algo cerrado —las citas, una web, una tienda online o una automatización pequeña— pasas directamente a la propuesta, sin auditoría. Estos 150€ se descuentan del proyecto si aceptas la propuesta en los 30 días siguientes: cuentan como parte de la señal.',
        price: '150€ (Descontable de tu proyecto)',
        tag: 'Procesos y costes',
        f1: 'Sesión de 60-90 minutos revisando tu operativa con tus datos delante. Antes te digo qué tienes que traer, que es poco y depende de tu negocio',
        f2: 'Mapeo de hasta tres procesos: quién hace qué, cuándo y con qué herramienta',
        f3: 'Dónde se generan esperas, errores o trabajo repetido',
        f4: 'Tus números: cuántas veces haces una tarea, cuánto tiempo te lleva y cuánto te cuesta',
        f5: 'Qué se puede automatizar, qué no, y en qué orden',
        f6: 'Informe escrito de 2-3 páginas con prioridades, y con él la propuesta con el precio de lo que saldría de ahí: tú decides si la aceptas. Si no veo nada que te compense, te lo digo y no hay propuesta',
        f7: 'Un repaso de tu web y tus redes, incluido'
      },
      s2: {
        title: '03. Automatizaciones Específicas',
        ideal: 'Empresas con una tarea repetitiva concreta que quieren quitarse de encima: un proceso que hoy alguien hace a mano, todas las semanas, siempre igual.',
        price: '700€ — 1.800€ + 60€/mes',
        tag: 'Apps Script + APIs + Make',
        f1: 'Generador automático de presupuestos en PDF desde un formulario',
        f2: 'Envío automático de facturas por email con los datos de tus clientes',
        f3: 'Extractor automatizado de datos de correos a Google Sheets',
        f4: 'Chatbot de respuestas guiadas para WhatsApp o Telegram (sigue un guion; si necesitas que entienda lenguaje libre, eso es la Integración de IA)',
        f5: 'Que dos programas que ya usas se pasen los datos solos, en los dos sentidos',
        f6: 'Sistema inteligente de recordatorios y alertas automáticas',
        f7: 'Reportes diarios/semanales automáticos por email',
        f8: 'Plan Básico de mantenimiento (60€/mes), recomendado mientras la automatización esté en marcha: vigilo que siga funcionando y la arreglo si cambia una API o caduca una credencial. Sin él sigue funcionando, pero nadie la vigila, y lo que se rompa se presupuesta aparte. Dónde acaba mi trabajo: no cubre funciones nuevas, cambios del proceso ni integrar herramientas que no estuvieran en el alcance acordado — eso se presupuesta aparte'
      },
      s3: {
        title: '04. Web Esencial',
        ideal: 'Freelancers, pequeñas empresas, profesionales independientes y nuevos emprendedores.',
        price: '990€',
        tag: 'React + Vite + Tailwind CSS',
        f1: 'Página única de alto impacto o hasta 4 secciones',
        f2: 'Diseño web moderno, responsive y optimizado para móvil',
        f3: 'Formulario de contacto y botón de WhatsApp con notificación automática',
        f4: '1 idioma incluido — cada idioma adicional +90€',
        f5: 'SEO técnico básico (meta tags, estructura HTML limpia) y enlazada con tu ficha de Google y tu Instagram',
        f6: 'Optimización extrema de velocidad de carga y rendimiento, y sin cookies de seguimiento: no necesitas banner de cookies',
        f7: 'Textos legales (aviso legal y privacidad) y 1 semana de ajustes en vivo durante el despliegue',
        f8: '3 meses de mantenimiento (Plan Básico) incluidos; al acabar el segundo te aviso y decides si sigues, sin permanencia'
      },
      s4: {
        title: '06. Integración de Inteligencia Artificial',
        ideal: 'Negocios que reciben muchas preguntas repetidas y las contestan a mano: horarios, precios, cómo funciona algo, si haces tal cosa. El asistente responde por ti con la información de tu negocio, pero no gestiona tu agenda — si lo que se te escapan son citas, el servicio es el 03. El precio final depende de la complejidad: un chatbot sencillo de un solo canal se sitúa en la parte baja del rango; un asistente avanzado con múltiples integraciones y canales (web, WhatsApp, Telegram), en la parte alta.',
        price: '1.600€ — 6.000€ + 90-250€/mes',
        tag: 'OpenAI / Anthropic APIs',
        f1: 'Asistente virtual con IA entrenado con tu documentación interna',
        f2: 'Chatbot inteligente de atención para web, WhatsApp o Telegram: informa y orienta con tus datos, sin gestionar tu agenda (para eso están las Citas que se reservan solas, el 02)',
        f3: 'Generación automática de contenidos o respuestas predefinidas',
        f4: 'Análisis, clasificación y resumen automático de documentos',
        f5: 'Automatización avanzada con procesamiento de lenguaje natural',
        f6: 'Integración directa con modelos GPT, Claude u homólogos',
        f7: 'Cuota mensual del asistente, recomendada y en tres tramos: 90€/mes si atiende un solo canal, 150€/mes si son varios o lleva integraciones, y 250€/mes si es multicanal y además se integra con tus sistemas. Incluye revisar las conversaciones, corregir lo que se conteste mal y mantener al día la información con la que responde; sin ella el asistente sigue funcionando, pero nadie lo revisa. El consumo de las APIs de IA va en tu propia cuenta, a tu nombre'
      },
      s5: {
        title: '07. Web Completa',
        ideal: 'Pymes que necesitan la web de verdad de su negocio: catálogo o portfolio, blog y preparada para clientes extranjeros.',
        price: '2.490€ (2 idiomas incluidos)',
        tag: 'React + Vite + Headless CMS',
        hereda: 'Incluye todo lo de la Web Esencial (04): diseño responsive, formulario y botón de WhatsApp, SEO básico, textos legales, sin cookies de seguimiento, 1 semana de ajustes en vivo y 3 meses de mantenimiento incluidos',
        f1: 'Hasta 8 secciones, que dejamos cerradas por escrito en la propuesta',
        f2: 'Galería de proyectos o portfolio interactivo con filtros dinámicos',
        f3: 'Sección autogestionable de blog, artículos o noticias',
        f4: 'Panel de administración intuitivo para gestionar contenidos',
        f5: '2 idiomas incluidos con detección automática — cada idioma adicional +150€',
        f6: 'SEO técnico completo (sitemap, hreflang, Google Search Console)',
        f7: '1 semana de ajustes en vivo y formación de uso'
      },
      s6: {
        title: '05. Tienda Online / E-commerce',
        ideal: 'Comercios locales o marcas que quieren vender en línea sin montar ni mantener una plataforma propia.',
        price: '1.490€',
        tag: 'Shopify',
        hereda: 'Sobre Shopify, en una cuenta a tu nombre: Shopify se encarga de que esté en línea, la seguridad, los pagos y las actualizaciones (su cuota, desde 24€/mes, la de la app de facturas y sus comisiones las pagas tú directamente). Yo, del diseño, el catálogo, la configuración, las facturas con Verifactu y de vigilar que todo siga entrando.',
        f1: 'Diseño a tu marca sobre una plantilla de Shopify, rápida y adaptada al móvil',
        f2: 'Hasta 50 productos cargados. Cada 50 más, +90€ si los cargo yo, o gratis si los cargas tú desde la plantilla, que te enseño a usar',
        f3: 'Cobro con tarjeta y Bizum, configurado y probado',
        f4: 'Facturas con Verifactu desde el primer pedido: las emite una app de Shopify (su cuota, unos 10€/mes, la pagas tú) y yo la dejo configurada y vigilo que funcione',
        f5: 'Envíos, impuestos y textos legales de venta (condiciones y devoluciones)',
        f6: '1 idioma incluido — cada idioma adicional +150€, con los 50 productos; cada 50 productos más, +90€ por idioma',
        f7: 'Conectada con lo que ya usas (el stock de tu tienda física, tu facturación o tu TPV), presupuestado aparte',
        f8: '1 semana de ajustes y 3 meses de mantenimiento incluidos: vigilo que los pagos y las facturas sigan entrando. Después, 60€/mes sin permanencia (o el Plan Plus si el volumen de pedidos lo pide)'
      },
      s7: {
        title: '08. Web Inmobiliaria',
        ideal: 'Inmobiliarias que ya trabajan con un programa de gestión (Inmovilla, Witei, Mobilia…) y quieren una web propia a la altura, para captar compradores extranjeros.',
        price: '2.990€ (2 idiomas incluidos)',
        tag: 'Web + conexión con tu programa',
        f1: 'Buscador de propiedades con filtros (zona, precio, tipo, habitaciones)',
        f2: 'Fichas de propiedad con galería, mapa y sistema de destacados',
        f3: 'Conectada al programa que ya usas: cuando subes, cambias o vendes un piso, la web se actualiza sola',
        f4: '2 idiomas incluidos para compradores extranjeros — cada idioma adicional +150€',
        f5: 'Sin pagar dos veces: los portales (Idealista, Fotocasa, Habitaclia…) los sigue llevando tu programa, como hasta ahora',
        f6: 'Formulario de contacto por propiedad y botón de WhatsApp',
        f7: 'SEO local, textos legales, sin cookies de seguimiento, 1 semana de ajustes y 3 meses de mantenimiento incluidos. Después te lo recomiendo: es lo que vigila que la conexión con tu programa no se rompa; sin él sigue funcionando, pero si se rompe te enteras tú',
        f8: 'Antes de la propuesta compruebo que tu programa deja conectar la web; si no lo deja, te lo digo y no hay propuesta'
      },
      s8: {
        title: '09. Programas de gestión a medida',
        paso: 'Tres piezas que se combinan: 5.900€ cada una; dos juntas, 10.915€; las tres, 15.930€. Sin pagar por usuario. Empieza por la auditoría (150 €, se descuentan): en ella confirmamos que te sirve y vemos qué hay que añadir para tu negocio, que se presupuesta aparte. Si no veo nada que te compense, te lo digo y no hay propuesta.',
        ideal: 'Negocios que quieren llevar en un solo sitio lo que hoy tienen repartido entre Excel, papel y WhatsApp: sus clientes y lo que tiene contratado cada uno, el trabajo de sus técnicos o sus facturas y su stock.',
        price: '5.900€ por pieza',
        tag: 'Clientes · Técnicos · Facturación',
        f1: 'Clientes y contratos: historial, documentos y lo que tiene contratado cada uno, con vencimientos y avisos de renovación o revisión',
        f2: 'Técnicos y avisos: asignación, horas y materiales por obra, partes con fotos y firma del cliente, y fichajes',
        f3: 'Facturación y stock: presupuestos y facturas que salen de lo hecho, lo que te deben, y tu stock con aviso antes de que se acabe. Las facturas, en PDF hasta que Verifactu sea obligatorio para ti; llegas cumpliendo sin pagar más: con mi módulo o, si no está a tiempo, con un programa que cumpla, conectado',
        f4: 'Sin límite de usuarios, en cuentas a tu nombre (la base de datos, unos 25$/mes, la pagas tú directamente)',
        f5: 'Funciona en el móvil, la tablet y el ordenador. En el móvil, también sin cobertura: guarda lo que se apunta y lo envía al volver la señal.',
        f6: 'Panel con las cifras del negocio, agenda, tareas y roles: cada uno ve lo que le toca',
        f7: 'El programa es tuyo con su código cuando lo has pagado entero',
        f8: 'Pagas por partes, contra lo que ves funcionando: señal del 10% y 4 cuotas, cuando apruebas el diseño, cuando pruebas el núcleo, cuando tu equipo ya trabaja con él y tras unas semanas de uso real',
        f9: 'Formación de tu equipo en persona, 1 semana de ajustes en vivo y el primer año de mantenimiento incluido; después, 60€/mes sin permanencia'
      },
      s9: {
        title: '02. Citas que se reservan solas',
        ideal: 'Negocios que trabajan con cita previa y hoy las cogen a mano: peluquerías y barberías, estética, fisioterapia, clínicas, talleres o asesorías. Es el único servicio que entra en tu agenda y reserva de verdad, no solo informa. Con tu WhatsApp o sin él.',
        price: '150€ — 450€ + desde 29€/mes',
        planes: 'Dos versiones, sin permanencia: sin WhatsApp, 150€ de puesta en marcha + 29€/mes; con WhatsApp, 450€ + 59€/mes. Cada agenda más (otra persona o cabina que atiende a la vez), +8€/mes. Todo, + IVA. El plazo para tenerlo funcionando te lo doy por escrito en la propuesta; con WhatsApp, enlazar tu número depende además de una aprobación de Meta.',
        tag: 'Agenda + Google Calendar + WhatsApp',
        f1: 'Con WhatsApp, un asistente atiende tu WhatsApp las 24 horas: consulta los huecos libres, reserva la cita y la confirma sin que tengas que contestar',
        f2: 'Tu agenda conectada a tu Google Calendar: lo que apuntes ahí también cuenta, y nunca dos citas en el mismo hueco. Si hoy la llevas en papel o en Excel, la pasamos al empezar.',
        f3: 'Recordatorio automático antes de la cita, por WhatsApp o por email según la versión, que es lo que hace que la gente no falte',
        f4: 'Cambios y cancelaciones sin llamadas: por el mismo WhatsApp o desde el enlace de la cita',
        f5: 'Panel con tus citas y el contador de las que entraron fuera de tu horario de atención',
        f6: 'Garantía en las dos versiones: si en los tres primeros meses no entra ni una cita fuera de tu horario, te devuelvo la puesta en marcha',
        f7: 'Petición automática de reseñas en Google al terminar la cita, incluida en la cuota',
        f8: 'Sin WhatsApp no es lo mismo más barato: no hay asistente que converse. Tu cliente reserva en tu página de citas, desde tu web, tu ficha de Google, tu Instagram o el enlace que le mandas por WhatsApp, y la confirmación y el recordatorio le llegan por email. A cambio, no se conecta a tu número ni dependes de Meta'
      }
    },
    pricing: {
      title: 'Mantenimiento y Soporte',
      subtitle: 'Lo que te entrego sigue funcionando: lo vigilo, lo actualizo y, si algo falla, lo arreglo yo. Sin permanencia.',
      basic: {
        title: 'Plan Básico',
        price: '60€',
        period: '/ mes',
        desc: 'Tu web o tu programa, vigilados y al día, sin permanencia. Incluido los 3 primeros meses en las webs y la tienda online, y el primer año en los programas de gestión a medida (09); recomendado si tienes una automatización o una web inmobiliaria conectada a tu programa: sin él siguen funcionando, pero nadie las vigila. Los dos servicios con IA llevan cuota propia, aparte de esta.',
        f1: 'Monitorización automática 24/7 y copias de seguridad semanales',
        f2: 'Actualizaciones de seguridad y corrección de errores',
        f3: '1h/mes de cambios de contenido y ajustes menores',
        f4: 'Respuesta en 48h laborables como máximo, aunque siempre intento contestar lo antes posible (si no puedes esperar, el Plus responde el mismo día), e informe trimestral de estado'
      },
      plus: {
        title: 'Plan Plus',
        price: '150€',
        period: '/ mes',
        desc: 'El Básico cubre lo normal. El Plus es para cuando no puedes esperar: respuesta el mismo día, también en fines de semana y vacaciones. Sin permanencia.',
        f1: 'Todo lo del Básico, con copias de seguridad diarias',
        f2: '5h/mes de desarrollo y mejoras (no acumulables)',
        f3: 'Vigilancia de pasarelas de pago + revisión trimestral de velocidad y SEO',
        f4: 'Respuesta el mismo día, también en fines de semana, festivos y vacaciones (4h en incidencia crítica), e informe mensual'
      },
      citas: {
        title: 'Citas que se reservan solas · cuota del servicio',
        price: '29€ — 59€',
        period: '/ mes',
        desc: 'El producto de citas lleva su propia cuota, aparte del mantenimiento y sin permanencia: 29€/mes sin WhatsApp y 59€/mes con WhatsApp, con una agenda. Cada agenda más (otra persona o cabina que atiende a la vez), +8€/mes. No es un extra opcional: es el servicio funcionando, en mis servidores y vigilado.',
        f1: 'Todo funcionando cada día, vigilado, y corregido si algo falla. Con WhatsApp, también el asistente, con el coste del modelo de IA incluido: no tienes que darte de alta en ningún servicio ni gestionar claves',
        f2: 'Cambios de horarios, servicios, precios y textos cuando los necesites',
        tope: 'Con WhatsApp, la cuota cubre el uso normal del negocio: hasta 500 conversaciones al mes con una agenda, y 250 más por cada agenda más, para todo el negocio. Si un mes te pasas, no se corta: lo miramos juntos y, si se repite, ajustamos la cuota.',
        f3: 'Con WhatsApp, los mensajes que envía WhatsApp los factura Meta directamente a tu cuenta: entre 1,7 y 3,3 céntimos por cita, calculado con la tarifa oficial de Meta en vigor desde el 1 de octubre de 2026. Las respuestas del asistente entran en los 1.000 mensajes gratis al mes que da Meta por número, que cubren hasta unas 250 citas al mes. Lo que se paga es el recordatorio, la confirmación y la petición de reseña. Lo que escriben tus clientes es gratis',
        cta: 'Ver el producto de citas'
      },
      ia: {
        title: 'Integración de IA · cuota del asistente',
        price: '90€ — 250€',
        period: '/ mes',
        desc: 'Un asistente de IA no se entrega y se olvida: hay que mirarlo cada mes, y cuanto más se fabricó, más hay que mirar. Tres tramos: 90€/mes con un solo canal, 150€/mes si son varios o lleva integraciones, y 250€/mes si es multicanal y además está conectado a tus sistemas. Va aparte del mantenimiento de la web, igual que la del producto de citas.',
        f1: 'Reviso las conversaciones y corrijo lo que se haya contestado mal o a medias',
        f2: 'Mantengo al día la información con la que responde: precios, servicios, horarios y textos',
        f3: 'Aquí el consumo de las APIs de IA lo pagas tú, en tu propia cuenta y a tu nombre — al contrario que en el producto de Citas, donde va incluido en la cuota',
        cta: 'Ver la Integración de IA'
      },
      not_included: {
        title: 'Lo que NO está incluido',
        desc: 'Costes de terceros a cargo del cliente — aunque te los gestiono yo: dominio y hosting, comisiones de pasarelas de pago (Stripe/PayPal), correo empresarial, herramientas de email marketing y consumo de APIs de IA. Tampoco incluye: redacción de textos y fotografías (los aporta el cliente; redacción asistida por IA disponible como extra), traducción humana profesional o jurada (la traducción con IA revisada sí va incluida en los idiomas contratados), publicidad de pago (Google/Meta Ads), gestión de redes sociales, y funcionalidades nuevas fuera del alcance acordado, que se presupuestan aparte. En el producto de citas con WhatsApp, tampoco los mensajes que envía WhatsApp: desde el 1 de octubre de 2026 Meta los cobra (entre 1,7 y 3,3 céntimos por cita reservada, calculado con su tarifa oficial) y te los factura directamente a ti, porque la cuenta de WhatsApp es tuya; lo que escriben tus clientes es gratis siempre. El coste del modelo de IA sí va incluido en la cuota mensual, para un uso normal del negocio (hasta 500 conversaciones al mes con una agenda y 250 más por cada agenda más).'
      },
      payment: {
        title: 'Métodos de Pago & Condiciones',
        methods: 'Transferencia bancaria.',
        conditions: 'Condiciones: Para contratar solo se pide una señal del 10% (mínimo 150€). El resto se reparte sin intereses en 3 o 4 cuotas, y cada una se paga contra una entrega —el diseño, el núcleo funcionando, el despliegue y la aceptación—, no contra una fecha del calendario. Y si ya has pagado la Auditoría de Procesos y aceptas la propuesta en los 30 días siguientes, esos 150€ cuentan como parte de la señal: si la señal es de 150€, no pagas nada para empezar, y si es mayor, solo la diferencia (con una señal de 200€, pagas 50€). Todos los precios son + IVA.'
      }
    },
    values: {
      title: '¿Por qué elegirme?',
      subtitle: 'Trabajas directamente con quien lo hace: sin intermediarios, sin plantillas y cerca de ti.',
      v1: {
        title: 'Vengo de la empresa',
        desc: 'Antes del software pasé doce años en compras y posventa, en una sociedad anónima y dos multinacionales: albaranes, facturas, presupuestos de reparación, proveedores y un taller a mi cargo. Por eso primero miro cómo trabajas, y la tecnología viene después. Y hablas siempre conmigo.'
      },
      v2: {
        title: 'Hecho a mano',
        desc: 'Lo hago a medida y de cero, sin plantillas ni veinte plugins de autores distintos que tengan que llevarse bien. Por eso va rápido y, si algo falla, sabes a quién llamar. Y si para lo tuyo te basta con WordPress, te lo digo.'
      },
      v3: {
        title: 'Cerca de ti',
        desc: 'Estoy en Lloret de Mar y voy a tu negocio: prefiero ver cómo trabajáis antes de proponer nada. Y si un día algo falla, estoy a un rato de coche.'
      },
      v4: {
        title: 'Y después, sigo ahí',
        desc: 'Cuando entrego, no desaparezco: te enseño a usarlo en persona, en tu negocio, y con el mantenimiento, si algo falla, me llamas a mí y lo arreglo yo.'
      }
    },
    process: {
      title: 'Mi Proceso de Trabajo',
      subtitle: 'Una hoja de ruta clara para dar forma a tu solución digital de principio a fin.',
      p1: {
        title: '01. Charla gratis',
        desc: '30 minutos para ver cómo trabajas y qué te quita tiempo. Si lo tuyo va a medida, después viene la auditoría.'
      },
      p2: {
        title: '02. Propuesta por escrito',
        desc: 'En la web ves rangos; en la propuesta, la cifra exacta, qué entra, qué no y los plazos. Pagas una señal y el resto contra entrega.'
      },
      p3: {
        title: '03. Lo construyo por partes',
        desc: 'Con cada entrega te enseño lo que ya está hecho y, si ya puedes usarlo, cómo se usa.'
      },
      p4: {
        title: '04. Lo usas y lo ajusto',
        desc: 'Con todo entregado, la primera semana ajusto lo que salga al usarlo de verdad, y después sigue el mantenimiento.'
      }
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Lo que más me preguntan antes de empezar un proyecto. Si tienes otra duda, escríbeme.',
      q1: {
        q: '¿Cuánto cuesta una página web?',
        a: 'Las dos tienen precio cerrado. Una Web Esencial (página única o hasta 4 secciones) cuesta 990€, y una Web Completa (blog, panel de gestión, portfolio y 2 idiomas) 2.490€. Las dos incluyen 1 semana de ajustes en vivo tras el lanzamiento y 3 meses de mantenimiento. Lo que entra se ve en la charla gratis y queda escrito en la propuesta; lo que se salga de ahí, como una integración o una zona privada, se presupuesta aparte.'
      },
      q2: {
        q: '¿Trabajas solo en Lloret de Mar o también fuera?',
        a: 'Tengo la base en Lloret de Mar y doy servicio presencial en toda la Costa Brava (Blanes, Tossa de Mar, Girona), pero trabajo en remoto con clientes de cualquier punto de España sin ningún problema.'
      },
      q3: {
        q: '¿Haces páginas web para inmobiliarias?',
        a: 'Sí, es uno de mis nichos. Si ya trabajas con un programa como Inmovilla, Witei o Mobilia, te hago la web conectada a él: cuando subes, cambias o vendes un piso, la web se actualiza sola, y los portales los sigue llevando tu programa, sin pagar dos veces. Buscador con filtros, fichas con galería y mapa, 2 idiomas para compradores extranjeros y SEO local, por 2.990€ con 3 meses de mantenimiento. Antes de la propuesta compruebo que tu programa deja conectar la web.'
      },
      q4: {
        q: '¿Puedo tener un chatbot con inteligencia artificial en mi web, como el tuyo?',
        a: 'Sí — de hecho el asistente TesS con el que puedes chatear ahora mismo en esta web es la demo en vivo de ese servicio. La Integración de IA cuesta entre 1.600€ y 6.000€ más la cuota del asistente (90€/mes con un solo canal, 150€/mes si son varios o lleva integraciones y 250€/mes si es multicanal y conectado a tus sistemas), según esa misma complejidad; las claves de API quedan a tu nombre, sin intermediarios.'
      },
      q5: {
        q: '¿En qué idiomas haces las webs?',
        a: 'Me comunico y trabajo en español, català e inglés, pero tu proyecto puede entregarse en cualquier idioma que necesites gracias a traducción asistida por IA — no estoy limitado a esos tres. La Web Esencial incluye 1 idioma (+90€ cada idioma adicional), la Web Completa y la Web Inmobiliaria incluyen 2 (+150€ cada adicional), y en la tienda online cada idioma son +150€ con sus primeros 50 productos. El idioma de más no cuesta lo mismo en todas las webs porque lo que se paga es traducir y revisar el texto, y depende de cuánto hay. La traducción incluye todo lo que hay en la web el día que te la entrego; lo que escribas después en el blog no va incluido: o lo traduces tú, o me lo pasas y te lo traduzco dentro de la hora de cambios al mes del mantenimiento. La traducción con IA revisada va incluida; la traducción humana profesional o jurada corre aparte.'
      },
      q6: {
        q: '¿Qué incluye el mantenimiento mensual?',
        a: 'Dos planes sin permanencia: el Básico (60€/mes) incluye monitorización 24/7, copias de seguridad semanales, actualizaciones, 1h/mes de cambios e informe trimestral. El Plus (150€/mes) añade copias diarias, 5h/mes de desarrollo, vigilancia de pasarelas de pago, respuesta el mismo día, también en fines de semana, festivos y vacaciones, e informe mensual. Aparte del mantenimiento hay dos cuotas propias, porque son servicios funcionando y no una web vigilada: el asistente de la Integración de IA (90-250€/mes) y las Citas que se reservan solas (29-59€/mes). Y en las Automatizaciones Específicas te recomiendo el Plan Básico (60€/mes) mientras estén en marcha, porque una automatización sin vigilar se rompe callada el día que cambia una API.'
      },
      q7: {
        q: '¿Cómo se paga un proyecto?',
        a: 'Una señal del 10% para contratar, con un mínimo de 150€, y el resto en 3 o 4 cuotas sin intereses. Lo importante: cada cuota se paga contra una entrega —el diseño y el alcance, el núcleo funcionando, el despliegue y la aceptación—, no contra una fecha. Así no pagas por adelantado un trabajo que todavía no has visto. Y si ya pagaste la Auditoría de Procesos y aceptas en los 30 días siguientes, esos 150€ se descuentan de la señal: en un proyecto de 5.900€ la señal son 590€, así que pagarías 440€. Se paga por transferencia bancaria.'
      },
      q8: {
        q: '¿Qué es la Auditoría de Procesos y para qué sirve?',
        a: 'Es una sesión de 60-90 minutos revisando tu operativa contigo y con tus datos delante —antes te digo qué tienes que traer, que es poco y depende de tu negocio—, y un informe escrito de 2-3 páginas: qué procesos te están costando tiempo o dinero, cuánto, y qué se puede automatizar y en qué orden. Con el informe te mando la propuesta con el precio de lo que saldría de ahí, y tú decides si la aceptas; si no veo nada que te compense, te lo digo y no hay propuesta. Cuesta 150€ y se descuentan del proyecto si aceptas la propuesta en los 30 días siguientes. Incluye también un repaso de tu web y tus redes. Antes de la auditoría está el diagnóstico gratuito de 30 minutos: si de momento solo quieres la conversación, no tienes que pagar nada.'
      },
      q9: {
        q: '¿Qué NO está incluido en el precio de un proyecto?',
        a: 'Los costes de terceros van a cargo del cliente aunque te los gestiono yo: dominio, hosting, comisiones de pasarelas de pago, correo empresarial y consumo de APIs de IA. Tampoco incluye redacción de textos/fotos (las aporta el cliente), traducción jurada, publicidad de pago ni gestión de redes sociales. En el producto de citas con WhatsApp tampoco entran los mensajes que envía WhatsApp: desde el 1 de octubre de 2026 los cobra Meta y te los factura a ti directamente, porque la cuenta es tuya — entre 1,7 y 3,3 céntimos por cita, calculado con la tarifa oficial de Meta. Lo que sí va incluido en esa cuota es el coste del modelo de IA, para un uso normal del negocio.'
      },
      q10: {
        q: '¿Puedes hacer que mi negocio coja las citas por WhatsApp?',
        a: 'Sí: es el producto de citas, en dos versiones y sin permanencia. Con WhatsApp, un asistente atiende tu WhatsApp las 24 horas: consulta los huecos libres de tu agenda, reserva la cita, la confirma y manda el recordatorio, sin que tengas que contestar tú. Cuesta 450€ de puesta en marcha y 59€/mes. Sin WhatsApp, tu cliente reserva en tu página de citas, a la que llega desde tu web, tu ficha de Google, tu Instagram o el enlace que le mandas, y la confirmación y el recordatorio le llegan por email: 150€ de puesta en marcha y 29€/mes. No es lo mismo más barato: ahí no hay asistente que converse, pero no dependes de Meta ni pagas mensajes. En las dos, cada agenda más suma 8€/mes, la agenda se conecta con tu Google Calendar y la petición de reseñas en Google va incluida. Todo, + IVA. Las dos van con garantía: si en los tres primeros meses no entra ni una sola cita fuera de tu horario de atención, te devuelvo la puesta en marcha. Para la versión con WhatsApp, tu número tiene que estar en la app WhatsApp Business, la de siempre con herramientas para negocios. Si aún no la usas, el cambio es gratis, tarda diez minutos y conservas número, chats y contactos; te ayudo a hacerlo. Tus clientes no notan nada, y tú sigues escribiendo desde el móvil a la vez que el asistente. Enlazar tu número con el sistema depende de una aprobación de Meta que no controlo. El plazo para tenerlo funcionando te lo doy por escrito en la propuesta.'
      },
      q11: {
        q: '¿Qué diferencia hay entre un chatbot, un asistente de IA y el sistema de citas por WhatsApp?',
        a: 'Por fuera se parecen y por dentro hacen cosas muy distintas, así que vale la pena aclararlo antes de pagar por lo que no necesitas. Un chatbot de respuestas guiadas (dentro de Automatizaciones Específicas) sigue un guion: botones y respuestas previstas, y en cuanto le preguntan algo que no estaba escrito, se atasca. Un asistente de IA, como TesS —con el que estás chateando en esta web—, entiende lo que le escriben con palabras normales y responde con la información de tu negocio: informa, orienta y recoge el contacto, pero no toca nada por dentro. Y el producto de citas, en su versión con WhatsApp, es un asistente de IA que además actúa: mira los huecos de verdad que tienes libres en tu agenda, reserva la cita, la confirma y manda el recordatorio. Esa es la diferencia que importa: los dos primeros cuentan cosas, el tercero hace el trabajo. Por eso solo el de citas lleva garantía, cuota propia y el coste del modelo de IA incluido, mientras que en la Integración de IA las claves de API son tuyas. Y aquí viene lo que suele extrañar: el de citas, que es el que más hace, es el más barato de los dos. No es una errata: es un producto, el mismo para todos los negocios, y lo que se hace es configurarlo con tus servicios, tus horarios y tu agenda; la Integración de IA se fabrica desde cero sobre tu documentación, tus canales y tus sistemas, y no hay dos iguales. Lo que pagas es la fabricación, no el número de funciones. Si dudas cuál te toca, la pregunta es sencilla: ¿lo que pierdes son consultas sin responder, o citas sin coger? Y si son citas, no pagues un desarrollo a medida: para eso está el producto de citas.'
      },
      q12: {
        q: '¿Por qué no me haces la web en WordPress, que sale más barata?',
        a: 'Porque no siempre te conviene, y prefiero decírtelo antes de cobrarte. Si lo que necesitas es una web de tres páginas que vas a mirar poco, WordPress te sirve y habrá quien te la haga por menos que yo: no te voy a vender lo contrario. Donde la cosa cambia es cuando la web tiene que hacer algo además de estar bonita — hablar con tu agenda, con tu programa de gestión o con tu WhatsApp, o quitarte de encima algo que hoy haces a mano. Ahí una web de plantilla se resuelve añadiendo plugins de terceros, y cada plugin es una actualización que puede romper otra cosa, a veces una licencia anual, y siempre alguien a quien llamar que no eres tú. Lo hago a medida y de cero, así que no hay veinte piezas de veinte autores distintos que tengan que llevarse bien. Y el mantenimiento lo hago yo, que es la diferencia que de verdad se nota al segundo año. Si aun así WordPress es lo que te encaja, te lo digo en el diagnóstico y no te cobro por descubrirlo.'
      },
      q13: {
        q: '¿Y si no pago el mantenimiento, o no lo renuevo cuando acabe el año incluido?',
        a: 'Nada se renueva solo: donde el mantenimiento va incluido (los 3 primeros meses en las webs y la tienda online, y el primer año en los programas de gestión) te aviso antes de que acabe para que decidas tú, y no hay permanencia en ningún caso. A partir de ahí depende de lo que sea. Lo que es tuyo se queda: lo que te hice sigue siendo tuyo y, si es una web o un programa, sigue funcionando, con o sin mantenimiento; lo que pierdes es la red de seguridad — monitorización, copias, actualizaciones, corrección de errores y la hora de cambios al mes —, así que si un día se rompe algo te enteras tú y arreglarlo se presupuesta aparte. Lo mismo con las Automatizaciones Específicas y el asistente de la Integración de IA: siguen funcionando en tus cuentas, pero sin nadie que los vigile ni los revise. La única excepción es el producto de citas: se para si cancelas la cuota, avisándote 15 días antes, porque funciona en mis servidores y la inteligencia artificial va en mi cuenta. Y si más adelante quieres retomarlo, se mira en qué estado quedó y la puesta al día se presupuesta aparte.'
      },
      q14: {
        q: '¿Dónde quedan los datos de mis clientes o pacientes?',
        a: 'Lo que te hago a medida (web, programa o automatización) va en cuentas a tu nombre: dominio, hosting, base de datos y tu número de WhatsApp, con los datos en servidores de la Unión Europea, y es tuyo con su código cuando lo has pagado entero: te lo entrego. El producto de citas es distinto: es el mismo para todos los negocios que lo usan y funciona en mis servidores, también en la Unión Europea, con los datos de cada negocio separados de los demás. Por eso cuesta menos. Lo usas mientras pagas la cuota, y tus clientes y tus citas son siempre tuyos: las citas las tienes también en tu Google Calendar, y si lo dejas te doy en un Excel la lista de clientes y todas sus citas. La inteligencia artificial del asistente va en mi cuenta de Google Cloud, en la UE, con su acuerdo de protección de datos y sin que Google use las conversaciones para entrenar nada. Las conversaciones del asistente solo las veo yo, y solo si hay un fallo que corregir o si tú me lo pides. En el asistente a medida (06), revisarlas cada mes es parte del servicio, para corregir lo que conteste mal. Y siempre firmamos el contrato de protección de datos que pide la ley. Si tu negocio trata datos de salud, el contrato lo recoge y lo vemos antes de empezar.'
      },
      q15: {
        q: '¿Y si trabajas solo y un día no estás?',
        a: 'Hablas siempre con quien lo ha hecho, sin centralitas. Lo que monto funciona solo y lo vigilo a todas horas: si algo falla, me entero antes que tú. Y no te quedas atado: todo va a tu nombre y lo que te hago a medida es tuyo, con su código, cuando lo has pagado. Y si te hace falta que te atienda también en fines de semana y vacaciones, está el Plan Plus.'
      },
      q16: {
        q: '¿Por qué una web tuya si mi programa inmobiliario ya me da una?',
        a: 'Si la que te da tu programa te basta, quédate con ella: no te voy a vender lo contrario. La diferencia está en tres cosas. La primera, que sea tuya de verdad: la del programa suele salir de su catálogo de plantillas, con la misma base que usan otras agencias, y esta se hace para ti, con tu marca, tus zonas y cómo quieres que el comprador extranjero vea tus pisos. La segunda, que no dependa del programa: si un día cambias de programa, tu web se queda y solo hay que conectarla al nuevo; con la del programa, si te vas, te quedas sin web. Y la tercera, que te encuentren por tu zona y en cada idioma: el SEO y los idiomas se hacen a mano para la Costa Brava, para que te busquen a ti y no solo te vean en un portal al lado de todas las demás. He medido en el móvil las webs que dan los programas a dos agencias de Lloret: tardan entre 8 y 16 segundos en enseñar lo principal, y Google considera bueno menos de 2,5. La tuya se hace para que cargue rápido, y te enseño la medida antes de que pagues la última parte.'
      },
      q17: {
        q: '¿Por qué la tienda va sobre Shopify si tus webs las haces a mano?',
        a: 'Porque en una tienda lo difícil no es el diseño: son los pagos, el stock, los impuestos, los envíos, las devoluciones y las facturas con Verifactu, y Shopify ya lo resuelve bien. Así queda el reparto. Shopify se encarga de que la tienda esté siempre en línea, de la seguridad y los datos de las tarjetas, de las actualizaciones, del carrito y el cobro (tarjeta y Bizum), y del panel y la app del móvil donde ves pedidos, clientes y stock; su cuota (desde 24€/mes) y sus comisiones las pagas tú, directamente a Shopify. Yo me encargo de tu diseño, de cargar tu catálogo, de dejar configurados los pagos, los envíos, los impuestos y los textos legales, y de elegir y configurar la app que emite tus facturas con Verifactu (su cuota la pagas tú, como la de Shopify); de enseñarte a usarla y, con el mantenimiento, de vigilar que los pagos y las facturas sigan entrando y hacer los cambios que me pidas. Si falla una app, lo detecto y lo resuelvo con quien la hace. Y lo que es tuyo: la cuenta de Shopify va a tu nombre, con tu tarjeta, y tus productos, pedidos y clientes son tuyos. Si un día dejas de trabajar conmigo, tu tienda sigue funcionando igual.'
      },
      q18: {
        q: '¿Por qué contigo y no me la monto yo en Shopify?',
        a: 'Si tienes tiempo y te apetece, móntatela: Shopify está pensado para eso y no te voy a decir lo contrario. Lo que yo te ahorro es lo que suele salir mal o quedarse a medias. La configuración que tiene consecuencias: los impuestos, los envíos, Bizum, los textos legales de venta y, sobre todo, las facturas con Verifactu, que si fallan son un problema con Hacienda. Una tienda con tu marca, y no la plantilla tal cual. Y alguien de aquí que vigila que los pagos y las facturas sigan entrando. Si lo necesitas, también la conecto con lo que ya usas (el stock de tu tienda física, tu facturación o tu TPV); eso se presupuesta aparte, porque depende de qué uses. Si aún no tienes TPV o te planteas cambiarlo, hay una forma sin conexión: cobrar también en el mostrador con Shopify, que viene incluido en su cuota, y así el stock de la tienda y el de la web es el mismo. La cuenta sigue siendo tuya: si un día quieres llevarla tú solo, puedes.'
      }
    },
    contact: {
      title: '¿Hacemos encajar las piezas?',
      subtitle: 'Escríbeme sobre tu proyecto para agendar una cita o pedir información técnica, sin compromiso.',
      calendly_title: 'Reserva el diagnóstico gratuito de 30 minutos',
      calendly_desc: 'Es la forma más rápida: eliges hueco y hablamos. Sin coste, sin compromiso y con tu negocio ya mirado por delante. Si prefieres escribir primero, tienes el formulario aquí mismo.',
      calendly_btn: 'Elegir hueco en el calendario',
      name: 'Nombre o Empresa',
      email: 'Tu Correo Electrónico',
      phone: 'Teléfono o WhatsApp',
      budget_opt0: 'Todavía no lo sé',
      urgency_opt0: 'Todavía no lo sé',
      phone_hint: 'Opcional, pero por aquí te contesto antes',
      message: 'Cuéntame brevemente qué necesitas...',
      reason: '¿Qué deseas hacer?',
      reason_opt1: 'Solicitar información general',
      reason_opt2: 'Agendar una cita / reunión',
      reason_opt3: 'Solicitar presupuesto a medida',
      budget: 'Presupuesto orientativo',
      budget_opt1: 'Menos de 1.000€',
      budget_opt2: '1.000€ - 4.000€',
      budget_opt3: '4.000€ - 10.000€',
      budget_opt4: 'Más de 10.000€',
      urgency: 'Urgencia del proyecto',
      urgency_opt1: 'Inmediata',
      urgency_opt2: 'En 1 mes',
      urgency_opt3: 'Más de 3 meses',
      gdpr: 'He leído y acepto los términos de la política de privacidad de datos para el tratamiento de mi solicitud de contacto.',
      send: 'Enviar Solicitud',
      sending: 'Enviando...',
      success: '¡Solicitud enviada! Me pondré en contacto contigo lo antes posible para agendar la cita o enviarte los detalles.',
      error: 'Error al enviar el mensaje. Inténtalo otra vez o escríbeme directamente a: info@teselarsoftware.com'
    },
    simulator: {
      title: 'Simulador de Retorno de Inversión (ROI)',
      subtitle: 'Descubre cuánto tiempo y dinero estás perdiendo por no automatizar las tareas repetitivas de tu negocio.',
      label_hours: 'Horas a la semana en tareas que se repiten (pasar datos, hacer facturas, llamar para recordar…)',
      label_employees: 'Número de empleados haciendo estas tareas',
      label_cost: 'Coste medio por hora del empleado',
      result_monthly: 'Coste mensual estimado',
      result_yearly: 'Coste anual estimado',
      result_hours: 'Tiempo anual en estas tareas',
      rec_texto: 'Esto es lo que se te va. En el diagnóstico vemos qué pieza lo recupera, y si no compensa, te lo digo.',
      btn_apply: 'Llevar estos números al formulario',
      notif_linked: '¡Simulación vinculada con éxito en el formulario!'
    },
    leads: {
      sticky_cta: 'Consulta gratuita',
      sticky_cta_long: 'Reserva tu consulta gratuita',
      exit_title: '¡Espera! Tu primera consulta es GRATIS',
      exit_subtitle: 'Déjame tu contacto y te llamo sin compromiso para ver tu proyecto.',
      exit_name: 'Tu nombre',
      exit_email: 'Tu email',
      exit_btn: 'Quiero mi consulta gratis',
      exit_close: 'No, gracias',
      exit_gdpr: 'Acepto la política de privacidad',
      toast_title: '¿Necesitas ayuda para decidir?',
      toast_text: 'Escríbeme sin compromiso y te aconsejo la mejor solución para tu negocio.',
      toast_btn: 'Hablar con Rubén',
      inline_title: '¿Tienes un proyecto en mente?',
      inline_subtitle: 'Cuéntame tu idea y te aconsejo sin compromiso. Cada negocio es único.',
      inline_btn: 'Cuéntame tu caso',
      cta_whatsapp: 'Escríbeme por WhatsApp',
      cta_form: 'Cuéntame tu caso',
      wa_generico: 'Hola Rubén, vengo de tu web y quería preguntarte una cosa.',
      wa_servicios: 'Hola Rubén, vengo de tu web. He estado mirando los servicios y quería preguntarte por uno.',
      wa_roi: 'Hola Rubén, vengo de tu web. Me ha llamado la atención lo del tiempo que se pierde y quería contarte mi caso.',
      wa_precios: 'Hola Rubén, vengo de la sección de precios de tu web y quería preguntarte por un presupuesto.',
      post_services: 'Cojo pocos proyectos a la vez, para hacer bien cada uno, y en la propuesta te digo por escrito cuándo empiezo.',
      post_services_btn: 'Reserva tu plaza',
      post_roi: 'Tu proyecto merece atención personalizada. Reserva tu consulta y te cuento cómo puedo ayudarte.',
      post_roi_btn: 'Agendar consulta personalizada',
      post_pricing: 'Cada solución que hago es única, como tu negocio. Hablemos de lo que necesitas.',
      post_pricing_btn: 'Solicitar presupuesto a medida'
    },
    // Demo de gestion (/es/demo, ADR-113). Los ejemplos de cada sector estan en src/data/demo.ts.
    demo: {
      meta_title: 'Demo: tu empresa organizada en dos minutos | Teselar Software',
      meta_description: 'Elige tu sector y lo que llevas en tu empresa, y mira cómo quedarían tus técnicos, clientes, facturas, citas y material en un solo sitio. Gratis y sin registrarte.',
      banda: 'Simulación · datos de ejemplo según tu sector',
      volver: 'Volver a la web',
      titulo: 'Mira tu empresa organizada en dos minutos.',
      intro: 'Dime a qué te dedicas, qué llevas (avisos y técnicos, clientes, facturas, citas o material) y cómo lo llevas hoy. Te enseño cómo quedaría todo en un solo sitio, con ejemplos de tu sector.',
      quien: 'Soy Rubén Reyes, de Teselar Software, en Lloret de Mar.',
      empresa_label: 'Nombre de tu empresa',
      empresa_placeholder: 'p. ej. Serveis Costa',
      sector_legend: '¿A qué os dedicáis?',
      otro_label: 'Cuéntame a qué os dedicáis',
      otro_placeholder: 'p. ej. jardinería y piscinas',
      lleva_legend: '¿Qué llevas en tu empresa?',
      lleva_hint: 'Marca las que quieras',
      partes: {
        tec: 'Técnicos que salen a trabajar',
        cli: 'Clientes y presupuestos',
        fac: 'Facturas y cobros',
        cit: 'Citas o agenda',
        mat: 'Material o almacén',
      },
      como_legend: '¿Cómo lo llevas hoy?',
      como: {
        papel: 'Papel y libreta',
        excel: 'Excel',
        whatsapp: 'WhatsApp y memoria',
        programa: 'Un programa que no me convence',
      },
      ejemplar: 'Ejemplar Nº 001',
      preparado: 'Preparado para',
      tu_empresa: 'tu empresa',
      sin_sector: 'Elige tu sector',
      sin_partes: 'Marca qué llevas',
      ver: 'Ver mi sistema',
      panel_dia: 'Martes · lo que pasa hoy',
      panel_vacio: 'Marca arriba lo que llevas en tu empresa y aparecerá aquí.',
      cta_titulo: '¿Lo vemos con tu caso?',
      cta_texto: 'Es una charla de 30 minutos, gratis, normalmente por videollamada. Si tu negocio está a menos de media hora de Lloret de Mar, también puede ser en persona; si estás algo más lejos, pregúntame. Después te llevas por escrito lo que vimos. Si reservas, me llega lo que has marcado aquí, para no preguntártelo otra vez.',
      // En la demo no se dice «diagnostico» (segunda pasada del ensayo, 24/10): a una peluqueria le sonaba a medico, a
      // un taller a algo que se cobra y a otros a gancho comercial. En el resto de la web y en el Calendly sigue el nombre.
      cta_btn: 'Reservar una charla gratis',
      cta_sub: 'En mi calendario · 30 minutos, sin compromiso',
      // Lo que ya tienen solo se promete mirarlo; pasarlo se presupuesta aparte. Hasta la segunda pasada del ensayo
      // (24/10) empezaba por «Lo que se puede hacer solo, se hace solo…»: no enganchaba a nadie y sonaba a evasiva.
      // Tampoco se promete que algo salga solo: depende de cada proyecto, y WhatsApp tiene coste (ADR-041).
      // {como} es lo que ha marcado en «¿Como lo llevas hoy?»: quien marco WhatsApp y no lo veia nombrado sentia que no
      // se le habia leido (cuarta pasada, 24/10).
      nota: 'En la charla me cuentas cómo lo llevas hoy ({como}) y vemos qué se pasa y cómo. No hace falta que me enseñes datos de tus clientes.',
      nota_como: 'Excel, papel, WhatsApp o tu programa',
      // Plegado al final (24/10): responde sin cargar la pagina a lo que preguntaban los lectores del ensayo. Que todo
      // vaya a nombre del cliente vale para cualquier producto (Ruben). El contrato de encargado no se nombra: genera mas
      // dudas de las que quita.
      // Solo en fisio y gestoria (datos de salud y fiscales): alli lo pedian; en el resto genera mas dudas (Ruben, 24/10).
      faq_titulo: 'Lo que más me preguntan',
      faq: [
        { id: 'whatsapp', p: '¿Cómo entra sola una cita por WhatsApp?', r: 'Si quieres, un asistente con inteligencia artificial atiende el WhatsApp de tu negocio: mira los huecos libres, reserva la cita y la confirma. Tú ves en la agenda lo que ha entrado.' },
        { p: '¿Quién me atiende si algo falla?', r: 'Yo, directamente: hablas siempre con quien lo ha hecho. Funciona solo y lo vigilo a todas horas, así que si algo falla me entero antes que tú. También cubro fines de semana y vacaciones, si los necesitas. Y no te quedas atado: todo va a tu nombre y el código de lo hecho a medida es tuyo.' },
        { p: '¿Es un programa hecho o a medida?', r: 'A medida y por partes: empezamos por lo que más te pesa.' },
        { id: 'datos', p: '¿Dónde se guardan mis datos?', r: 'Lo que te hago a medida (web, programa o automatización) va en cuentas a tu nombre: dominio, hosting, base de datos y tu número de WhatsApp, con los datos en servidores de la Unión Europea, y es tuyo con su código cuando lo has pagado entero: te lo entrego. El producto de citas es distinto: es el mismo para todos los negocios que lo usan y funciona en mis servidores, también en la Unión Europea, con los datos de cada negocio separados de los demás. Por eso cuesta menos. Lo usas mientras pagas la cuota, y tus clientes y tus citas son siempre tuyos: las citas las tienes también en tu Google Calendar, y si lo dejas te doy en un Excel la lista de clientes y todas sus citas. La inteligencia artificial del asistente va en mi cuenta de Google Cloud, en la UE, con su acuerdo de protección de datos y sin que Google use las conversaciones para entrenar nada. Las conversaciones del asistente solo las veo yo, y solo si hay un fallo que corregir o si tú me lo pides. En el asistente a medida (06), revisarlas cada mes es parte del servicio, para corregir lo que conteste mal. Y siempre firmamos el contrato de protección de datos que pide la ley. Si tu negocio trata datos de salud, el contrato lo recoge y lo vemos antes de empezar.' },
      ],
      otro_prefijo: 'Otro',
      portada_pregunta: '¿Quieres verlo antes de hablar?',
      portada_link: 'Pruébalo con tu empresa',
      portada_nota: '2 minutos y sin registrarte: eliges tu sector y ves cómo quedaría tu día a día.',
      // Cuando llega desde el documento 2 (&desde=doc2): ya hizo el diagnostico.
      doc2_titulo: '¿Lo hablamos?',
      doc2_texto: 'Si quieres darle una vuelta a lo que hemos visto, escríbeme y lo miramos juntos.',
      doc2_btn: 'Escribir a Rubén por WhatsApp',
      doc2_sub: 'Te contesto yo',
      wa_con_empresa: 'Hola Rubén, he visto la demo que me preparaste para {empresa}.',
      wa_sin_empresa: 'Hola Rubén, he visto la demo que me preparaste.',
      // Debajo de cada parte del panel: como funcionaria y que deja de pasar. Desde el 24/10 cada sector lleva los suyos
      // (src/data/demo.ts, `explica`); estos comunes solo los usa «Otro».
      // Sin cifras: no hay nada medido que las respalde (ADR-025).
      // La linea que va a la pregunta 4 del Calendly, «Lo que ya me has contado».
      calendly_etiquetas: { sector: 'Sector', lleva: 'Llevo', como: 'Hoy' },
      como_label: 'Cómo funciona',
      ahorro_label: 'Te ahorras',
      explica: {
        tec: { como: 'Repartes el trabajo desde donde estés y cada persona ve en el móvil a dónde va hoy y qué tiene que hacer.', ahorro: 'Las llamadas de primera hora para repartir el trabajo y los cambios que se pierden en el WhatsApp.' },
        parte: { como: 'Al acabar se rellena en el móvil y el cliente firma en la pantalla. Te llega en cuanto el móvil tiene cobertura.', ahorro: 'Pasar a limpio hojas de papel y perseguir horas o datos que nadie apuntó.' },
        cli: { como: 'Cada cliente con su historial, lo que se le ha ofrecido y lo que toca hacer después. Te avisa de lo que lleva días parado.', ahorro: 'Los presupuestos que se enfrían porque nadie volvió a llamar y las renovaciones que se pasan.' },
        fac: { como: 'La factura sale del trabajo hecho, sin volver a escribirlo, y ves de un vistazo qué falta por cobrar.', ahorro: 'Hacer las facturas de memoria a final de mes y los cobros que nadie reclama.' },
        cit: { como: 'Una sola agenda para todo el equipo, con las citas que entran por teléfono o por WhatsApp, y un recordatorio al cliente el día antes.', ahorro: 'Citas apuntadas en varios sitios a la vez y clientes que se olvidan de venir.' },
        mat: { como: 'Sabes qué tienes, quién lo tiene y qué se está acabando, y te avisa antes de que falte.', ahorro: 'Quedarte sin algo justo cuando hace falta y los viajes de más a buscarlo.' },
      },
    }
  },
  ca: {
    nav: {
      services: 'Serveis',
      pricing: 'Preus',
      values: 'Per què TESELAR?',
      process: 'Procés',
      faq: 'Preguntes Freqüents',
      contact: 'Agendar Cita'
    },
    a11y: {
      abrir_menu: 'Obrir menú',
      cerrar_menu: 'Tancar menú',
      cambiar_idioma: 'Canviar idioma',
      cerrar: 'Tancar'
    },
    hero: {
      tagline: 'Teselar Software',
      title: 'La peça exacta on la tecnologia i el teu negoci encaixen perfectament',
      subtitle: 'Programes per portar clients, pressupostos, factures i tècnics en un sol lloc, assistents que atenen el teu WhatsApp i webs fetes a mà. Per a instal·ladors, reformes, tallers, clíniques, perruqueries, immobiliàries i gestories. Els faig jo, aquí a Lloret de Mar.',
      meta_description: 'Assistents amb intel·ligència artificial, automatitzacions i programes a mida per a negocis de Lloret de Mar i la Costa Brava. Els faig jo, de principi a fi.',
      cta: 'Sol·licitar informació',
      cta_alt: 'Diagnòstic gratis · 30 min',
      cta_note: 'Gratis i sense compromís. Abans de parlar miro el teu web, la teva fitxa de Google i com et contacten els teus clients, per no començar de zero.',
      quien: 'Sóc Rubén Reyes, de Teselar Software. T’atenc jo.',
      piezas: ['Clients', 'Factures', 'Agenda', 'Web', 'WhatsApp', 'Equip'],
      pieza_texto: 'El que et falta, fet a la mida del forat',
      piezas_desc: ['Els teus clients i el seu historial, en un sol lloc', 'Pressupostos i factures que surten sols', 'Cites que es reserven sense trucar', 'Una web feta a mà, ràpida', 'Respostes i recordatoris automàtics', 'Avisos, tècnics i parts de treball des del mòbil'],
      piezas_alt: 'Les peces d\'un negoci encaixades, amb la de Teselar al forat que faltava'
    },
    concept: {
      title: 'La Peça que Encaixa',
      text1: 'Una tessel·lació és un mosaic de peces que encaixen sense deixar forats, com les rajoles d’un terra.',
      text2: 'El teu negoci ja té les seves peces: clients, factures, agenda, WhatsApp, el teu equip. El que faig és la que falta perquè encaixin i deixis de passar dades d’una a l’altra a mà.'
    },
    services: {
      title: 'Catàleg de Serveis',
      subtitle: 'Solucions modulars adaptades a la teva mida i pressupost. El que no hi entra ho tens escrit aquí sota i, una altra vegada, a la teva proposta.',
      ideal: 'Ideal per a:',
      pricing: 'Preu',
      features: 'Què inclou:',
      live_adjustments: 'Tots els meus projectes de desenvolupament web i de programari inclouen 1 setmana d\'ajustaments en viu sense cost addicional després del llançament.',
      interest: 'M\'interessa aquest servei',
      tres_ia: {
        title: 'Tres serveis parlen per WhatsApp i no són el mateix',
        c1_title: 'Xatbot guiat · dins del 03',
        c1_desc: 'Segueix un guió de botons i respostes previstes. Barat i suficient si les preguntes són sempre les mateixes; així que se surten del guió, s\'encalla.',
        c2_title: 'Assistent d\'IA · el 06',
        c2_desc: 'Entén el que li escriuen amb paraules normals i respon amb la informació del teu negoci. Informa i orienta, però no toca la teva agenda. Es construeix a mida sobre la teva documentació, els teus canals i els teus sistemes: per això el rang és ampli. És el xat que tens a la cantonada d’aquest web: la TesS. Pregunta-li el que vulguis.',
        c3_title: 'Cites que es reserven soles · el 02',
        c3_desc: 'Un assistent d\'IA que a més actua: mira els forats que tens lliures de debò, reserva la cita, la confirma i envia el recordatori. És un producte, el mateix per a tots els negocis: es configura amb els teus serveis i els teus horaris, i per això és més barat que un desenvolupament a mida i pot portar garantia.',
        nota: 'La pregunta per triar és senzilla: el que perds són consultes sense respondre, o cites sense agafar? I si són cites, no paguis un desenvolupament a mida: el producte de cites et surt més barat.'
      },
      categories: {
        web: 'Desenvolupament Web',
        automation: 'Automatització i IA',
        systems: 'Programes de gestió'
      },
      vat: '+ IVA',
      s1: {
        title: '01. Auditoria de Processos',
        ideal: 'Negocis que sospiten que perden temps o diners en la seva operativa i volen saber on, per escrit, abans d\'invertir. És el segon pas quan el que necessites va a mida: la porta d\'entrada és el diagnòstic gratuït de 30 minuts, i si d\'allà en surt una cosa tancada —les cites, un web, una botiga en línia o una automatització petita— passes directament a la proposta, sense auditoria. Aquests 150€ es descompten del projecte si acceptes la proposta en els 30 dies següents: compten com a part del senyal.',
        price: '150€ (Descomptable del teu projecte)',
        tag: 'Processos i costos',
        f1: 'Sessió de 60-90 minuts revisant la teva operativa amb les teves dades al davant. Abans et dic què has de portar, que és poc i depèn del teu negoci',
        f2: 'Mapatge de fins a tres processos: qui fa què, quan i amb quina eina',
        f3: 'On es generen esperes, errors o feina repetida',
        f4: 'Els teus números: quantes vegades fas una tasca, quant temps et porta i quant et costa',
        f5: 'Què es pot automatitzar, què no, i en quin ordre',
        f6: 'Informe escrit de 2-3 pàgines amb prioritats, i amb ell la proposta amb el preu del que en sortiria: tu decideixes si l\'acceptes. Si no veig res que et compensi, t\'ho dic i no hi ha proposta',
        f7: 'Un repàs del teu web i les teves xarxes, inclòs'
      },
      s2: {
        title: '03. Automatitzacions Específiques',
        ideal: 'Empreses amb una tasca repetitiva concreta que es volen treure del damunt: un procés que avui algú fa a mà, cada setmana, sempre igual.',
        price: '700€ — 1.800€ + 60€/mes',
        tag: 'Apps Script + APIs + Make',
        f1: 'Generador automàtic de pressupostos en PDF des d\'un formulari',
        f2: 'Enviament automàtic de factures per correu amb les dades dels teus clients',
        f3: 'Extractor automatitzat de dades de correus a Google Sheets',
        f4: 'Xatbot de respostes guiades per a WhatsApp o Telegram (segueix un guió; si necessites que entengui llenguatge lliure, això és la Integració d\'IA)',
        f5: 'Que dos programes que ja fas servir es passin les dades sols, en els dos sentits',
        f6: 'Sistema intel·ligent de recordatoris i alertes automàtiques',
        f7: 'Informes diaris o setmanals automàtics per correu electrònic',
        f8: 'Pla Bàsic de manteniment (60€/mes), recomanat mentre l’automatització estigui en marxa: vigilo que segueixi funcionant i l’arreglo si canvia una API o caduca una credencial. Sense ell continua funcionant, però ningú no la vigila, i el que es trenqui es pressuposta a part. On acaba la meva feina: no cobreix funcions noves, canvis del procés ni integrar eines que no fossin a l\'abast acordat — això es pressuposta a part'
      },
      s3: {
        title: '04. Web Essencial',
        ideal: 'Freelancers, petites empreses, professionals independents i nous emprenedors.',
        price: '990€',
        tag: 'React + Vite + Tailwind CSS',
        f1: 'Pàgina única d’alt impacte o fins a 4 seccions',
        f2: 'Disseny web modern, responsive i optimizat per a mòbil',
        f3: 'Formulari de contacte i botó de WhatsApp amb notificació automàtica',
        f4: '1 idioma inclòs — cada idioma addicional +90€',
        f5: 'SEO tècnic bàsic (meta tags, estructura HTML neta) i enllaçat amb la teva fitxa de Google i el teu Instagram',
        f6: 'Optimització extrema de velocitat de càrrega i rendiment, i sense galetes de seguiment: no necessites bàner de galetes',
        f7: 'Textos legals (avís legal i privacitat) i 1 setmana d’ajustaments en viu durant el desplegament',
        f8: '3 mesos de manteniment (Pla Bàsic) inclosos; quan s’acaba el segon t’aviso i decideixes si continues, sense permanència'
      },
      s4: {
        title: '06. Integració d\'Intel·ligència Artificial',
        ideal: 'Negocis que reben moltes preguntes repetides i les contesten a mà: horaris, preus, com funciona una cosa, si fas tal servei. L\'assistent respon per tu amb la informació del teu negoci, però no gestiona la teva agenda — si el que se t\'escapa són cites, el servei és el 03. El preu final depèn de la complexitat: un xatbot senzill d\'un sol canal se situa en la part baixa del rang; un assistent avançat amb múltiples integracions i canals (web, WhatsApp, Telegram), en la part alta.',
        price: '1.600€ — 6.000€ + 90-250€/mes',
        tag: 'OpenAI / Anthropic APIs',
        f1: 'Assistent virtual amb IA entrenat amb la teva documentació interna',
        f2: 'Xatbot intel·ligent d\'atenció per a web, WhatsApp o Telegram: informa i orienta amb les teves dades, sense gestionar la teva agenda (per això hi ha les Cites que es reserven soles, el 02)',
        f3: 'Generació automàtica de continguts o respostes predefinides',
        f4: 'Anàlisi, classificació i resum automàtic de documents',
        f5: 'Automatització avançada amb processament de llenguatge natural',
        f6: 'Integració directa amb models GPT, Claude o homòlegs',
        f7: 'Quota mensual de l\'assistent, recomanada i en tres trams: 90€/mes si atén un sol canal, 150€/mes si en són diversos o porta integracions, i 250€/mes si és multicanal i a més s\'integra amb els teus sistemes. Inclou revisar les converses, corregir el que es respongui malament i mantenir al dia la informació amb què respon. El consum de les APIs d\'IA va al teu propi compte, al teu nom'
      },
      s5: {
        title: '07. Web Completa',
        ideal: 'Pimes que necessiten la web de veritat del seu negoci: catàleg o portfoli, blog i preparada per a clients estrangers.',
        price: '2.490€ (2 idiomes inclosos)',
        tag: 'React + Vite + Headless CMS',
        hereda: 'Inclou tot el del Web Essencial (04): disseny responsive, formulari i botó de WhatsApp, SEO bàsic, textos legals, sense galetes de seguiment, 1 setmana d’ajustaments en viu i 3 mesos de manteniment inclosos',
        f1: 'Fins a 8 seccions, que deixem tancades per escrit a la proposta',
        f2: 'Galeria de projectes o portfoli interactiu amb filtres dinàmics',
        f3: 'Secció autogestionable de blog, articles o notícies',
        f4: 'Panell d\'administració intuïtiu per gestionar continguts',
        f5: '2 idiomes inclosos amb detecció automàtica — cada idioma addicional +150€',
        f6: 'SEO tècnic complet (sitemap, hreflang, Google Search Console)',
        f7: '1 setmana d\'ajustaments en viu i formació d\'ús inclosa'
      },
      s6: {
        title: '05. Botiga Online / E-commerce',
        ideal: 'Comerços locals o marques que volen vendre en línia sense muntar ni mantenir una plataforma pròpia.',
        price: '1.490€',
        tag: 'Shopify',
        hereda: 'Sobre Shopify, en un compte a nom teu: Shopify s’encarrega que estigui en línia, de la seguretat, els pagaments i les actualitzacions (la seva quota, des de 24€/mes, la de l’app de factures i les seves comissions les pagues tu directament). Jo, del disseny, el catàleg, la configuració, les factures amb Verifactu i de vigilar que tot continuï entrant.',
        f1: 'Disseny amb la teva marca sobre una plantilla de Shopify, ràpida i adaptada al mòbil',
        f2: 'Fins a 50 productes carregats. Cada 50 més, +90€ si els carrego jo, o gratis si els carregues tu des de la plantilla, que t’ensenyo a fer servir',
        f3: 'Cobrament amb targeta i Bizum, configurat i provat',
        f4: 'Factures amb Verifactu des de la primera comanda: les emet una app de Shopify (la seva quota, uns 10€/mes, la pagues tu) i jo la deixo configurada i vigilo que funcioni',
        f5: 'Enviaments, impostos i textos legals de venda (condicions i devolucions)',
        f6: '1 idioma inclòs — cada idioma addicional +150€, amb els 50 productes; cada 50 productes més, +90€ per idioma',
        f7: 'Connectada amb el que ja fas servir (l’estoc de la teva botiga física, la teva facturació o el teu TPV), pressupostat a part',
        f8: '1 setmana d’ajustaments i 3 mesos de manteniment inclosos: vigilo que els pagaments i les factures continuïn entrant. Després, 60€/mes sense permanència (o el Pla Plus si el volum de comandes ho demana)'
      },
      s7: {
        title: '08. Web Immobiliària',
        ideal: 'Immobiliàries que ja treballen amb un programa de gestió (Inmovilla, Witei, Mobilia…) i volen un web propi a l’altura, per captar compradors estrangers.',
        price: '2.990€ (2 idiomes inclosos)',
        tag: 'Web + connexió amb el teu programa',
        f1: 'Cercador de propietats amb filtres (zona, preu, tipus, habitacions)',
        f2: 'Fitxes de propietat amb galeria, mapa i sistema de destacats',
        f3: 'Connectat al programa que ja fas servir: quan puges, canvies o vens un pis, el web s’actualitza sol',
        f4: '2 idiomes inclosos per a compradors estrangers — cada idioma addicional +150€',
        f5: 'Sense pagar dues vegades: els portals (Idealista, Fotocasa, Habitaclia…) els continua portant el teu programa, com fins ara',
        f6: 'Formulari de contacte per propietat i botó de WhatsApp',
        f7: 'SEO local, textos legals, sense galetes de seguiment, 1 setmana d’ajustaments i 3 mesos de manteniment inclosos. Després te’l recomano: és el que vigila que la connexió amb el teu programa no es trenqui; sense ell continua funcionant, però si es trenca te n’assabentes tu',
        f8: 'Abans de la proposta comprovo que el teu programa deixa connectar el web; si no ho deixa, t’ho dic i no hi ha proposta'
      },
      s8: {
        title: '09. Programes de gestió a mida',
        paso: 'Tres peces que es combinen: 5.900€ cadascuna; dues juntes, 10.915€; les tres, 15.930€. Sense pagar per usuari. Comença per l’auditoria (150 €, es descompten): hi confirmem que et serveix i veiem què cal afegir per al teu negoci, que es pressuposta a part. Si no veig res que et compensi, t’ho dic i no hi ha proposta.',
        ideal: 'Negocis que volen portar en un sol lloc el que avui tenen repartit entre Excel, paper i WhatsApp: els seus clients i el que té contractat cadascun, la feina dels seus tècnics o les seves factures i el seu estoc.',
        price: '5.900€ per peça',
        tag: 'Clients · Tècnics · Facturació',
        f1: 'Clients i contractes: historial, documents i el que té contractat cadascun, amb venciments i avisos de renovació o revisió',
        f2: 'Tècnics i avisos: assignació, hores i materials per obra, parts amb fotos i signatura del client, i fitxatges',
        f3: 'Facturació i estoc: pressupostos i factures que surten de la feina feta, el que et deuen, i el teu estoc amb avís abans que s’acabi. Les factures, en PDF fins que Verifactu sigui obligatori per a tu; hi arribes complint sense pagar més: amb el meu mòdul o, si no és a temps, amb un programa que compleixi, connectat',
        f4: 'Sense límit d’usuaris, en comptes a nom teu (la base de dades, uns 25$/mes, la pagues tu directament)',
        f5: 'Funciona al mòbil, la tauleta i l’ordinador. Al mòbil, també sense cobertura: desa el que s’apunta i ho envia quan torna el senyal.',
        f6: 'Panell amb les xifres del negoci, agenda, tasques i rols: cadascú veu el que li toca',
        f7: 'El programa és teu amb el seu codi quan l’has pagat sencer',
        f8: 'Pagues per parts, contra el que veus funcionant: senyal del 10% i 4 quotes, quan aproves el disseny, quan proves el nucli, quan el teu equip ja hi treballa i després d’unes setmanes d’ús real',
        f9: 'Formació del teu equip en persona, 1 setmana d’ajustaments en viu i el primer any de manteniment inclòs; després, 60€/mes sense permanència'
      },
      s9: {
        title: '02. Cites que es reserven soles',
        ideal: 'Negocis que treballen amb cita prèvia i avui les agafen a mà: perruqueries i barberies, estètica, fisioteràpia, clíniques, tallers o assessories. És l\'únic servei que entra a la teva agenda i reserva de debò, no només informa. Amb el teu WhatsApp o sense.',
        price: '150€ — 450€ + des de 29€/mes',
        planes: 'Dues versions, sense permanència: sense WhatsApp, 150€ de posada en marxa + 29€/mes; amb WhatsApp, 450€ + 59€/mes. Cada agenda més (una altra persona o cabina que atén alhora), +8€/mes. Tot, + IVA. El termini per tenir-ho funcionant te’l dono per escrit a la proposta; amb WhatsApp, enllaçar el teu número depèn a més d’una aprovació de Meta.',
        tag: 'Agenda + Google Calendar + WhatsApp',
        f1: 'Amb WhatsApp, un assistent atén el teu WhatsApp les 24 hores: consulta els forats lliures, reserva la cita i la confirma sense que hagis de contestar',
        f2: 'La teva agenda connectada al teu Google Calendar: el que hi apuntis també compta, i mai dues cites al mateix forat. Si avui la portes en paper o en Excel, la passem en començar.',
        f3: 'Recordatori automàtic abans de la cita, per WhatsApp o per email segons la versió, que és el que fa que la gent no hi falti',
        f4: 'Canvis i cancel·lacions sense trucades: pel mateix WhatsApp o des de l’enllaç de la cita',
        f5: 'Panell amb les teves cites i el comptador de les que van entrar fora del teu horari d\'atenció',
        f6: 'Garantia a les dues versions: si en els tres primers mesos no entra ni una cita fora del teu horari, et torno la posada en marxa',
        f7: 'Petició automàtica de ressenyes a Google en acabar la cita, inclosa a la quota',
        f8: 'Sense WhatsApp no és el mateix més barat: no hi ha assistent que conversi. El teu client reserva a la teva pàgina de cites, des de la teva web, la teva fitxa de Google, el teu Instagram o l’enllaç que li envies per WhatsApp, i la confirmació i el recordatori li arriben per email. A canvi, no es connecta al teu número ni depens de Meta'
      }
    },
    pricing: {
      title: 'Manteniment i Suport',
      subtitle: 'El que et lliuro continua funcionant: ho vigilo, ho actualitzo i, si alguna cosa falla, ho arreglo jo. Sense permanència.',
      basic: {
        title: 'Plan Bàsic',
        price: '60€',
        period: '/ mes',
        desc: 'El teu web o el teu programa, vigilats i al dia, sense permanència. Inclòs els 3 primers mesos als webs i la botiga en línia, i el primer any als programes de gestió a mida (09); recomanat si tens una automatització o un web immobiliari connectat al teu programa: sense ell continuen funcionant, però ningú no els vigila. Els dos serveis amb IA porten quota pròpia, a part d’aquesta.',
        f1: 'Monitorització automàtica 24/7 i còpies de seguretat setmanals',
        f2: 'Actualitzacions de seguretat i correcció d\'errors',
        f3: '1h/mes de canvis de contingut i ajustos menors',
        f4: 'Resposta en 48h laborables com a màxim, tot i que sempre intento contestar al més aviat possible (si no pots esperar, el Plus respon el mateix dia), i informe trimestral d’estat'
      },
      plus: {
        title: 'Plan Plus',
        price: '150€',
        period: '/ mes',
        desc: 'El Bàsic cobreix el normal. El Plus és per quan no pots esperar: resposta el mateix dia, també en caps de setmana i vacances. Sense permanència.',
        f1: 'Tot el del Bàsic, amb còpies de seguretat diàries',
        f2: '5h/mes de desenvolupament i millores (no acumulables)',
        f3: 'Vigilància de passarel·les de pagament + revisió trimestral de velocitat i SEO',
        f4: 'Resposta el mateix dia, també en caps de setmana, festius i vacances (4h en incidència crítica), i informe mensual'
      },
      citas: {
        title: 'Cites que es reserven soles · quota del servei',
        price: '29€ — 59€',
        period: '/ mes',
        desc: 'El producte de cites té la seva pròpia quota, a part del manteniment i sense permanència: 29€/mes sense WhatsApp i 59€/mes amb WhatsApp, amb una agenda. Cada agenda més (una altra persona o cabina que atén alhora), +8€/mes. No és un extra opcional: és el servei funcionant, als meus servidors i vigilat.',
        f1: 'Tot funcionant cada dia, vigilat, i corregit si alguna cosa falla. Amb WhatsApp, també l’assistent, amb el cost del model d’IA inclòs: no t’has de donar d’alta a cap servei ni gestionar claus',
        f2: 'Canvis d\'horaris, serveis, preus i textos quan els necessitis',
        tope: 'Amb WhatsApp, la quota cobreix l’ús normal del negoci: fins a 500 converses al mes amb una agenda, i 250 més per cada agenda més, per a tot el negoci. Si un mes te’n passes, no es talla: ho mirem junts i, si es repeteix, ajustem la quota.',
        f3: 'Amb WhatsApp, els missatges que envia WhatsApp els factura Meta directament al teu compte: entre 1,7 i 3,3 cèntims per cita, calculat amb la tarifa oficial de Meta en vigor des de l\'1 d\'octubre de 2026. Les respostes de l\'assistent entren en els 1.000 missatges gratis al mes que dona Meta per número, que cobreixen fins a unes 250 cites al mes. El que es paga és el recordatori, la confirmació i la petició de ressenya. El que escriuen els teus clients és gratis',
        cta: 'Veure el producte de cites'
      },
      ia: {
        title: 'Integració d\'IA · quota de l\'assistent',
        price: '90€ — 250€',
        period: '/ mes',
        desc: 'Un assistent d\'IA no es lliura i s\'oblida: cal mirar-lo cada mes, i com més se n\'ha fabricat, més cal mirar. Tres trams: 90€/mes amb un sol canal, 150€/mes si en són diversos o porta integracions, i 250€/mes si és multicanal i a més està connectat als teus sistemes. Va a part del manteniment de la web, igual que la del producte de cites.',
        f1: 'Reviso les converses i corregeixo el que s\'hagi respost malament o a mitges',
        f2: 'Mantinc al dia la informació amb què respon: preus, serveis, horaris i textos',
        f3: 'Aquí el consum de les APIs d\'IA el pagues tu, al teu propi compte i al teu nom — al contrari que al producte de Cites, on va inclòs a la quota',
        cta: 'Veure la Integració d\'IA'
      },
      not_included: {
        title: 'El que NO està inclòs',
        desc: 'Costos de tercers a càrrec del client — tot i que te\'ls gestiono jo: domini i allotjament (hosting), comissions de passarel·les de pagament (Stripe/PayPal), correu empresarial, eines de màrqueting per email i consum d\'APIs d\'IA. Tampoc inclou: redacció de textos i fotografies (els aporta el client; redacció assistida per IA disponible com a extra), traducció humana professional o jurada (la traducció amb IA revisada sí que va inclosa en els idiomes contractats), publicitat de pagament (Google/Meta Ads), gestió de xarxes socials, i funcionalitats noves fora de l\'abast acordat, que es pressuposten a part. En el producte de cites amb WhatsApp, tampoc els missatges que envia WhatsApp: des de l\'1 d\'octubre de 2026 Meta els cobra (entre 1,7 i 3,3 cèntims per cita reservada, calculat amb la seva tarifa oficial) i te\'ls factura directament a tu, perquè el compte de WhatsApp és teu; el que escriuen els teus clients és gratis sempre. El cost del model d\'IA sí que va inclòs a la quota mensual, per a un ús normal del negoci (fins a 500 converses al mes amb una agenda i 250 més per cada agenda més).'
      },
      payment: {
        title: 'Mètodes de Pagament i Condicions',
        methods: 'Transferència bancària.',
        conditions: 'Condicions: Per contractar només es demana un senyal del 10% (mínim 150€). La resta es reparteix sense interessos en 3 o 4 quotes, i cada una es paga contra una entrega —el disseny, el nucli funcionant, el desplegament i l\'acceptació—, no contra una data del calendari. I si ja has pagat l’Auditoria de Processos i acceptes la proposta en els 30 dies següents, aquests 150€ compten com a part del senyal: si el senyal és de 150€, no pagues res per començar, i si és més alt, només la diferència (amb un senyal de 200€, pagues 50€). Tots els preus són + IVA.'
      }
    },
    values: {
      title: 'Per què escollir-me?',
      subtitle: 'Treballes directament amb qui ho fa: sense intermediaris, sense plantilles i a prop teu.',
      v1: {
        title: 'Vinc de l’empresa',
        desc: 'Abans del programari vaig passar dotze anys a compres i postvenda, en una societat anònima i dues multinacionals: albarans, factures, pressupostos de reparació, proveïdors i un taller al meu càrrec. Per això primer miro com treballes, i la tecnologia ve després. I parles sempre amb mi.'
      },
      v2: {
        title: 'Fet a mà',
        desc: 'Ho faig a mida i de zero, sense plantilles ni vint plugins d’autors diferents que s’hagin d’entendre. Per això va ràpid i, si alguna cosa falla, saps a qui trucar. I si per al teu cas en tens prou amb WordPress, t’ho dic.'
      },
      v3: {
        title: 'A prop teu',
        desc: 'Soc a Lloret de Mar i vinc al teu negoci: prefereixo veure com treballeu abans de proposar res. I si un dia alguna cosa falla, soc a una estona de cotxe.'
      },
      v4: {
        title: 'I després, segueixo aquí',
        desc: 'Quan lliuro, no desapareixo: t’ensenyo a fer-lo servir en persona, al teu negoci, i amb el manteniment, si alguna cosa falla, em truques a mi i ho arreglo jo.'
      }
    },
    process: {
      title: 'El Meu Procés de Treball',
      subtitle: 'Un full de ruta clar per donar forma a la teva solució digital de principi a fi.',
      p1: {
        title: '01. Xerrada gratis',
        desc: '30 minuts per veure com treballes i què et fa perdre temps. Si el teu cas va a mida, després ve l’auditoria.'
      },
      p2: {
        title: '02. Proposta per escrit',
        desc: 'A la web veus rangs; a la proposta, la xifra exacta, què hi entra, què no i els terminis. Pagues una paga i senyal i la resta contra lliurament.'
      },
      p3: {
        title: '03. Ho construeixo per parts',
        desc: 'Amb cada lliurament t’ensenyo el que ja està fet i, si ja el pots fer servir, com es fa servir.'
      },
      p4: {
        title: '04. Ho fas servir i ho ajusto',
        desc: 'Amb tot lliurat, la primera setmana ajusto el que surti en fer-ho servir de debò, i després continua el manteniment.'
      }
    },
    faq: {
      title: 'Preguntes Freqüents',
      subtitle: 'El que més em pregunten abans de començar un projecte. Si tens un altre dubte, escriu-me.',
      q1: {
        q: 'Quant costa una pàgina web?',
        a: 'Tots dos tenen preu tancat. Un Web Essencial (pàgina única o fins a 4 seccions) costa 990€, i un Web Completa (blog, panell de gestió, portfoli i 2 idiomes) 2.490€. Tots dos inclouen 1 setmana d’ajustaments en viu després del llançament i 3 mesos de manteniment. El que hi entra es mira a la xerrada gratuïta i queda escrit a la proposta; el que en surti, com una integració o una zona privada, es pressuposta a part.'
      },
      q2: {
        q: 'Treballes només a Lloret de Mar o també fora?',
        a: 'Tinc la base a Lloret de Mar i dono servei presencial a tota la Costa Brava (Blanes, Tossa de Mar, Girona), però treballo en remot amb clients de qualsevol punt d\'Espanya sense cap problema.'
      },
      q3: {
        q: 'Fas pàgines web per a immobiliàries?',
        a: 'Sí, és un dels meus nínxols. Si ja treballes amb un programa com Inmovilla, Witei o Mobilia, et faig el web connectat a ell: quan puges, canvies o vens un pis, el web s’actualitza sol, i els portals els continua portant el teu programa, sense pagar dues vegades. Cercador amb filtres, fitxes amb galeria i mapa, 2 idiomes per a compradors estrangers i SEO local, per 2.990€ amb 3 mesos de manteniment. Abans de la proposta comprovo que el teu programa deixa connectar el web.'
      },
      q4: {
        q: 'Puc tenir un xatbot amb intel·ligència artificial a la meva web, com el teu?',
        a: 'Sí — de fet l\'assistent TesS amb qui pots xatejar ara mateix en aquesta web és la demo en viu d\'aquest servei. La Integració d\'IA costa entre 1.600€ i 6.000€ més la quota de l\'assistent (90€/mes amb un sol canal, 150€/mes si en són diversos o porta integracions i 250€/mes si és multicanal i connectat als teus sistemes), segons aquesta mateixa complexitat; les claus d\'API queden al teu nom, sense intermediaris.'
      },
      q5: {
        q: 'En quins idiomes fas les webs?',
        a: 'Em comunico i treballo en español, català i anglès, però el teu projecte es pot lliurar en qualsevol idioma que necessitis gràcies a la traducció assistida per IA — no estic limitat a aquests tres. El Web Essencial inclou 1 idioma (+90€ cada idioma addicional), el Web Completa i el Web Immobiliària n’inclouen 2 (+150€ cada addicional), i a la botiga en línia cada idioma són +150€ amb els seus primers 50 productes. L’idioma de més no costa el mateix a tots els webs perquè el que es paga és traduir i revisar el text, i depèn de quant n’hi ha. La traducció inclou tot el que hi ha al web el dia que te’l lliuro; el que escriguis després al blog no hi va inclòs: o ho tradueixes tu, o m’ho passes i t’ho tradueixo dins de l’hora de canvis al mes del manteniment. La traducció amb IA revisada hi va inclosa; la traducció humana professional o jurada va a part.'
      },
      q6: {
        q: 'Què inclou el manteniment mensual?',
        a: 'Dos plans sense permanència: el Bàsic (60€/mes) inclou monitorització 24/7, còpies de seguretat setmanals, actualitzacions, 1h/mes de canvis i informe trimestral. El Plus (150€/mes) afegeix còpies diàries, 5h/mes de desenvolupament, vigilància de passarel·les de pagament, resposta el mateix dia, també en caps de setmana, festius i vacances, i informe mensual. A part del manteniment hi ha dues quotes pròpies, perquè són serveis funcionant i no una web vigilada: l\'assistent de la Integració d\'IA (90-250€/mes) i les Cites que es reserven soles (29-59€/mes). I a les Automatitzacions Específiques et recomano el Pla Bàsic (60€/mes) mentre estiguin en marxa, perquè una automatització sense vigilar es trenca en silenci el dia que canvia una API.'
      },
      q7: {
        q: 'Com es paga un projecte?',
        a: 'Un senyal del 10% per contractar, amb un mínim de 150€, i la resta en 3 o 4 quotes sense interessos. El que importa: cada quota es paga contra una entrega —el disseny i l\'abast, el nucli funcionant, el desplegament i l\'acceptació—, no contra una data. Així no pagues per avançat una feina que encara no has vist. I si ja vas pagar l\'Auditoria de Processos i acceptes en els 30 dies següents, aquests 150€ es descompten del senyal: en un projecte de 5.900€ el senyal són 590€, així que pagaries 440€. Es paga per transferència bancària.'
      },
      q8: {
        q: 'Què és l\'Auditoria de Processos i per a què serveix?',
        a: 'És una sessió de 60-90 minuts revisant la teva operativa amb tu i amb les teves dades al davant —abans et dic què has de portar, que és poc i depèn del teu negoci—, i un informe escrit de 2-3 pàgines: quins processos et costen temps o diners, quant, i què es pot automatitzar i en quin ordre. Amb l\'informe t\'envio la proposta amb el preu del que en sortiria, i tu decideixes si l\'acceptes; si no veig res que et compensi, t\'ho dic i no hi ha proposta. Costa 150€ i es descompten del projecte si acceptes la proposta en els 30 dies següents. Inclou també un repàs del teu web i les teves xarxes. Abans de l\'auditoria hi ha el diagnòstic gratuït de 30 minuts: si de moment només vols la conversa, no has de pagar res.'
      },
      q9: {
        q: 'Què NO està inclòs en el preu d\'un projecte?',
        a: 'Els costos de tercers van a càrrec del client tot i que te\'ls gestiono jo: domini, hosting, comissions de passarel·les de pagament, correu empresarial i consum d\'APIs d\'IA. Tampoc inclou redacció de textos/fotos (les aporta el client), traducció jurada, publicitat de pagament ni gestió de xarxes socials. En el producte de cites amb WhatsApp tampoc hi entren els missatges que envia WhatsApp: des de l\'1 d\'octubre de 2026 els cobra Meta i te\'ls factura a tu directament, perquè el compte és teu — entre 1,7 i 3,3 cèntims per cita, calculat amb la tarifa oficial de Meta. El que sí que va inclòs en aquesta quota és el cost del model d\'IA, per a un ús normal del negoci.'
      },
      q10: {
        q: 'Pots fer que el meu negoci agafi les cites per WhatsApp?',
        a: 'Sí: és el producte de cites, en dues versions i sense permanència. Amb WhatsApp, un assistent atén el teu WhatsApp les 24 hores: consulta els forats lliures de la teva agenda, reserva la cita, la confirma i envia el recordatori, sense que hagis de contestar tu. Costa 450€ de posada en marxa i 59€/mes. Sense WhatsApp, el teu client reserva a la teva pàgina de cites, on arriba des de la teva web, la teva fitxa de Google, el teu Instagram o l’enllaç que li envies, i la confirmació i el recordatori li arriben per email: 150€ de posada en marxa i 29€/mes. No és el mateix més barat: allà no hi ha assistent que conversi, però no depens de Meta ni pagues missatges. A les dues, cada agenda més suma 8€/mes, l’agenda es connecta amb el teu Google Calendar i la petició de ressenyes a Google hi va inclosa. Tot, + IVA. Les dues van amb garantia: si en els tres primers mesos no entra ni una sola cita fora del teu horari d’atenció, et torno la posada en marxa. Per a la versió amb WhatsApp, el teu número ha d’estar a l’app WhatsApp Business, la de sempre amb eines per a negocis. Si encara no la fas servir, el canvi és gratis, triga deu minuts i conserves número, xats i contactes; t’ajudo a fer-ho. Els teus clients no noten res, i tu continues escrivint des del mòbil alhora que l’assistent. Enllaçar el teu número amb el sistema depèn d’una aprovació de Meta que no controlo. El termini per tenir-ho funcionant te’l dono per escrit a la proposta.'
      },
      q11: {
        q: 'Quina diferència hi ha entre un xatbot, un assistent d\'IA i el sistema de cites per WhatsApp?',
        a: 'Per fora s\'assemblen i per dins fan coses molt diferents, així que val la pena aclarir-ho abans de pagar pel que no necessites. Un xatbot de respostes guiades (dins d\'Automatitzacions Específiques) segueix un guió: botons i respostes previstes, i així que li pregunten alguna cosa que no estava escrita, s\'encalla. Un assistent d\'IA, com la TesS —amb qui estàs xatejant en aquesta web—, entén el que li escriuen amb paraules normals i respon amb la informació del teu negoci: informa, orienta i recull el contacte, però no toca res per dins. I el producte de cites, en la seva versió amb WhatsApp, és un assistent d\'IA que a més actua: mira els forats que tens lliures de debò a la teva agenda, reserva la cita, la confirma i envia el recordatori. Aquesta és la diferència que importa: els dos primers expliquen coses, el tercer fa la feina. Per això només el de cites porta garantia, quota pròpia i el cost del model d\'IA inclòs, mentre que a la Integració d\'IA les claus d\'API són teves. I aquí ve el que sol estranyar: el de cites, que és el que més fa, és el més barat dels dos. No és una errada: és un producte, el mateix per a tots els negocis, i el que es fa és configurar-lo amb els teus serveis, els teus horaris i la teva agenda; la Integració d\'IA es fabrica de zero sobre la teva documentació, els teus canals i els teus sistemes, i no n\'hi ha dues d\'iguals. El que pagues és la fabricació, no el nombre de funcions. Si dubtes quin et toca, la pregunta és senzilla: el que perds són consultes sense respondre, o cites sense agafar? I si són cites, no paguis un desenvolupament a mida: per a això hi ha el producte de cites.'
      },
      q12: {
        q: 'Per què no em fas el web en WordPress, que surt més barat?',
        a: 'Perquè no sempre et convé, i prefereixo dir-t\'ho abans de cobrar-te. Si el que necessites és un web de tres pàgines que miraràs poc, WordPress et serveix i hi haurà qui te\'l faci per menys que jo: no et vendré el contrari. On la cosa canvia és quan el web ha de fer alguna cosa a més d\'estar bonic — parlar amb la teva agenda, amb el teu programa de gestió o amb el teu WhatsApp, o treure\'t de sobre alguna cosa que avui fas a mà. Allà un web de plantilla es resol afegint plugins de tercers, i cada plugin és una actualització que pot trencar una altra cosa, de vegades una llicència anual, i sempre algú a qui trucar que no ets tu. Ho faig a mida i de zero, així que no hi ha vint peces de vint autors diferents que s\'hagin d\'entendre. I el manteniment el faig jo, que és la diferència que de debò es nota el segon any. Si tot i així WordPress és el que t\'encaixa, t\'ho dic al diagnòstic i no et cobro per descobrir-ho.'
      },
      q13: {
        q: 'I si no pago el manteniment, o no el renovo quan acabi l\'any inclòs?',
        a: 'Res no es renova sol: on el manteniment hi va inclòs (els 3 primers mesos als webs i la botiga en línia, i el primer any als programes de gestió) t’aviso abans que s’acabi perquè decideixis tu, i no hi ha permanència en cap cas. A partir d\'aquí depèn de què sigui. El que és teu es queda: el que et vaig fer continua sent teu i, si és un web o un programa, continua funcionant, amb manteniment o sense; el que perds és la xarxa de seguretat — monitorització, còpies, actualitzacions, correcció d\'errors i l\'hora de canvis al mes —, així que si un dia es trenca alguna cosa te n\'assabentes tu i arreglar-ho es pressuposta a part. El mateix amb les Automatitzacions Específiques i l’assistent de la Integració d’IA: continuen funcionant als teus comptes, però sense ningú que els vigili ni els revisi. L’única excepció és el producte de cites: s’atura si canceles la quota, avisant-te 15 dies abans, perquè funciona als meus servidors i la intel·ligència artificial va al meu compte. I si més endavant vols reprendre-ho, es mira en quin estat va quedar i la posada al dia es pressuposta a part.'
      },
      q14: {
        q: 'On queden les dades dels meus clients o pacients?',
        a: 'El que et faig a mida (web, programa o automatització) va en comptes a nom teu: domini, hosting, base de dades i el teu número de WhatsApp, amb les dades en servidors de la Unió Europea, i és teu amb el seu codi quan l’has pagat sencer: te l’entrego. El producte de cites és diferent: és el mateix per a tots els negocis que el fan servir i funciona als meus servidors, també a la Unió Europea, amb les dades de cada negoci separades de les dels altres. Per això costa menys. El fas servir mentre pagues la quota, i els teus clients i les teves cites són sempre teus: les cites també les tens al teu Google Calendar, i si ho deixes et dono en un Excel la llista de clients i totes les seves cites. La intel·ligència artificial de l’assistent va al meu compte de Google Cloud, a la UE, amb el seu acord de protecció de dades i sense que Google faci servir les converses per entrenar res. Les converses de l’assistent només les veig jo, i només si hi ha una errada per corregir o si tu m’ho demanes. A l’assistent a mida (06), revisar-les cada mes forma part del servei, per corregir el que respongui malament. I sempre signem el contracte de protecció de dades que demana la llei. Si el teu negoci tracta dades de salut, el contracte ho recull i ho mirem abans de començar.'
      },
      q15: {
        q: 'I si treballes sol i un dia no hi ets?',
        a: 'Parles sempre amb qui ho ha fet, sense centraletes. El que munto funciona sol i ho vigilo a totes hores: si alguna cosa falla, me n’assabento abans que tu. I no et quedes lligat: tot va a nom teu i el que et faig a mida és teu, amb el seu codi, quan l’has pagat. I si et cal que t’atengui també els caps de setmana i en vacances, hi ha el Pla Plus.'
      },
      q16: {
        q: 'Per què un web teu si el meu programa immobiliari ja me’n dona un?',
        a: 'Si el que et dona el teu programa et basta, queda-te’l: no et vendré el contrari. La diferència és en tres coses. La primera, que sigui teu de debò: el del programa sol sortir del seu catàleg de plantilles, amb la mateixa base que fan servir altres agències, i aquest es fa per a tu, amb la teva marca, les teves zones i com vols que el comprador estranger vegi els teus pisos. La segona, que no depengui del programa: si un dia canvies de programa, el teu web es queda i només cal connectar-lo al nou; amb el del programa, si te’n vas, et quedes sense web. I la tercera, que et trobin per la teva zona i en cada idioma: el SEO i els idiomes es fan a mà per a la Costa Brava, perquè et busquin a tu i no només et vegin en un portal al costat de totes les altres. He mesurat al mòbil els webs que donen els programes a dues agències de Lloret: triguen entre 8 i 16 segons a ensenyar el principal, i Google considera bo menys de 2,5. El teu es fa perquè carregui ràpid, i t’ensenyo la mesura abans que paguis l’última part.'
      },
      q17: {
        q: 'Per què la botiga va sobre Shopify si els teus webs els fas a mà?',
        a: 'Perquè en una botiga el difícil no és el disseny: són els pagaments, l’estoc, els impostos, els enviaments, les devolucions i les factures amb Verifactu, i Shopify ja ho resol bé. Així queda el repartiment. Shopify s’encarrega que la botiga sigui sempre en línia, de la seguretat i les dades de les targetes, de les actualitzacions, del carretó i el cobrament (targeta i Bizum), i del panell i l’app del mòbil on veus comandes, clients i estoc; la seva quota (des de 24€/mes) i les seves comissions les pagues tu, directament a Shopify. Jo m’encarrego del teu disseny, de carregar el teu catàleg, de deixar configurats els pagaments, els enviaments, els impostos i els textos legals, i de triar i configurar l’app que emet les teves factures amb Verifactu (la seva quota la pagues tu, com la de Shopify); d’ensenyar-te a fer-la servir i, amb el manteniment, de vigilar que els pagaments i les factures continuïn entrant i fer els canvis que em demanis. Si falla una app, ho detecto i ho resolc amb qui la fa. I el que és teu: el compte de Shopify va a nom teu, amb la teva targeta, i els teus productes, comandes i clients són teus. Si un dia deixes de treballar amb mi, la teva botiga continua funcionant igual.'
      },
      q18: {
        q: 'Per què amb tu i no me la munto jo a Shopify?',
        a: 'Si tens temps i et ve de gust, munta-te-la: Shopify està pensat per a això i no et diré el contrari. El que jo t’estalvio és el que sol sortir malament o quedar-se a mitges. La configuració que té conseqüències: els impostos, els enviaments, Bizum, els textos legals de venda i, sobretot, les factures amb Verifactu, que si fallen són un problema amb Hisenda. Una botiga amb la teva marca, i no la plantilla tal qual. I algú d’aquí que vigila que els pagaments i les factures continuïn entrant. Si ho necessites, també la connecto amb el que ja fas servir (l’estoc de la teva botiga física, la teva facturació o el teu TPV); això es pressuposta a part, perquè depèn de què facis servir. Si encara no tens TPV o et plantejes canviar-lo, hi ha una manera sense connexió: cobrar també al taulell amb Shopify, que ve inclòs a la seva quota, i així l’estoc de la botiga i el del web és el mateix. El compte continua sent teu: si un dia la vols portar tu sol, pots.'
      }
    },
    contact: {
      title: 'Fem encaixar les peces?',
      subtitle: 'Escriu-me sobre el teu projecte per agendar una cita o demanar informació tècnica, sense compromís.',
      calendly_title: 'Reserva el diagnòstic gratuït de 30 minuts',
      calendly_desc: 'És la manera més ràpida: tries forat i parlem. Sense cost, sense compromís i amb el teu negoci ja mirat per endavant. Si prefereixes escriure primer, tens el formulari aquí mateix.',
      calendly_btn: 'Triar forat al calendari',
      name: 'Nom o Empresa',
      email: 'El Teu Correu Electrònic',
      phone: 'Telèfon o WhatsApp',
      budget_opt0: 'Encara no ho sé',
      urgency_opt0: 'Encara no ho sé',
      phone_hint: 'Opcional, però per aquí et contesto abans',
      message: 'Explica\'m breument què necessites...',
      reason: 'Què vols fer?',
      reason_opt1: 'Sol·licitar informació general',
      reason_opt2: 'Agendar una cita / reunió',
      reason_opt3: 'Sol·licitar pressupost a mida',
      budget: 'Pressupost orientatiu',
      budget_opt1: 'Menys de 1.000€',
      budget_opt2: '1.000€ - 4.000€',
      budget_opt3: '4.000€ - 10.000€',
      budget_opt4: 'Més de 10.000€',
      urgency: 'Urgència del projecte',
      urgency_opt1: 'Immediata',
      urgency_opt2: 'En 1 mes',
      urgency_opt3: 'Més de 3 mesos',
      gdpr: 'He llegit i accepto els termes de la política de privacitat de dades per al tractament de la meva sol·licitud de contacte.',
      send: 'Enviar Sol·licitud',
      sending: 'Enviant...',
      success: 'Sol·licitud enviada! Em posaré en contacte amb tu molt aviat per agendar la cita o enviar-te els detalls.',
      error: 'Error en enviar el missatge. Torna-ho a provar o escriu-me directament a: info@teselarsoftware.com'
    },
    simulator: {
      title: 'Simulador de Retorn de la Inversió (ROI)',
      subtitle: 'Descobreix quant temps i diners estàs perdent per no automatitzar les tasques repetitives del teu negoci.',
      label_hours: 'Hores a la setmana en tasques que es repeteixen (passar dades, fer factures, trucar per recordar…)',
      label_employees: 'Nombre d\'empleats fent aquestes tasques',
      label_cost: 'Cost mitjà per hora de l\'empleat',
      result_monthly: 'Cost mensual estimat',
      result_yearly: 'Cost anual estimat',
      result_hours: 'Temps anual en aquestes tasques',
      rec_texto: 'Això és el que se t’escapa. Al diagnòstic veiem quina peça ho recupera, i si no compensa, t’ho dic.',
      btn_apply: 'Portar aquests números al formulari',
      notif_linked: '¡Simulació vinculada amb èxit al formulari!'
    },
    leads: {
      sticky_cta: 'Consulta gratuïta',
      sticky_cta_long: 'Reserva la teva consulta gratuïta',
      exit_title: 'Espera! La teva primera consulta és GRATIS',
      exit_subtitle: 'Deixa\'m el teu contacte i et truco sense compromís per veure el teu projecte.',
      exit_name: 'El teu nom',
      exit_email: 'El teu email',
      exit_btn: 'Vull la meva consulta gratis',
      exit_close: 'No, gràcies',
      exit_gdpr: 'Accepto la política de privacitat',
      toast_title: 'Necessites ajuda per decidir?',
      toast_text: 'Escriu-me sense compromís i t\'aconsello la millor solució per al teu negoci.',
      toast_btn: 'Parlar amb el Rubén',
      inline_title: 'Tens un projecte en ment?',
      inline_subtitle: 'Explica\'m la teva idea i t\'aconsello sense compromís. Cada negoci és únic.',
      inline_btn: 'Explica\'m el teu cas',
      cta_whatsapp: 'Escriu-me per WhatsApp',
      cta_form: 'Explica\'m el teu cas',
      wa_generico: 'Hola Rubén, vinc del teu web i volia preguntar-te una cosa.',
      wa_servicios: 'Hola Rubén, vinc del teu web. He estat mirant els serveis i volia preguntar-te per un.',
      wa_roi: 'Hola Rubén, vinc del teu web. M\'ha cridat l\'atenció això del temps que es perd i volia explicar-te el meu cas.',
      wa_precios: 'Hola Rubén, vinc de la secció de preus del teu web i volia preguntar-te per un pressupost.',
      post_services: 'Agafo pocs projectes alhora, per fer bé cadascun, i a la proposta et dic per escrit quan començo.',
      post_services_btn: 'Reserva la teva plaça',
      post_roi: 'El teu projecte mereix atenció personalitzada. Reserva la teva consulta i t\'explico com puc ajudar-te.',
      post_roi_btn: 'Agendar consulta personalitzada',
      post_pricing: 'Cada solució que faig és única, com el teu negoci. Parlem del que necessites.',
      post_pricing_btn: 'Sol·licitar pressupost a mida'
    },
    // Demo de gestio (/ca/demo, ADR-113). Els exemples de cada sector son a src/data/demo.ts.
    demo: {
      meta_title: 'Demo: la teva empresa organitzada en dos minuts | Teselar Software',
      meta_description: 'Tria el teu sector i el que portes a la teva empresa, i mira com quedarien els tècnics, clients, factures, cites i material en un sol lloc. Gratis i sense registrar-te.',
      banda: 'Simulació · dades d’exemple segons el teu sector',
      volver: 'Tornar a la web',
      titulo: 'Mira la teva empresa organitzada en dos minuts.',
      intro: 'Digues-me a què et dediques, què portes (avisos i tècnics, clients, factures, cites o material) i com ho portes avui. Et mostro com quedaria tot en un sol lloc, amb exemples del teu sector.',
      quien: 'Soc el Rubén Reyes, de Teselar Software, a Lloret de Mar.',
      empresa_label: 'Nom de la teva empresa',
      empresa_placeholder: 'p. ex. Serveis Costa',
      sector_legend: 'A què us dediqueu?',
      otro_label: 'Explica’m a què us dediqueu',
      otro_placeholder: 'p. ex. jardineria i piscines',
      lleva_legend: 'Què portes a la teva empresa?',
      lleva_hint: 'Marca les que vulguis',
      partes: {
        tec: 'Tècnics que surten a treballar',
        cli: 'Clients i pressupostos',
        fac: 'Factures i cobraments',
        cit: 'Cites o agenda',
        mat: 'Material o magatzem',
      },
      como_legend: 'Com ho portes avui?',
      como: {
        papel: 'Paper i llibreta',
        excel: 'Excel',
        whatsapp: 'WhatsApp i memòria',
        programa: 'Un programa que no em convenç',
      },
      ejemplar: 'Exemplar Núm. 001',
      preparado: 'Preparat per a',
      tu_empresa: 'la teva empresa',
      sin_sector: 'Tria el teu sector',
      sin_partes: 'Marca què portes',
      ver: 'Veure el meu sistema',
      panel_dia: 'Dimarts · el que passa avui',
      panel_vacio: 'Marca a dalt el que portes a la teva empresa i apareixerà aquí.',
      cta_titulo: 'Ho mirem amb el teu cas?',
      cta_texto: 'És una xerrada de 30 minuts, gratuïta, normalment per videotrucada. Si el teu negoci és a menys de mitja hora de Lloret de Mar, també pot ser en persona; si ets una mica més lluny, pregunta-m’ho. Després t’emportes per escrit el que hem vist. Si reserves, m’arriba el que has marcat aquí, perquè no te l’hagi de tornar a preguntar.',
      cta_btn: 'Reservar una xerrada gratuïta',
      cta_sub: 'Al meu calendari · 30 minuts, sense compromís',
      nota: 'A la xerrada m’expliques com ho portes avui ({como}) i mirem què s’hi passa i com. No cal que m’ensenyis dades dels teus clients.',
      nota_como: 'Excel, paper, WhatsApp o el teu programa',
      faq_titulo: 'El que més em pregunten',
      faq: [
        { id: 'whatsapp', p: 'Com entra sola una cita per WhatsApp?', r: 'Si vols, un assistent amb intel·ligència artificial atén el WhatsApp del teu negoci: mira els forats lliures, reserva la cita i la confirma. Tu veus a l’agenda el que ha entrat.' },
        { p: 'Qui m’atén si alguna cosa falla?', r: 'Jo, directament: parles sempre amb qui ho ha fet. Funciona sol i ho vigilo a totes hores, així que si alguna cosa falla me n’assabento abans que tu. També cobreixo caps de setmana i vacances, si els necessites. I no et quedes lligat: tot va a nom teu i el codi del que es fa a mida és teu.' },
        { p: 'És un programa fet o a mida?', r: 'A mida i per parts: comencem pel que més et pesa.' },
        { id: 'datos', p: 'On es guarden les meves dades?', r: 'El que et faig a mida (web, programa o automatització) va en comptes a nom teu: domini, hosting, base de dades i el teu número de WhatsApp, amb les dades en servidors de la Unió Europea, i és teu amb el seu codi quan l’has pagat sencer: te l’entrego. El producte de cites és diferent: és el mateix per a tots els negocis que el fan servir i funciona als meus servidors, també a la Unió Europea, amb les dades de cada negoci separades de les dels altres. Per això costa menys. El fas servir mentre pagues la quota, i els teus clients i les teves cites són sempre teus: les cites també les tens al teu Google Calendar, i si ho deixes et dono en un Excel la llista de clients i totes les seves cites. La intel·ligència artificial de l’assistent va al meu compte de Google Cloud, a la UE, amb el seu acord de protecció de dades i sense que Google faci servir les converses per entrenar res. Les converses de l’assistent només les veig jo, i només si hi ha una errada per corregir o si tu m’ho demanes. A l’assistent a mida (06), revisar-les cada mes forma part del servei, per corregir el que respongui malament. I sempre signem el contracte de protecció de dades que demana la llei. Si el teu negoci tracta dades de salut, el contracte ho recull i ho mirem abans de començar.' },
      ],
      otro_prefijo: 'Un altre',
      portada_pregunta: 'Ho vols veure abans de parlar?',
      portada_link: 'Prova-ho amb la teva empresa',
      portada_nota: '2 minuts i sense registrar-te: tries el teu sector i veus com quedaria el teu dia a dia.',
      doc2_titulo: 'En parlem?',
      doc2_texto: 'Si vols donar-li una volta al que hem vist, escriu-me i ho mirem junts.',
      doc2_btn: 'Escriure al Rubén per WhatsApp',
      doc2_sub: 'Et contesto jo',
      wa_con_empresa: 'Hola Rubén, he vist la demo que em vas preparar per a {empresa}.',
      wa_sin_empresa: 'Hola Rubén, he vist la demo que em vas preparar.',
      calendly_etiquetas: { sector: 'Sector', lleva: 'Porto', como: 'Avui' },
      como_label: 'Com funciona',
      ahorro_label: 'T’estalvies',
      explica: {
        tec: { como: 'Reparteixes la feina des d’on siguis i cada persona veu al mòbil on va avui i què ha de fer.', ahorro: 'Les trucades de primera hora per repartir la feina i els canvis que es perden al WhatsApp.' },
        parte: { como: 'En acabar s’omple al mòbil i el client signa a la pantalla. T’arriba tan bon punt el mòbil té cobertura.', ahorro: 'Passar a net fulls de paper i perseguir hores o dades que ningú no va apuntar.' },
        cli: { como: 'Cada client amb el seu historial, el que se li ha ofert i el que toca fer després. T’avisa del que fa dies que està aturat.', ahorro: 'Els pressupostos que es refreden perquè ningú no va tornar a trucar i les renovacions que es passen.' },
        fac: { como: 'La factura surt de la feina feta, sense tornar-la a escriure, i veus d’un cop d’ull què falta cobrar.', ahorro: 'Fer les factures de memòria a final de mes i els cobraments que ningú no reclama.' },
        cit: { como: 'Una sola agenda per a tot l’equip, amb les cites que entren per telèfon o per WhatsApp, i un recordatori al client el dia abans.', ahorro: 'Cites apuntades a diversos llocs alhora i clients que s’obliden de venir.' },
        mat: { como: 'Saps què tens, qui ho té i què s’està acabant, i t’avisa abans que falti.', ahorro: 'Quedar-te sense alguna cosa just quan cal i els viatges de més per anar-la a buscar.' },
      },
    }
  },
  en: {
    nav: {
      services: 'Services',
      pricing: 'Pricing',
      values: 'Why TESELAR?',
      process: 'Process',
      faq: 'FAQ',
      contact: 'Book Meeting'
    },
    a11y: {
      abrir_menu: 'Open menu',
      cerrar_menu: 'Close menu',
      cambiar_idioma: 'Change language',
      cerrar: 'Close'
    },
    hero: {
      tagline: 'Teselar Software',
      title: 'The exact piece where technology and your business fit perfectly',
      subtitle: 'Software to keep your customers, quotes, invoices and technicians in one place, assistants that answer your WhatsApp, and hand-built websites. For installers, renovation firms, garages, clinics, salons, estate agents and accountancy firms. I build them myself, here in Lloret de Mar.',
      meta_description: 'AI assistants, automations and custom software for businesses in Lloret de Mar and the Costa Brava. I build them myself, end to end.',
      cta: 'Request information',
      cta_alt: 'Free 30-min diagnosis',
      cta_note: 'Free and with no strings attached. Before we talk I look at your website, your Google profile and how your customers reach you, so we do not start from scratch.',
      quien: 'I am Rubén Reyes, from Teselar Software. You deal with me.',
      piezas: ['Clients', 'Invoices', 'Schedule', 'Website', 'WhatsApp', 'Team'],
      pieza_texto: 'What you\'re missing, made to fit the gap',
      piezas_desc: ['Your clients and their history, in one place', 'Quotes and invoices that go out on their own', 'Bookings made without a phone call', 'A hand-built, fast website', 'Automatic replies and reminders', 'Call-outs, technicians and job reports from your phone'],
      piezas_alt: 'The pieces of a business fitted together, with Teselar\'s in the gap that was missing'
    },
    concept: {
      title: 'The Fitting Piece',
      text1: 'A tessellation is a mosaic of pieces that fit together with no gaps, like the tiles on a floor.',
      text2: 'Your business already has its pieces: customers, invoices, calendar, WhatsApp, your team. What I build is the missing one, so they fit together and you stop copying data from one to another by hand.'
    },
    services: {
      title: 'Services Catalog',
      subtitle: 'Modular solutions tailored to your size and budget. What is not included is written below and, again, in your proposal.',
      ideal: 'Ideal for:',
      pricing: 'Price',
      features: 'What is included:',
      live_adjustments: 'All my web and software development projects include 1 week of live adjustments and improvements at no additional cost after launch.',
      interest: 'Interested in this service',
      tres_ia: {
        title: 'Three services talk over WhatsApp, and they are not the same thing',
        c1_title: 'Guided chatbot · part of 03',
        c1_desc: 'Follows a script of buttons and pre-written answers. Cheap and enough when the questions are always the same; step off the script and it gets stuck.',
        c2_title: 'AI assistant · service 06',
        c2_desc: 'Understands plain wording and answers with your business information. It informs and guides, but it does not touch your calendar. It is built from scratch around your documentation, your channels and your systems, which is why the range is wide. It is the chat in the corner of this website: TesS. Ask it anything.',
        c3_title: 'Appointments that book themselves · service 02',
        c3_desc: 'An AI assistant that also acts: it checks the slots you actually have free, books the appointment, confirms it and sends the reminder. It is a product, the same for every business: it gets configured with your services and opening hours, which is why it costs less than bespoke work and can carry a guarantee.',
        nota: 'The question to choose is simple: are you losing unanswered enquiries, or uncaught bookings? And if it is bookings, do not pay for bespoke work: the booking product costs you less.'
      },
      categories: {
        web: 'Web Development',
        automation: 'Automation & AI',
        systems: 'Management software'
      },
      vat: '+ VAT',
      s1: {
        title: '01. Process Audit',
        ideal: 'Businesses that suspect they are losing time or money in their day-to-day operations and want to know where, in writing, before investing. It is the second step when what you need is custom-built: the way in is the free 30-minute diagnosis, and if what comes out of it is a closed product —appointments, a website, an online shop or a small automation— you go straight to the proposal, with no audit. These 150€ are deducted from the project if you accept the proposal within the following 30 days: they count as part of the deposit.',
        price: '150€ (Deducted from your first project)',
        tag: 'Processes and costs',
        f1: '60-90 minute session going through your operations with your own figures in front of us. Beforehand I tell you what to bring, which is not much and depends on your business',
        f2: 'Mapping of up to three processes: who does what, when, and with which tool',
        f3: 'Where waiting, errors, or repeated work are created',
        f4: 'Your numbers: how many times you do a task, how long it takes and what it costs you',
        f5: 'What can be automated, what cannot, and in what order',
        f6: 'A written 2-3 page report with priorities, and with it the proposal with the price of what would come out of it: you decide whether to accept it. If I see nothing worth your while, I tell you so and there is no proposal',
        f7: 'A look over your website and social media, included'
      },
      s2: {
        title: '03. Specific Automations',
        ideal: 'Companies with one specific repetitive task to get off their plate: a process someone does by hand today, every week, always the same way.',
        price: '700€ — 1,800€ + 60€/mo',
        tag: 'Apps Script + APIs + Make',
        f1: 'Automatic generation of PDF quotes/budgets from a web form',
        f2: 'Automatic invoice emails using your customers’ details',
        f3: 'Automated data extraction from emails directly into Google Sheets',
        f4: 'Guided-reply chatbots for WhatsApp or Telegram (they follow a script; if you need it to understand free language, that is AI Integration)',
        f5: 'Two programs you already use passing data to each other on their own, both ways',
        f6: 'Smart automated alert and notification system',
        f7: 'Daily or weekly automated email reporting',
        f8: 'Basic maintenance plan (60€/mo), recommended while the automation is running: I keep an eye on it and fix it when an API changes or a credential expires. Without it the automation keeps working, but nobody watches it, and whatever breaks is quoted separately. Where my work ends: it does not cover new features, process changes, or wiring in tools that were not part of the agreed scope — those are quoted separately'
      },
      s3: {
        title: '04. Essential Web',
        ideal: 'Freelancers, small businesses, independent professionals, and new entrepreneurs.',
        price: '990€',
        tag: 'React + Vite + Tailwind CSS',
        f1: 'High-impact single page or up to 4 sections',
        f2: 'Modern, responsive, and mobile-first web design',
        f3: 'Functional contact form and WhatsApp button with automated notification',
        f4: '1 language included — each additional language +90€',
        f5: 'Basic technical SEO (meta tags, clean HTML structure) and linked to your Google profile and your Instagram',
        f6: 'Extreme loading speed and performance optimisation, and no tracking cookies: you do not need a cookie banner',
        f7: 'Legal texts (legal notice and privacy) and 1 week of live adjustments during deployment',
        f8: '3 months of maintenance (Basic Plan) included; at the end of the second I let you know and you decide whether to carry on, no lock-in'
      },
      s4: {
        title: '06. Artificial Intelligence Integration',
        ideal: 'Businesses fielding the same questions over and over by hand: opening hours, prices, how something works, whether you offer a given service. The assistant answers for you using your business information, but it does not manage your calendar — if what you are losing is bookings, the service you want is 03. Final price depends on complexity: a simple single-channel chatbot sits at the low end of the range; an advanced assistant with multiple integrations and channels (web, WhatsApp, Telegram) sits at the high end.',
        price: '1,600€ — 6,000€ + 90-250€/mo',
        tag: 'OpenAI / Anthropic APIs',
        f1: 'Custom virtual AI assistant trained with your internal company documentation',
        f2: 'Smart customer service chatbot for web, WhatsApp, or Telegram: it informs and guides using your data, without managing your calendar (that is what Appointments that book themselves, service 02, is for)',
        f3: 'Automated generation of text content or custom email templates',
        f4: 'Automated analysis, classification, and summary of documents',
        f5: 'Advanced automation using Natural Language Processing (NLP)',
        f6: 'Direct integration with models like GPT-4, Claude 3.5, and others',
        f7: 'Monthly assistant fee, recommended, in three tiers: 90€/mo for a single channel, 150€/mo for several channels or with integrations, and 250€/mo when it is multichannel and also wired into your systems. It covers reviewing the conversations, correcting whatever gets answered wrong, and keeping the information it answers with up to date; without it the assistant keeps working, but nobody reviews it. AI API usage is billed to your own account, in your name'
      },
      s5: {
        title: '07. Complete Web',
        ideal: 'SMEs that need their business\'s real website: catalog or portfolio, blog, and ready for foreign customers.',
        price: '2,490€ (2 languages included)',
        tag: 'React + Vite + Headless CMS',
        hereda: 'Includes everything in the Essential Website (04): responsive design, contact form and WhatsApp button, basic SEO, legal texts, no tracking cookies, 1 week of live adjustments and 3 months of maintenance included',
        f1: 'Up to 8 sections, closed in writing in the proposal',
        f2: 'Project gallery or interactive portfolio with dynamic filters',
        f3: 'Self-managed section for blog, articles, or news',
        f4: 'Intuitive admin panel to manage all contents easily',
        f5: '2 languages included with automatic detection — each additional language +150€',
        f6: 'Complete technical SEO (sitemap, hreflang, Google Search Console)',
        f7: '1 week of live support and comprehensive training included'
      },
      s6: {
        title: '05. E-commerce / Online Store',
        ideal: 'Local shops or brands that want to sell online without building or maintaining a platform of their own.',
        price: '1,490€',
        tag: 'Shopify',
        hereda: 'On Shopify, in an account in your name: Shopify takes care of keeping it online, security, payments and updates (its fee, from 24€/month, the invoicing app’s fee and its commissions are paid by you directly). I take care of the design, the catalogue, the set-up, invoicing with Verifactu and watching that everything keeps coming in.',
        f1: 'Design with your brand on a Shopify theme, fast and mobile-ready',
        f2: 'Up to 50 products loaded. Each 50 more, +90€ if I load them, or free if you load them yourself from the template, which I show you how to use',
        f3: 'Card and Bizum payments, set up and tested',
        f4: 'Verifactu invoices from the first order: a Shopify app issues them (its fee, about 10€/month, is paid by you) and I set it up and watch that it works',
        f5: 'Shipping, taxes and legal sales texts (terms and returns)',
        f6: '1 language included — each additional language +150€, with the 50 products; each 50 more products, +90€ per language',
        f7: 'Connected to what you already use (your physical shop’s stock, your invoicing or your till), quoted separately',
        f8: '1 week of adjustments and 3 months of maintenance included: I watch that payments and invoices keep coming in. After that, 60€/month with no lock-in (or the Plus Plan if your order volume calls for it)'
      },
      s7: {
        title: '08. Real Estate Website',
        ideal: 'Estate agencies that already work with a property management program (Inmovilla, Witei, Mobilia…) and want a website of their own that lives up to it, to attract foreign buyers.',
        price: '2,990€ (2 languages included)',
        tag: 'Website + connection to your program',
        f1: 'Property search engine with filters (area, price, type, bedrooms)',
        f2: 'Property pages with gallery, map, and featured listings system',
        f3: 'Connected to the program you already use: when you add, change or sell a property, the website updates itself',
        f4: '2 languages included for foreign buyers — each additional language +150€',
        f5: 'No paying twice: the portals (Idealista, Fotocasa, Habitaclia…) are still handled by your program, as they are now',
        f6: 'Per-property contact form and WhatsApp button',
        f7: 'Local SEO, legal texts, no tracking cookies, 1 week of adjustments and 3 months of maintenance included. After that I recommend it: it is what watches that the connection to your program does not break; without it the site keeps working, but if it breaks you find out yourself',
        f8: 'Before the proposal I check that your program allows the website to connect; if it does not, I tell you and there is no proposal'
      },
      s8: {
        title: '09. Custom management software',
        paso: 'Three pieces that combine: 5,900€ each; two together, 10,915€; all three, 15,930€. No paying per user. It starts with the audit (150 €, deducted): there we confirm it suits you and see what needs adding for your business, which is quoted separately. If I see nothing worth it for you, I tell you and there is no proposal.',
        ideal: 'Businesses that want to keep in one place what is now spread across Excel, paper and WhatsApp: their customers and what each one has contracted, the work of their technicians, or their invoices and stock.',
        price: '5,900€ per piece',
        tag: 'Customers · Technicians · Invoicing',
        f1: 'Customers and contracts: history, documents and what each one has contracted, with expiry dates and renewal or service reminders',
        f2: 'Technicians and jobs: assignment, hours and materials per job, job sheets with photos and customer signature, and clock-ins',
        f3: 'Invoicing and stock: quotes and invoices generated from the work done, what you are owed, and your stock with a warning before it runs out. Invoices in PDF until Verifactu becomes mandatory for you; you get there compliant at no extra cost: with my module or, if it is not ready in time, with a compliant program, connected',
        f4: 'No user limit, in accounts in your name (the database, about 25$/month, is paid by you directly)',
        f5: 'Works on phone, tablet and computer. On the phone, even with no signal: it keeps what you record and sends it when the signal comes back.',
        f6: 'Dashboard with the business figures, calendar, tasks and roles: everyone sees what concerns them',
        f7: 'The software is yours, source code included, once you have paid for it in full',
        f8: 'You pay in stages, against what you see working: a 10% deposit and 4 instalments, when you approve the design, when you test the core, when your team is already working with it and after a few weeks of real use',
        f9: 'In-person training for your team, 1 week of live adjustments and the first year of maintenance included; after that, 60€/month with no lock-in'
      },
      s9: {
        title: '02. Appointments that book themselves',
        ideal: 'Appointment-based businesses still booking by hand: hair and barber shops, beauty salons, physiotherapy, clinics, workshops or consultancies. With your WhatsApp or without it.',
        price: '150€ — 450€ + from 29€/mo',
        planes: 'Two versions, no lock-in: without WhatsApp, 150€ setup + 29€/month; with WhatsApp, 450€ + 59€/month. Each extra calendar (another person or room serving at the same time), +8€/month. All + VAT. I give you the timeline to have it running in writing in the proposal; with WhatsApp, linking your number also depends on an approval from Meta.',
        tag: 'Bookings + Google Calendar + WhatsApp',
        f1: 'With WhatsApp, an assistant answers your WhatsApp around the clock: checks open slots, books the appointment and confirms it without you replying',
        f2: 'Your calendar connected to your Google Calendar: whatever you note there counts too, and never two appointments in the same slot. If you keep it on paper or in Excel today, we move it over when we start.',
        f3: 'Automatic reminder before the appointment, by WhatsApp or by email depending on the version, which is what keeps people from missing it',
        f4: 'Reschedules and cancellations without calls: over the same WhatsApp or from the booking link',
        f5: 'Dashboard with your bookings and a counter of those that came in outside your opening hours',
        f6: 'Guarantee on both versions: if not a single booking comes in outside your hours in the first three months, you get the setup fee back',
        f7: 'Automatic Google review request once the appointment is over, included in the fee',
        f8: 'Without WhatsApp it is not the same thing cheaper: there is no assistant holding a conversation. Your client books on your booking page, from your website, your Google profile, your Instagram or the link you send them on WhatsApp, and the confirmation and reminder arrive by email. In exchange, it does not connect to your number and you do not depend on Meta'
      }
    },
    pricing: {
      title: 'Maintenance & Support',
      subtitle: 'What I deliver keeps working: I watch it, keep it updated and, if something fails, I fix it. No lock-in.',
      basic: {
        title: 'Basic Plan',
        price: '60€',
        period: '/ month',
        desc: 'Your website or your software, watched and up to date, no lock-in. Included for the first 3 months with the websites and the online shop, and for the first year with custom management software (09); recommended if you have an automation or a real estate website connected to your program: without it they keep working, but nobody watches them. The two AI services carry their own fee, separate from this one.',
        f1: 'Automatic 24/7 monitoring and weekly backups',
        f2: 'Security updates and error fixing',
        f3: '1h/month of content changes and minor tweaks',
        f4: 'Response within 48 business hours at most, though I always try to answer as soon as I can (if you cannot wait, the Plus answers the same day), and quarterly status report'
      },
      plus: {
        title: 'Plus Plan',
        price: '150€',
        period: '/ month',
        desc: 'Basic covers the normal needs. Plus is for when you cannot wait: same-day response, weekends and holidays included. No lock-in.',
        f1: 'Everything in Basic, with daily backups',
        f2: '5h/month of development and improvements (non-cumulative)',
        f3: 'Payment gateway monitoring + quarterly speed and SEO review',
        f4: 'Same-day response, weekends, bank holidays and holidays included (4h for critical issues), and monthly report'
      },
      citas: {
        title: 'Appointments that book themselves · service fee',
        price: '29€ — 59€',
        period: '/ month',
        desc: 'The booking product carries its own fee, separate from maintenance and with no lock-in: 29€/month without WhatsApp and 59€/month with WhatsApp, for one calendar. Each extra calendar (another person or room serving at the same time), +8€/month. It is not an optional add-on: it is the service running, on my servers and monitored.',
        f1: 'Everything running every day, monitored, and fixed if something goes wrong. With WhatsApp, the assistant too, with the AI model cost included: no signing up to any AI service and no API keys to manage',
        f2: 'Changes to opening hours, services, prices and wording whenever you need them',
        tope: 'With WhatsApp, the fee covers normal business use: up to 500 conversations a month with one calendar, plus 250 for each extra calendar, for the whole business. If you go over one month, nothing is cut off: we look at it together and, if it keeps happening, we adjust the fee.',
        f3: 'With WhatsApp, the messages WhatsApp sends are billed by Meta straight to your own account: between 1.7 and 3.3 cents per booking, worked out from Meta\'s official rates in force since 1 October 2026. The assistant\'s replies fall within the 1,000 free messages a month Meta gives each number, which cover up to about 250 bookings a month. What you pay for is the reminder, the confirmation and the review request. What your clients write is always free',
        cta: 'See the booking product'
      },
      ia: {
        title: 'AI Integration · assistant fee',
        price: '90€ — 250€',
        period: '/ month',
        desc: 'An AI assistant is not something you hand over and forget: it needs looking at every month, and the more that was built, the more there is to watch. Three tiers: 90€/month for a single channel, 150€/month for several channels or with integrations, and 250€/month when it is multichannel and wired into your systems. It is separate from website maintenance, just like the booking product fee.',
        f1: 'I review the conversations and fix anything answered wrongly or halfway',
        f2: 'I keep the information it answers with up to date: prices, services, opening hours and copy',
        f3: 'Here the AI API usage is paid by you, in your own account and in your name — unlike the Booking product, where it is included in the fee',
        cta: 'See the AI Integration'
      },
      not_included: {
        title: 'What is NOT included',
        desc: 'Third-party costs paid by the client — though I handle the setup for you: domain and hosting, payment gateway fees (Stripe/PayPal), business email, email marketing tools, and AI API usage. Also not included: copywriting and photography (provided by the client; AI-assisted copywriting available as an extra), professional or sworn human translation (reviewed AI translation IS included with contracted languages), paid advertising (Google/Meta Ads), social media management, and new features outside the agreed scope, which are quoted separately. For the booking product with WhatsApp, the messages WhatsApp sends are not included either: from 1 October 2026 Meta charges for them (between 1.7 and 3.3 cents per booking, worked out from its official rates) and bills you directly, because the WhatsApp account is yours; what your clients write is always free. The cost of the AI model IS included in the monthly fee, for normal business use (up to 500 conversations a month with one calendar, plus 250 for each extra calendar).'
      },
      payment: {
        title: 'Payment Terms & Methods',
        methods: 'Bank transfer.',
        conditions: 'Terms: A 10% deposit (minimum 150€) is all that is needed to start. The rest is split interest-free into 3 or 4 instalments, and each one is paid against a delivery —the design, the working core, the deployment and the acceptance—, not against a calendar date. And if you have already paid for the Process Audit and accept the proposal within the following 30 days, those 150€ count as part of the deposit: if the deposit is 150€, you pay nothing to start, and if it is higher, only the difference (with a 200€ deposit, you pay 50€). All prices are + VAT.'
      }
    },
    values: {
      title: 'Why Work With Me?',
      subtitle: 'You work directly with the person who builds it: no middlemen, no templates, and close to you.',
      v1: {
        title: 'I come from business',
        desc: 'Before software I spent twelve years in purchasing and after-sales, at a public limited company and two multinationals: delivery notes, invoices, repair quotes, suppliers and a workshop under my charge. That is why I look at how you work first, and the technology comes after. And you always talk to me.'
      },
      v2: {
        title: 'Handmade',
        desc: 'I build it to measure and from scratch, with no templates and no twenty plugins from different authors that have to get along. That is why it is fast and, if something breaks, you know who to call. And if WordPress is enough for you, I will tell you.'
      },
      v3: {
        title: 'Close to you',
        desc: 'I am in Lloret de Mar and I come to your business: I prefer to see how you work before proposing anything. And if something ever fails, I am a short drive away.'
      },
      v4: {
        title: 'And afterwards, I am still here',
        desc: 'When I deliver, I do not disappear: I show you how to use it in person, at your business, and with maintenance, if something fails, you call me and I fix it.'
      }
    },
    process: {
      title: 'My Working Method',
      subtitle: 'A clear roadmap to shape your digital solution from start to finish.',
      p1: {
        title: '01. Free chat',
        desc: '30 minutes to see how you work and what eats up your time. If what you need is custom, the audit comes next.'
      },
      p2: {
        title: '02. Written proposal',
        desc: 'The website shows ranges; the proposal gives the exact figure, what is in, what is not and the timeline. You pay a deposit and the rest on delivery.'
      },
      p3: {
        title: '03. I build it in parts',
        desc: 'With each delivery I show you what is done and, if you can already use it, how to use it.'
      },
      p4: {
        title: '04. You use it, I fine-tune it',
        desc: 'Once everything is delivered, during the first week I adjust whatever comes up in real use, and then maintenance takes over.'
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'What people ask me most before starting a project. Got another question? Just write to me.',
      q1: {
        q: 'How much does a website cost?',
        a: 'Both have a closed price. An Essential Website (single page or up to 4 sections) costs 990€, and a Complete Website (blog, admin panel, portfolio and 2 languages) 2,490€. Both include 1 week of live adjustments after launch and 3 months of maintenance. What goes in is agreed in the free call and written into the proposal; anything beyond it, such as an integration or a private area, is quoted separately.'
      },
      q2: {
        q: 'Do you only work in Lloret de Mar, or also further afield?',
        a: 'I am based in Lloret de Mar and serve the whole Costa Brava area in person (Blanes, Tossa de Mar, Girona), but I work remotely with clients anywhere in Spain without any issue.'
      },
      q3: {
        q: 'Do you build websites for real estate agencies?',
        a: 'Yes, it is one of my niches. If you already work with a program such as Inmovilla, Witei or Mobilia, I build your website connected to it: when you add, change or sell a property, the website updates itself, and the portals are still handled by your program, with no paying twice. Search with filters, listings with gallery and map, 2 languages for foreign buyers and local SEO, for 2,990€ with 3 months of maintenance. Before the proposal I check that your program allows the website to connect.'
      },
      q4: {
        q: 'Can I get an AI chatbot on my website, like yours?',
        a: 'Yes — in fact the TesS assistant you can chat with right now on this site is the live demo of that exact service. AI Integration costs between 1,600€ and 6,000€ plus the assistant fee (90€/month for a single channel, 150€/month for several channels or with integrations, and 250€/month when it is multichannel and wired into your systems), depending on that same complexity; the API keys stay under your own account, no middlemen.'
      },
      q5: {
        q: 'What languages do you build websites in?',
        a: 'I communicate and work in Spanish, Catalan and English, but your project can be delivered in any language you need thanks to AI-assisted translation — I am not limited to those three. The Essential Website includes 1 language (+90€ for each additional one), the Complete Website and the Real Estate Website include 2 (+150€ each additional), and in the online shop each language is +150€ with its first 50 products. An extra language does not cost the same on every site because what you pay for is translating and reviewing the text, and that depends on how much there is. Translation covers everything on the site on the day I hand it over; what you write later on the blog is not included: either you translate it, or you send it to me and I translate it within the monthly hour of changes in the maintenance plan. Reviewed AI translation is included; professional or sworn human translation is extra.'
      },
      q6: {
        q: 'What does the monthly maintenance plan include?',
        a: 'Two no-lock-in plans: Basic (60€/month) includes 24/7 monitoring, weekly backups, updates, 1h/month of changes, and a quarterly report. Plus (150€/month) adds daily backups, 5h/month of development, payment gateway monitoring, same-day response, weekends, bank holidays and holidays included, and a monthly report. Separately from maintenance there are two fees of their own, because they are running services rather than a watched website: the AI Integration assistant (90-250€/month) and Appointments that book themselves (29-59€/month). And for Specific Automations I recommend the Basic Plan (60€/month) while they are running, because an unwatched automation breaks silently the day an API changes.'
      },
      q7: {
        q: 'How do I pay for a project?',
        a: 'A 10% deposit to start, with a minimum of 150€, and the rest in 3 or 4 interest-free instalments. What matters: each instalment is paid against a delivery —the design and scope, the working core, the deployment and the acceptance—, not against a date. So you never pay in advance for work you have not seen. And if you already paid for the Process Audit and accept within the following 30 days, those 150€ come off the deposit: on a 5,900€ project the deposit is 590€, so you would pay 440€. Payment is by bank transfer.'
      },
      q8: {
        q: 'What is the Process Audit and what is it for?',
        a: 'It is a 60-90 minute session going through your operations with you and your own figures in front of us —beforehand I tell you what to bring, which is not much and depends on your business—, plus a written 2-3 page report: which processes are costing you time or money, how much, and what can be automated and in what order. With the report I send you the proposal with the price of what would come out of it, and you decide whether to accept it; if I see nothing worth your while, I tell you so and there is no proposal. It costs 150€, deducted from the project if you accept the proposal within the following 30 days. It also includes a look over your website and social media. Before the audit there is the free 30-minute diagnosis: if for now you only want the conversation, you do not have to pay anything.'
      },
      q9: {
        q: 'What is NOT included in a project price?',
        a: 'Third-party costs are billed to the client, even though I handle the setup: domain, hosting, payment gateway fees, business email, and AI API usage. It also does not include copywriting/photography (provided by the client), sworn translation, paid advertising, or social media management. In the booking product with WhatsApp the messages WhatsApp sends are not included either: from 1 October 2026 Meta charges for them and bills you directly, because the account is yours — between 1.7 and 3.3 cents per booking, worked out from Meta\'s official rates. What the fee does include is the cost of the AI model, for normal business use.'
      },
      q10: {
        q: 'Can you get my business taking bookings over WhatsApp?',
        a: 'Yes: it is the booking product, in two versions and with no lock-in. With WhatsApp, an assistant answers your WhatsApp around the clock: it checks the open slots in your calendar, books the appointment, confirms it and sends the reminder, with no need for you to reply. It costs 450€ to set up and 59€/month. Without WhatsApp, your client books on your booking page, reached from your website, your Google profile, your Instagram or the link you send them, and the confirmation and reminder arrive by email: 150€ to set up and 29€/month. It is not the same thing cheaper: there is no assistant holding a conversation, but you do not depend on Meta and you pay no messages. In both, each extra calendar adds 8€/month, the calendar connects to your Google Calendar and the Google review request is included. All + VAT. Both come with a guarantee: if not a single booking comes in outside your opening hours during the first three months, you get the setup fee back. For the WhatsApp version, your number has to be on the WhatsApp Business app, the usual one with tools for businesses. If you do not use it yet, switching is free, takes ten minutes and you keep your number, chats and contacts; I help you do it. Your customers notice nothing, and you keep writing from your phone alongside the assistant. Linking your number to the system depends on an approval from Meta that I do not control. I give you the timeline to have it running in writing in the proposal.'
      },
      q11: {
        q: 'What is the difference between a chatbot, an AI assistant, and the WhatsApp booking system?',
        a: 'They look alike from the outside and do very different things inside, so it is worth clearing up before you pay for something you do not need. A guided-reply chatbot (part of Specific Automations) follows a script: buttons and pre-written answers, and the moment someone asks something that was not scripted, it gets stuck. An AI assistant, like TesS —the one you are chatting with on this site—, understands what people write in plain words and answers with your business information: it informs, guides and captures the contact, but it does not touch anything inside. And the booking product, in its WhatsApp version, is an AI assistant that also acts: it looks at the slots you actually have free in your calendar, books the appointment, confirms it and sends the reminder. That is the difference that matters: the first two tell people things, the third one does the work. That is why only the booking product carries a guarantee, its own fee and the AI model cost included, while with AI Integration the API keys are yours. And here is the part that usually raises an eyebrow: the booking product, the one that does the most, is the cheaper of the two. That is not a typo: it is a product, the same for every business, and the work is configuring it with your services, your opening hours and your calendar, whereas AI Integration is built from scratch around your documentation, your channels and your systems, and no two are alike. What you pay for is the building, not the number of features. If you are unsure which one you need, the question is simple: are you losing unanswered enquiries, or uncaught bookings? And if it is bookings, do not pay for bespoke work: that is what the booking product is for.'
      },
      q12: {
        q: 'Why not build my site in WordPress? It is cheaper.',
        a: 'Because it is not always the right call for you, and I would rather say so before charging you. If what you need is a three-page site you will barely touch, WordPress will do the job and someone will build it for less than I will: I am not going to pretend otherwise. What changes things is when the site has to do something besides look good — talk to your calendar, your management software or your WhatsApp, or take over something you do by hand today. On a template site that gets solved by adding third-party plugins, and every plugin is an update that can break something else, sometimes a yearly licence, and always someone to call who is not you. I build it to measure from scratch, so there are no twenty pieces from twenty different authors that have to get along. And I do the maintenance, which is the difference you actually notice in year two. If WordPress still turns out to be your best fit, I will tell you so in the diagnosis and I will not charge you for finding out.'
      },
      q13: {
        q: 'What if I stop paying for maintenance, or do not renew it when the included year ends?',
        a: 'Nothing renews on its own: where maintenance is included (the first 3 months with the websites and the online shop, and the first year with management software) I tell you before it ends so you decide, and there is never a lock-in. From there it depends on what it is. What is yours stays yours: what I built for you remains yours and, if it is a website or software, it keeps working, with or without maintenance; what you lose is the safety net — monitoring, backups, updates, bug fixing and the monthly hour of changes — so if something breaks one day, you find out yourself and fixing it is quoted separately. The same goes for Specific Automations and the AI Integration assistant: they keep working in your accounts, but with nobody watching or reviewing them. The only exception is the booking product: it stops if you cancel the fee, with 15 days notice, because it runs on my servers and the artificial intelligence is in my account. And if you want to pick it up later, we look at the state it was left in and the catch-up is quoted separately.'
      },
      q14: {
        q: 'Where does my customers’ or patients’ data stay?',
        a: 'What I build for you (website, software or automation) goes in accounts in your name: domain, hosting, database and your WhatsApp number, with the data on servers in the European Union, and it is yours with its source code once you have paid for it in full: I hand it over. The booking product is different: it is the same for every business that uses it and runs on my servers, also in the European Union, with each business’s data kept separate from the others. That is why it costs less. You use it while you pay the fee, and your customers and your appointments are always yours: you also have the appointments in your Google Calendar, and if you leave I give you the customer list and all their appointments in an Excel file. The booking assistant’s artificial intelligence runs in my Google Cloud account, in the EU, under Google’s data protection agreement and without Google using the conversations to train anything. Only I see the assistant’s conversations, and only if there is a fault to fix or you ask me to. With the custom assistant (06), reviewing them every month is part of the service, to fix what it answers badly. And we always sign the data protection agreement the law requires. If your business handles health data, the agreement covers it and we go over it before we start.'
      },
      q15: {
        q: 'What if you work alone and one day you are not around?',
        a: 'You always talk to the person who built it, no call centres. What I set up runs on its own and I monitor it around the clock: if something fails, I know before you do. And you are not tied to me: everything is in your name, and what I build for you is yours, source code included, once you have paid for it. And if you need me to answer at weekends and during holidays too, there is the Plus Plan.'
      },
      q16: {
        q: 'Why a website from you if my property program already gives me one?',
        a: 'If the one your program gives you is enough, keep it: I will not sell you otherwise. The difference comes down to three things. First, that it is really yours: the program’s one usually comes from its template catalogue, on the same base other agencies use, while this one is built for you, with your brand, your areas and how you want foreign buyers to see your properties. Second, that it does not depend on the program: if one day you switch programs, your website stays and only needs connecting to the new one; with the program’s one, if you leave, you are left without a website. And third, that people find you by your area and in every language: SEO and languages are done by hand for the Costa Brava, so they search for you and do not just see you on a portal next to everyone else. I measured on mobile the websites that the programs give two agencies in Lloret: they take between 8 and 16 seconds to show the main content, and Google considers under 2.5 good. Yours is built to load fast, and I show you the measurement before you pay the last instalment.'
      },
      q17: {
        q: 'Why is the shop on Shopify if you build your websites by hand?',
        a: 'Because in a shop the hard part is not the design: it is payments, stock, taxes, shipping, returns and Verifactu invoices, and Shopify already handles them well. This is how the work splits. Shopify takes care of keeping the shop online, security and card data, updates, the cart and checkout (card and Bizum), and the dashboard and phone app where you see orders, customers and stock; its fee (from 24€/month) and its commissions are paid by you, directly to Shopify. I take care of your design, loading your catalogue, setting up payments, shipping, taxes and legal texts, and choosing and setting up the app that issues your Verifactu invoices (its fee is paid by you, like Shopify’s); of showing you how to use it and, with maintenance, of watching that payments and invoices keep coming in and making the changes you ask for. If an app fails, I spot it and sort it out with its maker. And what is yours: the Shopify account is in your name, with your card, and your products, orders and customers are yours. If one day you stop working with me, your shop keeps working just the same.'
      },
      q18: {
        q: 'Why with you and not set it up myself on Shopify?',
        a: 'If you have the time and feel like it, set it up yourself: Shopify is made for that and I will not tell you otherwise. What I save you is what usually goes wrong or gets left half-done. The set-up that has consequences: taxes, shipping, Bizum, legal sales texts and, above all, Verifactu invoices, which become a problem with the tax office if they fail. A shop with your brand, not the theme as it comes. And someone local who watches that payments and invoices keep coming in. If you need it, I also connect it to what you already use (your physical shop’s stock, your invoicing or your till); that is quoted separately, because it depends on what you use. If you do not have a till yet or are thinking of changing it, there is a way with no connection: take payments at the counter with Shopify too, which is included in its fee, so the shop’s stock and the website’s are the same. The account is still yours: if one day you want to run it on your own, you can.'
      }
    },
    contact: {
      title: 'Shall we fit the pieces?',
      subtitle: 'Tell me about your project to book a meeting or ask for technical details, with no strings attached.',
      calendly_title: 'Book the free 30-minute diagnosis',
      calendly_desc: 'It is the fastest way: pick a slot and we talk. No cost, no strings attached, and with your business already looked at beforehand. If you would rather write first, the form is right here.',
      calendly_btn: 'Pick a slot in the calendar',
      name: 'Name or Company Name',
      email: 'Your Contact Email',
      phone: 'Phone or WhatsApp',
      budget_opt0: 'I do not know yet',
      urgency_opt0: 'I do not know yet',
      phone_hint: 'Optional, but I reply faster there',
      message: 'Briefly tell me what you need...',
      reason: 'What would you like to do?',
      reason_opt1: 'Request general information',
      reason_opt2: 'Book an appointment / meeting',
      reason_opt3: 'Request a custom quote',
      budget: 'Approximate budget',
      budget_opt1: 'Less than 1.000€',
      budget_opt2: '1.000€ - 4.000€',
      budget_opt3: '4.000€ - 10.000€',
      budget_opt4: 'More than 10.000€',
      urgency: 'Project urgency',
      urgency_opt1: 'Immediate',
      urgency_opt2: 'Within 1 month',
      urgency_opt3: 'More than 3 months',
      gdpr: 'I have read and accept the terms of the data privacy policy for the processing of my contact request.',
      send: 'Send Request',
      sending: 'Sending...',
      success: 'Request sent! I will get in touch with you shortly to book the appointment or send you the details.',
      error: 'Error sending message. Please try again or write to me directly at: info@teselarsoftware.com'
    },
    simulator: {
      title: 'Return on Investment (ROI) Simulator',
      subtitle: 'Discover how much time and money you are losing by not automating your business tasks.',
      label_hours: 'Hours a week on tasks that repeat (entering data, making invoices, calling to remind…)',
      label_employees: 'Number of employees doing these tasks',
      label_cost: 'Average hourly cost per employee',
      result_monthly: 'Estimated monthly cost',
      result_yearly: 'Estimated yearly cost',
      result_hours: 'Yearly time on these tasks',
      rec_texto: 'This is what is slipping away. In the diagnosis we look at which piece recovers it, and if it is not worth it, I will tell you.',
      btn_apply: 'Take these numbers to the form',
      notif_linked: 'Simulation successfully linked to the form!'
    },
    leads: {
      sticky_cta: 'Free consultation',
      sticky_cta_long: 'Book your free consultation',
      exit_title: 'Wait! Your first consultation is FREE',
      exit_subtitle: 'Leave me your contact details and I\'ll call you with no commitment to look at your project.',
      exit_name: 'Your name',
      exit_email: 'Your email',
      exit_btn: 'I want my free consultation',
      exit_close: 'No, thanks',
      exit_gdpr: 'I accept the privacy policy',
      toast_title: 'Need help deciding?',
      toast_text: 'Write to me with no commitment and I\'ll advise you on the best solution for your business.',
      toast_btn: 'Talk to Rubén',
      inline_title: 'Have a project in mind?',
      inline_subtitle: 'Tell me your idea and I\'ll advise you at no cost. Every business is unique.',
      inline_btn: 'Tell me about your case',
      cta_whatsapp: 'Message me on WhatsApp',
      cta_form: 'Tell me about your case',
      wa_generico: 'Hi Rubén, I am coming from your website and I had a question.',
      wa_servicios: 'Hi Rubén, I am coming from your website. I was looking at your services and had a question about one of them.',
      wa_roi: 'Hi Rubén, I am coming from your website. The part about wasted time caught my eye and I wanted to tell you about my case.',
      wa_precios: 'Hi Rubén, I am coming from the pricing section of your website and I wanted to ask about a quote.',
      post_services: 'I take on few projects at a time, to do each one well, and in the proposal I tell you in writing when I start.',
      post_services_btn: 'Reserve your spot',
      post_roi: 'Your project deserves personalized attention. Book your consultation and I\'ll show you how I can help.',
      post_roi_btn: 'Book personalized consultation',
      post_pricing: 'Every solution I build is unique, just like your business. Let\'s talk about what you need.',
      post_pricing_btn: 'Request a custom quote'
    },
    // Management demo (/en/demo, ADR-113). Each sector's examples live in src/data/demo.ts.
    demo: {
      meta_title: 'Demo: your business organised in two minutes | Teselar Software',
      meta_description: 'Pick your sector and what you handle in your business, and see your technicians, customers, invoices, appointments and stock in one place. Free, no sign-up.',
      banda: 'Simulation · sample data for your sector',
      volver: 'Back to the website',
      titulo: 'See your business organised in two minutes.',
      intro: 'Tell me what you do, what you handle (call-outs and technicians, customers, invoices, appointments or stock) and how you handle it today. I’ll show you how it would all look in one place, with examples from your sector.',
      quien: 'I’m Rubén Reyes, from Teselar Software, in Lloret de Mar.',
      empresa_label: 'Your business name',
      empresa_placeholder: 'e.g. Costa Services',
      sector_legend: 'What do you do?',
      otro_label: 'Tell me what you do',
      otro_placeholder: 'e.g. gardening and pools',
      lleva_legend: 'What do you handle in your business?',
      lleva_hint: 'Pick as many as you like',
      partes: {
        tec: 'Technicians out on jobs',
        cli: 'Customers and quotes',
        fac: 'Invoices and payments',
        cit: 'Appointments or diary',
        mat: 'Materials or stock',
      },
      como_legend: 'How do you handle it today?',
      como: {
        papel: 'Paper and notebook',
        excel: 'Excel',
        whatsapp: 'WhatsApp and memory',
        programa: 'Software I’m not happy with',
      },
      ejemplar: 'Copy No. 001',
      preparado: 'Prepared for',
      tu_empresa: 'your business',
      sin_sector: 'Pick your sector',
      sin_partes: 'Pick what you handle',
      ver: 'See my system',
      panel_dia: 'Tuesday · what’s happening today',
      panel_vacio: 'Pick what you handle in your business above and it will show up here.',
      cta_titulo: 'Shall we look at your case?',
      cta_texto: 'It’s a free 30-minute chat, usually by video call. If your business is less than half an hour from Lloret de Mar, it can also be in person; if you’re a bit further away, just ask. Afterwards you get what we saw in writing. If you book, I receive what you’ve ticked here, so I don’t have to ask you again.',
      cta_btn: 'Book a free chat',
      cta_sub: 'In my calendar · 30 minutes, no commitment',
      nota: 'In the chat you tell me how you handle it today ({como}) and we see what moves across and how. You don’t need to show me any customer data.',
      nota_como: 'Excel, paper, WhatsApp or your current software',
      faq_titulo: 'What I get asked most',
      faq: [
        { id: 'whatsapp', p: 'How does a WhatsApp booking go in on its own?', r: 'If you want, an AI assistant handles your business WhatsApp: it checks free slots, books the appointment and confirms it. You see in the diary what has come in.' },
        { p: 'Who helps me if something goes wrong?', r: 'Me, directly: you always talk to the person who built it. It runs on its own and I keep an eye on it around the clock, so if something goes wrong I know before you do. I also cover weekends and holidays, if you need them. And you’re never tied to me: everything is in your name and the code for anything made to measure is yours.' },
        { p: 'Is it off-the-shelf software or made to measure?', r: 'Made to measure and in stages: we start with what weighs on you most.' },
        { id: 'datos', p: 'Where is my data stored?', r: 'What I build for you (website, software or automation) goes in accounts in your name: domain, hosting, database and your WhatsApp number, with the data on servers in the European Union, and it is yours with its source code once you have paid for it in full: I hand it over. The booking product is different: it is the same for every business that uses it and runs on my servers, also in the European Union, with each business’s data kept separate from the others. That is why it costs less. You use it while you pay the fee, and your customers and your appointments are always yours: you also have the appointments in your Google Calendar, and if you leave I give you the customer list and all their appointments in an Excel file. The booking assistant’s artificial intelligence runs in my Google Cloud account, in the EU, under Google’s data protection agreement and without Google using the conversations to train anything. Only I see the assistant’s conversations, and only if there is a fault to fix or you ask me to. With the custom assistant (06), reviewing them every month is part of the service, to fix what it answers badly. And we always sign the data protection agreement the law requires. If your business handles health data, the agreement covers it and we go over it before we start.' },
      ],
      otro_prefijo: 'Other',
      portada_pregunta: 'Want to see it before we talk?',
      portada_link: 'Try it with your business',
      portada_nota: '2 minutes, no sign-up: pick your sector and see what your day-to-day would look like.',
      doc2_titulo: 'Shall we talk it over?',
      doc2_texto: 'If you want to go over what we looked at, drop me a line and we’ll look at it together.',
      doc2_btn: 'Message Rubén on WhatsApp',
      doc2_sub: 'I’ll reply myself',
      wa_con_empresa: 'Hi Rubén, I’ve seen the demo you prepared for {empresa}.',
      wa_sin_empresa: 'Hi Rubén, I’ve seen the demo you prepared.',
      calendly_etiquetas: { sector: 'Sector', lleva: 'I handle', como: 'Today' },
      como_label: 'How it works',
      ahorro_label: 'What it saves you',
      explica: {
        tec: { como: 'You hand out the work from wherever you are and everyone sees on their phone where they’re going today and what to do.', ahorro: 'The early-morning calls to share out the work, and the changes that get lost in WhatsApp.' },
        parte: { como: 'It’s filled in on the phone at the end of the job and the customer signs on the screen. It reaches you as soon as the phone has signal.', ahorro: 'Copying up paper sheets and chasing hours or details nobody wrote down.' },
        cli: { como: 'Every customer with their history, what you’ve offered them and what comes next. It flags whatever has stalled for days.', ahorro: 'Quotes that go cold because nobody called back, and renewals that slip by.' },
        fac: { como: 'The invoice comes from the work already done, without typing it again, and you see at a glance what’s still unpaid.', ahorro: 'Doing invoices from memory at the end of the month, and payments nobody chases.' },
        cit: { como: 'One diary for the whole team, with bookings that come in by phone or WhatsApp, and a reminder to the customer the day before.', ahorro: 'Appointments written down in several places at once, and customers who forget to turn up.' },
        mat: { como: 'You know what you have, who has it and what’s running low, and it warns you before it runs out.', ahorro: 'Running out of something just when you need it, and extra trips to go and get it.' },
      },
    }
  }
};
