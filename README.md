# Biruh Digital (ብሩህ ዲጂታል) — Reusable Studio Portfolio

A high-performance, bilingual (Amharic and English) portfolio website and brand identity engineered for **Daniel Gelchu** / **Biruh Digital**. Built with a modular, pack-based architecture that separates the static engine from industry-specific content packs.

*Last updated: November 8, 2026*

---

## 1. Quick Start & Local Development

No heavy external dependencies or package registries required. Runs directly with native Node.js (v18+).

```bash
# 1. Clone or navigate to the repository
cd biruh-digital-portfolio

# 2. Build production assets into /dist
npm run build
# (or: node build.js)

# 3. Launch local preview server (port 3000)
npm start
# (or: node preview.js)

# 4. Run automated accessibility, link, and zero-JS audits
npm test
# (or: node test.js)
```

Visit `http://localhost:3000` in your browser.  
- English view: `http://localhost:3000/en/`
- Amharic view: `http://localhost:3000/am/`

---

## 2. Architecture & How It Works

```
biruh-digital-portfolio/
├── content/
│   ├── packs/
│   │   ├── printing/          # Active pack for stationery & print shops
│   │   │   ├── audience.json  # 5 targeted client operational bottlenecks
│   │   │   ├── services.json  # 5 tailored business offerings
│   │   │   ├── projects.json  # Production case studies (Campus Gabaa, YCH, HKHC)
│   │   │   ├── en.json        # English copy
│   │   │   └── am.json        # Amharic translation (identical keys)
│   │   └── template/          # Blank industry template with [PLACEHOLDER] keys
│   └── site.config.json       # Active pack, brand info, contact channels, flags
├── public/                    # Static root (logos, icons, WebP screenshots)
│   ├── brand/                 # logo.svg, mark.svg, avatar.svg, PNG icons
│   ├── projects/              # Compressed WebP and fallback screenshots
│   └── favicon.svg
├── src/
│   ├── components/            # Isolated UI renderers (no client text hardcoded)
│   ├── styles/main.css        # WCAG AA, mobile-first responsive stylesheet
│   ├── layout.js              # Accessible HTML5 shell & SEO metadata
│   └── engine.js              # Static compiler generating /dist
├── build.js                   # Production build CLI
├── preview.js                 # Zero-dependency local preview server
├── test.js                    # Automated audit suite
├── deploy-decision.md         # Cloud hosting comparison & term citations
└── wrangler.toml              # Cloudflare Pages deployment configuration
```

---

## 3. How to Customize the Portfolio

### A. How to Switch Content Packs (1-Step)
Open `site.config.json` and change the `"activePack"` value:
```json
{
  "activePack": "template"
}
```
Run `npm run build`. The site will recompile immediately using the new industry pack with zero code modifications.

### B. How to Add a New Project Case Study
Open `content/packs/[activePack]/projects.json` and add a new entry:
```json
{
  "id": "new-project",
  "name": "Project Name",
  "liveUrl": "https://example.com",
  "image": "/projects/new-project.webp",
  "imagePng": "/projects/new-project.png",
  "tech": ["Python", "Django", "Tailwind CSS"],
  "en": {
    "clientType": "Pharmacy & Medical Clinic",
    "problem": "One sentence describing the operational problem.",
    "built": "Two to three sentences describing what was engineered.",
    "result": "Real delivery detail or verified metric."
  },
  "am": {
    "clientType": "የመድሃኒት መደብር እና ክሊኒክ",
    "problem": "ያጋጠመውን ችግር በአንድ ዓረፍተ-ነገር የሚገልጽ።",
    "built": "የተገነባውን መፍትሄ በሁለት ወይም በሦስት ዓረፍተ-ነገሮች የሚገልጽ።",
    "result": "የተገኘው ተጨባጭ ውጤት ወይም የተረከበው ስራ ዝርዝር።"
  }
}
```
Add the screenshot to `public/projects/new-project.webp` and re-run `npm run build`.

### C. How to Update Contact Details
Edit `site.config.json`:
```json
"contact": {
  "telegram": "Abule_da",
  "phone": "+251938890630",
  "email": "danielgelchu0@gmail.com",
  "hasWhatsApp": false,
  "whatsapp": ""
}
```

### D. How to Enable WhatsApp
When WhatsApp is set up and operational for customer inquiries:
1. In `site.config.json`, change `"hasWhatsApp": true`.
2. Add your number in international format: `"whatsapp": "+251 717081888"`.
3. Re-run `npm run build`. The WhatsApp card button will automatically appear in the contact section.

