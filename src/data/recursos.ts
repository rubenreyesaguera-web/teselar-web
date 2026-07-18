export interface Recurso {
  slug: string;
  titulo: string;
  subtitulo: string;
  bullets: string[];
  formato: string;
}

export const RECURSOS: Record<string, Recurso> = {
  'checklist-autodiagnostico': {
    slug: 'checklist-autodiagnostico',
    titulo: '¿Tu negocio ha superado al Excel?',
    subtitulo: '5 señales de que tus procesos manuales están frenando tu crecimiento, en un checklist de autodiagnóstico de 1 página.',
    bullets: [
      'Responde 5 preguntas de sí/no sobre tu operativa diaria',
      'Descubre si tu tecnología actual es ya un cuello de botella',
      'Identifica en qué zona de riesgo está tu empresa',
    ],
    formato: 'PDF de 1 página',
  },
  'guia-metodologia': {
    slug: 'guia-metodologia',
    titulo: 'De la Idea al Código',
    subtitulo: 'Cómo construimos la pieza exacta para tu negocio: las 5 fases de nuestra metodología, sin sorpresas ni cajas negras.',
    bullets: [
      'Auditoría de fricciones y mapeo de procesos',
      'Diseño del engranaje: arquitectura y prototipos antes de programar',
      'Desarrollo ágil, despliegue sin fricciones y acompañamiento local',
    ],
    formato: 'Guía PDF de 2-3 páginas',
  },
  'analisis-rentabilidad': {
    slug: 'analisis-rentabilidad',
    titulo: 'Mitos del Software a Medida',
    subtitulo: 'Coste vs. Inversión: un análisis honesto de lo que realmente cuesta (y ahorra) automatizar tu negocio.',
    bullets: [
      'El coste oculto de las licencias SaaS que no se comunican entre sí',
      'Cuánto pierdes al año por errores humanos evitables',
      'Por qué el ROI de un activo propio se dispara a medio plazo',
    ],
    formato: 'PDF descargable',
  },
  'guia-seguridad': {
    slug: 'guia-seguridad',
    titulo: '3 formas rápidas de evaluar tu seguridad',
    subtitulo: 'Una mini-guía para saber si los datos de tu empresa están realmente protegidos, sin jerga técnica.',
    bullets: [
      'Control de accesos: quién ve qué en tu sistema',
      'Trazabilidad: registros de auditoría ante cualquier cambio',
      'Copias de seguridad: manuales y locales vs. automatizadas y cifradas',
    ],
    formato: 'Infografía / mini-guía PDF',
  },
  'comparativa-erp': {
    slug: 'comparativa-erp',
    titulo: 'ERP Estándar vs. Software a Medida',
    subtitulo: 'La comparativa directa que necesitas antes de decidir cómo escalar la tecnología de tu empresa.',
    bullets: [
      'Adaptabilidad, funcionalidades y curva de aprendizaje, cara a cara',
      'Qué opción es realmente tuya y cuál es un alquiler recurrente',
      'Escalabilidad e integraciones: dónde gana cada modelo',
    ],
    formato: 'Tabla comparativa en PDF',
  },
};

export function getRecurso(slug: string): Recurso | undefined {
  return RECURSOS[slug];
}
