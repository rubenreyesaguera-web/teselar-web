import { MetadataRoute } from 'next';

// Crawlers de IA a los que abrimos la puerta explícitamente (GEO/AEO): además del
// comodín '*' de abajo, se nombran uno a uno para dejar constancia expresa de que
// Teselar Software quiere ser indexado y citado por motores de respuesta con IA.
const AI_CRAWLERS = [
  'GPTBot',            // ChatGPT (entrenamiento)
  'OAI-SearchBot',      // ChatGPT Search
  'ChatGPT-User',        // Navegación en vivo de ChatGPT
  'ClaudeBot',           // Claude (entrenamiento/indexación)
  'anthropic-ai',
  'Claude-SearchBot',
  'Claude-User',         // Navegación en vivo de Claude
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',    // Gemini / AI Overviews
  'Applebot-Extended',   // Apple Intelligence
  'CCBot',               // Common Crawl (fuente de entrenamiento de muchos LLM)
  'Amazonbot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'DuckAssistBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: 'https://www.teselarsoftware.com/sitemap.xml',
  };
}
