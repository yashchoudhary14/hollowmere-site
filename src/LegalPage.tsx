import { GAME_TITLE, GITHUB_URL, LEGAL_UPDATED, PRIMARY_EMAIL, SITE_BASE, STUDIO_NAME } from './config'

function Privacy() {
  return (
    <>
      <p>This policy covers the {GAME_TITLE} website and messages you send to {STUDIO_NAME} through its contact links or playtest interest form.</p>
      <h2>Website visits</h2>
      <p>We use no website analytics, tracking pixels, advertising cookies, or local storage. The fonts and artwork are served with the site. The hosting provider may process request information, such as IP addresses and browser details, to deliver, secure, and operate the website. Links to other services, including GitHub, are subject to those services’ privacy policies.</p>
      <h2>Contact and playtest emails</h2>
      <p>The playtest form creates a draft in your email app. The website receives no form submission. If you send the draft, we receive the sender address, the name and message you provide, and normal email metadata. Our email providers handle the message to deliver and store it.</p>
      <p>We use the information to reply and coordinate playtests if you express interest. We keep correspondence as needed for those purposes and do not sell it or add you to a marketing list.</p>
      <h2>Your choices</h2>
      <p>You can ask us to withdraw your playtest interest, correct or delete the details you shared, or answer questions about this policy. Email <a href={`mailto:${PRIMARY_EMAIL}`}>{PRIMARY_EMAIL}</a>.</p>
    </>
  )
}

function Terms() {
  return (
    <>
      <p>These terms apply to the {GAME_TITLE} website operated by {STUDIO_NAME}. You may use the site to learn about the game and contact the team.</p>
      <h2>Development and playtests</h2>
      <p>{GAME_TITLE} is in active development. Features, milestones, builds, and playtest plans may change. An expression of interest does not guarantee an invitation. If a playtest has additional rules, we’ll share them with invitees before participation.</p>
      <h2>Game, website, and source code</h2>
      <p>{STUDIO_NAME} and its contributors retain the rights they hold in the game, its name, original artwork, and website content. Third-party materials remain subject to their own terms.</p>
      <p>Any open-source code is governed by the license supplied with it. The <a href={GITHUB_URL}>game repository</a> contains any applicable notices. Public access to source code does not grant a general license to copy or redistribute the game, its assets, or code without a license or other permission.</p>
      <h2>Site use and contact</h2>
      <p>Please use the site and contact channels lawfully and avoid spam, impersonation, or interference with the site. The website is provided as available. For questions about these terms or permission to reuse materials, email <a href={`mailto:${PRIMARY_EMAIL}`}>{PRIMARY_EMAIL}</a>.</p>
    </>
  )
}

export function LegalPage({ route }: { route: 'privacy' | 'terms' }) {
  const isPrivacy = route === 'privacy'

  return (
    <article className="shell legal-page">
      <a className="text-link legal-home" href={SITE_BASE}>Back to {GAME_TITLE}</a>
      <p className="eyebrow">{STUDIO_NAME}</p>
      <h1>{isPrivacy ? 'Privacy Policy' : 'Terms of Use'}</h1>
      <p className="legal-date">Updated <time dateTime={LEGAL_UPDATED.dateTime}>{LEGAL_UPDATED.label}</time></p>
      <div className="legal-body">{isPrivacy ? <Privacy /> : <Terms />}</div>
    </article>
  )
}
