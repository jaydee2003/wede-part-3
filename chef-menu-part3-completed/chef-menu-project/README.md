# Chef's Table — Menu Studio (Part 3)

A responsive restaurant menu manager built with semantic HTML5, external CSS and vanilla JavaScript. Part 3 extends the Part 2 Chef's Table project with richer interaction, dynamic content, form validation and on-page SEO.

## Project structure

- `web/` — complete browser-based website, stylesheet, JavaScript, SEO files and favicon.
- `react-native/App.js` — original React Native implementation supplied with Part 2. The Part 3 enhancements are implemented in the web version because the assignment brief focuses on the website.

## Run locally

1. Download or clone this repository.
2. Open `web/index.html` in a modern browser. For the best experience, use VS Code Live Server or another local static server.
3. Internet access is needed for Google Fonts, Leaflet map tiles and the sample gallery/hero photographs. The menu manager itself runs locally.

## Part 3 functionality

### JavaScript enhancements
- Interactive responsive navigation menu with expanded-state accessibility attributes.
- Tabbed menu views: All dishes, Featured and Manage menu.
- Accordion panels for menu guidance and FAQs.
- Interactive Leaflet map centred on Johannesburg, using OpenStreetMap tiles.
- CSS entrance animations, hover transitions and reduced-motion support.
- Click-to-expand gallery lightbox with close controls.
- Dynamic menu rendering, live search, course filtering and sorting by name or price.
- Add, edit, delete and feature menu items.
- Menu items persist in browser `localStorage` between visits.
- Enquiry form validates name, email and message and asynchronously saves the enquiry to browser storage for this front-end demonstration.

### Forms and validation
- HTML5 required, type, min, max, minlength and maxlength constraints.
- JavaScript checks form validity and displays clear status messages.
- Accessible labels and live status regions are provided.
- **Backend note:** The enquiry form currently demonstrates asynchronous client-side storage. It does not send email or store submissions on a remote server. Before a real deployment, connect a form service or server endpoint and replace the local-storage handler in `web/script.js` with a `fetch()` POST request.

### SEO and accessibility
- Descriptive page title, meta description, keywords, author, robots and theme metadata.
- Open Graph title and description for social sharing.
- Semantic page landmarks, a single primary H1, logical section headings, descriptive image alt text and accessible form labels.
- Descriptive navigation anchors, mobile-first breakpoints, responsive images and lazy loading for gallery images.
- `robots.txt`, `sitemap.xml` and a simple SVG favicon.
- Keyboard-visible focus states, skip link, ARIA labels/live regions and reduced-motion preference support.

### Location details to customise
The sample map and address use central Johannesburg. Change the marker coordinates, map centre, visible address and OpenStreetMap directions URL in `web/script.js` and `web/index.html` to the actual restaurant location before publishing. The GitHub Pages sitemap URL assumes the repository is published at `https://jaydee2003.github.io/wede-part-2/`; update it if the deployment URL differs.

## Part 2 feedback addressed

| Lecturer feedback | Part 3 response |
|---|---|
| Changelog present but lacked detail (5/10) | This README records the development work, purpose of each change, affected files and known deployment limitations. |
| Pseudo-classes could be improved (7/10) | Added consistent hover and keyboard focus styles for navigation, buttons, inputs, tabs, cards and gallery items. |
| Navigation needed small responsive improvements (4/5) | Added a collapsible mobile navigation menu with `aria-expanded` state and close-on-navigation behaviour. |
| Images needed small responsive improvements (4/5) | Gallery images use responsive grid layouts, `object-fit: cover`, descriptive alt text and lazy loading. |
| Git commits lacked detail (4/5) | Suggested descriptive commit messages are included below. Actual commits must be made in the Git repository by the project owner. |
| Desktop styling, typography, layout, colour and responsive breakpoints scored highly | Preserved the external stylesheet approach and continued the consistent design system while extending the layout. |
| README and references scored highly | Retained project documentation and expanded it with implementation notes, testing and references. |

## Changelog

