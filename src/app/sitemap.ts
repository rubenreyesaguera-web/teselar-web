import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://teselarsoftware.com';
  const languages = ['es', 'en', 'ca'];
  
  // Base entries for languages
  const languageEntries = languages.map((lng) => ({
    url: `${baseUrl}/${lng}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  // Root entry (usually redirects or shows default language)
  const rootEntry = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  };

  return [rootEntry, ...languageEntries];
}
