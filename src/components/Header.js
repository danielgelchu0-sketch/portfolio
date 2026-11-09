// src/components/Header.js
const { getIcon } = require("./icons");

function renderHeader(content, config, lang = "en") {
  const t = content[lang].nav;
  const otherLang = lang === "en" ? "am" : "en";
  const otherLangLabel = lang === "en" ? "አማርኛ" : "English";
  const telegramUrl = `https://t.me/${config.contact.telegram.replace("@", "")}`;
  const waClean = config.contact.whatsapp ? config.contact.whatsapp.replace(/[^0-9]/g, "") : "";
  const waGreeting = lang === "am"
    ? encodeURIComponent("ሰላም ዳንኤል፣ የዲጂታል አገልግሎት ፈልጌ ነበረ።")
    : encodeURIComponent("Hello Daniel, I'd like to inquire about your digital services.");
  const whatsappUrl = `https://wa.me/${waClean}?text=${waGreeting}`;

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
          <a href="#skills" class="nav-link">${t.skills || "Skills"}</a>
          <a href="#process" class="nav-link">${t.process}</a>
          <a href="#about" class="nav-link">${t.about}</a>
          <a href="#contact" class="nav-link">${t.contact}</a>
        </nav>

        <div class="header-actions">
          <div class="lang-toggle" role="group" aria-label="Language selection">
            <a href="/en/" class="lang-btn ${lang === "en" ? "active" : ""}" data-lang-target="en" aria-current="${lang === "en" ? "true" : "false"}">EN</a>
            <a href="/am/" class="lang-btn ${lang === "am" ? "active" : ""}" data-lang-target="am" aria-current="${lang === "am" ? "true" : "false"}">አማ</a>
          </div>

          <a href="${telegramUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm btn-header-chat" aria-label="${t.ctaTelegram}">
            ${getIcon("telegram")}
            <span>Telegram</span>
          </a>
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm btn-header-chat" aria-label="${lang === "am" ? "በዋትስአፕ ያናግሩኝ" : "WhatsApp"}">
            ${getIcon("whatsapp")}
            <span>WhatsApp</span>
          </a>

          <button type="button" class="mobile-menu-btn" id="mobile-menu-btn" aria-label="${lang === "am" ? "ማውጫ ክፈት" : "Toggle Menu"}" aria-expanded="false" aria-controls="mobile-nav-drawer">
            <span class="icon-open">${getIcon("menu")}</span>
            <span class="icon-close">${getIcon("x")}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Slide-Down Drawer -->
    <div class="mobile-nav-drawer" id="mobile-nav-drawer" aria-hidden="true">
      <div class="container">
        <nav class="mobile-drawer-nav" aria-label="Mobile Navigation">
          <a href="#work" class="mobile-nav-link">${t.work}</a>
          <a href="#services" class="mobile-nav-link">${t.services}</a>
          <a href="#skills" class="mobile-nav-link">${t.skills || "Skills"}</a>
          <a href="#process" class="mobile-nav-link">${t.process}</a>
          <a href="#about" class="mobile-nav-link">${t.about}</a>
          <a href="#contact" class="mobile-nav-link">${t.contact}</a>
        </nav>
        <div class="mobile-drawer-actions">
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm w-full">
            ${getIcon("whatsapp")}
            <span>${lang === "am" ? "በዋትስአፕ አግኙኝ" : "WhatsApp Direct"}</span>
          </a>
          <a href="${telegramUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm w-full">
            ${getIcon("telegram")}
            <span>Telegram (@${config.contact.telegram.replace("@", "")})</span>
          </a>
        </div>
      </div>
    </div>
  </header>
  `;
}

module.exports = { renderHeader };