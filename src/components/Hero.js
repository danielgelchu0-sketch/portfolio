// src/components/Hero.js
const { getIcon } = require("./icons");

function renderHero(content, config, lang = "en") {
  const t = content[lang].hero;
  const stats = content[lang].stats;
  const telegramUrl = `https://t.me/${config.contact.telegram.replace("@", "")}`;

  return `
  <section class="hero-section" id="top">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <div class="badge">
            ${getIcon("zap")}
            <span>${t.badge}</span>
          </div>
          <h1>${t.headline}</h1>
          <p class="hero-support">${t.support}</p>

          <div class="hero-actions">
            <a href="${telegramUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
              ${getIcon("telegram")}
              <span>${t.ctaPrimary}</span>
            </a>
            <a href="#work" class="btn btn-secondary btn-lg">
              <span>${t.ctaSecondary}</span>
            </a>
          </div>

          <div class="hero-stats">
            <div class="stat-item">
              <h3>${stats.speed}</h3>
              <span>Lighthouse 95+</span>
            </div>
            <div class="stat-item">
              <h3>${stats.hosting}</h3>
              <span>Cloudflare Edge</span>
            </div>
            <div class="stat-item">
              <h3>${stats.direct}</h3>
              <span>Daniel Gelchu</span>
            </div>
          </div>
        </div>

        <div class="hero-showcase">
          <div class="showcase-frame">
            <div class="frame-bar">
              <div class="frame-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <span class="frame-url">https://campus-gabaa.onrender.com</span>
              <div style="width: 36px;"></div>
            </div>
            <div class="showcase-img-wrap">
              <picture>
                <source srcset="/projects/campus-gabaa.webp" type="image/webp">
                <img 
                  src="/projects/campus-gabaa.png" 
                  alt="Campus Gabaa live production application" 
                  width="720" 
                  height="1576" 
                  loading="eager"
                  fetchpriority="high"
                />
              </picture>
            </div>
            <div class="showcase-caption">
              <span>${t.proofSub}</span>
              <strong>${t.proofTitle}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

module.exports = { renderHero };