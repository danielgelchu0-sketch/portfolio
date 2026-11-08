// src/components/Process.js
const { getIcon } = require("./icons");

function renderProcess(content, lang = "en") {
  const t = content[lang].process;

  const stepsHtml = t.steps.map(step => {
    return `
    <div class="card process-card">
      <div class="process-num">${step.num}</div>
      <h3>${step.title}</h3>
      <p>${step.desc}</p>
    </div>
    `;
  }).join("\n");

  return `
  <section class="section process-section" id="process">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          ${getIcon("zap")}
          <span>${t.badge}</span>
        </div>
        <h2>${t.headline}</h2>
        <p>${t.subtitle}</p>
      </div>

      <div class="process-grid">
        ${stepsHtml}
      </div>
    </div>
  </section>
  `;
}

module.exports = { renderProcess };