# Autentiseringssystem - Konfigurasjonsguide

Dette dokumentet forklarer hvordan du konfigurerer innloggingssystemet for gjestehåndboken.

## Standard innloggingsinformasjon

**Brukernavn:** `guest`  
**Passord:** `stordals2024`

## Endre passord

For å endre passordet, rediger filen `assets/js/auth.js` og endre følgende linje:

```javascript
const AUTH_CONFIG = {
    username: 'guest',
    password: 'stordals2024', // Endre dette passordet
    storageKey: 'stordals_authenticated',
    sessionTimeout: 7 * 24 * 60 * 60 * 1000 // 7 dager
};
```

## Hvordan det fungerer

1. **Forsiden (index.html)** er offentlig tilgjengelig - alle kan se booking-knapp, værmelding og bilder
2. **Språksidene (no.html, en.html, de.html, fr.html)** er beskyttet og krever innlogging
3. Innlogging lagres i nettleserens localStorage og varer i 7 dager
4. Etter innlogging får brukeren tilgang til alle språksidene

## Sikkerhet

⚠️ **Viktig:** Dette er et enkelt klientbasert innloggingssystem. Det gir ikke fullstendig sikkerhet, men fungerer godt for å begrense tilgangen til gjestehåndboken for de fleste brukere.

- Passordet er synlig i JavaScript-koden (men ikke direkte synlig for vanlige brukere)
- For sterkere sikkerhet, vurder å bruke GitHub Pages med server-side autentisering eller en tredjepartstjeneste

## Dele innloggingsinformasjon

Du kan dele brukernavn og passord med betalende gjester via:
- E-post
- Bookingbekreftelse
- Direkte melding

Gjester kan logge inn én gang, og vil være innlogget i 7 dager på samme enhet.

