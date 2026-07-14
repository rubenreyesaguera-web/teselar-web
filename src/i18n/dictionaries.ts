export type Locale = 'es' | 'ca' | 'en';

export const dictionaries = {
  es: {
    nav: {
      services: 'Servicios',
      pricing: 'Precios',
      values: '¿Por qué TESELAR?',
      process: 'Proceso',
      contact: 'Agendar Cita'
    },
    hero: {
      tagline: 'Teselar Software',
      title: 'La pieza exacta donde la tecnología y tu negocio encajan perfectamente',
      subtitle: 'Transformamos tu negocio con tecnología accesible y a medida. Desde presencia digital hasta sistemas ERP/CRM nativos e integraciones de IA.',
      cta: 'Solicitar información',
      cta_alt: 'Agendar cita'
    },
    concept: {
      title: 'La Pieza que Encaja',
      text1: 'Nuestra identidad visual se inspira en la teselación: el arte de ensamblar piezas de forma que encajen a la perfección, sin dejar huecos ni generar fricciones.',
      text2: 'En el mundo digital, representamos esa pieza exacta de software a medida que tu negocio necesita para completar su engranaje y funcionar con total fluidez.'
    },
    services: {
      title: 'Catálogo de Servicios',
      subtitle: 'Soluciones modulares y de alto rendimiento adaptadas a tu tamaño y presupuesto. Sin costes ocultos.',
      ideal: 'Ideal para:',
      pricing: 'Precio',
      features: 'Lo que incluye:',
      live_adjustments: 'Todos nuestros proyectos de desarrollo web y de software incluyen 1 semana de ajustes en vivo sin coste adicional tras el lanzamiento.',
      interest: 'Me interesa este servicio',
      categories: {
        web: 'Desarrollo Web',
        automation: 'Automatización e IA',
        systems: 'Sistemas y ERP'
      },
      s1: {
        title: '01. Auditoría y Consultoría Digital',
        ideal: 'Negocios que quieren mejorar su presencia digital, detectar oportunidades de crecimiento o evaluar su situación antes de invertir.',
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
        ideal: 'Empresas que necesitan resolver un problema concreto de eficiencia con automatización inteligente.',
        price: '350€ — 900€',
        tag: 'Apps Script + APIs + Make',
        f1: 'Generador automático de presupuestos en PDF desde un formulario',
        f2: 'Envío automático de facturas por email con datos de tu CRM',
        f3: 'Extractor automatizado de datos de correos a Google Sheets',
        f4: 'Chatbot automatizado para canales de WhatsApp o Telegram',
        f5: 'Sincronizador de base de datos bidireccional entre plataformas',
        f6: 'Sistema inteligente de recordatorios y alertas automáticas',
        f7: 'Reportes diarios/semanales automáticos por email'
      },
      s3: {
        title: '03. Web Esencial',
        ideal: 'Freelancers, pequeñas empresas, profesionales independientes y nuevos emprendedores.',
        price: '600€ — 800€',
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
        title: '04. Integración de Inteligencia Artificial',
        ideal: 'Empresas que quieren incorporar IA avanzada en sus procesos o atención al cliente.',
        price: '800€ — 3.000€ + 60€/mes',
        tag: 'OpenAI / Anthropic APIs',
        f1: 'Asistente virtual con IA entrenado con tu documentación interna',
        f2: 'Chatbot inteligente de atención para web, WhatsApp o Telegram',
        f3: 'Generación automática de contenidos o respuestas predefinidas',
        f4: 'Análisis, clasificación y resumen automático de documentos',
        f5: 'Automatización avanzada con procesamiento de lenguaje natural',
        f6: 'Integración directa con modelos GPT, Claude u homólogos',
        f7: 'Supervisión mensual (Plan Básico, 60€/mes); costes de API en tu propia cuenta, sin intermediarios'
      },
      s5: {
        title: '05. Web Completa',
        ideal: 'Pymes que necesitan la web de verdad de su negocio: catálogo o portfolio, blog y preparada para clientes extranjeros.',
        price: 'Desde 1.500€ (2 idiomas incluidos)',
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
        title: '06. Tienda Online / E-commerce',
        ideal: 'Comercios locales o marcas que venden productos o servicios directamente online.',
        price: 'Desde 4.000€',
        tag: 'React + BD + Pasarelas de Pago',
        f1: 'Carrito de compra interactivo, fluido y de carga ultrarrápida',
        f2: 'Proceso de checkout seguro y simplificado (One-Step)',
        f3: 'Integración completa con Stripe, PayPal y Bizum',
        f4: 'Gestión de productos y stock desde el panel de administración',
        f5: 'Notificaciones automáticas de pedidos al email de clientes y gestor',
        f6: 'Módulo de cupones de descuento, impuestos y costes de envío',
        f7: 'Historial de transacciones de clientes y facturación básica'
      },
      s7: {
        title: '07. Web Inmobiliaria',
        ideal: 'Inmobiliarias que quieren destacar propiedades, captar compradores extranjeros y sincronizar con los portales.',
        price: 'Desde 3.000€',
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
        title: '08. Sistema de Gestión a Medida (ERP/CRM)',
        ideal: 'Negocios que quieren digitalizar un proceso clave (facturación, clientes, proyectos) con una herramienta hecha exactamente a su medida.',
        price: '4.000€ — 6.000€',
        tag: 'Electron + React + Base de Datos',
        f1: 'Aplicación de escritorio nativa instalable (Windows, macOS, Linux)',
        f2: 'Dashboard interactivo con gráficos financieros y métricas en vivo',
        f3: 'Módulo integral de gestión de clientes (CRM) y base de contactos',
        f4: 'Generación automática y descarga directa de facturas y presupuestos en PDF',
        f5: 'Planificador interno de proyectos, tareas de equipo y control de tiempos',
        f6: 'Roles de usuario avanzados con niveles de acceso seguros',
        f7: 'Formación integral del equipo + 1 semana de soporte prioritario'
      }
    },
    pricing: {
      title: 'Mantenimiento y Soporte',
      subtitle: 'Tranquilidad absoluta para tu negocio. Cuidamos de tu tecnología para que te enfoques en crecer.',
      basic: {
        title: 'Plan Básico',
        price: '60€',
        period: '/ mes',
        desc: 'Tu web vigilada y al día, sin permanencia. Incluido el primer año en E-commerce, Web Inmobiliaria y Sistemas a Medida.',
        f1: 'Monitorización automática 24/7 y copias de seguridad semanales',
        f2: 'Actualizaciones de seguridad y corrección de errores',
        f3: '1h/mes de cambios de contenido y supervisión del asistente IA (si aplica)',
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
      not_included: {
        title: 'Lo que NO está incluido',
        desc: 'Costes de terceros a cargo del cliente — aunque te los gestionamos nosotros: dominio y hosting, comisiones de pasarelas de pago (Stripe/PayPal), correo empresarial, herramientas de email marketing y consumo de APIs de IA. Tampoco incluye: redacción de textos y fotografías (los aporta el cliente; redacción asistida por IA disponible como extra), traducción humana profesional o jurada (la traducción con IA revisada sí va incluida en los idiomas contratados), publicidad de pago (Google/Meta Ads), gestión de redes sociales, y funcionalidades nuevas fuera del alcance acordado, que se presupuestan aparte.'
      },
      payment: {
        title: 'Métodos de Pago & Condiciones',
        methods: 'Métodos aceptados: Transferencia bancaria o efectivo en mano (con cita previa).',
        conditions: 'Condiciones: Posibilidad de fraccionar el pago del proyecto sin intereses en hasta 3 meses. Siempre se requerirá un pago de entrada del 50% del coste total presupuestado para comenzar a trabajar.'
      }
    },
    values: {
      title: '¿Por qué elegirnos?',
      subtitle: 'La ventaja competitiva de trabajar con artesanos de software especializados en lugar de grandes consultoras lentas o freelancers inestables.',
      v1: {
        title: 'Contacto Directo sin Intermediarios',
        desc: 'Hablamos tu mismo idioma. Tratas directamente con el desarrollador que escribe cada línea de código de tu aplicación, eliminando esperas y malentendidos.'
      },
      v2: {
        title: 'Desarrollo Nativo a Medida',
        desc: 'Huimos de las plantillas de WordPress pesadas e inseguras. Creamos webs a mano con React y Tailwind, garantizando una velocidad insuperable y un SEO excelente.'
      },
      v3: {
        title: 'Cercanía y Entendimiento Local',
        desc: 'Con sede en Lloret de Mar. Nos encanta conocer tu negocio de cerca, reunirnos en persona y diseñar la solución que encaje perfectamente con tus objetivos locales.'
      },
      v4: {
        title: 'Estabilidad y Soporte Garantizado',
        desc: 'Cada desarrollo se entrega con garantía de estabilidad, formación integral y soporte técnico comprometido para asegurar el éxito continuo de tu negocio.'
      }
    },
    process: {
      title: 'Nuestro Proceso de Trabajo',
      subtitle: 'Una hoja de ruta clara para dar forma a tu solución digital de principio a fin.',
      p1: {
        title: '01. Primer Contacto',
        desc: 'Analizamos tus necesidades actuales en detalle. Definimos los objetivos estratégicos y te asesoramos sobre el módulo que mejor se adapta.'
      },
      p2: {
        title: '02. Propuesta Clara',
        desc: 'Trazamos la arquitectura exacta del software, establecemos plazos y te entregamos un presupuesto detallado y cerrado sin sorpresas.'
      },
      p3: {
        title: '03. Desarrollo Ágil',
        desc: 'Programamos la web o software utilizando las mejores prácticas de la industria. Tendrás acceso privado para ver el progreso real paso a paso.'
      },
      p4: {
        title: '04. Ajustes en Vivo',
        desc: 'Desplegamos la web. Durante la primera semana realizamos ajustes e implementamos mejoras en caliente en producción basándonos en tu feedback real.'
      }
    },
    contact: {
      title: '¿Hacemos encajar las piezas?',
      subtitle: 'Escríbenos sobre tu proyecto para agendar una cita o solicitar información técnica sin compromisos.',
      name: 'Nombre o Empresa',
      email: 'Tu Correo Electrónico',
      message: 'Cuéntanos brevemente qué necesitas...',
      reason: '¿Qué deseas hacer?',
      reason_opt1: 'Solicitar información general',
      reason_opt2: 'Agendar una cita / reunión',
      reason_opt3: 'Solicitar presupuesto a medida',
      budget: 'Presupuesto orientativo',
      budget_opt1: 'Menos de 1.000€',
      budget_opt2: '1.000€ - 4.000€',
      budget_opt3: 'Más de 4.000€',
      urgency: 'Urgencia del proyecto',
      urgency_opt1: 'Inmediata',
      urgency_opt2: 'En 1 mes',
      urgency_opt3: 'Más de 3 meses',
      gdpr: 'He leído y acepto los términos de la política de privacidad de datos para el tratamiento de mi solicitud de contacto.',
      send: 'Enviar Solicitud',
      sending: 'Enviando...',
      success: '¡Solicitud enviada con éxito! Nos pondremos en contacto contigo a la brevedad para agendar la cita o enviarte los detalles.',
      error: 'Error al enviar el mensaje. Por favor, reinténtalo o escríbenos directamente a: info@teselarsoftware.com'
    },
    hud: {
      title: 'Next.js vs. WordPress / No-Code',
      subtitle: 'La diferencia técnica que decide el éxito de tu negocio. Por qué programamos a medida.',
      platform_nextjs: 'Nuestra Solución (Next.js)',
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
      opt_s4: '04. Integración de Inteligencia Artificial',
      opt_s8: '08. Sistema ERP/CRM (App Nativa)'
    },
    leads: {
      sticky_cta: 'Consulta gratuita',
      sticky_cta_long: 'Reserva tu consulta gratuita',
      exit_title: '¡Espera! Tu primera consulta es GRATIS',
      exit_subtitle: 'Déjanos tu contacto y te llamamos sin compromiso para analizar tu proyecto.',
      exit_name: 'Tu nombre',
      exit_email: 'Tu email',
      exit_btn: 'Quiero mi consulta gratis',
      exit_close: 'No, gracias',
      exit_gdpr: 'Acepto la política de privacidad',
      toast_title: '¿Necesitas ayuda para decidir?',
      toast_text: 'Háblanos sin compromiso. Te asesoramos sobre la mejor solución para tu negocio.',
      toast_btn: 'Hablar con un experto',
      inline_title: '¿Tienes un proyecto en mente?',
      inline_subtitle: 'Cuéntanos tu idea y te asesoramos sin compromiso. Cada negocio es único.',
      inline_btn: 'Solicitar análisis gratuito',
      post_services: 'Trabajamos con un número reducido de clientes para garantizar la máxima calidad en cada proyecto.',
      post_services_btn: 'Reserva tu plaza',
      post_roi: 'Tu proyecto merece atención personalizada. Reserva tu consulta y descubre cómo podemos ayudarte.',
      post_roi_btn: 'Agendar consulta personalizada',
      post_pricing: 'Cada solución que creamos es única, como tu negocio. Hablemos sobre lo que necesitas.',
      post_pricing_btn: 'Solicitar presupuesto a medida'
    }
  },
  ca: {
    nav: {
      services: 'Serveis',
      pricing: 'Preus',
      values: 'Per què TESELAR?',
      process: 'Procés',
      contact: 'Agendar Cita'
    },
    hero: {
      tagline: 'Teselar Software',
      title: 'La peça exacta on la tecnologia i el teu negoci encaixen perfectament',
      subtitle: 'Transformem el teu negoci amb tecnologia accessible i a mida. Des de presència digital fins a sistemes ERP/CRM natius i integracions d\'IA.',
      cta: 'Sol·licitar informació',
      cta_alt: 'Agendar cita'
    },
    concept: {
      title: 'La Peça que Encaixa',
      text1: 'La nostra identitat visual s\'inspira en la tessel·lació: l\'art d\'acoblar peces de manera que encaixin perfectament, sense deixar buits ni generar friccions.',
      text2: 'En el món digital, representem aquesta peça exacta de programari a mida que el teu negoci necessita per completar el seu engranatge i funcionar amb fluïdesa total.'
    },
    services: {
      title: 'Catàleg de Serveis',
      subtitle: 'Solucions modulars i d\'alt rendiment adaptades a la teva mida i pressupost. Sense costos ocults.',
      ideal: 'Ideal per a:',
      pricing: 'Preu',
      features: 'Què inclou:',
      live_adjustments: 'Tots els nostres projectes de desenvolupament web i de programari inclouen 1 setmana d\'ajustaments en viu sense cost addicional després del llançament.',
      interest: 'M\'interessa aquest servei',
      categories: {
        web: 'Desenvolupament Web',
        automation: 'Automatització i IA',
        systems: 'Sistemes i ERP'
      },
      s1: {
        title: '01. Auditoria i Consultoria Digital',
        ideal: 'Negocis que volen millorar la seva presència digital, detectar oportunitats de creixement o avaluar la seva situació abans d\'invertir.',
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
        ideal: 'Empreses que necessiten resoldre un problema operatiu concret amb automatització intel·ligent.',
        price: '350€ — 900€',
        tag: 'Apps Script + APIs + Make',
        f1: 'Generador automàtic de pressupostos en PDF des d\'un formulari',
        f2: 'Enviament automàtic de factures per correu amb dades del teu CRM',
        f3: 'Extractor automatitzat de dades de correus a Google Sheets',
        f4: 'Xatbot automatitzat per a canals de WhatsApp o Telegram',
        f5: 'Sincronizador de base de dades bidireccional entre plataformes',
        f6: 'Sistema intel·ligent de recordatoris i alertes automàtiques',
        f7: 'Informes diaris o setmanals automàtics per correu electrònic'
      },
      s3: {
        title: '03. Web Essencial',
        ideal: 'Freelancers, petites empreses, professionals independents i nous emprenedors.',
        price: '600€ — 800€',
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
        title: '04. Integració d\'Intel·ligència Artificial',
        ideal: 'Empreses que volen incorporar IA avançada en els seus processos o atenció al client.',
        price: '800€ — 3.000€ + 60€/mes',
        tag: 'OpenAI / Anthropic APIs',
        f1: 'Assistent virtual amb IA entrenat amb la teva documentació interna',
        f2: 'Xatbot intel·ligent d\'atenció per a web, WhatsApp o Telegram',
        f3: 'Generació automàtica de continguts o respostes predefinides',
        f4: 'Anàlisi, classificació i resum automàtic de documents',
        f5: 'Automatització avançada amb processament de llenguatge natural',
        f6: 'Integració directa amb models GPT, Claude o homòlegs',
        f7: 'Supervisió mensual (Pla Bàsic, 60€/mes); costos d\'API al teu propi compte, sense intermediaris'
      },
      s5: {
        title: '05. Web Completa',
        ideal: 'Pimes que necessiten la web de veritat del seu negoci: catàleg o portfoli, blog i preparada per a clients estrangers.',
        price: 'Des de 1.500€ (2 idiomes inclosos)',
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
        title: '06. Botiga Online / E-commerce',
        ideal: 'Comerços locals o marques que volen vendre productes o serveis directament online.',
        price: 'Des de 4.000€',
        tag: 'React + BD + Passarel·les de Pagament',
        f1: 'Carret de compra interactiu, fluid i de càrrega ultraràpida',
        f2: 'Procés de checkout segur i simplificat (One-Step)',
        f3: 'Integració completa amb Stripe, PayPal i Bizum',
        f4: 'Gestió integral de productes i existències des de panell d\'admin',
        f5: 'Notificacions automàtiques de comandes al client i gestor',
        f6: 'Mòdul de cupons de descompte, impostos i despeses d\'enviament',
        f7: 'Historial de transaccions de clients i facturació bàsica'
      },
      s7: {
        title: '07. Web Immobiliària',
        ideal: 'Immobiliàries que volen destacar propietats, captar compradors estrangers i sincronitzar amb els portals.',
        price: 'Des de 3.000€',
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
        title: '08. Sistema de Gestió a Mida (ERP/CRM)',
        ideal: 'Negocis que volen digitalitzar un procés clau (facturació, clients, projectes) amb una eina feta exactament a mida.',
        price: '4.000€ — 6.000€',
        tag: 'Electron + React + Base de Dades',
        f1: 'Aplicació d\'escriptori nativa instal·lable (Windows, macOS, Linux)',
        f2: 'Dashboard interactiu amb gràfics financers i mètriques en viu',
        f3: 'Mòdul integral de gestió de clients (CRM) i base de contactes',
        f4: 'Generació automàtica i descàrrega directa de factures i pressupostos en PDF',
        f5: 'Planificador intern de projectes, tasques d\'equip i control de temps',
        f6: 'Rols d\'usuari avançats amb nivells d\'accés segurs',
        f7: 'Formació integral de l\'equip + 1 setmana de suport prioritari'
      }
    },
    pricing: {
      title: 'Manteniment i Suport',
      subtitle: 'Tranquil·litat absoluta per al teu negoci. Cuidem de la teva tecnologia perquè t\'enfoquis a créixer.',
      basic: {
        title: 'Plan Bàsic',
        price: '60€',
        period: '/ mes',
        desc: 'La teva web vigilada i al dia, sense permanència. Inclòs el primer any en E-commerce, Web Immobiliària i Sistemes a Mida.',
        f1: 'Monitorització automàtica 24/7 i còpies de seguretat setmanals',
        f2: 'Actualitzacions de seguretat i correcció d\'errors',
        f3: '1h/mes de canvis de contingut i supervisió de l\'assistent IA (si aplica)',
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
      not_included: {
        title: 'El que NO està inclòs',
        desc: 'Costos de tercers a càrrec del client — tot i que te\'ls gestionem nosaltres: domini i allotjament (hosting), comissions de passarel·les de pagament (Stripe/PayPal), correu empresarial, eines de màrqueting per email i consum d\'APIs d\'IA. Tampoc inclou: redacció de textos i fotografies (els aporta el client; redacció assistida per IA disponible com a extra), traducció humana professional o jurada (la traducció amb IA revisada sí que va inclosa en els idiomes contractats), publicitat de pagament (Google/Meta Ads), gestió de xarxes socials, i funcionalitats noves fora de l\'abast acordat, que es pressuposten a part.'
      },
      payment: {
        title: 'Mètodes de Pagament i Condicions',
        methods: 'Mètodes acceptats: Transferència bancària o efectiu a la mà (amb cita prèvia).',
        conditions: 'Condicions: Possibilitat de fraccionar el pagament del projecte sense interessos fins a 3 mesos. Sempre es requerirà un pagament inicial del 50% del cost total pressupostat per començar a treballar.'
      }
    },
    values: {
      title: 'Per què escollir-nos?',
      subtitle: 'L\'avantatge competitiu de treballar amb artesans del programari especialitzats en lloc de grans consultores lentes o freelancers inestables.',
      v1: {
        title: 'Contacte Directe sense Intermediaris',
        desc: 'Parlem el teu mateix idioma. Tractes directament amb el desenvolupador que escriu cada línia de codi de la teva aplicació, eliminant esperes i malentesos.'
      },
      v2: {
        title: 'Desenvolupament Natiu a Mida',
        desc: 'Fugim de les plantilles de WordPress pesades i insegures. Creem webs a mà amb React i Tailwind, garantint una velocitat insuperable i un SEO excel·lent.'
      },
      v3: {
        title: 'Proximitat i Comprensió Local',
        desc: 'Amb seu a Lloret de Mar. Ens encanta conèixer el teu negoci de prop, reunir-nos en persona i dissenyar la tecnologia que encaixi perfectament amb els teus objectius locals.'
      },
      v4: {
        title: 'Estabilitat i Suport Garantit',
        desc: 'Cada desenvolupament es lliura amb garantia d\'estabilitat, formació integral i suport tècnic compromès per assegurar l\'èxit continu del teu negoci.'
      }
    },
    process: {
      title: 'El Nostre Procés de Treball',
      subtitle: 'Un full de ruta clar per donar forma a la teva solució digital de principi a fi.',
      p1: {
        title: '01. Primer Contacto',
        desc: 'Analitzem les teves necessitats actuals en detall. Definim els objectius estratègics i t\'assessorem sobre el mòdul que millor s\'adapta.'
      },
      p2: {
        title: '02. Proposta Clara',
        desc: 'Tracem l\'arquitectura exacta del programari, establim terminis i et lliurem un pressupost detallat i tancat sense sorpreses.'
      },
      p3: {
        title: '03. Desenvolupament Àgil',
        desc: 'Programem la web o programari utilitzant les millors pràctiques de la indústria. Tindràs accés privat per veure el progrés real pas a pas.'
      },
      p4: {
        title: '04. Ajustos en Viu',
        desc: 'Despleguem el projecte. Durant la primera setmana realitzem ajustos i implementem millores en calent en producció basant-nos en el teu feedback real.'
      }
    },
    contact: {
      title: 'Fem encaixar les peces?',
      subtitle: 'Escriu-nos sobre el teu projecte per agendar una cita o sol·licitar informació tècnica sense compromisos.',
      name: 'Nom o Empresa',
      email: 'El Teu Correu Electrònic',
      message: 'Explica\'ns breument què necessites...',
      reason: 'Què vols fer?',
      reason_opt1: 'Sol·licitar informació general',
      reason_opt2: 'Agendar una cita / reunió',
      reason_opt3: 'Sol·licitar pressupost a mida',
      budget: 'Pressupost orientatiu',
      budget_opt1: 'Menys de 1.000€',
      budget_opt2: '1.000€ - 4.000€',
      budget_opt3: 'Més de 4.000€',
      urgency: 'Urgència del projecte',
      urgency_opt1: 'Immediata',
      urgency_opt2: 'En 1 mes',
      urgency_opt3: 'Més de 3 mesos',
      gdpr: 'He llegit i accepto els termes de la política de privacitat de dades per al tractament de la meva sol·licitud de contacte.',
      send: 'Enviar Sol·licitud',
      sending: 'Enviant...',
      success: 'Sol·licitud enviada amb èxit! Ens posarem en contacte amb tu molt aviat per agendar la cita o enviar-te els detalls.',
      error: 'Error en enviar el missatge. Per favor, torna a provar o escriu-nos directament a: info@teselarsoftware.com'
    },
    hud: {
      title: 'Next.js vs. WordPress / No-Code',
      subtitle: 'La diferència tècnica que decideix l\'èxit del teu negoci. Per què programem a mida.',
      platform_nextjs: 'La Nostra Solució (Next.js)',
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
      opt_s4: '04. Integració d\'Intel·ligència Artificial',
      opt_s8: '08. Sistema ERP/CRM (App Nativa)'
    },
    leads: {
      sticky_cta: 'Consulta gratuïta',
      sticky_cta_long: 'Reserva la teva consulta gratuïta',
      exit_title: 'Espera! La teva primera consulta és GRATIS',
      exit_subtitle: 'Deixa\'ns el teu contacte i et truquem sense compromís per analitzar el teu projecte.',
      exit_name: 'El teu nom',
      exit_email: 'El teu email',
      exit_btn: 'Vull la meva consulta gratis',
      exit_close: 'No, gràcies',
      exit_gdpr: 'Accepto la política de privacitat',
      toast_title: 'Necessites ajuda per decidir?',
      toast_text: 'Parla\'ns sense compromís. T\'assessorem sobre la millor solució per al teu negoci.',
      toast_btn: 'Parlar amb un expert',
      inline_title: 'Tens un projecte en ment?',
      inline_subtitle: 'Explica\'ns la teva idea i t\'assessorem sense compromís. Cada negoci és únic.',
      inline_btn: 'Sol·licitar anàlisi gratuït',
      post_services: 'Treballem amb un nombre reduït de clients per garantir la màxima qualitat a cada projecte.',
      post_services_btn: 'Reserva la teva plaça',
      post_roi: 'El teu projecte mereix atenció personalitzada. Reserva la teva consulta i descobreix com podem ajudar-te.',
      post_roi_btn: 'Agendar consulta personalitzada',
      post_pricing: 'Cada solució que creem és única, com el teu negoci. Parlem sobre el que necessites.',
      post_pricing_btn: 'Sol·licitar pressupost a mida'
    }
  },
  en: {
    nav: {
      services: 'Services',
      pricing: 'Pricing',
      values: 'Why TESELAR?',
      process: 'Process',
      contact: 'Book Meeting'
    },
    hero: {
      tagline: 'Teselar Software',
      title: 'The exact piece where technology and your business fit perfectly',
      subtitle: 'We transform your business with accessible and custom technology. From professional web presence to native ERP/CRM systems and custom AI integrations.',
      cta: 'Request information',
      cta_alt: 'Book meeting'
    },
    concept: {
      title: 'The Fitting Piece',
      text1: 'Our visual identity is inspired by tessellation: the art of assembling pieces so they fit together perfectly, leaving no gaps and creating no friction.',
      text2: 'In the digital world, we represent that exact piece of custom software that your business needs to complete its gears and run with total fluidity.'
    },
    services: {
      title: 'Our Services Catalog',
      subtitle: 'Modular and high-performance solutions tailored to your size and budget. No hidden costs.',
      ideal: 'Ideal for:',
      pricing: 'Price',
      features: 'What is included:',
      live_adjustments: 'All our web and software development projects include 1 week of live adjustments and improvements at no additional cost after launch.',
      interest: 'Interested in this service',
      categories: {
        web: 'Web Development',
        automation: 'Automation & AI',
        systems: 'Systems & ERP'
      },
      s1: {
        title: '01. Digital Audit & Consulting',
        ideal: 'Businesses looking to improve their digital presence, detect growth opportunities, or assess their situation before investing.',
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
        ideal: 'Companies looking to solve a specific operational efficiency issue with smart automation.',
        price: '350€ — 900€',
        tag: 'Apps Script + APIs + Make',
        f1: 'Automatic generation of PDF quotes/budgets from a web form',
        f2: 'Automatic invoice mailing connecting directly with your CRM',
        f3: 'Automated data extraction from emails directly into Google Sheets',
        f4: 'Functional automated chatbots for WhatsApp or Telegram channels',
        f5: 'Two-way database synchronization between different platforms',
        f6: 'Smart automated alert and notification system',
        f7: 'Daily or weekly automated email reporting'
      },
      s3: {
        title: '03. Essential Web',
        ideal: 'Freelancers, small businesses, independent professionals, and new entrepreneurs.',
        price: '600€ — 800€',
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
        title: '04. Artificial Intelligence Integration',
        ideal: 'Companies that want to incorporate advanced AI models into their workflow or customer service.',
        price: '800€ — 3,000€ + 60€/mo',
        tag: 'OpenAI / Anthropic APIs',
        f1: 'Custom virtual AI assistant trained with your internal company documentation',
        f2: 'Smart customer service chatbot for web, WhatsApp, or Telegram',
        f3: 'Automated generation of text content or custom email templates',
        f4: 'Automated analysis, classification, and summary of documents',
        f5: 'Advanced automation using Natural Language Processing (NLP)',
        f6: 'Direct integration with models like GPT-4, Claude 3.5, and others',
        f7: 'Monthly supervision (Basic Plan, 60€/mo); AI API costs billed to your own account, no middlemen'
      },
      s5: {
        title: '05. Complete Web',
        ideal: 'SMEs that need their business\'s real website: catalog or portfolio, blog, and ready for foreign customers.',
        price: 'From 1,500€ (2 languages included)',
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
        title: '06. E-commerce / Online Store',
        ideal: 'Local businesses or brands that want to sell products or services directly online.',
        price: 'From 4,000€',
        tag: 'React + DB + Payment Gateways',
        f1: 'Interactive, fluid, and ultra-fast loading shopping cart',
        f2: 'Secure and simplified one-step checkout process',
        f3: 'Full integration with Stripe, PayPal, and credit cards',
        f4: 'Complete product and stock management from an admin panel',
        f5: 'Automated email notifications to clients and the store administrator',
        f6: 'Discount coupon module, tax config, and shipping rules',
        f7: 'Client order history and basic automated billing'
      },
      s7: {
        title: '07. Real Estate Website',
        ideal: 'Real estate agencies that want to showcase properties, reach foreign buyers, and sync with property portals.',
        price: 'From 3,000€',
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
        title: '08. Custom Management System (ERP/CRM)',
        ideal: 'Businesses that want to digitalize a key process (billing, clients, projects) with a tool built exactly for them.',
        price: '4,000€ — 6,000€',
        tag: 'Electron + React + Database',
        f1: 'Self-installing native desktop application (Windows, macOS, Linux)',
        f2: 'Interactive dashboard with financial charts and live metrics',
        f3: 'Complete client management (CRM) and contact database module',
        f4: 'Automated generation and direct PDF download of quotes and invoices',
        f5: 'Internal planner for projects, team tasks, and time-tracking',
        f6: 'Advanced user roles with secure permission levels',
        f7: 'Team training included + 1 week of priority development support'
      }
    },
    pricing: {
      title: 'Maintenance & Support',
      subtitle: 'Absolute peace of mind. We take care of your technology so you can focus on growth.',
      basic: {
        title: 'Basic Plan',
        price: '60€',
        period: '/ month',
        desc: 'Your website watched and up to date, no lock-in. Included for the first year with E-commerce, Real Estate Websites, and Custom Systems.',
        f1: 'Automatic 24/7 monitoring and weekly backups',
        f2: 'Security updates and error fixing',
        f3: '1h/month of content changes and AI assistant supervision (if applicable)',
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
      not_included: {
        title: 'What is NOT included',
        desc: 'Third-party costs paid by the client — though we handle the setup for you: domain and hosting, payment gateway fees (Stripe/PayPal), business email, email marketing tools, and AI API usage. Also not included: copywriting and photography (provided by the client; AI-assisted copywriting available as an extra), professional or sworn human translation (reviewed AI translation IS included with contracted languages), paid advertising (Google/Meta Ads), social media management, and new features outside the agreed scope, which are quoted separately.'
      },
      payment: {
        title: 'Payment Terms & Methods',
        methods: 'Accepted methods: Bank transfer or cash in hand (by appointment).',
        conditions: 'Terms: Interest-free payment split available up to 3 months. An initial payment of 50% of the total approved budget is always required to start any development.'
      }
    },
    values: {
      title: 'Why Choose Us?',
      subtitle: 'The competitive advantage of working with specialized software craftsmen instead of slow corporate agencies or unstable freelancers.',
      v1: {
        title: 'Direct Contact, No Intermediaries',
        desc: 'We speak your language. You deal directly with the developer writing every line of your software, eliminating delay and misunderstandings.'
      },
      v2: {
        title: 'Custom Native Development',
        desc: 'We avoid heavy, slow, and insecure WordPress templates. We hand-craft websites using React and Tailwind, ensuring unrivaled speed and outstanding SEO.'
      },
      v3: {
        title: 'Local Proximity & Understanding',
        desc: 'Based in Lloret de Mar. We love visiting your business, meeting in person, and designing the technology that fits your local strategic goals.'
      },
      v4: {
        title: 'Stability & Uptime Guarantee',
        desc: 'Every project is delivered with a stability guarantee, extensive user training, and dedicated support to ensure your long-term success.'
      }
    },
    process: {
      title: 'Our Working Method',
      subtitle: 'A clear roadmap to shape your digital solution from start to finish.',
      p1: {
        title: '01. First Contact',
        desc: 'We analyze your current business needs in detail. We outline goals and recommend the modular solutions that fit your budget.'
      },
      p2: {
        title: '02. Clear Proposal',
        desc: 'We define the exact software architecture, delivery schedule, and present a transparent, closed budget with no surprises.'
      },
      p3: {
        title: '03. Agile Development',
        desc: 'We program using industry-leading stack. You will have private access to preview the real progress step by step.'
      },
      p4: {
        title: '04. Live Adjustments',
        desc: 'We deploy the project. During the first week, we make live tweaks and hotfixes directly based on your real-world feedback.'
      }
    },
    contact: {
      title: 'Shall we fit the pieces?',
      subtitle: 'Tell us about your project to book a meeting or request technical details without compromises.',
      name: 'Name or Company Name',
      email: 'Your Contact Email',
      message: 'Briefly tell us what you need...',
      reason: 'What would you like to do?',
      reason_opt1: 'Request general information',
      reason_opt2: 'Book an appointment / meeting',
      reason_opt3: 'Request a custom quote',
      budget: 'Approximate budget',
      budget_opt1: 'Less than 1.000€',
      budget_opt2: '1.000€ - 4.000€',
      budget_opt3: 'More than 4.000€',
      urgency: 'Project urgency',
      urgency_opt1: 'Immediate',
      urgency_opt2: 'Within 1 month',
      urgency_opt3: 'More than 3 months',
      gdpr: 'I have read and accept the terms of the data privacy policy for the processing of my contact request.',
      send: 'Send Request',
      sending: 'Sending...',
      success: 'Request submitted successfully! We will get in touch with you shortly to book the appointment or send details.',
      error: 'Error sending message. Please try again or write us directly at: info@teselarsoftware.com'
    },
    hud: {
      title: 'Next.js vs. WordPress / No-Code',
      subtitle: 'The technical difference deciding your business success. Why we code from scratch.',
      platform_nextjs: 'Our Solution (Next.js)',
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
      opt_s4: '04. Artificial Intelligence Integration',
      opt_s8: '08. ERP/CRM System (Native Desktop App)'
    },
    leads: {
      sticky_cta: 'Free consultation',
      sticky_cta_long: 'Book your free consultation',
      exit_title: 'Wait! Your first consultation is FREE',
      exit_subtitle: 'Leave us your contact details and we\'ll call you with no commitment to analyze your project.',
      exit_name: 'Your name',
      exit_email: 'Your email',
      exit_btn: 'I want my free consultation',
      exit_close: 'No, thanks',
      exit_gdpr: 'I accept the privacy policy',
      toast_title: 'Need help deciding?',
      toast_text: 'Talk to us with no commitment. We\'ll advise you on the best solution for your business.',
      toast_btn: 'Talk to an expert',
      inline_title: 'Have a project in mind?',
      inline_subtitle: 'Tell us your idea and we\'ll advise you at no cost. Every business is unique.',
      inline_btn: 'Request free analysis',
      post_services: 'We work with a limited number of clients to guarantee maximum quality on every project.',
      post_services_btn: 'Reserve your spot',
      post_roi: 'Your project deserves personalized attention. Book your consultation and discover how we can help.',
      post_roi_btn: 'Book personalized consultation',
      post_pricing: 'Every solution we create is unique, just like your business. Let\'s talk about what you need.',
      post_pricing_btn: 'Request a custom quote'
    }
  }
};
