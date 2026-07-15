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

  // Root entry (usually redirects or shows default language)
  const rootEntry = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    alternates: languageAlternates,
  };

  return [rootEntry, ...languageEntries];
}
