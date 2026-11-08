// src/engine.js - Reusable Static Site Generator Engine
const fs = require("fs");
const path = require("path");

const { renderHeader } = require("./components/Header");
const { renderHero } = require("./components/Hero");
const { renderAudience } = require("./components/Audience");
const { renderServices } = require("./components/Services");
const { renderWork } = require("./components/Work");
const { renderProcess } = require("./components/Process");
const { renderAbout } = require("./components/About");
const { renderContact } = require("./components/Contact");
const { renderFooter } = require("./components/Footer");
const { renderLayout } = require("./layout");

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function generateSitemap(config) {
  const date = new Date().toISOString().split("T")[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${config.siteUrl}/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${config.siteUrl}/en/" />
    <xhtml:link rel="alternate" hreflang="am" href="${config.siteUrl}/am/" />
  </url>
  <url>
    <loc>${config.siteUrl}/en/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${config.siteUrl}/en/" />
    <xhtml:link rel="alternate" hreflang="am" href="${config.siteUrl}/am/" />
  </url>
  <url>
    <loc>${config.siteUrl}/am/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${config.siteUrl}/en/" />
    <xhtml:link rel="alternate" hreflang="am" href="${config.siteUrl}/am/" />
  </url>
</urlset>
`;
}

function generateRobots(config) {
  return `User-agent: *
Allow: /

Sitemap: ${config.siteUrl}/sitemap.xml
`;
}

function generateCloudflareHeaders() {
  return `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/styles/*
  Cache-Control: public, max-age=31536000, immutable

/brand/*
  Cache-Control: public, max-age=31536000, immutable

/projects/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

function build(projectRoot) {
  console.log("⚡ Starting Biruh Digital Static Build...");

  const configPath = path.join(projectRoot, "site.config.json");
  if (!fs.existsSync(configPath)) {
    throw new Error(`site.config.json not found at ${configPath}`);
  }
  const config = loadJson(configPath);
  const activePack = config.activePack || "printing";
  const packDir = path.join(projectRoot, "content", "packs", activePack);

  console.log(`📦 Active Content Pack: [${activePack}]`);

  // Load Pack Data
  const enData = loadJson(path.join(packDir, "en.json"));
  const amData = loadJson(path.join(packDir, "am.json"));
  const audienceData = loadJson(path.join(packDir, "audience.json"));
  const servicesData = loadJson(path.join(packDir, "services.json"));
  const projectsData = loadJson(path.join(packDir, "projects.json"));

  const content = {
    en: enData,
    am: amData
  };

  const distDir = path.join(projectRoot, "dist");
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  // Render Page for a specific language
  function renderPage(lang) {
    const header = renderHeader(content, config, lang);
    const hero = renderHero(content, config, lang);
    const audience = renderAudience(content, audienceData, lang);
    const services = renderServices(content, servicesData, config, lang);
    const work = renderWork(content, projectsData, lang);
    const process = renderProcess(content, lang);
    const about = renderAbout(content, config, lang);
    const contact = renderContact(content, config, lang);
    const footer = renderFooter(content, config, lang);

    const bodyContent = `
      ${header}
      <main id="main-content" role="main">
        ${hero}
        ${audience}
        ${services}
        ${work}
        ${process}
        ${about}
        ${contact}
      </main>
      ${footer}
    `;

    return renderLayout({ bodyContent, content, config, lang });
  }

  // Generate /index.html (default language: Amharic)
  const defaultLang = config.defaultLang || "am";
  const defaultHtml = renderPage(defaultLang);
  fs.writeFileSync(path.join(distDir, "index.html"), defaultHtml, "utf-8");

  // Generate /en/index.html
  const enDir = path.join(distDir, "en");
  fs.mkdirSync(enDir, { recursive: true });
  fs.writeFileSync(path.join(enDir, "index.html"), renderPage("en"), "utf-8");

  // Generate /am/index.html
  const amDir = path.join(distDir, "am");
  fs.mkdirSync(amDir, { recursive: true });
  fs.writeFileSync(path.join(amDir, "index.html"), renderPage("am"), "utf-8");

  // Generate sitemap & robots
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), generateSitemap(config), "utf-8");
  fs.writeFileSync(path.join(distDir, "robots.txt"), generateRobots(config), "utf-8");
  fs.writeFileSync(path.join(distDir, "_headers"), generateCloudflareHeaders(), "utf-8");

  // Copy public static assets into dist
  const publicDir = path.join(projectRoot, "public");
  if (fs.existsSync(publicDir)) {
    copyDirRecursive(publicDir, distDir);
  }

  // Copy styles into dist/styles
  const srcStylesDir = path.join(projectRoot, "src", "styles");
  const distStylesDir = path.join(distDir, "styles");
  if (fs.existsSync(srcStylesDir)) {
    copyDirRecursive(srcStylesDir, distStylesDir);
  }

  console.log("✅ Build successfully completed in /dist");
}

module.exports = { build };

if (require.main === module) {
  const projectRoot = path.resolve(__dirname, "..");
  build(projectRoot);
}