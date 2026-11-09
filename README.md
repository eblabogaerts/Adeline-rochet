# Adeline Rochet · landingspagina

Vibe-coded met Claude (Claude Code) op 8 november 2026, voor GitHub Pages. Copy uit `04_copy/landingpage_copy/landingpage_copy.md`.

## Inhoud van de map
| Bestand | Wat |
|---|---|
| `index.html` | De pagina: navigatie, hero, merkverhaal, collectie (4 geuren), beeldband met citaat, nieuwsbrief met formulier, privacyverklaring, footer. |
| `style.css` | Huisstijl: olijfgoud #998648, ivoor #F7F4ED, linnen #DCD4C6, inkt #191715, brons #50462B. Bricolage Grotesque en Cormorant Garamond Italic (Google Fonts). Responsive. |
| `script.js` | Zachte verschijning bij scrollen, controle van het formulier en versturen naar MailerLite. |
| `images/` | 9 beelden voor de pagina (hero, verhaal, 4 geuren, beeldband, logo's, favicon). |
| `email/` | De 6 afbeeldingen voor de MailerLite-mails, zodat die online staan. |

## Online zetten op GitHub Pages
1. Maak op github.com een nieuwe **Public** repo met de naam `adeline-rochet`.
2. Klik **Add file > Upload files** en sleep de **inhoud** van deze map erin (`index.html`, `style.css`, `script.js`, `images`, `email`). `index.html` moet bovenaan in de repo staan, niet in een submap.
3. Klik **Commit changes**.
4. **Settings > Pages**: Source "Deploy from a branch", Branch `main` en `/ (root)`, **Save**.
5. Na 1 à 2 minuten staat de pagina op `https://GEBRUIKERSNAAM.github.io/adeline-rochet/`.

## Formulier koppelen aan MailerLite
1. In MailerLite: **Forms > Embedded forms > Create** met de velden Naam (name), E-mail en een GDPR/opt-in-vakje. Zet dubbele opt-in aan.
2. Open het formulier > **Embed form** > tabblad **HTML code**. Zoek de regel `action="https://assets.mailerlite.com/jsonp/1234567/forms/9876543210/subscribe"`.
3. Vul het eerste getal in als `MAILERLITE_ACCOUNT_ID` en het tweede als `MAILERLITE_FORM_ID`, bovenaan in `script.js`.
4. Upload `script.js` opnieuw naar GitHub en test met een fictief adres.

Zolang de twee ID's leeg zijn, werkt het formulier in demomodus: het toont de bedankmelding, maar verstuurt niets.

## Beelden
- Hero: `02_branding/vanilla-variaties/v3_juist-label/02_fles-schuin-lichtspel` (bijgesneden 2:3)
- Verhaal: `05_video/keyframes/05_finale_4-flessen_16x9`
- Collectie: `05_video/bron/0x_<geur>_frontaal-long-shot` (bijgesneden 4:5)
- Beeldband: `02_branding/vanilla-variaties/v3_juist-label/05_bloem-close-up`
