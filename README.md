# Atticus Blum portfolio

Plain HTML, CSS and JS. No build step. All words, links and image paths live in `content.js`.

## Change text
Open `content.js`, edit the words between quotes, save. Search for `TODO` to find placeholder text.

## Swap the hero photo
1. Drop the new photo into `assets/` as `hero.jpg` (about 1600 px wide).
2. In `content.js` set `hero.webp` to `""` (or make a new `hero.webp`).
3. Adjust `hero.focus` ("x% y%") so the subject stays in view at phone size. Keep the sky or a calm area at the top for the text.

## Add a project
1. Drop the image(s) into `assets/design/`.
2. In `content.js`, copy one block inside `projects.items` and change `title`, `description`, `image`, `focus`.
3. `featured: true` puts it under Featured. Extra images go in `gallery: ["assets/design/x.jpg"]`. `link` adds a Visit button.
Order in the list = order on the page. Personal photos work the same way (`personal.items`).

## Hide a section
Empty its list (for example `items: []` or `paragraphs: []`). The section and its nav button disappear.

## Change the resume
Replace `assets/resume.pdf`. Then remake the phone preview in Terminal from this folder:
`sips -s format jpeg -Z 1400 assets/resume.pdf --out assets/resume-preview.jpg`

## LinkedIn QR code
Made automatically from `links.linkedin`. Change the link and the code follows.

## Colors and fonts
Top of `styles.css`: `--accent`, `--text`, `--bg`, `--font-display`, `--font-body`.

## Preview on your Mac
`python3 -m http.server 4200` in this folder, then open http://localhost:4200

## Redeploy on Netlify Drop
Netlify, your site, Deploys tab, drag this whole `portfolio` folder onto the drop box. Live in about 30 seconds.
