# Stordalsstølen 43 - GitHub Pages

Gjestehåndbok for privat hytte i Høyanger Kommune, Norge.

## Struktur

Dette er en Jekyll-basert nettside som er konfigurert for GitHub Pages. Siden støtter fire språk:
- **Norsk** (`/no.html`)
- **English** (`/en.html`)
- **Deutsch** (`/de.html`)
- **Français** (`/fr.html`)

## Lokal utvikling

For å kjøre siden lokalt med Jekyll:

1. Installer Ruby og Bundler
2. Installer avhengigheter:
   ```bash
   bundle install
   ```
3. Start Jekyll server:
   ```bash
   bundle exec jekyll serve
   ```
4. Åpne nettleseren på `http://localhost:4000`

## GitHub Pages

Siden vil automatisk bygges og publiseres når du pusher til `main`-branchen i GitHub-repositoryet.

## Filer

- `_config.yml` - Jekyll konfigurasjon
- `_layouts/default.html` - Hovedlayout med CSS
- `index.html` - Velkomstside
- `no.html`, `en.html`, `de.html` - Språkspesifikke sider
- `images/` - Mappe for bilder (kan legges til ved behov)
