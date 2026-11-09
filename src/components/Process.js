// src/components/Process.js
const { getIcon } = require("./icons");

function renderProcess(content, lang = "en") {
  const t = content[lang].process;
  const stepIcons = ["clipboard-list", "server", "zap", "globe"];

  const stepsHtml = t.steps.map((step, idx) => {
    const iconName = stepIcons[idx] || "zap";
    return `
    <div class="card process-card" style="--stagger-delay: ${(idx + 1) * 80}ms;">
      <div class="process-card-header">
        <span class="process-num">${step.num}</span>
        <div class="process-step-icon">${getIcon(iconName)}</div>
      </div>
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