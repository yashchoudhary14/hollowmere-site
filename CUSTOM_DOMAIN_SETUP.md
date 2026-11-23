# Hollowmere custom domain and studio email

This guide uses `hollowmere.games` as an example. You can substitute a domain you own, such as `hollowmere.dev`. Choose one canonical web address and one email provider for the domain.

## On Vercel

1. In the Hollowmere project, open **Settings → Domains** and add `hollowmere.games`. Add `www.hollowmere.games` if you want it to redirect to the apex domain.
2. Add the DNS records Vercel shows at your authoritative DNS provider. Keep existing mail and verification records. If Cloudflare asks about proxying the web records, use **DNS only** while the host verifies the domain.
3. Wait for verification and HTTPS. Set `SITE_URL=https://hollowmere.games` in the Vercel production environment, leave `SITE_BASE` unset, and redeploy. Check `/`, `/privacy/`, and `/terms/` over HTTPS.

[Vercel custom domain instructions](https://vercel.com/docs/domains/set-up-custom-domain)

## On GitHub Pages

1. In your GitHub account’s Pages settings, add and verify the domain using the TXT record GitHub provides. Keep the verification record in DNS.
2. In the website repository, open **Settings → Pages**, use **GitHub Actions** as the source, and save `hollowmere.games` under **Custom domain**.
3. At your DNS provider, add the current GitHub Pages apex records listed in GitHub’s documentation. If you also use `www`, add a `CNAME` for `www` pointing to `yashchoudhary14.github.io`. Use DNS-only records if you manage DNS through Cloudflare.
4. Once GitHub completes the DNS check, select **Enforce HTTPS** and rerun the deployment workflow on `main`. The workflow gets the new root base and origin from Pages. Check `/`, `/privacy/`, and `/terms/` on the custom domain.

[GitHub Pages DNS and HTTPS instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## Create `founders@hollowmere.games`

### Cloudflare Email Routing for incoming mail

1. Add the domain to Cloudflare and switch to the assigned Cloudflare nameservers if needed. Copy existing DNS records before changing nameservers.
2. Open **Compute → Email Service → Email Routing**. Onboard the domain and review its MX and TXT records. A domain already receiving mail elsewhere needs a planned MX cutover.
3. Verify a destination inbox the team controls, then create a forwarding rule from `founders@hollowmere.games` to that inbox. Send a test from a separate address and confirm delivery.
4. Email Routing forwards incoming mail. For applications that require sending or replying from `founders@hollowmere.games`, use a mailbox provider such as Zoho Mail.

[Cloudflare routing setup](https://developers.cloudflare.com/email-service/get-started/route-emails/) · [Cloudflare pricing](https://developers.cloudflare.com/email-service/platform/pricing/)

### Zoho Mail Free for a domain mailbox

1. Check that the Free plan is offered at signup in your data center. Where available, it hosts one domain and up to five users.
2. Add the domain in Zoho Mail Admin Console and verify it with the supplied TXT or CNAME record. Create the `founders` mailbox.
3. Add the MX, SPF, and DKIM records shown in your Zoho Admin Console. Use the values for your data center, keep one SPF policy, and use only the chosen mail provider’s MX records.
4. Test receiving and replying as `founders@hollowmere.games` before using it on an application.

[Zoho Mail plan availability](https://www.zoho.com/mail/zohomail-pricing.html) · [Zoho domain verification](https://www.zoho.com/mail/help/adminconsole/domain-verification.html)

## Switch the site contact

Set `PRIMARY_EMAIL` in `src/config.ts` to `founders@hollowmere.games` and redeploy. Test the homepage contact link, the playtest draft recipient, and both legal pages. Use the same working site URL and contact address on credit applications and check each program’s current requirements.