### Version 1.1.0 — Part 3 functionality and SEO enhancement
- Reworked `web/index.html` into a complete restaurant menu experience with semantic sections for the hero, menu, management form, gallery, location, contact and FAQs.
- Expanded `web/style.css` with a cohesive responsive design system, accessible focus states, card hover transitions, responsive gallery/map/form layouts and a reduced-motion media query.
- Rebuilt `web/script.js` to support dynamic menu rendering, search, course filtering, sorting, featured tabs, edit/delete controls and local persistence.
- Added accessible accordion interactions and a mobile navigation toggle that updates its ARIA expanded state.
- Added a Leaflet map with OpenStreetMap tiles and a Johannesburg sample marker. The sample location is clearly identified for replacement with the restaurant's real address.
- Added a gallery lightbox using the native HTML dialog element and click/keyboard-accessible gallery buttons.
- Added an enquiry form with native HTML5 constraints, JavaScript validation, status feedback and asynchronous local browser storage. A remote form endpoint is still required for real email delivery.
- Improved SEO with a descriptive title, meta description, keyword and author metadata, robots directives, Open Graph metadata, descriptive image alternatives, `robots.txt`, `sitemap.xml` and an SVG favicon.
- Added sample menu entries so the menu is populated on a first visit; user-created items are saved in `localStorage`.

### Version 1.0.0 — Part 2 baseline
- Created the original Chef's Table menu manager interface.
- Added a menu item form with dish name, course, description and price fields.
- Added required-field and positive-price validation.
- Added dynamic menu rendering and local-storage persistence.
- Created an external stylesheet and responsive desktop, tablet and mobile layouts.
- Added the original React Native implementation.

## Testing checklist

- [ ] Open `web/index.html` and confirm the sample menu appears.
- [ ] Add a dish with valid values and confirm the count and menu update.
- [ ] Submit the menu form empty and confirm validation feedback.
- [ ] Search by dish name or description and filter by course.
- [ ] Sort by name and by ascending/descending price.
- [ ] Use Featured and Manage menu tabs; feature, edit and delete a dish.
- [ ] Refresh the browser and confirm menu items persist.
- [ ] Open and close each accordion and the gallery lightbox.
- [ ] Test the mobile navigation on a narrow screen.
- [ ] Submit a valid enquiry and confirm the demo success message appears.
- [ ] Confirm the map loads when internet access is available.
- [ ] Test desktop, tablet and mobile widths and keyboard navigation.
- [ ] Validate the deployed page title, description, `robots.txt` and sitemap URL.

## Suggested descriptive Git commits

Run these commands from the repository root after reviewing the changed files:

```bash
git add web/index.html web/style.css web/script.js
git commit -m "Add interactive menu search filters and management tools"
git add web/robots.txt web/sitemap.xml web/assets/favicon.svg
git commit -m "Improve on-page SEO metadata and crawler resources"
git add README.md
git commit -m "Document Part 3 enhancements and Part 2 feedback fixes"
git push origin main
```

If the default branch is not `main`, replace it with the actual branch name.

## Free deployment (GitHub Pages)

1. Push the updated project to the GitHub repository.
2. Open repository **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` if the website is moved to the repository root, or use the repository's supported publishing setup. Since the site is in `web/`, the simplest option is to configure Pages to publish from a dedicated deployment branch/root folder or copy the contents of `web/` to the root before deployment.
5. Save, wait for the deployment workflow to finish and open the published URL.
6. Update the sitemap URL if the final published URL differs.

## Harvard-style references

Leaflet (n.d.) *Leaflet — a JavaScript library for interactive maps*. Available at: https://leafletjs.com/ (Accessed: 2 November 2026).

MDN Web Docs (n.d.) *Constraint validation*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation (Accessed: 2 November 2026).

MDN Web Docs (n.d.) *Using the Web Storage API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API (Accessed: 2 November 2026).

OpenStreetMap (n.d.) *Copyright and license*. Available at: https://www.openstreetmap.org/copyright (Accessed: 2 November 2026).

Google Search Central (n.d.) *SEO starter guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 2 November 2026).
