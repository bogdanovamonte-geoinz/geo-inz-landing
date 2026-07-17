# GeoInženiring landing page

Light, conversion-focused landing page for private home builders and residential architects. The visual system combines GeoInženiring's official green brand, real fieldwork photography and the technical annotation language from the Career Foundations presentation.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Deployment

The site is dependency-free and can be deployed as a static project on Vercel. The form opens a prefilled email to `dir@geo-inz.si`; connect a server-side form endpoint before using it as a database-backed lead form.

## Content notes

- `assets/logo-geoinzeniring.png` is the official logo downloaded from geo-inz.si.
- Replace `assets/hero-fieldwork.webp` with an approved original company photo when one is available.
- Confirm the displayed telephone number before production launch.
- The contact form opens a prepared email and does not store data.
