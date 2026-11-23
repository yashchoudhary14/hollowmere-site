import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '')

  return {
    base: env.SITE_BASE || '/',
    appType: isPreview ? 'mpa' : 'spa',
    define: { __SITE_URL__: JSON.stringify(siteUrl) },
    plugins: [react(), tailwindcss(), {
      name: 'preview-legal-routes',
      configurePreviewServer(server) {
        // Match the directory redirects that the production static hosts provide.
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost')
          const route = url.pathname.slice(server.config.base.length)
          if (url.pathname.startsWith(server.config.base) && (route === 'privacy' || route === 'terms')) {
            response.writeHead(308, { Location: `${url.pathname}/${url.search}` }).end()
          } else {
            next()
          }
        })
      },
    }],
    preview: { strictPort: true },
  }
})
