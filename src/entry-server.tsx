import { renderToString } from 'react-dom/server'
import { App } from './App'
import { MEDIA, houseImagePath } from './config'
import type { Route } from './config'
import village from './village-map.json'

export { GAME_TITLE, MEDIA, PAGES, SITE_BASE, SITE_URL, SOCIAL_IMAGE_ALT } from './config'

export const REQUIRED_MEDIA = [
  ...Object.values(MEDIA),
  ...village.houses.map(({ id }) => houseImagePath(id)),
]

export function render(route: Route) {
  return renderToString(<App route={route} />)
}
