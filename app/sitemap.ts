import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://solaraflames.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          lv: 'https://solaraflames.com',
          en: 'https://solaraflames.com',
        },
      },
    },
  ]
}
