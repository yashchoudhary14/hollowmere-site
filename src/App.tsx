import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  COPYRIGHT_YEAR, CURRENT_MILESTONE, EDIT_MODE_TESTS, FEATURES, GAME_TITLE, GITHUB_URL,
  HERO_DESCRIPTION, HERO_LINE, INSTITUTE, LOCATION, MATCH_PHASES, MEDIA, MILESTONES, NAVIGATION, PLAY_MODE_TESTS, PRIMARY_EMAIL,
  SECONDARY_EMAIL, SITE_BASE, SPECS, STUDIO_NAME, TEAM, TEST_TOTAL, UNITY_VERSION,
} from './config'
import type { Route } from './config'
import { Icon } from './icons'
import { LegalPage } from './LegalPage'
import { Village } from './Village'

function GitHubLink({ className, label }: { className: string; label: string }) {
  return <a className={className} href={GITHUB_URL}><Icon name="github" size={17} />{label}</a>
}

function Wordmark() {
  return <a href={SITE_BASE} className="wordmark"><Icon name="gate" size={23} /><span>{GAME_TITLE}</span></a>
}

function Header({ isHome }: { isHome: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        toggle.current?.focus()
      }
    }}>
      <div className="shell header-inner">
        <Wordmark />
        <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {NAVIGATION.map(({ id, label }) => (
            <a key={id} href={`${isHome ? '' : SITE_BASE}#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <GitHubLink className="button button-small mobile-repo" label="GitHub Repo" />
        </nav>
        <GitHubLink className="button button-small desktop-repo" label="GitHub Repo" />
        <button ref={toggle} className="menu-toggle" type="button" aria-controls="site-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Wordmark />
        <p>© {COPYRIGHT_YEAR} {STUDIO_NAME} · Built at IIT Guwahati</p>
        <nav aria-label="Footer navigation" className="footer-links">
          <a href={GITHUB_URL}>GitHub</a>
          <a href={`${SITE_BASE}privacy/`}>Privacy</a>
          <a href={`${SITE_BASE}terms/`}>Terms</a>
        </nav>
      </div>
    </footer>
  )
}

function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-art" src={`${SITE_BASE}${MEDIA.hero}`} srcSet={`${SITE_BASE}${MEDIA.heroSmall} 960w, ${SITE_BASE}${MEDIA.hero} 1774w`} sizes="100vw" alt="" width="1774" height="887" fetchPriority="high" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker"><span />First-person co-op horror</p>
            <h1 id="hero-title" className="hero-title">{GAME_TITLE}</h1>
            <p className="hero-line">{HERO_LINE}</p>
            <p className="hero-description">{HERO_DESCRIPTION}</p>
            <div className="hero-actions flex flex-wrap items-center gap-3">
              <a className="button button-primary" href="#contact">Request Playtest / Contact</a>
              <GitHubLink className="button button-quiet" label="Explore the Codebase" />
            </div>
          </div>
          <div className="hero-foot">
            <p className="hero-status"><span className="status-dot" />In Active Development · {UNITY_VERSION} · Milestone {CURRENT_MILESTONE}</p>
            <p className="art-caption">Village concept art</p>
          </div>
        </div>
      </section>
      <div className="spec-strip">
        <ul className="shell spec-grid" aria-label="Game specifications">
          {SPECS.map(({ icon, value, detail }) => (
            <li key={value} className="spec-item">
              <Icon name={icon} size={21} />
              <div><strong>{value}</strong><span>{detail}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function Game() {
  return (
    <section id="game" className="section" aria-labelledby="game-title">
      <div className="shell">
        <div className="section-intro editorial-grid">
          <div><p className="eyebrow"><span />The Game</p><h2 id="game-title">A letter with<br /><em>your name on it.</em></h2></div>
          <p className="body-copy">Your car dies at a broken bridge. The only road leads to Hollowmere, and the gate closes behind you. On the notice board is a sealed letter for each of you. It already knows your name. Inside are the clues to the house you’ll have to search alone.</p>
        </div>
        <div className="match-grid">
          <div className="match-loop">
            <h3>One day. One night.</h3>
            <ol className="phases" aria-label="Match structure">
              {MATCH_PHASES.map(({ phase, title, description }) => (
                <li key={phase}>
                  <p className="phase-label">{phase}</p>
                  <div><h4>{title}</h4><p className="body-copy">{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <figure className="hearth-figure">
            <img src={`${SITE_BASE}${MEDIA.prototype}`} width="1280" height="720" alt="Firelight spills across the floorboards of a dim prototype house interior" loading="lazy" decoding="async" />
            <figcaption><span>Unity prototype · M1.5 lighting study</span><p>The hearth keeps it out.</p><span className="hearth-note">Inside, keep the fire lit. Outside, every slammed door or hurried footstep can give you away.</span></figcaption>
          </figure>
        </div>
        <div className="feature-grid">
          {FEATURES.map(({ icon, title, detail, description }) => (
            <article className="feature-card" key={title}>
              <span className="icon-tile"><Icon name={icon} size={23} /></span>
              <p className="feature-detail">{detail}</p>
              <h3>{title}</h3>
              <p className="body-copy">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Engineering() {
  return (
    <section id="engineering" className="section section-tinted" aria-labelledby="engineering-title">
      <div className="shell editorial-grid engineering-grid">
        <div>
          <p className="eyebrow"><span />Engineering</p>
          <h2 id="engineering-title">How we build <em>Hollowmere.</em></h2>
          <p className="body-copy section-lead">Three students are building a full 3D multiplayer game alongside university coursework. A test-driven agentic workflow gives the team repeatable checks for each milestone.</p>
          <dl className="pipeline-details">
            <div><dt>Unity stack</dt><dd>{UNITY_VERSION}, Universal Render Pipeline, Netcode for GameObjects, AI Navigation, and Windows IL2CPP builds.</dd></div>
            <div><dt>Batch-mode automation</dt><dd><code>tools/unity.ps1</code> compiles, tests, builds, and captures verification screenshots in headless Unity runs.</dd></div>
            <div><dt>Agent specs &amp; human review</dt><dd><code>CLAUDE.md</code>, <code>.clinerules</code>, and the <code>/milestone</code> and <code>/playtest</code> skills guide agents. The team leads game design, asset creation, and code review.</dd></div>
          </dl>
        </div>
        <div className="verification-panel">
          <div className="verification-header"><Icon name="terminal" size={20} /><span>tools/unity.ps1</span><span className="verification-mode">Batch mode</span></div>
          <div className="verification-body">
            <p className="eyebrow">M1.6 P2 verification</p>
            <p className="verification-total"><strong>{TEST_TOTAL}</strong><span>automated tests passing</span></p>
            <ul className="verification-list">
              <li><span>EditMode tests</span><strong><Icon name="check" size={16} />{EDIT_MODE_TESTS} passed</strong></li>
              <li><span>PlayMode tests</span><strong><Icon name="check" size={16} />{PLAY_MODE_TESTS} passed</strong></li>
            </ul>
            <p className="body-copy">Both suites passed automatically in Unity batch mode for the approved <code>Village.unity</code> ground plan.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Roadmap() {
  return (
    <section id="roadmap" className="section" aria-labelledby="roadmap-title">
      <div className="shell editorial-grid roadmap-grid">
        <div>
          <p className="eyebrow"><span />Roadmap</p>
          <h2 id="roadmap-title">Development roadmap.</h2>
          <p className="body-copy section-lead">An early Windows prototype demonstrates the solo loop. The team has approved the Village v2 ground plan and is building house shells. Online co-op and voice mimicry are on the roadmap.</p>
          <figure className="roadmap-capture">
            <img src={`${SITE_BASE}${MEDIA.groundPlan}`} width="1280" height="720" alt="Unity aerial view of the greybox village with the ring wall, town square and roads laid out" loading="lazy" decoding="async" />
            <figcaption>Unity capture · M1.6 P2 ground plan</figcaption>
          </figure>
          <a className="text-link" href={`${GITHUB_URL}/blob/main/docs/ROADMAP.md`}>View the repository roadmap</a>
        </div>
        <ol className="timeline">
          {MILESTONES.map(({ id, title, status, description }) => (
            <li key={id} className="timeline-item" data-status={status}>
              <span className="timeline-node" aria-hidden="true" />
              <div className="timeline-meta"><span>{id}</span><span className="timeline-status">{status}</span></div>
              <h3>{title}</h3>
              <p className="body-copy">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="team" className="section section-tinted" aria-labelledby="team-title">
      <div className="shell">
        <div className="section-intro editorial-grid">
          <div><p className="eyebrow"><span />The Team</p><h2 id="team-title">Built at <em>IIT Guwahati.</em></h2></div>
          <p className="body-copy">{GAME_TITLE} is built by three undergraduates at the {INSTITUTE} (IITG).</p>
        </div>
        <div className="team-grid">
          {TEAM.map(({ initials, name, role, affiliation }) => (
            <article className="team-card" key={name}>
              <span className="monogram" aria-hidden="true">{initials}</span>
              <div><h3>{name}</h3><p>{role}</p><p className="team-affiliation">{affiliation}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlaytestForm() {
  const [draftOpened, setDraftOpened] = useState(false)

  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const name = String(fields.get('name')).trim()
    const email = String(fields.get('email')).trim()
    const message = String(fields.get('message')).trim()
    const body = [`Hello ${STUDIO_NAME},`, '', `I’m interested in a ${GAME_TITLE} playtest.`, '', `Name: ${name}`, `Email: ${email}`]
    if (message) body.push('', message)
    const subject = encodeURIComponent(`${GAME_TITLE} playtest interest`)
    const encodedBody = encodeURIComponent(body.join('\r\n'))

    setDraftOpened(true)
    window.location.href = `mailto:${PRIMARY_EMAIL}?subject=${subject}&body=${encodedBody}`
  }

  return (
    <form className="playtest-form" action={`mailto:${PRIMARY_EMAIL}`} method="post" encType="text/plain" onSubmit={openDraft} aria-labelledby="form-title">
      <h3 id="form-title">Playtest interest</h3>
      <p id="form-help" className="body-copy">This opens a draft in your email app for you to review and send.</p>
      <div className="form-row">
        <label>Your name<input name="name" autoComplete="name" maxLength={80} pattern={'.*\\S.*'} required /></label>
        <label>Email address<input type="email" name="email" autoComplete="email" maxLength={160} required /></label>
      </div>
      <label>Message <span className="optional">(optional)</span><textarea name="message" rows={3} maxLength={400} /></label>
      <button type="submit" className="button button-primary" aria-describedby="form-help"><Icon name="mail" size={18} />Open Email Draft</button>
      <p className="form-feedback" role="status" hidden={!draftOpened}>Look for a draft in your email app. You can also email <a href={`mailto:${PRIMARY_EMAIL}`}>{PRIMARY_EMAIL}</a> directly.</p>
      <noscript><p className="form-feedback">Email <a href={`mailto:${PRIMARY_EMAIL}`}>{PRIMARY_EMAIL}</a> directly to register your interest.</p></noscript>
    </form>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="shell editorial-grid contact-grid">
        <div>
          <p className="eyebrow"><span />Playtest &amp; Contact</p>
          <h2 id="contact-title">Would you go <em>inside?</em></h2>
          <p className="body-copy section-lead">Tell us if you’d like to join a future playtest. You can also reach the team directly about the game or its development.</p>
          <ul className="contact-links">
            <li><Icon name="mail" /><a href={`mailto:${PRIMARY_EMAIL}`}>{PRIMARY_EMAIL}</a></li>
            <li><Icon name="mail" /><a href={`mailto:${SECONDARY_EMAIL}`}>{SECONDARY_EMAIL}</a></li>
            <li><Icon name="github" /><a href={GITHUB_URL}>{GITHUB_URL.replace(/^https:\/\//, '')}</a></li>
            <li><Icon name="pin" /><span>{LOCATION}</span></li>
          </ul>
        </div>
        <PlaytestForm />
      </div>
    </section>
  )
}

export function App({ route }: { route: Route }) {
  const isHome = route === 'home'

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header isHome={isHome} />
      <main id="main" tabIndex={-1}>
        {isHome && <><Hero /><Game /><Village /><Engineering /><Roadmap /><Team /><Contact /></>}
        {(route === 'privacy' || route === 'terms') && <LegalPage route={route} />}
        {route === 'missing' && <div className="shell legal-page"><h1>Page not found.</h1><a className="text-link" href={SITE_BASE}>Return to Hollowmere</a></div>}
      </main>
      <Footer />
    </>
  )
}
