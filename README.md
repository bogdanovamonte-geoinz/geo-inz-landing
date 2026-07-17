# GeoInženiring landing page

Redesign based on the 2026 digital vision: organic minimalism, real fieldwork visual, thumb-zone mobile actions, an interactive report explainer, scope calculator and coverage map.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Deployment

The site is dependency-free and can be deployed as a static project on Vercel. The form opens a prefilled email to `dir@geo-inz.si`; connect a server-side form endpoint before using it as a database-backed lead form.

## Content notes

- Replace `assets/hero-fieldwork.webp` with an approved original company photo when one is available.
- Confirm telephone and WhatsApp numbers before production launch.
- The calculator estimates the likely research scope, not a final price.
