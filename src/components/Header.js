// src/components/Header.js
const { getIcon } = require("./icons");

function renderHeader(content, config, lang = "en") {
  const t = content[lang].nav;
  const otherLang = lang === "en" ? "am" : "en";
  const otherLangLabel = lang === "en" ? "አማርኛ" : "English";
  const telegramUrl = `https://t.me/${config.contact.telegram.replace("@", "")}`;

  return `
  <header class="site-header" role="banner">
    <div class="container">
      <div class="header-inner">
        <a href="#top" class="brand-link" aria-label="${config.brandName}">
          <img src="/brand/logo.svg" alt="${config.brandName} Logo" width="180" height="38" />
        </a>

        <nav class="nav-menu" aria-label="Main Navigation">
          <a href="#work" class="nav-link">${t.work}</a>
          <a href="#services" class="nav-link">${t.services}</a>
          <a href="#process" class="nav-link">${t.process}</a>
          <a href="#about" class="nav-link">${t.about}</a>
          <a href="#contact" class="nav-link">${t.contact}</a>
        </nav>

        <div class="header-actions">
          <div class="lang-toggle" role="group" aria-label="Language selection">
            <a href="/en/" class="lang-btn ${lang === "en" ? "active" : ""}" data-lang-target="en" aria-current="${lang === "en" ? "true" : "false"}">EN</a>
            <a href="/am/" class="lang-btn ${lang === "am" ? "active" : ""}" data-lang-target="am" aria-current="${lang === "am" ? "true" : "false"}">አማ</a>
          </div>

          <a href="${telegramUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" aria-label="${t.ctaTelegram}">
            ${getIcon("telegram")}
            <span>${t.ctaTelegram}</span>
          </a>
        </div>
      </div>
    </div>
  </header>
  `;
}

module.exports = { renderHeader };