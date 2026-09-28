# Centre of Excellence in Policy, Pedagogy & Purpose — Website

> *Impact through innovation.*
>
> A flagship Centre of the Thapar School of Liberal Arts & Sciences (TSLAS), Patiala.

A static website for the **PPP Centre of Excellence** — built as a single, self-contained static site with no build step. Drop it on GitHub Pages and you're live.

## Stack

- **HTML5** (`index.html`) — semantic, single-page
- **CSS3** (`styles.css`) — custom properties, no framework, no preprocessor
- **Vanilla JS** (`script.js`) — sticky nav, mobile menu, scroll reveals
- **Type**: Fraunces (display), Manrope (text), JetBrains Mono (labels) and Tiro Devanagari Sanskrit (motto), all via Google Fonts
- **No build tools.** No npm. No bundler. Just three files.

## File structure

```
.
├── index.html          # The page (all content lives here)
├── styles.css          # All styles
├── script.js           # Nav, theme explorer tabs, ticker, roadmap marker, reveals
├── assets/
│   └── logo.png        # PPP / TSLAS logo
└── README.md
```

## Run locally

Any static server will do. The simplest:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser — everything works without a server.

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `ppp-centre`).
2. Push these files to the `main` branch.
3. In the repo, go to **Settings → Pages**.
4. Under **Source**, select **Deploy from a branch**, choose `main` and `/ (root)`.
5. Save. Your site will be live at `https://<username>.github.io/<repo>/` within a minute.

For a custom domain (e.g. `ppp.tsl.edu`), add a `CNAME` file with your domain name and configure DNS records as documented in [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Editing content

All content lives in `index.html`.

| Section            | Anchor        | Where to edit |
| ------------------ | ------------- | ------------- |
| Hero + network     | top of page   | `<section class="hero">`; the network is inline SVG, one `<a class="net__node">` per theme |
| Project ticker     | —             | `<div class="tick__track">` (one `<span class="tick__item">` per project) |
| The Federation     | `#about`      | `<section class="sec fed">` |
| Themes & Projects  | `#themes`     | one `<a class="xtab">` and one `<article class="xpanel">` per theme |
| Sub-units          | `#sub-units`  | `<article class="unit">` (ACT, IKS) |
| DISHA              | `#disha`      | `<section class="sec disha">` |
| Roadmap            | `#roadmap`    | `<div class="tl">`; the "We are here" marker is placed automatically from today's date |
| People             | `#team`       | `.founder` + each `<a class="person">` |

### Adding a project

Inside the theme's `<article class="xpanel">`, copy an existing `<details class="proj">` block and change its `id` (`p-TT-N`), code, title, status and paragraphs. Then:

1. update the count in that theme's `<span class="xtab__count">`;
2. add a `<span class="tick__item">` to the ticker;
3. update the project total in the hero stats and in the "Explore N projects" button.

Write-ups on the site do not name individual faculty; people are listed only in the People section.

Deep links work: `#t-03` opens theme 03, and `#p-07-4` opens project 07.4.

### Team photos

Drop a square photo into `assets/team/` using the filename already referenced in `index.html` (e.g. `kazuma-mizukoshi.jpg`). It replaces the initials automatically; if the file is missing, the initials stay.

### Colours

Each theme carries its own colour through the network node, tab, panel band and project codes. Theme colours are set inline (`style="--c:…"`) on the tab and panel; the base palette is at the top of `styles.css`.

## Accessibility

- Semantic landmarks, a keyboard-operable tab list (arrow keys) for the theme explorer, and native `<details>` for project write-ups.
- Without JavaScript every theme panel is shown in full.
- `prefers-reduced-motion` stops the ticker, network pulses and reveal animations.

---

*Built for the Centre of Excellence in Policy, Pedagogy & Purpose · TSLAS · TIET Patiala*
