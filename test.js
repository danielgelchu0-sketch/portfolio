#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "dist");

let errors = [];
let passed = 0;

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error(`  ❌ FAIL: ${message}`);
  } else {
    passed++;
    console.log(`  ✅ PASS: ${message}`);
  }
}

console.log("\n🧪 Running Comprehensive Site & Accessibility Audit...\n");

// 1. Files Exist
const requiredFiles = [
  "index.html",
  "en/index.html",
  "am/index.html",
  "sitemap.xml",
  "robots.txt",
  "_headers",
  "styles/main.css",
  "brand/logo.svg",
  "brand/mark.svg",
  "brand/avatar.svg",
  "favicon.svg",
  "brand/apple-touch-icon.png",
  "brand/icon-512.png",
  "projects/campus-gabaa.webp",
  "projects/ych-choir.webp",
  "projects/hkhc-chat.webp"
];

for (const file of requiredFiles) {
  const fp = path.join(DIST, file);
  assert(fs.existsSync(fp), `File exists: ${file}`);
}

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "site.config.json"), "utf-8"));
const defaultLang = config.defaultLang || "am";

// 2. HTML Semantics & Accessibility Audits
const htmlPages = [
  { name: "Root (Default)", path: "index.html", expectedLang: defaultLang },
  { name: "English Route", path: "en/index.html", expectedLang: "en" },
  { name: "Amharic Route", path: "am/index.html", expectedLang: "am" }
];

for (const page of htmlPages) {
  console.log(`\n📄 Auditing HTML: ${page.name}`);
  const html = fs.readFileSync(path.join(DIST, page.path), "utf-8");

  // Single <h1>
  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gis) || [];
  assert(h1Matches.length === 1, `${page.name} contains exactly one <h1> heading (found ${h1Matches.length})`);

  // Document language
  assert(html.includes(`<html lang="${page.expectedLang}"`), `${page.name} sets correct lang="${page.expectedLang}" attribute`);

  // Skip to content link
  assert(html.includes('class="skip-to-content"'), `${page.name} includes accessible skip-to-content link`);

  // Meta Title & Description
  assert(html.includes('<title>') && !html.includes('<title></title>'), `${page.name} has non-empty <title> tag`);
  assert(html.includes('<meta name="description" content="'), `${page.name} has meta description`);

  // Open Graph & Social Cards
  assert(html.includes('<meta property="og:title"'), `${page.name} has og:title`);
  assert(html.includes('<meta property="og:image"'), `${page.name} has og:image`);

  // Images have alt, width, height
  const imgTags = html.match(/<img[^>]+>/g) || [];
  let allImagesValid = true;
  for (const img of imgTags) {
    if (!img.includes('alt=') || !img.includes('width=') || !img.includes('height=')) {
      allImagesValid = false;
      console.error(`    Invalid img tag: ${img}`);
    }
  }
  assert(allImagesValid, `${page.name} all <img> tags have alt, width, and height attributes`);

  // Check section anchors
  const requiredSectionIds = ["#top", "#work", "#services", "#process", "#about", "#contact", "#main-content"];
  for (const anchor of requiredSectionIds) {
    const id = anchor.substring(1);
    assert(html.includes(`id="${id}"`), `${page.name} contains required section target: id="${id}"`);
  }

  // Check contact channels
  assert(html.includes('href="https://t.me/Abule_da"'), `${page.name} links correctly to Telegram @Abule_da`);
  assert(html.includes('href="tel:+251938890630"'), `${page.name} links correctly to phone tel:+251938890630`);
  assert(html.includes('href="mailto:danielgelchu0@gmail.com"'), `${page.name} links correctly to email mailto:danielgelchu0@gmail.com`);

  // WhatsApp Business contact channel check
  assert(html.includes('channel-whatsapp'), `${page.name} renders WhatsApp button when hasWhatsApp is true`);
  assert(html.includes('https://wa.me/251938890630'), `${page.name} WhatsApp button links to wa.me/251938890630`);
  assert(html.includes('class="floating-whatsapp"'), `${page.name} includes floating quick-action WhatsApp button`);
  assert(html.includes('class="ambient-mesh"'), `${page.name} includes ambient background glow mesh`);
}

// 3. Zero-JS Functionality
console.log("\n⚡ Auditing Zero-JS Independence...");
const enHtml = fs.readFileSync(path.join(DIST, "en/index.html"), "utf-8");
assert(enHtml.includes('href="/am/"'), "Amharic route is directly accessible via standard <a> link without JavaScript");
assert(enHtml.includes('href="https://campus-gabaa.onrender.com/"'), "Project links work as standard HTML anchors");
assert(!enHtml.includes('display: none'), "No core content sections hidden behind JavaScript tabs");

// Summary
console.log(`\n========================================`);
console.log(`Test Results: ${passed} Passed, ${errors.length} Failed`);
console.log(`========================================\n`);

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log("🎉 All automated audits passed successfully!\n");
  process.exit(0);
}