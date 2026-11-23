import type { ReactNode } from 'react'

const paths = {
  gate: <><path d="M3 21h18M5 21V10a7 7 0 0 1 14 0v11M9 21V10a3 3 0 0 1 6 0v11M12 1v2" /><path d="M12 14v3" /></>,
  github: <><path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 6a4.4 4.4 0 0 0-.1-3.4s-1-.3-3.5 1.3a13.4 13.4 0 0 0-6.4 0C6 2.3 5 2.6 5 2.6A4.4 4.4 0 0 0 4.9 6a4.7 4.7 0 0 0-1.3 3.6c0 4.7 2.9 5.7 5.6 6a3 3 0 0 0-.8 2.3v3.4" /></>,
  users: <><circle cx="9" cy="7.5" r="3" /><path d="M3 19v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-14a3 3 0 0 1 0 5.8m2 2.3a4 4 0 0 1 3 3.9v2" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5l3.5 2" /></>,
  cube: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5M12 12v9" /></>,
  check: <><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12 2.2 2.3 4.9-4.9" /></>,
  sound: <path d="M3 12h2m3-4v8m4-12v16m4-13v10m4-6v2" />,
  terminal: <path d="m4 6 5 5-5 5m8 0h8" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  pin: <><path d="M19 10c0 5-7 9-7 11-1-2-7-6-7-11a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
} satisfies Record<string, ReactNode>

export function Icon({ name, size = 20 }: { name: keyof typeof paths; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}
