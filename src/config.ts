declare const __SITE_URL__: string

export const STUDIO_NAME = 'Hollowmere Studio'
export const GAME_TITLE = 'Hollowmere'
export const GITHUB_URL = 'https://github.com/yashchoudhary14/Hollowmere'
// Swap this to founders@<your-custom-domain> once a custom domain is attached and email works.
export const PRIMARY_EMAIL = 'c.yash@iitg.ac.in'
export const SECONDARY_EMAIL = 'yashchoudhary.pilot@gmail.com'
export const LOCATION = 'IIT Guwahati, Assam, India'
export const INSTITUTE = 'Indian Institute of Technology Guwahati'
export const COPYRIGHT_YEAR = 2026
export const LEGAL_UPDATED = { label: '23 November 2026', dateTime: '2026-11-23' }
export const UNITY_VERSION = 'Unity 6.3 LTS'
export const CURRENT_MILESTONE = 'M1.6'
export const EDIT_MODE_TESTS = 103
export const PLAY_MODE_TESTS = 8
export const TEST_TOTAL = EDIT_MODE_TESTS + PLAY_MODE_TESTS

export const SITE_BASE = import.meta.env.BASE_URL
export const SITE_URL = __SITE_URL__
export const MEDIA = {
  hero: 'media/village-gate.webp',
  heroSmall: 'media/village-gate-small.webp',
  prototype: 'media/prototype-hearth.webp',
  groundPlan: 'media/village-layout.webp',
  social: 'social.png',
} as const
export const SOCIAL_IMAGE_ALT = 'Hollowmere wordmark beside the fog-covered gate and cottages of a rural village.'
export const HERO_LINE = 'The village knows your name.'
export const HERO_DESCRIPTION = 'A 2–6 player co-op psychological horror game set in a walled late-1970s rural village. Search 15 houses, survive the dark, complete the Ritual of Passage, and escape across the fog road.'

export const NAVIGATION = [
  { id: 'game', label: 'The Game' },
  { id: 'village', label: 'The Village' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'team', label: 'Team' },
] as const

export const SPECS = [
  { icon: 'users', value: '2–6 Players', detail: '4-Player Core' },
  { icon: 'clock', value: '35–45 Min Matches', detail: 'Target match length' },
  { icon: 'cube', value: UNITY_VERSION, detail: 'URP + Netcode' },
  { icon: 'check', value: `${TEST_TOTAL} Automated Tests Passing`, detail: 'M1.6 P2 baseline' },
] as const

export const FEATURES = [
  {
    icon: 'users',
    title: 'Co-op Tension',
    detail: 'Netcode for GameObjects',
    description: 'Split up to search your assigned houses, then regroup to piece together the ritual. The design puts distance between players just when they need each other most.',
  },
  {
    icon: 'gate',
    title: '15-House Walled Village',
    detail: '1970s Rural Setting',
    description: 'Read the clues, work out which house belongs to you, and bring what you find back to the village square before the group attempts the passage.',
  },
  {
    icon: 'sound',
    title: 'Dynamic AI Navigation & Noise Systems',
    detail: 'Sound-driven horror',
    description: 'The Hollow is designed to hunt by sound and mimic familiar voices. Listen carefully when a teammate calls from somewhere they shouldn’t be.',
  },
] as const

export const MATCH_PHASES = [
  { phase: 'Day', title: 'Find your house.', description: 'Read your letter’s riddle. A door color, a chimney count, or a stopped clock could tell you which house is yours.' },
  { phase: 'Dusk', title: 'Count the bells.', description: 'The villagers walk into the forest as the chapel bell tolls. Be inside your own house by the twelfth toll.' },
  { phase: 'Night', title: 'Bring back your piece.', description: 'Solve the house puzzle, then carry your piece of the ritual to the square. Listen for the Hollow on the way back. It hunts by sound.' },
  { phase: 'The Crossing', title: 'Do not look back.', description: 'Keep the candles lit through the Ritual of Passage. When the gate opens, at least one of you has to make it across the fog road.' },
] as const

export const MILESTONES = [
  { id: 'M0', title: 'Project Setup', status: 'Completed', description: `${UNITY_VERSION}, URP, AI Navigation, and Netcode for GameObjects.` },
  { id: 'M1', title: 'Greybox Village Builder', status: 'Completed', description: 'Generated the first playable Windows build.' },
  { id: 'M1.5', title: 'Visual Look Pass', status: 'Completed', description: 'Updated lighting and atmosphere and rebuilt the Windows player.' },
  { id: 'M1.6 P1 & P2', title: 'Village v2 Ground Plan', status: 'Completed', description: `Approved the Village.unity layout with ${EDIT_MODE_TESTS} EditMode and ${PLAY_MODE_TESTS} PlayMode tests passing.` },
  { id: 'M1.6 P3', title: 'House Shells', status: 'In Progress', description: 'Building interior and exterior house shells in a hybrid cloud and PC workflow.' },
  { id: 'M2–M8', title: 'Core Horror Loop, Ritual & Multiplayer Playtests', status: 'Planned', description: 'Build out the core loop and Ritual of Passage, then test them in multiplayer.' },
] as const

export const TEAM = [
  { initials: 'YC', name: 'Yash Choudhary', role: 'Coding, Architecture & AI Development Pipeline', affiliation: 'B.Tech DSAI, IIT Guwahati' },
  { initials: 'VE', name: 'Vedant', role: 'Gameplay Ideation & Assets', affiliation: 'IIT Guwahati' },
  { initials: 'VA', name: 'Vansh', role: 'Assets & Resources', affiliation: 'IIT Guwahati' },
] as const

export const PAGES = {
  home: { path: '', title: `${GAME_TITLE} | Co-op Psychological Horror`, description: HERO_DESCRIPTION },
  privacy: { path: 'privacy/', title: `Privacy Policy | ${STUDIO_NAME}`, description: 'How Hollowmere Studio handles website visits, playtest inquiries, and contact email.' },
  terms: { path: 'terms/', title: `Terms of Use | ${STUDIO_NAME}`, description: 'Terms for using the Hollowmere website, following development, and taking part in playtests.' },
  missing: { path: '404.html', title: `Page not found | ${STUDIO_NAME}`, description: 'This page could not be found.' },
} as const

export type Route = keyof typeof PAGES

export function houseImagePath(id: string) {
  return `media/houses/${id.toLowerCase()}.webp`
}

export function getRoute(pathname: string): Route {
  if (pathname === SITE_BASE.slice(0, -1)) return 'home'
  if (!pathname.startsWith(SITE_BASE)) return 'missing'
  const page = pathname.slice(SITE_BASE.length).replace(/\/$/, '')
  if (page === '') return 'home'
  if (page === 'privacy') return 'privacy'
  if (page === 'terms') return 'terms'
  return 'missing'
}
