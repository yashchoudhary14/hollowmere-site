# Hollowmere Studio website

The public home for Hollowmere, a co-op psychological horror game in development at IIT Guwahati. This Vite, React, TypeScript, and Tailwind project builds to a static `dist/` directory. The build renders a separate HTML file for Home, Privacy, Terms, and the 404 page. The playtest form uses the visitor’s email client.

## Local development

Use Node.js 24 or later.

```powershell
npm ci
npm run dev
npx tsc --noEmit
npm run build
npm run preview
```

Update studio details, team roles, milestones, and test counts in `src/config.ts`. Legal copy lives in `src/LegalPage.tsx`. The three Google Fonts are bundled locally.

## Game references and media

The match sequence comes from `docs/DESIGN.md` in the game repository. The village explorer uses a public subset of `docs/design/village.json` in `src/village-map.json`. When the ground plan changes, update those coordinates and the matching house studies. The explorer covers all 15 houses without giving away their puzzles.

The `public/media/houses/` WebPs are exported from the game's front massing studies. `prototype-hearth.webp` and `village-layout.webp` come from the Unity batch captures `m15/single_night_interior.png` and `v2_Aerial.png`. `village-gate.webp`, its small variant, and the social card use concept art made for the website with built-in ImageGen.

<details>
<summary>Village gate concept art prompt</summary>

> Use case: stylized-concept. Create one original extra-wide landscape cinematic key-art background for Hollowmere, an indie first-person psychological co-op horror game set in a walled late-1970s rural village. At blue hour, from cobblestone-road height, look into an old stone village framed by the looming dark masonry of a gate. The right two-thirds contain a wet, crooked street winding past closely packed old English stone and red brick cottages, one or two small distinctly warm amber-lit windows, telephone lines on wooden poles, late autumn, ribbons of low ground fog and a weathered chapel/bell tower behind the rooftops. An old unlit street lantern or gate ironwork can be an understated foreground anchor. Sky is cloudy cool slate, fog low and dimensional, physically believable slate roofs, moss, wet pavement and softened film grain. Strong depth and an arresting silhouette. Framing should feel like a high-end indie folk-horror game's cover still shot on 35mm, quietly foreboding and real. The left 40 percent is intentionally a darker, low-detail area of stone shadow and fog with very little highlight for light text added on the website. Important cottages, fog and chapel should also read through a center-right mobile crop. Palette blue-grey charcoal, tarnished green-black, a few soft warm lantern highlights. Distinctly rural and pre-digital. No people, no visible creature, no gore, no readable words, no lettering, no logos, no overlaid graphics, no watermark, no title. Do not make it monochrome or so dark that buildings are unreadable.

</details>

`SITE_BASE` defaults to `/`. For a GitHub Pages project build, use `/hollowmere-site/`. `SITE_URL` is the public origin, such as `https://yashchoudhary14.github.io`. It supplies the canonical and social image URLs. The Pages workflow reads both settings from GitHub, and Vercel supplies its project production hostname when `SITE_URL` is unset.

## GitHub Pages

Push this directory as `main` to the standalone public `yashchoudhary14/hollowmere-site` repository. Set `origin` to `https://github.com/yashchoudhary14/hollowmere-site.git`.

1. In the website repository, check under **Settings → Pages** that **Source** is **GitHub Actions**.
2. In **Actions**, select **Deploy Hollowmere to GitHub Pages** and run it on `main` for the first deployment if the first push happened before Pages was enabled. Later pushes to `main` trigger it automatically.
3. Open the URL reported by the `github-pages` deployment. The expected default is `https://yashchoudhary14.github.io/hollowmere-site/`.

See the [GitHub Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Vercel

From this directory, run the following two commands. The second prints the production URL. Vercel uses the build command in `package.json` and serves clean routes from `dist/`.

```powershell
npx vercel login
npx vercel --prod --yes
```

See the [Vercel deployment guide](https://vercel.com/docs/deployments) and [custom domain and email guide](CUSTOM_DOMAIN_SETUP.md).
