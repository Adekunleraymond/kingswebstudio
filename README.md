# King’s Web Studio

A complete static website for King’s Web Studio. Built with semantic HTML, CSS and vanilla JavaScript; no production dependencies or build step.

## Live hosting

Current: https://adekunleraymond.github.io/kingswebstudio/

GitHub Pages publishes the `main` branch from the repository root. Keep `.nojekyll` so all public assets are served as uploaded.

## Local preview

Requires Node.js 18 or newer.

```sh
npm run dev
```

Open the address printed by the server. `npm run check` verifies internal links, IDs, metadata, JavaScript syntax, required assets, contact details and the absence of social links.

## Files to edit

- `index.html`: homepage copy, services, packages, FAQ, contact fields and SEO metadata.
- `styles.css`: brand tokens, layouts, responsive rules and reduced-motion styles.
- `script.js`: mobile navigation, portfolio filters, project inquiry preparation and copy behavior.
- `concepts/*/index.html`: six clearly labelled fictional demonstration projects.
- `concepts/concepts.css`: shared concept-page styling.
- `privacy.html`: a concise explanation of the contact experience.
- `assets/`: locally hosted fonts and compressed imagery.
- `robots.txt` and `sitemap.xml`: search indexing essentials.
- `404.html`: custom error page.
- `scripts/dev-server.mjs` and `scripts/check-site.mjs`: development helpers.

## Contact flow

The form works without a backend or a paid submission service. Required fields use native validation. Visitors review a prepared brief, then choose WhatsApp, email or Copy message.

WhatsApp and email links are generated locally. The visitor must send the message in their chosen app. No details are automatically sent, stored in a database, or saved to browser storage. With JavaScript disabled, direct WhatsApp and email links remain available.

Studio WhatsApp: 09030969700 / +2349030969700.
Studio email: kingswebsiteexpert@gmail.com.

If these details change, update both `index.html` and `script.js`, plus the structured data and privacy page. Run the checks afterward.

## Moving to kingswebstudio.com

Do this only after the domain is owned, its DNS is ready, and you intend to connect it. No domain purchase or DNS change was made for this release.

1. Update the canonical URLs, Open Graph URL and Organization structured-data URLs in `index.html` to `https://kingswebstudio.com/`.
2. Update the privacy canonical URL, sitemap URLs, robots Sitemap line and the 404 home link.
3. Connect the custom domain in GitHub Pages settings and configure its DNS using GitHub’s current instructions. Keep HTTPS enabled. GitHub may create a `CNAME` file for the domain.
4. Check the new domain, its HTTPS certificate, assets, concepts, inquiry links and sitemap before sharing it.
5. Submit the new sitemap through your verified search-console account if you use one.

All site assets and internal navigation use relative links and support both the current project path and a domain root.

GitHub Pages project sites cannot control the host-level `/robots.txt`. The included file becomes a normal root robots file when the custom domain is connected. The current site remains indexable.

## Design assets and attribution

The existing crown/KW SVG was retained and recoloured to match the violet brand. The laptop-and-phone hero was generated for this website, then compressed to 1200px and 640px WebP versions.

Manrope is distributed under the SIL Open Font License. Its full license is included in `assets/Manrope-OFL.txt`. Fonts and imagery are hosted locally; the page makes no third-party font or image requests.

## Release validation

See `QA.md` for the checks completed for the October 2026 release.

