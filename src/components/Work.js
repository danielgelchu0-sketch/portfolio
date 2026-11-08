// src/components/Work.js
const { getIcon } = require("./icons");

function renderWork(content, projectsData, lang = "en") {
  const t = content[lang].work;

  const cardsHtml = projectsData.map(proj => {
    const loc = proj[lang] || proj.en;
    const techPills = proj.tech.map(tech => `<span class="tech-pill">${tech}</span>`).join("");

    return `
    <article class="card work-card">
      <div class="work-media">
        <picture>
          <source srcset="${proj.image}" type="image/webp">
          <img 
            src="${proj.imagePng}" 
            alt="${proj.name} Interface Screenshot" 
            width="720" 
            height="1576" 
            loading="lazy" 
          />
        </picture>
      </div>

      <div class="work-body">
        <div class="work-meta-tag">${loc.clientType}</div>
        <h3>${proj.name}</h3>

        <div class="work-section-item">
          <strong>${t.problemLabel}</strong>
          <p>${loc.problem}</p>
        </div>

        <div class="work-section-item">
          <strong>${t.solutionLabel}</strong>
          <p>${loc.built}</p>
        </div>

        <div class="work-section-item">
          <strong>${t.resultLabel}</strong>
          <p>${loc.result}</p>
        </div>

        <div class="work-tags" aria-label="${t.stackLabel}">
          ${techPills}
        </div>

        <div class="work-footer">
          <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="${t.visitSite}: ${proj.name}">
            <span>${t.visitSite}</span>
            ${getIcon("external-link")}
          </a>
        </div>
      </div>
    </article>
    `;
  }).join("\n");

  return `
  <section class="section work-section" id="work">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          ${getIcon("globe")}
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

module.exports = { renderWork };