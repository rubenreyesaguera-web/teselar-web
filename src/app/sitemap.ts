import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.teselarsoftware.com';
  const languages = ['es', 'en', 'ca'];

  // Hreflang alternates shared by every entry below — le dice a los buscadores (y a los
  // motores de IA que respetan sitemaps) que /es, /ca y /en son la misma página en 3 idiomas.
  const languageAlternates = {
    languages: {
      es: `${baseUrl}/es`,
      ca: `${baseUrl}/ca`,
      en: `${baseUrl}/en`,
    },
  };

  // Base entries for languages
  const languageEntries = languages.map((lng) => ({
    url: `${baseUrl}/${lng}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
    alternates: languageAlternates,
  }));

  // La demo de gestion (ADR-113), indexable en los tres idiomas.
  const demoAlternates = {
    languages: {
      es: `${baseUrl}/es/demo`,
      ca: `${baseUrl}/ca/demo`,
      en: `${baseUrl}/en/demo`,
    },
  };
  const demoEntries = languages.map((lng) => ({
    url: `${baseUrl}/${lng}/demo`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: demoAlternates,
  }));

  // La raiz no va (20/10): el middleware la redirige a /es, /ca o /en, y al sitemap solo deben
  // ir direcciones finales, no redirecciones.
  return [...languageEntries, ...demoEntries];
}
