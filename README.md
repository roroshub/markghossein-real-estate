# SARO, sarodev.com

The website of SARO Website Development, an Ottawa web studio. A single page
experience with a Mediterranean, old world art direction: travertine and
parchment tones, Aegean blue, terracotta, antique gold, classical serif
typography, Greek meander ornaments, and smooth scroll driven animation.

## Stack

- Next.js 15 (App Router) with React 19
- Tailwind CSS 4
- Lenis smooth scrolling
- Resend for the contact form
- Deployed to Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)

## Local development

```bash
npm install
npm run dev
```

## Deploying to Cloudflare

```bash
npm run deploy
```

This runs `opennextjs-cloudflare build && opennextjs-cloudflare deploy` using
`wrangler.jsonc`. Log in first with `npx wrangler login` (or set
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`).

To attach the production domain after the first deploy, uncomment the
`routes` block in `wrangler.jsonc` so `sarodev.com` and `www.sarodev.com`
point at the worker.

## Contact form email

The form posts to `/api/contact`, which sends mail with Resend. Configure
these as Worker secrets (or in `.env.local` for development):

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_TO_EMAIL
npx wrangler secret put CONTACT_FROM_EMAIL   # optional, a verified sender
```

Until the secrets are set, the form politely tells visitors to call instead.

## Content

All copy lives in `lib/site.ts`: services, selected works, process steps,
testimonials, stats, and contact details. Add a new portfolio piece by adding
an entry to `works`.
