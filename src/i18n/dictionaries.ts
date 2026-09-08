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
      subtitle: 'Transformo tu negocio con tecnología accesible y a medida. Desde presencia digital hasta sistemas ERP/CRM nativos e integraciones de IA.',
      cta: 'Solicitar información',
      cta_alt: 'Diagnóstico gratis · 30 min',
      cta_note: 'Sin coste y sin compromiso. Miro tu negocio antes de la llamada, así que no vengo a preguntarte qué necesitas: vengo con lo que ya he visto. Dos plazas por semana.'
    },
    concept: {
      title: 'La Pieza que Encaja',
      text1: 'La identidad visual de Teselar se inspira en la teselación: el arte de ensamblar piezas de forma que encajen a la perfección, sin dejar huecos ni generar fricciones.',
      text2: 'En el mundo digital, Teselar es esa pieza exacta de software a medida que tu negocio necesita para completar su engranaje y funcionar con total fluidez.'
    },
    services: {
      title: 'Catálogo de Servicios',
      subtitle: 'Soluciones modulares y de alto rendimiento adaptadas a tu tamaño y presupuesto. Sin costes ocultos.',
      ideal: 'Ideal para:',
      pricing: 'Precio',
      features: 'Lo que incluye:',
      live_adjustments: 'Todos mis proyectos de desarrollo web y de software incluyen 1 semana de ajustes en vivo sin coste adicional tras el lanzamiento.',
      interest: 'Me interesa este servicio',
      tres_ia: {
        title: 'Tres servicios hablan por WhatsApp y no son lo mismo',
        c1_title: 'Chatbot guiado · dentro del 02',
        c1_desc: 'Sigue un guion de botones y respuestas previstas. Barato y suficiente si las preguntas son siempre las mismas; en cuanto se salen del guion, se atasca.',
        c2_title: 'Asistente de IA · el 05',
        c2_desc: 'Entiende lo que le escriben con palabras normales y responde con la información de tu negocio. Informa y orienta, pero no toca tu agenda. Se construye a medida sobre tu documentación, tus canales y tus sistemas: por eso el rango es amplio. Es lo que estás usando aquí: TesS.',
        c3_title: 'Citas por WhatsApp · el 03',
        c3_desc: 'Un asistente de IA que además actúa: mira los huecos que tienes libres de verdad, reserva la cita, la confirma y manda el recordatorio. Ya está construido y probado — se configura con tus servicios y tus horarios, y por eso es más barato que un desarrollo a medida y puede llevar garantía.',
        nota: 'La pregunta para elegir es sencilla: ¿lo que pierdes son consultas sin responder, o citas sin coger? Y si son citas, no pagues un desarrollo a medida: eso ya está hecho y te sale más barato.'
      },
      categories: {
        web: 'Desarrollo Web',
        automation: 'Automatización e IA',
        systems: 'Sistemas y ERP'
      },
      s1: {
        title: '01. Auditoría y Consultoría Digital',
        ideal: 'Negocios que quieren el informe escrito antes de invertir. Es el segundo peldaño: la puerta de entrada es el diagnóstico gratuito de 30 minutos, y estos 150€ se descuentan si después contratas.',
        price: '150€ (Descontable de tu proyecto)',
        tag: 'Auditoría SEO & UX',
        f1: 'Análisis completo de presencia digital (web, redes, SEO)',
        f2: 'Revisión de velocidad, usabilidad y experiencia de usuario (UX)',
        f3: 'Informe de competencia y benchmarking del sector',
        f4: 'Identificación de puntos de mejora y oportunidades',
        f5: 'Hoja de ruta personalizada con prioridades y estimaciones',
        f6: 'Sesión de presentación de resultados (1h online o presencial)',
        f7: 'Entrega de informe en PDF profesional'
      },
      s2: {
        title: '02. Automatizaciones Específicas',
        ideal: 'Empresas con una tarea repetitiva concreta que quieren quitarse de encima: un proceso que hoy alguien hace a mano, todas las semanas, siempre igual.',
        price: '700€ — 1.800€ + 60€/mes',
        tag: 'Apps Script + APIs + Make',
        f1: 'Generador automático de presupuestos en PDF desde un formulario',
        f2: 'Envío automático de facturas por email con datos de tu CRM',
        f3: 'Extractor automatizado de datos de correos a Google Sheets',
        f4: 'Chatbot de respuestas guiadas para WhatsApp o Telegram (sigue un guion; si necesitas que entienda lenguaje libre, eso es la Integración de IA)',
        f5: 'Sincronizador de base de datos bidireccional entre plataformas',
        f6: 'Sistema inteligente de recordatorios y alertas automáticas',
        f7: 'Reportes diarios/semanales automáticos por email',
        f8: 'Plan Básico de mantenimiento (60€/mes), obligatorio mientras la automatización esté en marcha: vigilo que siga funcionando y la arreglo si cambia una API o caduca una credencial. Dónde acaba mi trabajo: no cubre funciones nuevas, cambios del proceso ni integrar herramientas que no estuvieran en el alcance acordado — eso se presupuesta aparte'
      },
      s3: {
        title: '04. Web Esencial',
        ideal: 'Freelancers, pequeñas empresas, profesionales independientes y nuevos emprendedores.',
        price: '1.200€ — 1.600€',
        tag: 'React + Vite + Tailwind CSS',
        f1: 'Página única de alto impacto o 3-4 secciones estructuradas',
        f2: 'Diseño web moderno, responsive y optimizado para móvil',
        f3: 'Formulario de contacto y botón de WhatsApp con notificación automática',
        f4: '1 idioma incluido — cada idioma adicional +150€',
        f5: 'SEO técnico básico (meta tags, estructura HTML limpia)',
        f6: 'Optimización extrema de velocidad de carga y rendimiento',
        f7: '1 semana de ajustes en vivo durante el despliegue'
      },
      s4: {
        title: '05. Integración de Inteligencia Artificial',
        ideal: 'Negocios que reciben muchas preguntas repetidas y las contestan a mano: horarios, precios, cómo funciona algo, si haces tal cosa. El asistente responde por ti con la información de tu negocio, pero no gestiona tu agenda — si lo que se te escapan son citas, el servicio es el 03. El precio final depende de la complejidad: un chatbot sencillo de un solo canal se sitúa en la parte baja del rango; un asistente avanzado con múltiples integraciones y canales (web, WhatsApp, Telegram), en la parte alta.',
        price: '1.600€ — 6.000€ + 90-250€/mes',
        tag: 'OpenAI / Anthropic APIs',
        f1: 'Asistente virtual con IA entrenado con tu documentación interna',
        f2: 'Chatbot inteligente de atención para web, WhatsApp o Telegram: informa y orienta con tus datos, sin gestionar tu agenda (para eso está Citas por WhatsApp)',
        f3: 'Generación automática de contenidos o respuestas predefinidas',
        f4: 'Análisis, clasificación y resumen automático de documentos',
        f5: 'Automatización avanzada con procesamiento de lenguaje natural',
        f6: 'Integración directa con modelos GPT, Claude u homólogos',
        f7: 'Cuota mensual del asistente, obligatoria y en tres tramos: 90€/mes si atiende un solo canal, 150€/mes si son varios o lleva integraciones, y 250€/mes si es multicanal y además se integra con tus sistemas. Incluye revisar las conversaciones, corregir lo que se conteste mal y mantener al día la información con la que responde. El consumo de las APIs de IA va en tu propia cuenta, a tu nombre'
      },
      s5: {
        title: '06. Web Completa',
        ideal: 'Pymes que necesitan la web de verdad de su negocio: catálogo o portfolio, blog y preparada para clientes extranjeros.',
        price: 'Desde 3.000€ (2 idiomas incluidos)',
        tag: 'React + Vite + Headless CMS',
        f1: 'Estructura modular de 5 a 8 secciones bien definidas',
        f2: 'Galería de proyectos o portfolio interactivo con filtros dinámicos',
        f3: 'Sección autogestionable de blog, artículos o noticias',
        f4: 'Panel de administración intuitivo para gestionar contenidos',
        f5: '2 idiomas incluidos con detección automática — cada idioma adicional +250€',
        f6: 'SEO técnico completo (sitemap, hreflang, Google Search Console)',
        f7: '1 semana de ajustes en vivo y formación de uso'
      },
      s6: {
        title: '07. Tienda Online / E-commerce',
        ideal: 'Comercios locales o marcas que venden productos o servicios directamente online.',
        price: 'Desde 4.000€',
        tag: 'React + BD + Pasarelas de Pago',
        f1: 'Carrito de compra interactivo, fluido y de carga ultrarrápida',
        f2: 'Proceso de checkout seguro y simplificado (One-Step)',
        f3: 'Integración completa con Stripe, PayPal y Bizum',
        f4: 'Gestión de productos y stock desde el panel de administración',
        f5: 'Notificaciones automáticas de pedidos al email de clientes y gestor',
        f6: 'Módulo de cupones de descuento, impuestos y costes de envío',
        f7: 'Historial de transacciones de clientes y facturación básica',
        f8: 'Plan Básico de mantenimiento incluido el primer año; después, 60€/mes sin permanencia (o Plan Plus si el volumen de pedidos lo pide)'
      },
      s7: {
        title: '08. Web Inmobiliaria',
        ideal: 'Inmobiliarias que quieren destacar propiedades, captar compradores extranjeros y sincronizar con los portales.',
        price: 'Desde 6.000€',
        tag: 'React + BD + Kyero XML',
        f1: 'Buscador de propiedades con filtros (zona, precio, tipo, habitaciones)',
        f2: 'Fichas de propiedad con galería, mapa y sistema de destacados',
        f3: 'Panel de control para publicar y gestionar propiedades sin tocar código',
        f4: '2 idiomas incluidos para compradores extranjeros — adicional +250€',
        f5: 'Exportación XML (formato Kyero) para sincronizar con Idealista, Habitaclia, Fotocasa y portales internacionales',
        f6: 'Formulario de contacto por propiedad y botón de WhatsApp',
        f7: 'SEO local, y mantenimiento incluido el primer año (los feeds a portales necesitan vigilancia)'
      },
      s8: {
        title: '09. Sistema de Gestión a Medida (ERP/CRM)',
        ideal: 'Negocios que quieren digitalizar un proceso clave (facturación, clientes, proyectos) con una herramienta hecha exactamente a su medida.',
        price: '8.000€ — 12.000€',
        tag: 'Electron + React + Base de Datos',
        f1: 'Aplicación de escritorio nativa instalable (Windows, macOS, Linux)',
        f2: 'Dashboard interactivo con gráficos financieros y métricas en vivo',
        f3: 'Módulo integral de gestión de clientes (CRM) y base de contactos',
        f4: 'Generación automática y descarga directa de facturas y presupuestos en PDF',
        f5: 'Planificador interno de proyectos, tareas de equipo y control de tiempos',
        f6: 'Roles de usuario avanzados con niveles de acceso seguros',
        f7: 'Formación integral del equipo + 1 semana de soporte prioritario',
        f8: 'Plan Básico de mantenimiento incluido el primer año; después, 60€/mes sin permanencia'
      },
      s9: {
        title: '03. Citas por WhatsApp',
        ideal: 'Negocios que trabajan con cita previa y hoy las cogen a mano: peluquerías y barberías, estética, fisioterapia, clínicas, talleres o asesorías. Es el único servicio que entra en tu agenda y reserva de verdad, no solo informa.',
        price: '700€ — 1.800€ + 150-250€/mes',
        tag: 'WhatsApp Cloud API + Agenda',
        f1: 'Un asistente atiende tu WhatsApp las 24 horas: consulta los huecos libres, reserva la cita y la confirma sin que tengas que contestar',
        f2: 'Agenda sincronizada con la que ya usas — nunca dos citas en el mismo hueco',
        f3: 'Recordatorio automático antes de la cita, que es lo que hace que la gente no falte',
        f4: 'Cambios y cancelaciones por el mismo WhatsApp, sin llamadas ni huecos muertos',
        f5: 'Panel con tus citas y el contador de las que entraron fuera de tu horario de atención',
        f6: 'Garantía: si en los tres primeros meses no entra ni una cita fuera de tu horario, te devuelvo la puesta en marcha',
        f7: 'Petición automática de reseñas en Google al terminar la cita, como complemento (+200€)'
      }
    },
    pricing: {
      title: 'Mantenimiento y Soporte',
      subtitle: 'Tranquilidad absoluta para tu negocio. Cuido de tu tecnología para que te enfoques en crecer.',
      basic: {
        title: 'Plan Básico',
        price: '60€',
        period: '/ mes',
        desc: 'Tu web vigilada y al día, sin permanencia. Incluido el primer año en E-commerce, Web Inmobiliaria y Sistemas a Medida, y obligatorio mientras tengas una automatización en marcha. Los dos servicios con IA llevan cuota propia, aparte de esta.',
        f1: 'Monitorización automática 24/7 y copias de seguridad semanales',
        f2: 'Actualizaciones de seguridad y corrección de errores',
        f3: '1h/mes de cambios de contenido y ajustes menores',
        f4: 'Respuesta en 24-48h laborables e informe trimestral de estado'
      },
      plus: {
        title: 'Plan Plus',
        price: '150€',
        period: '/ mes',
        desc: 'Para e-commerce, inmobiliarias y webs que cambian mucho. Sin permanencia.',
        f1: 'Todo lo del Básico, con copias de seguridad diarias',
        f2: '5h/mes de desarrollo y mejoras (no acumulables)',
        f3: 'Vigilancia de pasarelas de pago y feeds a portales + revisión trimestral de velocidad y SEO',
        f4: 'Respuesta el mismo día laborable (4h en incidencia crítica) e informe mensual'
      },
      citas: {
        title: 'Citas por WhatsApp · cuota del servicio',
        price: '150€ — 250€',
        period: '/ mes',
        desc: 'El producto de Citas por WhatsApp lleva su propia cuota, aparte del mantenimiento: 150€/mes el plan Esencial y 250€/mes el Completo. No es un extra opcional, es el servicio funcionando — y se ajusta al tamaño de tu negocio.',
        f1: 'El asistente atendiendo tu WhatsApp cada día, supervisado y corregido si algo cambia — con el coste del modelo de IA incluido: no tienes que darte de alta en ningún servicio ni gestionar claves',
        f2: 'Cambios de horarios, servicios, precios y textos cuando los necesites',
        f3: 'Los mensajes que envía WhatsApp los factura Meta directamente a tu cuenta: unos 8-10 céntimos por cita, contados sobre los mensajes que el sistema envía de verdad. Es una estimación con la tarifa vigente, porque Meta aún no ha publicado la lista oficial que entra en vigor el 1 de octubre. Lo que escriben tus clientes es gratis',
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
        desc: 'Costes de terceros a cargo del cliente — aunque te los gestiono yo: dominio y hosting, comisiones de pasarelas de pago (Stripe/PayPal), correo empresarial, herramientas de email marketing y consumo de APIs de IA. Tampoco incluye: redacción de textos y fotografías (los aporta el cliente; redacción asistida por IA disponible como extra), traducción humana profesional o jurada (la traducción con IA revisada sí va incluida en los idiomas contratados), publicidad de pago (Google/Meta Ads), gestión de redes sociales, y funcionalidades nuevas fuera del alcance acordado, que se presupuestan aparte. En el producto de Citas por WhatsApp, tampoco los mensajes que envía WhatsApp: desde el 1 de octubre de 2026 Meta los cobra (unos 8-10 céntimos por cita reservada, estimados con la tarifa vigente porque Meta todavía no ha publicado la lista oficial de octubre) y te los factura directamente a ti, porque la cuenta de WhatsApp es tuya; lo que escriben tus clientes es gratis siempre. El coste del modelo de IA sí va incluido en la cuota mensual, para un uso normal del negocio (hasta 500 conversaciones al mes en el plan Esencial y 1.500 en el Completo).'
      },
      payment: {
        title: 'Métodos de Pago & Condiciones',
        methods: 'Métodos aceptados: Transferencia bancaria o efectivo en mano (con cita previa).',
        conditions: 'Condiciones: Posibilidad de fraccionar el pago del proyecto sin intereses en hasta 3 meses. Siempre se requerirá un pago de entrada del 50% del coste total presupuestado para comenzar a trabajar.'
      }
    },
    values: {
      title: '¿Por qué elegirme?',
      subtitle: 'La ventaja competitiva de trabajar con artesanos de software especializados en lugar de grandes consultoras lentas o freelancers inestables.',
      v1: {
        title: 'Contacto Directo sin Intermediarios',
        desc: 'Hablo tu mismo idioma. Tratas directamente con el desarrollador que escribe cada línea de código de tu aplicación, sin esperas ni malentendidos.'
      },
      v2: {
        title: 'Desarrollo Nativo a Medida',
        desc: 'Huyo de las plantillas de WordPress pesadas e inseguras. Hago las webs a mano con React y Tailwind, y eso te da una velocidad insuperable y un SEO excelente.'
      },
      v3: {
        title: 'Cercanía y Entendimiento Local',
        desc: 'Con base en Lloret de Mar. Me gusta conocer tu negocio de cerca, vernos en persona y diseñar la solución que encaje con tus objetivos locales.'
      },
      v4: {
        title: 'Estabilidad y Soporte Garantizado',
        desc: 'Cada desarrollo se entrega con garantía de estabilidad, formación integral y soporte técnico comprometido para asegurar el éxito continuo de tu negocio.'
      }
    },
    process: {
      title: 'Mi Proceso de Trabajo',
      subtitle: 'Una hoja de ruta clara para dar forma a tu solución digital de principio a fin.',
      p1: {
        title: '01. Primer Contacto',
        desc: 'Analizo tus necesidades actuales en detalle. Definimos juntos los objetivos y te aconsejo el módulo que mejor se adapta.'
      },
      p2: {
        title: '02. Propuesta Clara',
        desc: 'Trazo la arquitectura exacta del software, fijo los plazos y te entrego un presupuesto detallado y cerrado, sin sorpresas.'
      },
      p3: {
        title: '03. Desarrollo Ágil',
        desc: 'Programo la web o el software con las mejores prácticas de la industria. Tendrás acceso privado para ver el progreso real paso a paso.'
      },
      p4: {
        title: '04. Ajustes en Vivo',
        desc: 'Despliego la web. Durante la primera semana hago ajustes y mejoras en caliente sobre producción, a partir de lo que me vayas diciendo.'
      }
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Lo que más me preguntan antes de empezar un proyecto. Si tienes otra duda, escríbeme.',
      q1: {
        q: '¿Cuánto cuesta una página web?',
        a: 'Depende del alcance: una Web Esencial (página única o 3-4 secciones) cuesta 1.200€-1.600€, y una Web Completa (blog, panel de gestión, portfolio) desde 3.000€. Ambas incluyen 1 semana de ajustes en vivo tras el lanzamiento. Te doy un precio cerrado tras la primera conversación, sin sorpresas.'
      },
      q2: {
        q: '¿Trabajas solo en Lloret de Mar o también fuera?',
        a: 'Tengo la base en Lloret de Mar y doy servicio presencial en toda la Costa Brava (Blanes, Tossa de Mar, Girona), pero trabajo en remoto con clientes de cualquier punto de España sin ningún problema.'
      },
      q3: {
        q: '¿Haces páginas web para inmobiliarias?',
        a: 'Sí, es uno de mis nichos: Web Inmobiliaria desde 6.000€, con buscador de propiedades con filtros, panel de gestión sin tocar código y exportación XML en formato Kyero para sincronizar automáticamente con Idealista, Habitaclia y Fotocasa.'
      },
      q4: {
        q: '¿Puedo tener un chatbot con inteligencia artificial en mi web, como el tuyo?',
        a: 'Sí — de hecho el asistente TesS con el que puedes chatear ahora mismo en esta web es la demo en vivo de ese servicio. La Integración de IA cuesta entre 1.600€ y 6.000€ más la cuota del asistente (90€/mes con un solo canal, 150€/mes si son varios o lleva integraciones y 250€/mes si es multicanal y conectado a tus sistemas), según esa misma complejidad; las claves de API quedan a tu nombre, sin intermediarios.'
      },
      q5: {
        q: '¿En qué idiomas haces las webs?',
        a: 'Me comunico y trabajo en español, català e inglés, pero tu proyecto puede entregarse en cualquier idioma que necesites gracias a traducción asistida por IA — no estoy limitado a esos tres. La Web Esencial incluye 1 idioma (+150€ cada idioma adicional) y la Web Completa y la Web Inmobiliaria incluyen 2 idiomas (+250€ cada adicional). La traducción con IA revisada va incluida; la traducción humana profesional o jurada corre aparte.'
      },
      q6: {
        q: '¿Qué incluye el mantenimiento mensual?',
        a: 'Dos planes sin permanencia: el Básico (60€/mes) incluye monitorización 24/7, copias de seguridad semanales, actualizaciones, 1h/mes de cambios e informe trimestral. El Plus (150€/mes) añade copias diarias, 5h/mes de desarrollo, vigilancia de pasarelas de pago y feeds a portales, respuesta el mismo día e informe mensual. Aparte del mantenimiento hay dos cuotas propias, porque son servicios funcionando y no una web vigilada: el asistente de la Integración de IA (90-250€/mes) y las Citas por WhatsApp (150-250€/mes). Y las Automatizaciones Específicas llevan el Plan Básico incluido de forma obligatoria mientras estén en marcha, porque una automatización sin vigilar se rompe callada el día que cambia una API.'
      },
      q7: {
        q: '¿Cómo se paga un proyecto?',
        a: 'Se pide un 50% por adelantado para empezar a trabajar y el resto se puede fraccionar sin intereses en hasta 3 meses. Acepto transferencia bancaria o efectivo en mano con cita previa.'
      },
      q8: {
        q: '¿Qué es la Auditoría Digital y para qué sirve?',
        a: 'Es un análisis completo de tu presencia digital actual (web, redes, SEO, velocidad, competencia) con una hoja de ruta de mejoras priorizadas, por 150€. Si después contratas cualquier proyecto conmigo, ese importe se descuenta del total. Antes de la auditoría está el diagnóstico gratuito de 30 minutos: si de momento solo quieres la conversación, no tienes que pagar nada.'
      },
      q9: {
        q: '¿Qué NO está incluido en el precio de un proyecto?',
        a: 'Los costes de terceros van a cargo del cliente aunque te los gestiono yo: dominio, hosting, comisiones de pasarelas de pago, correo empresarial y consumo de APIs de IA. Tampoco incluye redacción de textos/fotos (las aporta el cliente), traducción jurada, publicidad de pago ni gestión de redes sociales. En el producto de Citas por WhatsApp tampoco entran los mensajes que envía WhatsApp: desde el 1 de octubre de 2026 los cobra Meta y te los factura a ti directamente, porque la cuenta es tuya — unos 8-10 céntimos por cita, estimados con la tarifa vigente mientras Meta no publique la lista oficial. Lo que sí va incluido en esa cuota es el coste del modelo de IA, para un uso normal del negocio.'
      },
      q10: {
        q: '¿Puedes hacer que mi negocio coja las citas por WhatsApp?',
        a: 'Sí, es uno de mis servicios. Un asistente atiende tu WhatsApp las 24 horas: consulta los huecos libres de tu agenda, reserva la cita, la confirma y manda el recordatorio, sin que tengas que contestar tú. El plan Esencial cuesta 700€-900€ de puesta en marcha más 150€/mes y el Completo 1.500€-1.800€ más 250€/mes. Va con garantía: si en los tres primeros meses no entra ni una sola cita fuera de tu horario de atención, te devuelvo la puesta en marcha. Necesitas tener el número en la app WhatsApp Business (migrar es gratis, tarda diez minutos y te ayudo a hacerlo) y que Meta verifique tu empresa, que lleva una o dos semanas. Si prefieres no depender de Meta, hay una versión sin API por 400€-700€ más 90€/mes.'
      },
      q11: {
        q: '¿Qué diferencia hay entre un chatbot, un asistente de IA y el sistema de citas por WhatsApp?',
        a: 'Por fuera se parecen y por dentro hacen cosas muy distintas, así que vale la pena aclararlo antes de pagar por lo que no necesitas. Un chatbot de respuestas guiadas (dentro de Automatizaciones Específicas) sigue un guion: botones y respuestas previstas, y en cuanto le preguntan algo que no estaba escrito, se atasca. Un asistente de IA, como TesS —con el que estás chateando en esta web—, entiende lo que le escriben con palabras normales y responde con la información de tu negocio: informa, orienta y recoge el contacto, pero no toca nada por dentro. Y el sistema de Citas por WhatsApp es un asistente de IA que además actúa: mira los huecos de verdad que tienes libres en tu agenda, reserva la cita, la confirma y manda el recordatorio. Esa es la diferencia que importa: los dos primeros cuentan cosas, el tercero hace el trabajo. Por eso solo el de citas lleva garantía, cuota propia y el coste del modelo de IA incluido, mientras que en la Integración de IA las claves de API son tuyas. Y aquí viene lo que suele extrañar: el de citas, que es el que más hace, es el más barato de los dos. No es una errata — es que ya está construido y probado, y lo que se hace es configurarlo con tus servicios, tus horarios y tu agenda; la Integración de IA se fabrica desde cero sobre tu documentación, tus canales y tus sistemas, y no hay dos iguales. Lo que pagas es la fabricación, no el número de funciones. Si dudas cuál te toca, la pregunta es sencilla: ¿lo que pierdes son consultas sin responder, o citas sin coger? Y si son citas, no pagues un desarrollo a medida: eso ya está hecho.'
      }
    },
    contact: {
      title: '¿Hacemos encajar las piezas?',
      subtitle: 'Escríbeme sobre tu proyecto para agendar una cita o pedir información técnica, sin compromiso.',
      calendly_title: 'Reserva el diagnóstico gratuito de 30 minutos',
      calendly_desc: 'Es la forma más rápida: eliges hueco y hablamos. Sin coste, sin compromiso y con tu negocio ya mirado por delante. Si prefieres escribir primero, tienes el formulario justo debajo.',
      calendly_btn: 'Elegir hueco en el calendario',
      name: 'Nombre o Empresa',
      email: 'Tu Correo Electrónico',
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
    hud: {
      title: 'Next.js vs. WordPress / No-Code',
      subtitle: 'La diferencia técnica que decide el éxito de tu negocio. Por qué programo a medida.',
      platform_nextjs: 'Mi Solución (Next.js)',
      platform_wp: 'Solución Tradicional (WordPress)',
      metric_perf: 'Rendimiento (Lighthouse)',
      metric_speed: 'Tiempo de Carga Móvil',
      metric_sec: 'Nivel de Seguridad',
      metric_plug: 'Dependencia de Plugins',
      metric_scale: 'Escalabilidad de Visitas',
      nextjs_perf_desc: '99% — Carga instantánea y fluidez máxima',
      wp_perf_desc: '42% — Pesado, lento y frustrante para el usuario',
      nextjs_speed_desc: '0.2s — Interactivo al instante',
      wp_speed_desc: '4.8s — Pérdida del 35% de posibles clientes',
      nextjs_sec_desc: '100% — Inmune a ataques web por arquitectura estática',
      wp_sec_desc: 'Baja — Constantes hackeos y parches de plugins',
      nextjs_plug_desc: '0 plugins — Código nativo limpio, ligero y optimizado',
      wp_plug_desc: '25+ plugins — Fugas de velocidad y cuelgues constantes',
      nextjs_scale_desc: 'Ilimitada — Soporta millones de visitas con coste 0€',
      wp_scale_desc: 'Limitada — El servidor cae al acumular tráfico'
    },
    simulator: {
      title: 'Simulador de Retorno de Inversión (ROI)',
      subtitle: 'Descubre cuánto tiempo y dinero estás perdiendo por no automatizar las tareas repetitivas de tu negocio.',
      label_hours: 'Horas semanales desperdiciadas en tareas repetitivas',
      label_employees: 'Número de empleados haciendo estas tareas',
      label_cost: 'Coste medio por hora del empleado',
      result_monthly: 'Ahorro Mensual Estimado',
      result_yearly: 'Ahorro Anual Estimado',
      result_hours: 'Tiempo Anual Recuperado',
      rec_title: 'Propuesta de Solución Sugerida',
      rec_badge: 'RECOMENDADO',
      btn_apply: 'Vincular presupuesto y continuar al formulario',
      notif_linked: '¡Simulación vinculada con éxito en el formulario!',
      opt_s2: '02. Automatizaciones Específicas',
      opt_s4: '05. Integración de Inteligencia Artificial',
      opt_s8: '09. Sistema ERP/CRM (App Nativa)'
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
      inline_btn: 'Solicitar análisis gratuito',
      post_services: 'Trabajo con un número reducido de clientes para poder cuidar cada proyecto.',
      post_services_btn: 'Reserva tu plaza',
      post_roi: 'Tu proyecto merece atención personalizada. Reserva tu consulta y te cuento cómo puedo ayudarte.',
      post_roi_btn: 'Agendar consulta personalizada',
      post_pricing: 'Cada solución que hago es única, como tu negocio. Hablemos de lo que necesitas.',
      post_pricing_btn: 'Solicitar presupuesto a medida'
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
      subtitle: 'Transformo el teu negoci amb tecnologia accessible i a mida. Des de presència digital fins a sistemes ERP/CRM natius i integracions d\'IA.',
      cta: 'Sol·licitar informació',
      cta_alt: 'Diagnòstic gratis · 30 min',
      cta_note: 'Sense cost i sense compromís. Miro el teu negoci abans de la trucada, així que no vinc a preguntar-te què necessites: vinc amb el que ja he vist. Dues places per setmana.'
    },
    concept: {
      title: 'La Peça que Encaixa',
      text1: 'La identitat visual de Teselar s\'inspira en la tessel·lació: l\'art d\'acoblar peces de manera que encaixin perfectament, sense deixar buits ni generar friccions.',
      text2: 'En el món digital, Teselar és aquesta peça exacta de programari a mida que el teu negoci necessita per completar el seu engranatge i funcionar amb fluïdesa total.'
    },
    services: {
      title: 'Catàleg de Serveis',
      subtitle: 'Solucions modulars i d\'alt rendiment adaptades a la teva mida i pressupost. Sense costos ocults.',
      ideal: 'Ideal per a:',
      pricing: 'Preu',
      features: 'Què inclou:',
      live_adjustments: 'Tots els meus projectes de desenvolupament web i de programari inclouen 1 setmana d\'ajustaments en viu sense cost addicional després del llançament.',
      interest: 'M\'interessa aquest servei',
      tres_ia: {
        title: 'Tres serveis parlen per WhatsApp i no són el mateix',
        c1_title: 'Xatbot guiat · dins del 02',
        c1_desc: 'Segueix un guió de botons i respostes previstes. Barat i suficient si les preguntes són sempre les mateixes; així que se surten del guió, s\'encalla.',
        c2_title: 'Assistent d\'IA · el 05',
        c2_desc: 'Entén el que li escriuen amb paraules normals i respon amb la informació del teu negoci. Informa i orienta, però no toca la teva agenda. Es construeix a mida sobre la teva documentació, els teus canals i els teus sistemes: per això el rang és ampli. És el que estàs fent servir aquí: la TesS.',
        c3_title: 'Cites per WhatsApp · el 03',
        c3_desc: 'Un assistent d\'IA que a més actua: mira els forats que tens lliures de debò, reserva la cita, la confirma i envia el recordatori. Ja està construït i provat — es configura amb els teus serveis i els teus horaris, i per això és més barat que un desenvolupament a mida i pot portar garantia.',
        nota: 'La pregunta per triar és senzilla: el que perds són consultes sense respondre, o cites sense agafar? I si són cites, no paguis un desenvolupament a mida: això ja està fet i et surt més barat.'
      },
      categories: {
        web: 'Desenvolupament Web',
        automation: 'Automatització i IA',
        systems: 'Sistemes i ERP'
      },
      s1: {
        title: '01. Auditoria i Consultoria Digital',
        ideal: 'Negocis que volen l\'informe escrit abans d\'invertir. És el segon graó: la porta d\'entrada és el diagnòstic gratuït de 30 minuts, i aquests 150€ es descompten si després contractes.',
        price: '150€ (Descomptable del teu projecte)',
        tag: 'Auditoria SEO & UX',
        f1: 'Anàlisi complet de presència digital (web, xarxes socials, SEO)',
        f2: 'Revisió de velocitat, usabilitat i experiència d\'usuari (UX)',
        f3: 'Informe de competència i benchmarking del sector',
        f4: 'Identificació de punts de millora i oportunitats crítiques',
        f5: 'Full de ruta personalitzat amb prioritats i estimacions de cost',
        f6: 'Sessió de presentació de resultats (1h online o presencial)',
        f7: 'Lliurament d\'informe professional en PDF d\'alta qualitat'
      },
      s2: {
        title: '02. Automatitzacions Específiques',
        ideal: 'Empreses amb una tasca repetitiva concreta que es volen treure del damunt: un procés que avui algú fa a mà, cada setmana, sempre igual.',
        price: '700€ — 1.800€ + 60€/mes',
        tag: 'Apps Script + APIs + Make',
        f1: 'Generador automàtic de pressupostos en PDF des d\'un formulari',
        f2: 'Enviament automàtic de factures per correu amb dades del teu CRM',
        f3: 'Extractor automatitzat de dades de correus a Google Sheets',
        f4: 'Xatbot de respostes guiades per a WhatsApp o Telegram (segueix un guió; si necessites que entengui llenguatge lliure, això és la Integració d\'IA)',
        f5: 'Sincronizador de base de dades bidireccional entre plataformes',
        f6: 'Sistema intel·ligent de recordatoris i alertes automàtiques',
        f7: 'Informes diaris o setmanals automàtics per correu electrònic',
        f8: 'Pla Bàsic de manteniment (60€/mes), obligatori mentre l\'automatització estigui en marxa: vigilo que segueixi funcionant i l\'arreglo si canvia una API o caduca una credencial. On acaba la meva feina: no cobreix funcions noves, canvis del procés ni integrar eines que no fossin a l\'abast acordat — això es pressuposta a part'
      },
      s3: {
        title: '04. Web Essencial',
        ideal: 'Freelancers, petites empreses, professionals independents i nous emprenedors.',
        price: '1.200€ — 1.600€',
        tag: 'React + Vite + Tailwind CSS',
        f1: 'Pàgina única d\'alt impacte o 3-4 seccions ben estructurades',
        f2: 'Disseny web modern, responsive i optimizat per a mòbil',
        f3: 'Formulari de contacte i botó de WhatsApp amb notificació automàtica',
        f4: '1 idioma inclòs — cada idioma addicional +150€',
        f5: 'SEO tècnic bàsic (etiquetes meta, estructura HTML neta)',
        f6: 'Optimització extrema de la velocitat de càrrega i rendiment',
        f7: '1 setmana d\'ajustaments en viu durant el desplegament'
      },
      s4: {
        title: '05. Integració d\'Intel·ligència Artificial',
        ideal: 'Negocis que reben moltes preguntes repetides i les contesten a mà: horaris, preus, com funciona una cosa, si fas tal servei. L\'assistent respon per tu amb la informació del teu negoci, però no gestiona la teva agenda — si el que se t\'escapa són cites, el servei és el 03. El preu final depèn de la complexitat: un xatbot senzill d\'un sol canal se situa en la part baixa del rang; un assistent avançat amb múltiples integracions i canals (web, WhatsApp, Telegram), en la part alta.',
        price: '1.600€ — 6.000€ + 90-250€/mes',
        tag: 'OpenAI / Anthropic APIs',
        f1: 'Assistent virtual amb IA entrenat amb la teva documentació interna',
        f2: 'Xatbot intel·ligent d\'atenció per a web, WhatsApp o Telegram: informa i orienta amb les teves dades, sense gestionar la teva agenda (per això hi ha Cites per WhatsApp)',
        f3: 'Generació automàtica de continguts o respostes predefinides',
        f4: 'Anàlisi, classificació i resum automàtic de documents',
        f5: 'Automatització avançada amb processament de llenguatge natural',
        f6: 'Integració directa amb models GPT, Claude o homòlegs',
        f7: 'Quota mensual de l\'assistent, obligatòria i en tres trams: 90€/mes si atén un sol canal, 150€/mes si en són diversos o porta integracions, i 250€/mes si és multicanal i a més s\'integra amb els teus sistemes. Inclou revisar les converses, corregir el que es respongui malament i mantenir al dia la informació amb què respon. El consum de les APIs d\'IA va al teu propi compte, al teu nom'
      },
      s5: {
        title: '06. Web Completa',
        ideal: 'Pimes que necessiten la web de veritat del seu negoci: catàleg o portfoli, blog i preparada per a clients estrangers.',
        price: 'Des de 3.000€ (2 idiomes inclosos)',
        tag: 'React + Vite + Headless CMS',
        f1: 'Estructura modular de 5 a 8 seccions ben definides',
        f2: 'Galeria de projectes o portfoli interactiu amb filtres dinàmics',
        f3: 'Secció autogestionable de blog, articles o notícies',
        f4: 'Panell d\'administració intuïtiu per gestionar continguts',
        f5: '2 idiomes inclosos amb detecció automàtica — cada idioma addicional +250€',
        f6: 'SEO tècnic complet (sitemap, hreflang, Google Search Console)',
        f7: '1 setmana d\'ajustaments en viu i formació d\'ús inclosa'
      },
      s6: {
        title: '07. Botiga Online / E-commerce',
        ideal: 'Comerços locals o marques que volen vendre productes o serveis directament online.',
        price: 'Des de 4.000€',
        tag: 'React + BD + Passarel·les de Pagament',
        f1: 'Carret de compra interactiu, fluid i de càrrega ultraràpida',
        f2: 'Procés de checkout segur i simplificat (One-Step)',
        f3: 'Integració completa amb Stripe, PayPal i Bizum',
        f4: 'Gestió integral de productes i existències des de panell d\'admin',
        f5: 'Notificacions automàtiques de comandes al client i gestor',
        f6: 'Mòdul de cupons de descompte, impostos i despeses d\'enviament',
        f7: 'Historial de transaccions de clients i facturació bàsica',
        f8: 'Pla Bàsic de manteniment inclòs el primer any; després, 60€/mes sense permanència (o Pla Plus si el volum de comandes ho demana)'
      },
      s7: {
        title: '08. Web Immobiliària',
        ideal: 'Immobiliàries que volen destacar propietats, captar compradors estrangers i sincronitzar amb els portals.',
        price: 'Des de 6.000€',
        tag: 'React + BD + Kyero XML',
        f1: 'Cercador de propietats amb filtres (zona, preu, tipus, habitacions)',
        f2: 'Fitxes de propietat amb galeria, mapa i sistema de destacats',
        f3: 'Panell de control per publicar i gestionar propietats sense tocar codi',
        f4: '2 idiomes inclosos per a compradors estrangers — addicional +250€',
        f5: 'Exportació XML (format Kyero) per sincronitzar amb Idealista, Habitaclia, Fotocasa i portals internacionals',
        f6: 'Formulari de contacte per propietat i botó de WhatsApp',
        f7: 'SEO local, i manteniment inclòs el primer any (els feeds a portals necessiten vigilància)'
      },
      s8: {
        title: '09. Sistema de Gestió a Mida (ERP/CRM)',
        ideal: 'Negocis que volen digitalitzar un procés clau (facturació, clients, projectes) amb una eina feta exactament a mida.',
        price: '8.000€ — 12.000€',
        tag: 'Electron + React + Base de Dades',
        f1: 'Aplicació d\'escriptori nativa instal·lable (Windows, macOS, Linux)',
        f2: 'Dashboard interactiu amb gràfics financers i mètriques en viu',
        f3: 'Mòdul integral de gestió de clients (CRM) i base de contactes',
        f4: 'Generació automàtica i descàrrega directa de factures i pressupostos en PDF',
        f5: 'Planificador intern de projectes, tasques d\'equip i control de temps',
        f6: 'Rols d\'usuari avançats amb nivells d\'accés segurs',
        f7: 'Formació integral de l\'equip + 1 setmana de suport prioritari',
        f8: 'Pla Bàsic de manteniment inclòs el primer any; després, 60€/mes sense permanència'
      },
      s9: {
        title: '03. Cites per WhatsApp',
        ideal: 'Negocis que treballen amb cita prèvia i avui les agafen a mà: perruqueries i barberies, estètica, fisioteràpia, clíniques, tallers o assessories. És l\'únic servei que entra a la teva agenda i reserva de debò, no només informa.',
        price: '700€ — 1.800€ + 150-250€/mes',
        tag: 'WhatsApp Cloud API + Agenda',
        f1: 'Un assistent atén el teu WhatsApp les 24 hores: consulta els forats lliures, reserva la cita i la confirma sense que hagis de contestar',
        f2: 'Agenda sincronitzada amb la que ja fas servir — mai dues cites al mateix forat',
        f3: 'Recordatori automàtic abans de la cita, que és el que fa que la gent no hi falti',
        f4: 'Canvis i cancel·lacions pel mateix WhatsApp, sense trucades ni forats morts',
        f5: 'Panell amb les teves cites i el comptador de les que van entrar fora del teu horari d\'atenció',
        f6: 'Garantia: si en els tres primers mesos no entra ni una cita fora del teu horari, et torno la posada en marxa',
        f7: 'Petició automàtica de ressenyes a Google en acabar la cita, com a complement (+200€)'
      }
    },
    pricing: {
      title: 'Manteniment i Suport',
      subtitle: 'Tranquil·litat absoluta per al teu negoci. Cuido de la teva tecnologia perquè t\'enfoquis a créixer.',
      basic: {
        title: 'Plan Bàsic',
        price: '60€',
        period: '/ mes',
        desc: 'La teva web vigilada i al dia, sense permanència. Inclòs el primer any en E-commerce, Web Immobiliària i Sistemes a Mida, i obligatori mentre tinguis una automatització en marxa. Els dos serveis amb IA porten quota pròpia, a part d\'aquesta.',
        f1: 'Monitorització automàtica 24/7 i còpies de seguretat setmanals',
        f2: 'Actualitzacions de seguretat i correcció d\'errors',
        f3: '1h/mes de canvis de contingut i ajustos menors',
        f4: 'Resposta en 24-48h laborables i informe trimestral d\'estat'
      },
      plus: {
        title: 'Plan Plus',
        price: '150€',
        period: '/ mes',
        desc: 'Per a e-commerce, immobiliàries i webs que canvien molt. Sense permanència.',
        f1: 'Tot el del Bàsic, amb còpies de seguretat diàries',
        f2: '5h/mes de desenvolupament i millores (no acumulables)',
        f3: 'Vigilància de passarel·les de pagament i feeds a portals + revisió trimestral de velocitat i SEO',
        f4: 'Resposta el mateix dia laborable (4h en incidència crítica) i informe mensual'
      },
      citas: {
        title: 'Cites per WhatsApp · quota del servei',
        price: '150€ — 250€',
        period: '/ mes',
        desc: 'El producte de Cites per WhatsApp té la seva pròpia quota, a part del manteniment: 150€/mes el pla Essencial i 250€/mes el Complet. No és un extra opcional, és el servei funcionant — i s\'ajusta a la mida del teu negoci.',
        f1: 'L\'assistent atenent el teu WhatsApp cada dia, supervisat i corregit si alguna cosa canvia — amb el cost del model d\'IA inclòs: no t\'has de donar d\'alta a cap servei ni gestionar claus',
        f2: 'Canvis d\'horaris, serveis, preus i textos quan els necessitis',
        f3: 'Els missatges que envia WhatsApp els factura Meta directament al teu compte: uns 8-10 cèntims per cita, comptats sobre els missatges que el sistema envia de debò. És una estimació amb la tarifa vigent, perquè Meta encara no ha publicat la llista oficial que entra en vigor l\'1 d\'octubre. El que escriuen els teus clients és gratis',
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
        desc: 'Costos de tercers a càrrec del client — tot i que te\'ls gestiono jo: domini i allotjament (hosting), comissions de passarel·les de pagament (Stripe/PayPal), correu empresarial, eines de màrqueting per email i consum d\'APIs d\'IA. Tampoc inclou: redacció de textos i fotografies (els aporta el client; redacció assistida per IA disponible com a extra), traducció humana professional o jurada (la traducció amb IA revisada sí que va inclosa en els idiomes contractats), publicitat de pagament (Google/Meta Ads), gestió de xarxes socials, i funcionalitats noves fora de l\'abast acordat, que es pressuposten a part. En el producte de Cites per WhatsApp, tampoc els missatges que envia WhatsApp: des de l\'1 d\'octubre de 2026 Meta els cobra (uns 8-10 cèntims per cita reservada, estimats amb la tarifa vigent perquè Meta encara no ha publicat la llista oficial d\'octubre) i te\'ls factura directament a tu, perquè el compte de WhatsApp és teu; el que escriuen els teus clients és gratis sempre. El cost del model d\'IA sí que va inclòs a la quota mensual, per a un ús normal del negoci (fins a 500 converses al mes en el pla Essencial i 1.500 en el Complet).'
      },
      payment: {
        title: 'Mètodes de Pagament i Condicions',
        methods: 'Mètodes acceptats: Transferència bancària o efectiu a la mà (amb cita prèvia).',
        conditions: 'Condicions: Possibilitat de fraccionar el pagament del projecte sense interessos fins a 3 mesos. Sempre es requerirà un pagament inicial del 50% del cost total pressupostat per començar a treballar.'
      }
    },
    values: {
      title: 'Per què escollir-me?',
      subtitle: 'L\'avantatge competitiu de treballar amb artesans del programari especialitzats en lloc de grans consultores lentes o freelancers inestables.',
      v1: {
        title: 'Contacte Directe sense Intermediaris',
        desc: 'Parlo el teu mateix idioma. Tractes directament amb el desenvolupador que escriu cada línia de codi de la teva aplicació, sense esperes ni malentesos.'
      },
      v2: {
        title: 'Desenvolupament Natiu a Mida',
        desc: 'Fujo de les plantilles de WordPress pesades i insegures. Faig les webs a mà amb React i Tailwind, i això et dóna una velocitat insuperable i un SEO excel·lent.'
      },
      v3: {
        title: 'Proximitat i Comprensió Local',
        desc: 'Amb base a Lloret de Mar. M\'agrada conèixer el teu negoci de prop, veure\'ns en persona i dissenyar la solució que encaixi amb els teus objectius locals.'
      },
      v4: {
        title: 'Estabilitat i Suport Garantit',
        desc: 'Cada desenvolupament es lliura amb garantia d\'estabilitat, formació integral i suport tècnic compromès per assegurar l\'èxit continu del teu negoci.'
      }
    },
    process: {
      title: 'El Meu Procés de Treball',
      subtitle: 'Un full de ruta clar per donar forma a la teva solució digital de principi a fi.',
      p1: {
        title: '01. Primer Contacto',
        desc: 'Analitzo les teves necessitats actuals en detall. Definim junts els objectius i t\'aconsello el mòdul que millor s\'adapta.'
      },
      p2: {
        title: '02. Proposta Clara',
        desc: 'Traço l\'arquitectura exacta del programari, fixo els terminis i et lliuro un pressupost detallat i tancat, sense sorpreses.'
      },
      p3: {
        title: '03. Desenvolupament Àgil',
        desc: 'Programo la web o el programari amb les millors pràctiques de la indústria. Tindràs accés privat per veure el progrés real pas a pas.'
      },
      p4: {
        title: '04. Ajustos en Viu',
        desc: 'Desplego el projecte. Durant la primera setmana faig ajustos i millores en calent sobre producció, a partir del que em vagis dient.'
      }
    },
    faq: {
      title: 'Preguntes Freqüents',
      subtitle: 'El que més em pregunten abans de començar un projecte. Si tens un altre dubte, escriu-me.',
      q1: {
        q: 'Quant costa una pàgina web?',
        a: 'Depèn de l\'abast: una Web Essencial (pàgina única o 3-4 seccions) costa 1.200€-1.600€, i una Web Completa (blog, panell de gestió, portfoli) des de 3.000€. Totes dues inclouen 1 setmana d\'ajustaments en viu després del llançament. Et dono un preu tancat després de la primera conversa, sense sorpreses.'
      },
      q2: {
        q: 'Treballes només a Lloret de Mar o també fora?',
        a: 'Tinc la base a Lloret de Mar i dono servei presencial a tota la Costa Brava (Blanes, Tossa de Mar, Girona), però treballo en remot amb clients de qualsevol punt d\'Espanya sense cap problema.'
      },
      q3: {
        q: 'Fas pàgines web per a immobiliàries?',
        a: 'Sí, és un dels meus nínxols: Web Immobiliària des de 6.000€, amb cercador de propietats amb filtres, panell de gestió sense tocar codi i exportació XML en format Kyero per sincronitzar automàticament amb Idealista, Habitaclia i Fotocasa.'
      },
      q4: {
        q: 'Puc tenir un xatbot amb intel·ligència artificial a la meva web, com el teu?',
        a: 'Sí — de fet l\'assistent TesS amb qui pots xatejar ara mateix en aquesta web és la demo en viu d\'aquest servei. La Integració d\'IA costa entre 1.600€ i 6.000€ més la quota de l\'assistent (90€/mes amb un sol canal, 150€/mes si en són diversos o porta integracions i 250€/mes si és multicanal i connectat als teus sistemes), segons aquesta mateixa complexitat; les claus d\'API queden al teu nom, sense intermediaris.'
      },
      q5: {
        q: 'En quins idiomes fas les webs?',
        a: 'Em comunico i treballo en español, català i anglès, però el teu projecte es pot lliurar en qualsevol idioma que necessitis gràcies a la traducció assistida per IA — no estic limitat a aquests tres. La Web Essencial inclou 1 idioma (+150€ cada idioma addicional) i la Web Completa i la Web Immobiliària inclouen 2 idiomes (+250€ cada addicional). La traducció amb IA revisada va inclosa; la traducció humana professional o jurada va a part.'
      },
      q6: {
        q: 'Què inclou el manteniment mensual?',
        a: 'Dos plans sense permanència: el Bàsic (60€/mes) inclou monitorització 24/7, còpies de seguretat setmanals, actualitzacions, 1h/mes de canvis i informe trimestral. El Plus (150€/mes) afegeix còpies diàries, 5h/mes de desenvolupament, vigilància de passarel·les de pagament i feeds a portals, resposta el mateix dia i informe mensual. A part del manteniment hi ha dues quotes pròpies, perquè són serveis funcionant i no una web vigilada: l\'assistent de la Integració d\'IA (90-250€/mes) i les Cites per WhatsApp (150-250€/mes). I les Automatitzacions Específiques porten el Pla Bàsic inclòs de manera obligatòria mentre estiguin en marxa, perquè una automatització sense vigilar es trenca en silenci el dia que canvia una API.'
      },
      q7: {
        q: 'Com es paga un projecte?',
        a: 'Es demana un 50% per avançat per començar a treballar i la resta es pot fraccionar sense interessos fins a 3 mesos. Accepto transferència bancària o efectiu a la mà amb cita prèvia.'
      },
      q8: {
        q: 'Què és l\'Auditoria Digital i per a què serveix?',
        a: 'És una anàlisi completa de la teva presència digital actual (web, xarxes, SEO, velocitat, competència) amb un full de ruta de millores prioritzades, per 150€. Si després contractes qualsevol projecte amb mi, aquest import es descompta del total. Abans de l\'auditoria hi ha el diagnòstic gratuït de 30 minuts: si de moment només vols la conversa, no has de pagar res.'
      },
      q9: {
        q: 'Què NO està inclòs en el preu d\'un projecte?',
        a: 'Els costos de tercers van a càrrec del client tot i que te\'ls gestiono jo: domini, hosting, comissions de passarel·les de pagament, correu empresarial i consum d\'APIs d\'IA. Tampoc inclou redacció de textos/fotos (les aporta el client), traducció jurada, publicitat de pagament ni gestió de xarxes socials. En el producte de Cites per WhatsApp tampoc hi entren els missatges que envia WhatsApp: des de l\'1 d\'octubre de 2026 els cobra Meta i te\'ls factura a tu directament, perquè el compte és teu — uns 8-10 cèntims per cita, estimats amb la tarifa vigent mentre Meta no publiqui la llista oficial. El que sí que va inclòs en aquesta quota és el cost del model d\'IA, per a un ús normal del negoci.'
      },
      q10: {
        q: 'Pots fer que el meu negoci agafi les cites per WhatsApp?',
        a: 'Sí, és un dels meus serveis. Un assistent atén el teu WhatsApp les 24 hores: consulta els forats lliures de la teva agenda, reserva la cita, la confirma i envia el recordatori, sense que hagis de contestar tu. El pla Essencial costa 700€-900€ de posada en marxa més 150€/mes i el Complet 1.500€-1.800€ més 250€/mes. Va amb garantia: si en els tres primers mesos no entra ni una sola cita fora del teu horari d\'atenció, et torno la posada en marxa. Necessites tenir el número a l\'app WhatsApp Business (migrar és gratis, triga deu minuts i t\'ajudo a fer-ho) i que Meta verifiqui la teva empresa, cosa que porta una o dues setmanes. Si prefereixes no dependre de Meta, hi ha una versió sense API per 400€-700€ més 90€/mes.'
      },
      q11: {
        q: 'Quina diferència hi ha entre un xatbot, un assistent d\'IA i el sistema de cites per WhatsApp?',
        a: 'Per fora s\'assemblen i per dins fan coses molt diferents, així que val la pena aclarir-ho abans de pagar pel que no necessites. Un xatbot de respostes guiades (dins d\'Automatitzacions Específiques) segueix un guió: botons i respostes previstes, i així que li pregunten alguna cosa que no estava escrita, s\'encalla. Un assistent d\'IA, com la TesS —amb qui estàs xatejant en aquesta web—, entén el que li escriuen amb paraules normals i respon amb la informació del teu negoci: informa, orienta i recull el contacte, però no toca res per dins. I el sistema de Cites per WhatsApp és un assistent d\'IA que a més actua: mira els forats que tens lliures de debò a la teva agenda, reserva la cita, la confirma i envia el recordatori. Aquesta és la diferència que importa: els dos primers expliquen coses, el tercer fa la feina. Per això només el de cites porta garantia, quota pròpia i el cost del model d\'IA inclòs, mentre que a la Integració d\'IA les claus d\'API són teves. I aquí ve el que sol estranyar: el de cites, que és el que més fa, és el més barat dels dos. No és una errada — és que ja està construït i provat, i el que es fa és configurar-lo amb els teus serveis, els teus horaris i la teva agenda; la Integració d\'IA es fabrica de zero sobre la teva documentació, els teus canals i els teus sistemes, i no n\'hi ha dues d\'iguals. El que pagues és la fabricació, no el nombre de funcions. Si dubtes quin et toca, la pregunta és senzilla: el que perds són consultes sense respondre, o cites sense agafar? I si són cites, no paguis un desenvolupament a mida: això ja està fet.'
      }
    },
    contact: {
      title: 'Fem encaixar les peces?',
      subtitle: 'Escriu-me sobre el teu projecte per agendar una cita o demanar informació tècnica, sense compromís.',
      calendly_title: 'Reserva el diagnòstic gratuït de 30 minuts',
      calendly_desc: 'És la manera més ràpida: tries forat i parlem. Sense cost, sense compromís i amb el teu negoci ja mirat per endavant. Si prefereixes escriure primer, tens el formulari just a sota.',
      calendly_btn: 'Triar forat al calendari',
      name: 'Nom o Empresa',
      email: 'El Teu Correu Electrònic',
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
    hud: {
      title: 'Next.js vs. WordPress / No-Code',
      subtitle: 'La diferència tècnica que decideix l\'èxit del teu negoci. Per què programo a mida.',
      platform_nextjs: 'La Meva Solució (Next.js)',
      platform_wp: 'Solució Tradicional (WordPress)',
      metric_perf: 'Rendiment (Lighthouse)',
      metric_speed: 'Temps de Càrrega Mòbil',
      metric_sec: 'Nivell de Seguretat',
      metric_plug: 'Dependència de Plugins',
      metric_scale: 'Escalabilitat de Visites',
      nextjs_perf_desc: '99% — Càrrega instantània i fluïdesa màxima',
      wp_perf_desc: '42% — Pesat, lent i frustrant per a l\'usuari',
      nextjs_speed_desc: '0.2s — Interactiu a l\'instant',
      wp_speed_desc: '4.8s — Pèrdua del 35% de possibles clients',
      nextjs_sec_desc: '100% — Inmune a atacs web per arquitectura estàtica',
      wp_sec_desc: 'Baixa — Constants hackejos i parxes de plugins',
      nextjs_plug_desc: '0 plugins — Codi natiu net, lleuger i optimitzat',
      wp_plug_desc: '25+ plugins — Fugides de velocitat i penjades constants',
      nextjs_scale_desc: 'Ilimitada — Suporta milions de visites amb cost 0€',
      wp_scale_desc: 'Limitada — El servidor cau en acumular trànsit'
    },
    simulator: {
      title: 'Simulador de Retorn de la Inversió (ROI)',
      subtitle: 'Descobreix quant temps i diners estàs perdent per no automatitzar les tasques repetitives del teu negoci.',
      label_hours: 'Hores setmanals malgastades en tasques repetitives',
      label_employees: 'Nombre d\'empleats fent aquestes tasques',
      label_cost: 'Cost mitjà per hora de l\'empleat',
      result_monthly: 'Estalvi Mensual Estimat',
      result_yearly: 'Estalvi Anual Estimat',
      result_hours: 'Temps Anual Recuperat',
      rec_title: 'Proposta de Solució Suggerida',
      rec_badge: 'RECOMANAT',
      btn_apply: 'Vincular pressupost i continuar al formulari',
      notif_linked: '¡Simulació vinculada amb èxit al formulari!',
      opt_s2: '02. Automatitzacions Específiques',
      opt_s4: '05. Integració d\'Intel·ligència Artificial',
      opt_s8: '09. Sistema ERP/CRM (App Nativa)'
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
      inline_btn: 'Sol·licitar anàlisi gratuït',
      post_services: 'Treballo amb un nombre reduït de clients per poder cuidar cada projecte.',
      post_services_btn: 'Reserva la teva plaça',
      post_roi: 'El teu projecte mereix atenció personalitzada. Reserva la teva consulta i t\'explico com puc ajudar-te.',
      post_roi_btn: 'Agendar consulta personalitzada',
      post_pricing: 'Cada solució que faig és única, com el teu negoci. Parlem del que necessites.',
      post_pricing_btn: 'Sol·licitar pressupost a mida'
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
      subtitle: 'I transform your business with accessible and custom technology. From professional web presence to native ERP/CRM systems and custom AI integrations.',
      cta: 'Request information',
      cta_alt: 'Free 30-min diagnosis',
      cta_note: 'No cost, no strings attached. I look at your business before the call, so I am not coming to ask what you need: I come with what I have already seen. Two slots a week.'
    },
    concept: {
      title: 'The Fitting Piece',
      text1: 'The Teselar visual identity is inspired by tessellation: the art of assembling pieces so they fit together perfectly, leaving no gaps and creating no friction.',
      text2: 'In the digital world, Teselar is that exact piece of custom software that your business needs to complete its gears and run with total fluidity.'
    },
    services: {
      title: 'Services Catalog',
      subtitle: 'Modular and high-performance solutions tailored to your size and budget. No hidden costs.',
      ideal: 'Ideal for:',
      pricing: 'Price',
      features: 'What is included:',
      live_adjustments: 'All my web and software development projects include 1 week of live adjustments and improvements at no additional cost after launch.',
      interest: 'Interested in this service',
      tres_ia: {
        title: 'Three services talk over WhatsApp, and they are not the same thing',
        c1_title: 'Guided chatbot · part of 02',
        c1_desc: 'Follows a script of buttons and pre-written answers. Cheap and enough when the questions are always the same; step off the script and it gets stuck.',
        c2_title: 'AI assistant · service 05',
        c2_desc: 'Understands plain wording and answers with your business information. It informs and guides, but it does not touch your calendar. It is built from scratch around your documentation, your channels and your systems, which is why the range is wide. It is what you are using here: TesS.',
        c3_title: 'WhatsApp Booking · service 03',
        c3_desc: 'An AI assistant that also acts: it checks the slots you actually have free, books the appointment, confirms it and sends the reminder. It is already built and proven — it gets configured with your services and opening hours, which is why it costs less than bespoke work and can carry a guarantee.',
        nota: 'The question to choose is simple: are you losing unanswered enquiries, or uncaught bookings? And if it is bookings, do not pay for bespoke work: that one is already built and costs you less.'
      },
      categories: {
        web: 'Web Development',
        automation: 'Automation & AI',
        systems: 'Systems & ERP'
      },
      s1: {
        title: '01. Digital Audit & Consulting',
        ideal: 'Businesses that want the written report before investing. This is the second step: the way in is the free 30-minute diagnosis, and these 150€ are deducted if you go ahead with a project.',
        price: '150€ (Deducted from your first project)',
        tag: 'SEO & UX Audit',
        f1: 'Complete analysis of digital presence (web, social networks, SEO)',
        f2: 'Review of speed, usability, and user experience (UX)',
        f3: 'Competitor analysis and industry benchmarking',
        f4: 'Identification of improvements and critical opportunities',
        f5: 'Custom roadmap with priorities and budget estimates',
        f6: 'Results presentation session (1h online or in-person)',
        f7: 'Delivery of a professional high-quality PDF report'
      },
      s2: {
        title: '02. Specific Automations',
        ideal: 'Companies with one specific repetitive task to get off their plate: a process someone does by hand today, every week, always the same way.',
        price: '700€ — 1,800€ + 60€/mo',
        tag: 'Apps Script + APIs + Make',
        f1: 'Automatic generation of PDF quotes/budgets from a web form',
        f2: 'Automatic invoice mailing connecting directly with your CRM',
        f3: 'Automated data extraction from emails directly into Google Sheets',
        f4: 'Guided-reply chatbots for WhatsApp or Telegram (they follow a script; if you need it to understand free language, that is AI Integration)',
        f5: 'Two-way database synchronization between different platforms',
        f6: 'Smart automated alert and notification system',
        f7: 'Daily or weekly automated email reporting',
        f8: 'Basic maintenance plan (60€/mo), required while the automation is running: I keep an eye on it and fix it when an API changes or a credential expires. Where my work ends: it does not cover new features, process changes, or wiring in tools that were not part of the agreed scope — those are quoted separately'
      },
      s3: {
        title: '04. Essential Web',
        ideal: 'Freelancers, small businesses, independent professionals, and new entrepreneurs.',
        price: '1,200€ — 1,600€',
        tag: 'React + Vite + Tailwind CSS',
        f1: 'High-impact single landing page or 3-4 structured sections',
        f2: 'Modern, responsive, and mobile-first web design',
        f3: 'Functional contact form and WhatsApp button with automated notification',
        f4: '1 language included — each additional language +150€',
        f5: 'Basic technical SEO (optimized meta tags, clean HTML structure)',
        f6: 'Extreme load speed and performance optimization',
        f7: '1 week of live adjustments during deployment'
      },
      s4: {
        title: '05. Artificial Intelligence Integration',
        ideal: 'Businesses fielding the same questions over and over by hand: opening hours, prices, how something works, whether you offer a given service. The assistant answers for you using your business information, but it does not manage your calendar — if what you are losing is bookings, the service you want is 03. Final price depends on complexity: a simple single-channel chatbot sits at the low end of the range; an advanced assistant with multiple integrations and channels (web, WhatsApp, Telegram) sits at the high end.',
        price: '1,600€ — 6,000€ + 90-250€/mo',
        tag: 'OpenAI / Anthropic APIs',
        f1: 'Custom virtual AI assistant trained with your internal company documentation',
        f2: 'Smart customer service chatbot for web, WhatsApp, or Telegram: it informs and guides using your data, without managing your calendar (that is what WhatsApp Booking is for)',
        f3: 'Automated generation of text content or custom email templates',
        f4: 'Automated analysis, classification, and summary of documents',
        f5: 'Advanced automation using Natural Language Processing (NLP)',
        f6: 'Direct integration with models like GPT-4, Claude 3.5, and others',
        f7: 'Monthly assistant fee, required, in three tiers: 90€/mo for a single channel, 150€/mo for several channels or with integrations, and 250€/mo when it is multichannel and also wired into your systems. It covers reviewing the conversations, correcting whatever gets answered wrong, and keeping the information it answers with up to date. AI API usage is billed to your own account, in your name'
      },
      s5: {
        title: '06. Complete Web',
        ideal: 'SMEs that need their business\'s real website: catalog or portfolio, blog, and ready for foreign customers.',
        price: 'From 3,000€ (2 languages included)',
        tag: 'React + Vite + Headless CMS',
        f1: 'Modular structure with 5 to 8 well-defined sections',
        f2: 'Project gallery or interactive portfolio with dynamic filters',
        f3: 'Self-managed section for blog, articles, or news',
        f4: 'Intuitive admin panel to manage all contents easily',
        f5: '2 languages included with auto-detection — each additional language +250€',
        f6: 'Complete technical SEO (sitemap, hreflang, Google Search Console)',
        f7: '1 week of live support and comprehensive training included'
      },
      s6: {
        title: '07. E-commerce / Online Store',
        ideal: 'Local businesses or brands that want to sell products or services directly online.',
        price: 'From 4,000€',
        tag: 'React + DB + Payment Gateways',
        f1: 'Interactive, fluid, and ultra-fast loading shopping cart',
        f2: 'Secure and simplified one-step checkout process',
        f3: 'Full integration with Stripe, PayPal, and credit cards',
        f4: 'Complete product and stock management from an admin panel',
        f5: 'Automated email notifications to clients and the store administrator',
        f6: 'Discount coupon module, tax config, and shipping rules',
        f7: 'Client order history and basic automated billing',
        f8: 'Basic maintenance plan included for the first year; after that, 60€/mo with no lock-in (or the Plus Plan if your order volume calls for it)'
      },
      s7: {
        title: '08. Real Estate Website',
        ideal: 'Real estate agencies that want to showcase properties, reach foreign buyers, and sync with property portals.',
        price: 'From 6,000€',
        tag: 'React + DB + Kyero XML',
        f1: 'Property search engine with filters (area, price, type, bedrooms)',
        f2: 'Property pages with gallery, map, and featured listings system',
        f3: 'Control panel to publish and manage properties without touching code',
        f4: '2 languages included for foreign buyers — each additional +250€',
        f5: 'XML export (Kyero format) to sync with Idealista, Habitaclia, Fotocasa, and international portals',
        f6: 'Per-property contact form and WhatsApp button',
        f7: 'Local SEO, and maintenance included for the first year (portal feeds need monitoring)'
      },
      s8: {
        title: '09. Custom Management System (ERP/CRM)',
        ideal: 'Businesses that want to digitalize a key process (billing, clients, projects) with a tool built exactly for them.',
        price: '8,000€ — 12,000€',
        tag: 'Electron + React + Database',
        f1: 'Self-installing native desktop application (Windows, macOS, Linux)',
        f2: 'Interactive dashboard with financial charts and live metrics',
        f3: 'Complete client management (CRM) and contact database module',
        f4: 'Automated generation and direct PDF download of quotes and invoices',
        f5: 'Internal planner for projects, team tasks, and time-tracking',
        f6: 'Advanced user roles with secure permission levels',
        f7: 'Team training included + 1 week of priority development support',
        f8: 'Basic maintenance plan included for the first year; after that, 60€/mo with no lock-in'
      },
      s9: {
        title: '03. WhatsApp Appointment Booking',
        ideal: 'Appointment-based businesses still booking by hand: hair and barber shops, beauty salons, physiotherapy, clinics, workshops or consultancies.',
        price: '700€ — 1,800€ + 150-250€/mo',
        tag: 'WhatsApp Cloud API + Calendar',
        f1: 'An assistant answers your WhatsApp around the clock: checks open slots, books the appointment and confirms it without you replying',
        f2: 'Synced with the calendar you already use — never two bookings in the same slot',
        f3: 'Automatic reminder before the appointment, which is what keeps people from missing it',
        f4: 'Reschedules and cancellations over the same WhatsApp, no calls and no dead slots',
        f5: 'Dashboard with your bookings and a counter of those that came in outside your opening hours',
        f6: 'Guarantee: if not a single booking comes in outside your hours in the first three months, you get the setup fee back',
        f7: 'Automatic Google review request once the appointment is over, as an add-on (+200€)'
      }
    },
    pricing: {
      title: 'Maintenance & Support',
      subtitle: 'Absolute peace of mind. I take care of your technology so you can focus on growth.',
      basic: {
        title: 'Basic Plan',
        price: '60€',
        period: '/ month',
        desc: 'Your website watched and up to date, no lock-in. Included for the first year with E-commerce, Real Estate Websites, and Custom Systems, and required while you have an automation running. The two AI services carry their own fee, separate from this one.',
        f1: 'Automatic 24/7 monitoring and weekly backups',
        f2: 'Security updates and error fixing',
        f3: '1h/month of content changes and minor tweaks',
        f4: 'Response within 24-48 business hours and quarterly status report'
      },
      plus: {
        title: 'Plus Plan',
        price: '150€',
        period: '/ month',
        desc: 'For e-commerce, real estate agencies, and fast-changing websites. No lock-in.',
        f1: 'Everything in Basic, with daily backups',
        f2: '5h/month of development and improvements (non-cumulative)',
        f3: 'Payment gateway and portal feed monitoring + quarterly speed and SEO review',
        f4: 'Same business day response (4h for critical issues) and monthly report'
      },
      citas: {
        title: 'WhatsApp Booking · service fee',
        price: '150€ — 250€',
        period: '/ month',
        desc: 'The WhatsApp Appointment Booking product carries its own fee, separate from maintenance: 150€/month for the Essential plan and 250€/month for the Complete one. It is not an optional add-on, it is the service running — and it scales with the size of your business.',
        f1: 'The assistant answering your WhatsApp every day, supervised and corrected whenever something changes — with the AI model cost included: no signing up to any AI service and no API keys to manage',
        f2: 'Changes to opening hours, services, prices and wording whenever you need them',
        f3: 'The messages WhatsApp sends are billed by Meta straight to your own account: around 8-10 cents per booking, counted from the messages the system actually sends. It is an estimate at current rates, because Meta has not yet published the official rate card taking effect on 1 October. What your clients write is always free',
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
        desc: 'Third-party costs paid by the client — though I handle the setup for you: domain and hosting, payment gateway fees (Stripe/PayPal), business email, email marketing tools, and AI API usage. Also not included: copywriting and photography (provided by the client; AI-assisted copywriting available as an extra), professional or sworn human translation (reviewed AI translation IS included with contracted languages), paid advertising (Google/Meta Ads), social media management, and new features outside the agreed scope, which are quoted separately. For the WhatsApp Booking product, the messages WhatsApp sends are not included either: from 1 October 2026 Meta charges for them (around 8-10 cents per booking, estimated at current rates because Meta has not yet published the official October rate card) and bills you directly, because the WhatsApp account is yours; what your clients write is always free. The cost of the AI model IS included in the monthly fee, for normal business use (up to 500 conversations a month on the Essential plan and 1,500 on the Complete one).'
      },
      payment: {
        title: 'Payment Terms & Methods',
        methods: 'Accepted methods: Bank transfer or cash in hand (by appointment).',
        conditions: 'Terms: Interest-free payment split available up to 3 months. An initial payment of 50% of the total approved budget is always required to start any development.'
      }
    },
    values: {
      title: 'Why Work With Me?',
      subtitle: 'The competitive advantage of working with specialized software craftsmen instead of slow corporate agencies or unstable freelancers.',
      v1: {
        title: 'Direct Contact, No Intermediaries',
        desc: 'I speak your language. You deal directly with the developer writing every line of your software, with no delays and no misunderstandings.'
      },
      v2: {
        title: 'Custom Native Development',
        desc: 'I avoid heavy, slow, and insecure WordPress templates. I hand-craft websites using React and Tailwind, which gives you unrivaled speed and outstanding SEO.'
      },
      v3: {
        title: 'Local Proximity & Understanding',
        desc: 'Based in Lloret de Mar. I like getting to know your business up close, meeting in person, and designing the solution that fits your local goals.'
      },
      v4: {
        title: 'Stability & Uptime Guarantee',
        desc: 'Every project is delivered with a stability guarantee, extensive user training, and dedicated support to ensure your long-term success.'
      }
    },
    process: {
      title: 'My Working Method',
      subtitle: 'A clear roadmap to shape your digital solution from start to finish.',
      p1: {
        title: '01. First Contact',
        desc: 'I analyze your current business needs in detail. We set the goals together and I recommend the modular solution that fits your budget.'
      },
      p2: {
        title: '02. Clear Proposal',
        desc: 'I define the exact software architecture and the delivery schedule, and hand you a transparent, closed budget with no surprises.'
      },
      p3: {
        title: '03. Agile Development',
        desc: 'I build it using an industry-leading stack. You will have private access to preview the real progress step by step.'
      },
      p4: {
        title: '04. Live Adjustments',
        desc: 'I deploy the project. During the first week I make live tweaks and hotfixes straight from your real-world feedback.'
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'What people ask me most before starting a project. Got another question? Just write to me.',
      q1: {
        q: 'How much does a website cost?',
        a: 'It depends on scope: an Essential Website (single page or 3-4 sections) costs 1,200€-1,600€, and a Complete Website (blog, admin panel, portfolio) starts at 3,000€. Both include 1 week of live adjustments after launch. I give you a closed price after the first conversation, no surprises.'
      },
      q2: {
        q: 'Do you only work in Lloret de Mar, or also further afield?',
        a: 'I am based in Lloret de Mar and serve the whole Costa Brava area in person (Blanes, Tossa de Mar, Girona), but I work remotely with clients anywhere in Spain without any issue.'
      },
      q3: {
        q: 'Do you build websites for real estate agencies?',
        a: 'Yes, it is one of my specialties: Real Estate Websites from 6,000€, with a property search engine with filters, a management panel with no coding required, and XML export in Kyero format to automatically sync with Idealista, Habitaclia, and Fotocasa.'
      },
      q4: {
        q: 'Can I get an AI chatbot on my website, like yours?',
        a: 'Yes — in fact the TesS assistant you can chat with right now on this site is the live demo of that exact service. AI Integration costs between 1,600€ and 6,000€ plus the assistant fee (90€/month for a single channel, 150€/month for several channels or with integrations, and 250€/month when it is multichannel and wired into your systems), depending on that same complexity; the API keys stay under your own account, no middlemen.'
      },
      q5: {
        q: 'What languages do you build websites in?',
        a: 'I communicate and work in Spanish, Catalan, and English, but your project can be delivered in any language you need thanks to AI-assisted translation — I am not limited to those three. The Essential Website includes 1 language (+150€ per extra language), and the Complete Website and Real Estate Website include 2 languages (+250€ per extra one). Reviewed AI translation is included; professional or sworn human translation is billed separately.'
      },
      q6: {
        q: 'What does the monthly maintenance plan include?',
        a: 'Two no-lock-in plans: Basic (60€/month) includes 24/7 monitoring, weekly backups, updates, 1h/month of changes, and a quarterly report. Plus (150€/month) adds daily backups, 5h/month of development, payment gateway and portal feed monitoring, same-day response, and a monthly report. Separately from maintenance there are two fees of their own, because they are running services rather than a watched website: the AI Integration assistant (90-250€/month) and WhatsApp Booking (150-250€/month). And Specific Automations include the Basic Plan as a requirement while they are running, because an unwatched automation breaks silently the day an API changes.'
      },
      q7: {
        q: 'How do I pay for a project?',
        a: 'I ask for 50% upfront to start work, and the rest can be split interest-free over up to 3 months. I accept bank transfer or cash in hand by appointment.'
      },
      q8: {
        q: 'What is the Digital Audit and what is it for?',
        a: 'It is a complete analysis of your current digital presence (website, social media, SEO, speed, competitors) with a prioritized improvement roadmap, for 150€. If you later hire any project with me, that amount is deducted from the total. Before the audit there is the free 30-minute diagnosis: if for now you only want the conversation, you do not have to pay anything.'
      },
      q9: {
        q: 'What is NOT included in a project price?',
        a: 'Third-party costs are billed to the client, even though I handle the setup: domain, hosting, payment gateway fees, business email, and AI API usage. It also does not include copywriting/photography (provided by the client), sworn translation, paid advertising, or social media management. In the WhatsApp Booking product the messages WhatsApp sends are not included either: from 1 October 2026 Meta charges for them and bills you directly, because the account is yours — around 8-10 cents per booking, estimated at current rates while Meta has not published the official card. What the fee does include is the cost of the AI model, for normal business use.'
      },
      q10: {
        q: 'Can you get my business taking bookings over WhatsApp?',
        a: 'Yes, it is one of my services. An assistant answers your WhatsApp around the clock: it checks the open slots in your calendar, books the appointment, confirms it and sends the reminder, with no need for you to reply. The Essential plan is 700€-900€ to set up plus 150€/month, and the Complete one 1,500€-1,800€ plus 250€/month. It comes with a guarantee: if not a single booking comes in outside your opening hours during the first three months, you get the setup fee back. You need the number on the WhatsApp Business app (migrating is free, takes ten minutes and I help you do it) and Meta to verify your business, which takes one or two weeks. If you would rather not depend on Meta, there is a version without the API for 400€-700€ plus 90€/month.'
      },
      q11: {
        q: 'What is the difference between a chatbot, an AI assistant, and the WhatsApp booking system?',
        a: 'They look alike from the outside and do very different things inside, so it is worth clearing up before you pay for something you do not need. A guided-reply chatbot (part of Specific Automations) follows a script: buttons and pre-written answers, and the moment someone asks something that was not scripted, it gets stuck. An AI assistant, like TesS —the one you are chatting with on this site—, understands what people write in plain words and answers with your business information: it informs, guides and captures the contact, but it does not touch anything inside. And the WhatsApp Booking system is an AI assistant that also acts: it looks at the slots you actually have free in your calendar, books the appointment, confirms it and sends the reminder. That is the difference that matters: the first two tell people things, the third one does the work. That is why only the booking product carries a guarantee, its own fee and the AI model cost included, while with AI Integration the API keys are yours. And here is the part that usually raises an eyebrow: the booking product, the one that does the most, is the cheaper of the two. That is not a typo — it is already built and proven, and the work is configuring it with your services, your opening hours and your calendar, whereas AI Integration is built from scratch around your documentation, your channels and your systems, and no two are alike. What you pay for is the building, not the number of features. If you are unsure which one you need, the question is simple: are you losing unanswered enquiries, or uncaught bookings? And if it is bookings, do not pay for bespoke work: that one is already built.'
      }
    },
    contact: {
      title: 'Shall we fit the pieces?',
      subtitle: 'Tell me about your project to book a meeting or ask for technical details, with no strings attached.',
      calendly_title: 'Book the free 30-minute diagnosis',
      calendly_desc: 'It is the fastest way: pick a slot and we talk. No cost, no strings attached, and with your business already looked at beforehand. If you would rather write first, the form is right below.',
      calendly_btn: 'Pick a slot in the calendar',
      name: 'Name or Company Name',
      email: 'Your Contact Email',
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
    hud: {
      title: 'Next.js vs. WordPress / No-Code',
      subtitle: 'The technical difference deciding your business success. Why I code from scratch.',
      platform_nextjs: 'My Solution (Next.js)',
      platform_wp: 'Traditional Solution (WordPress)',
      metric_perf: 'Performance (Lighthouse)',
      metric_speed: 'Mobile Load Time',
      metric_sec: 'Security Level',
      metric_plug: 'Plugin Dependency',
      metric_scale: 'Traffic Scalability',
      nextjs_perf_desc: '99% — Instant load and maximum fluidity',
      wp_perf_desc: '42% — Heavy, slow, and frustrating user experience',
      nextjs_speed_desc: '0.2s — Interactive instantly',
      wp_speed_desc: '4.8s — Loss of 35% of potential clients',
      nextjs_sec_desc: '100% — Immune to web attacks due to static architecture',
      wp_sec_desc: 'Low — Constant hacking and plugin vulnerability issues',
      nextjs_plug_desc: '0 plugins — Clean, lightweight, and optimized native code',
      wp_plug_desc: '25+ plugins — Speed leaks and constant crashes',
      nextjs_scale_desc: 'Unlimited — Supports millions of visits with €0 cost',
      wp_scale_desc: 'Limited — Server crashes when traffic accumulates'
    },
    simulator: {
      title: 'Return on Investment (ROI) Simulator',
      subtitle: 'Discover how much time and money you are losing by not automating your business tasks.',
      label_hours: 'Weekly hours wasted on repetitive tasks',
      label_employees: 'Number of employees doing these tasks',
      label_cost: 'Average hourly cost per employee',
      result_monthly: 'Estimated Monthly Savings',
      result_yearly: 'Estimated Yearly Savings',
      result_hours: 'Annual Recovered Time',
      rec_title: 'Suggested Solution Proposal',
      rec_badge: 'RECOMMENDED',
      btn_apply: 'Link budget and continue to form',
      notif_linked: 'Simulation successfully linked to the form!',
      opt_s2: '02. Specific Automations',
      opt_s4: '05. Artificial Intelligence Integration',
      opt_s8: '09. ERP/CRM System (Native Desktop App)'
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
      inline_btn: 'Request free analysis',
      post_services: 'I work with a limited number of clients so I can look after every project properly.',
      post_services_btn: 'Reserve your spot',
      post_roi: 'Your project deserves personalized attention. Book your consultation and I\'ll show you how I can help.',
      post_roi_btn: 'Book personalized consultation',
      post_pricing: 'Every solution I build is unique, just like your business. Let\'s talk about what you need.',
      post_pricing_btn: 'Request a custom quote'
    }
  }
};
