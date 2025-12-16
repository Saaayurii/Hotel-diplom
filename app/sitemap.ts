import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://timeout.com'

  // Supported locales
  const locales = ['en', 'ru']

  // Generate sitemap entries for each locale
  const routes = [
    '',
    '/hotels',
    '/rooms',
    '/about',
    '/contact',
    '/offers',
    '/destinations/greece',
    '/destinations/italy',
    '/destinations/spain',
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add entries for each locale and route
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ru: `${baseUrl}/ru${route}`,
          },
        },
      })
    })
  })

  // Add root redirect
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  return sitemapEntries
}
