import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import countries from './src/data/countries.js'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.join(projectRoot, 'public', 'sitemap.xml')
const baseUrl = 'https://bandeirasdomundo.com'
const publicRoutes = [
  '/',
  '/quiz',
  '/quiz/bandeira',
  '/quiz/capital',
  '/quiz/continente',
  '/quiz/nome-pais',
  '/quiz/populacao',
  '/quiz/relampago',
  '/curiosidades',
  '/rankings',
  '/sobre',
  '/contato',
  '/politica-privacidade',
  '/termos-de-uso',
]

const urls = [
  ...publicRoutes.map((route) => ({
    route,
    frequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? '1.0' : route === '/quiz' ? '0.9' : '0.7',
  })),
  ...countries.map(({ code }) => ({
    route: `/pais/${code}`,
    frequency: 'monthly',
    priority: '0.6',
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ route, frequency, priority }) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`

fs.writeFileSync(outputPath, xml, 'utf8')
console.log(`Sitemap gerado com ${urls.length} URLs.`)
