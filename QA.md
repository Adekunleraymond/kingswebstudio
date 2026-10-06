# Release checks — 6 October 2026

## Content and brand

- Charcoal, violet and white throughout the main website.
- Existing crown/KW identity preserved and recoloured.
- All twelve requested areas present, including the feature strip, ten services, process, packages, FAQ and contact.
- Basic ₦50,000, Professional ₦100,000, Premium starting from ₦150,000.
- Package value is described through outcomes and capabilities, without page-count pricing.
- Six concept pages clearly labelled as fictional demonstrations.
- No fake client claims, reviews, customer statistics, social links or social-media-management service.
- Studio contact details checked against the supplied brief.

## Layout checks

Main website tested in the browser at widths of 320, 360, 390, 520, 768, 900, 1024, 1440 and 1920 pixels.

All six concept pages tested at 390px. Main site checked with text enlarged to 200% at 320, 390, 768, 1024 and 1440px. No horizontal overflow or failed images in the completed checks.

## Interactions

- All seven portfolio filter states checked; All shows six concepts, each category shows one.
- All nine native FAQ disclosures open and close with their answers visible.
- Mobile navigation checked with pointer and keyboard interaction, including Escape.
- Pricing selection prepares the matching package and budget in the inquiry form.
- Empty required fields block inquiry preparation.
- A filled sample inquiry prepares all seven visible fields, optional package interest and project description.
- WhatsApp URL encodes the complete message and uses +2349030969700.
- Email URL encodes the subject/body and uses kingswebsiteexpert@gmail.com.
- Unicode, ampersands, plus signs and line breaks checked in the prepared message.
- Editing returns to the form with the visitor’s details retained.
- Copy action provides an accessible success state or a manual-copy fallback.

No test inquiry was sent to the studio.

## Accessibility and SEO

- One H1 per page; semantic page regions, descriptive headings and language metadata.
- Explicit form labels, visible focus indicators, a skip link and native validation.
- Navigation aria-expanded state and aria-controls; filter aria-pressed states; live status updates.
- Reduced-motion preferences respected; core content and direct contact links available without JavaScript.
- Informative hero alt text, decorative logo alt text within named home links.
- Main text and CTA palette reviewed for contrast.
- Homepage title, description, canonical and Open Graph metadata.
- Organization structured data with accurate public contact details and package information.
- Site-specific favicon, touch icon, robots file, sitemap and custom 404.
- Concepts marked noindex to keep fictional demonstration businesses out of search listings.
- All static internal links and anchors across nine HTML pages checked.

## Performance

No JavaScript framework or runtime dependencies. Fonts hosted locally. Hero WebP is approximately 35 KB at 1200px and 14 KB at 640px, with responsive selection, reserved dimensions and high fetch priority.

These are development checks, not a formal WCAG certification or a guarantee of search rankings.

## GitHub upload correction — 6 October 2026

The manual upload placed folder contents at the repository root and overwrote the homepage with the Orbit concept. This edition uses unique root filenames for all website files. Asset URLs, concept links, return links, font URLs, development commands and documentation were updated together. Visual design, business content and inquiry behavior were preserved.

- Static checks pass across all nine HTML pages with no broken local links or anchors.
- The corrected homepage loads its local fonts and all images.
- Rechecked all nine viewport widths listed above, all six concept pages at 390px, and all five enlarged-text widths; no horizontal overflow or failed homepage images.
- Mobile menu opening, navigation closure, Escape, focus restoration, focus containment, image alt attributes and form labels pass.
- Followed the homepage → Monarch concept → homepage portfolio route successfully.
- Prepared a filled sample inquiry, verified the correct WhatsApp and email destinations and business details, and confirmed Edit details retains the supplied name. No message was sent.
- Browser console entries were from the browser extension; no application error was observed.

Validation used the managed local preview in Chrome. The standalone Playwright command was unavailable; the existing browser runtime was used without adding dependencies. The repaired live deployment still needs verification after the user uploads and commits this package.
