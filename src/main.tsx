import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { getRoute, PAGES } from './config'
import './styles.css'

const route = getRoute(window.location.pathname)
const element = document.getElementById('root')!
const app = <App route={route} />

if (element.firstElementChild) {
  hydrateRoot(element, app)
} else {
  document.title = PAGES[route].title
  createRoot(element).render(app)
}
