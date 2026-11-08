// src/components/Audience.js
const { getIcon } = require("./icons");

function renderAudience(content, audienceData, lang = "en") {
  const t = content[lang].audience;

  const cardsHtml = audienceData.map(item => {
    const loc = item[lang] || item.en;
    return `
    <article class="card problem-card">
      <div class="icon-box">
        ${getIcon(item.icon)}
      </div>
      <h3>${loc.title}</h3>
      <p>${loc.problem}</p>
    </article>
    `;
  }).join("\n");

  return `
  <section class="section audience-section" id="audience">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          ${getIcon("clipboard-list")}
          <span>${t.badge}</span>
        </div>
        <h2>${t.headline}</h2>
        <p>${t.subtitle}</p>
      </div>

      <div class="grid-3">
        ${cardsHtml}
      </div>
    </div>
  </section>
  `;
}

module.exports = { renderAudience };