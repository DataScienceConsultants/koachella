# Koachella Nails & Salon — Website v1

## Replace these repository files

- `index.html`
- `styles.css`
- `script.js`
- everything inside `assets/`

## Connect the live business details

Open `script.js` and edit the `SITE_CONFIG` object at the top:

- `bookingUrl`: direct URL to the current booking platform
- `whatsappNumber`: international number, digits only
- `phoneDisplay`: formatted phone shown to visitors
- `phoneHref`: telephone link with country code
- `instagramHandle` and `instagramUrl`
- `address` and `mapsUrl`

No other code changes are required for those connections.

## Local preview

From the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