### E. How to Create a New Industry Pack (e.g. Restaurants or Clinics)
1. Copy `content/packs/template` to `content/packs/restaurants`.
2. Update `audience.json`, `services.json`, `en.json`, and `am.json` with restaurant-specific pain points (table reservations, digital menus, kitchen ordering).
3. Set `"activePack": "restaurants"` in `site.config.json` and build.

---

## 4. Developer One-Time Steps (Deploying to Cloudflare Pages)

Follow these exact steps to launch your portfolio online:

1. **Create a Git Repository:**
   - Create a GitHub (or GitLab) account if you don't already have one.
   - Initialize and push your repository:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/biruh-digital-portfolio.git
     git branch -M main
     git push -u origin main
     ```

2. **Connect to Cloudflare Pages:**
   - Log in to your Cloudflare dashboard ([dash.cloudflare.com](https://dash.cloudflare.com/)).
   - In the left sidebar, click **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select your `biruh-digital-portfolio` repository.

3. **Configure Build Settings:**
   - **Framework preset:** `None`
   - **Build command:** `node build.js` (or `npm run build`)
   - **Build output directory:** `dist`
   - **Environment variables:** None required for baseline build. (Leave blank or add `NODE_VERSION=24.16.0`).

4. **Deploy & Verify:**
   - Click **Save and Deploy**. Cloudflare will build the site in ~10 seconds.
   - Confirm that the generated `*.pages.dev` URL opens properly.
   - Test both `/en/` and `/am/` routes and test with JavaScript disabled.

5. **Connect a Custom Domain (When Purchased):**
   - In Cloudflare Pages, go to **Custom domains** > **Set up a custom domain**.
   - Enter your domain (e.g. `biruhdigital.com` or `biruh.dev`).
   - Update `"domain"` and `"siteUrl"` in `site.config.json` and push to main.
   - *Important:* Do not switch production DNS until the preview URL is fully tested.

6. **Verify Direct Contact Links:**
   - Open your live site on a real mobile phone (Android / iOS).
   - Tap the Telegram button to verify it launches `@Abule_da`.
   - Tap the phone number to confirm your dialer opens `+251938890630`.
   - Tap the email button to verify `danielgelchu0@gmail.com`.

---

## 5. After Launch Maintenance & Rollback

- **How to Redeploy:** Whenever you add a project or edit text, simply commit and push to the `main` branch. Cloudflare Pages automatically detects the commit, rebuilds, and updates your live site globally in seconds.
- **How to Roll Back:** If you ever push a mistake, go to **Cloudflare Pages** > **Deployments**, find the previous green build, and click **Rollback to this deployment**. The live site reverts instantly with zero downtime.
- **Periodic Policy Check:** Re-check Cloudflare's free-tier terms and resource quotas every **six months** (see `deploy-decision.md`).

---

## 6. Design Choices & Trade-Offs

1. **Zero-Dependency Static HTML Engine vs Heavy SPA Frameworks:**
   - *Choice:* Built with pure Node.js templates outputting static HTML, WebP, and minimal CSS.
   - *Trade-off:* Avoids 300MB `node_modules` and fragile build toolchains that fail when networks drop in Ethiopia. Loads in under 1 second on 3G connections.
2. **Real Screenshots vs Stock Illustrations:**
   - *Choice:* Used actual production screenshots from Campus Gabaa, YCH Choir, and HKHC Discussions.
   - *Benefit:* Demonstrates verifiable engineering competence. Prospective clients can see real products deployed on Render, Cloudflare, and PythonAnywhere.
3. **Restrained CSS Motion:**
   - *Choice:* Subtle hover elevation and ambient status indicators.
   - *Accessibility:* Full support for `prefers-reduced-motion` and zero blocking animations.
4. **Bilingual Localization:**
   - *Choice:* Amharic text uses authentic business vocabulary and natural sentence structure, styled with Noto Sans Ethiopic and increased line-height (`1.8`) to avoid diacritic overlap.

---

## 7. Developer Checklist: Remaining Action Items

- [ ] **Domain Availability Check:** Check availability for `biruhdigital.com`, `biruh.dev`, or `qelemdigital.com`.
- [ ] **Telegram Handle Verification:** Check if `@BiruhDigital` or `@BiruhDev` is available if you prefer a studio handle over personal `@Abule_da`.
- [ ] **WhatsApp Account Setup:** When ready to accept WhatsApp business chats, set `"hasWhatsApp": true` in `site.config.json`.
- [ ] **Desktop Screenshots (Optional):** Current screenshots are 720x1576 mobile captures. Add wide 16:9 desktop browser captures later if desired.
- [ ] **Native Speaker Amharic Review:** All Amharic copy has been translated into natural phrasing; do a final read-through before sending to major clients.
