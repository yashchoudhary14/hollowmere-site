import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { GAME_TITLE, MEDIA, PAGES, REQUIRED_MEDIA, SITE_BASE, SITE_URL, SOCIAL_IMAGE_ALT, render } from '../.prerender/entry-server.js'

for (const asset of REQUIRED_MEDIA) {
  const file = join('dist', asset)
  const info = await stat(file)
  if (!info.isFile() || info.size === 0) throw new Error(`Expected a nonempty media file at ${file}`)
}
console.log(`Verified ${REQUIRED_MEDIA.length} media files for the production build.`)

const template = await readFile('dist/index.html', 'utf8')
const htmlEntities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
const escape = (value) => value.replace(/[&<>"]/g, (char) => htmlEntities[char])
const meta = (kind, name, content) => `<meta ${kind}="${name}" content="${escape(content)}" />`

for (const [route, { path, title, description }] of Object.entries(PAGES)) {
  const tags = [
    meta('name', 'description', description),
    meta('name', 'robots', route === 'missing' ? 'noindex' : 'index, follow'),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', GAME_TITLE),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
  ]

  if (SITE_URL && route !== 'missing') {
    const canonical = new URL(`${SITE_BASE}${path}`, SITE_URL).href
    const image = new URL(`${SITE_BASE}${MEDIA.social}`, SITE_URL).href
    tags.push(
      `<link rel="canonical" href="${escape(canonical)}" />`,
      meta('property', 'og:url', canonical),
      meta('property', 'og:image', image),
      meta('property', 'og:image:width', '1200'),
      meta('property', 'og:image:height', '630'),
      meta('property', 'og:image:alt', SOCIAL_IMAGE_ALT),
      meta('name', 'twitter:image', image),
      meta('name', 'twitter:image:alt', SOCIAL_IMAGE_ALT),
    )
  }

  const output = join('dist', route === 'missing' ? path : `${path}index.html`)
  const html = template
    .replace('<title>Hollowmere</title>', () => `<title>${escape(title)}</title>`)
    .replace('<!--site-meta-->', () => tags.join('\n    '))
    .replace('<!--site-app-->', () => render(route))

  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

await mkdir('dist/licenses', { recursive: true })
for (const family of ['cormorant-garamond', 'inter', 'jetbrains-mono']) {
  await copyFile(`node_modules/@fontsource-variable/${family}/LICENSE`, `dist/licenses/${family}.txt`)
}
