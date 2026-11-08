// src/components/Services.js
const { getIcon } = require("./icons");

function renderServices(content, servicesData, config, lang = "en") {
  const t = content[lang].services;
  const telegramUrl = `https://t.me/${config.contact.telegram.replace("@", "")}`;

  const cardsHtml = servicesData.map(item => {
    const loc = item[lang] || item.en;
    return `
    <article class="card service-card">
      <div class="service-meta">
        <div class="icon-box">
          ${getIcon(item.icon)}
        </div>
        <h3>${loc.title}</h3>
      </div>
      
      <div class="service-block">
        <div class="service-block-label">${t.problemLabel}</div>
        <p>${loc.problem}</p>
      </div>

      <div class="service-block">
        <div class="service-block-label">${t.deliverableLabel}</div>
        <p>${loc.deliverable}</p>
      </div>
    </article>
    `;
  }).join("\n");

  return `
  <section class="section services-section" id="services">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          ${getIcon("server")}
          <span>${t.badge}</span>
        </div>
        <h2>${t.headline}</h2>
        <p>${t.subtitle}</p>
      </div>

      <div class="grid-3">
        ${cardsHtml}
      </div>

      <div class="services-footer-cta">
        <p>${t.quoteCta}</p>
        <a href="${telegramUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          ${getIcon("telegram")}
          <span>${content[lang].nav.ctaTelegram}</span>
        </a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { renderServices };