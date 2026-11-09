// src/components/Skills.js - Technical Skills & Architecture Competence
const { getIcon } = require("./icons");

function renderSkills(content, skillsData, lang = "en") {
  const t = content[lang].skills || {
    badge: lang === "am" ? "የቴክኖሎጂ ብቃት" : "Technical Arsenal",
    headline: lang === "am" ? "በተግባር የተፈተነ እና አስተማማኝ የሶፍትዌር ምህንድስና" : "Engineering Rooted in Battle-Tested Technologies",
    subtitle: lang === "am" ? "ለረጅም ጊዜ የሚዘልቁ፣ ፈጣን እና ያለ ወርሃዊ የክላውድ ክፍያ የሚሰሩ ዘመናዊ ቴክኖሎጂዎችን እጠቀማለሁ።" : "I work with robust, lean frameworks that deliver uncompromising speed, long-term stability, and zero ongoing cloud bills."
  };

  const categoriesHtml = (skillsData || []).map((cat, idx) => {
    const loc = cat[lang] || cat.en;
    const skillsHtml = loc.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join("\n");

    return `
    <article class="card skill-category-card" style="--stagger-delay: ${(idx + 1) * 75}ms;">
      <div class="skill-cat-header">
        <div class="icon-box">
          ${getIcon(cat.icon || "zap")}
        </div>
        <div>
          <h3>${loc.title}</h3>
          <p class="skill-cat-sub">${loc.subtitle}</p>
        </div>
      </div>
      <div class="skill-tags-cloud">
        ${skillsHtml}
      </div>
    </article>
    `;
  }).join("\n");

  return `
  <section class="section skills-section" id="skills">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          ${getIcon("server")}
          <span>${t.badge}</span>
        </div>
        <h2>${t.headline}</h2>
        <p>${t.subtitle}</p>
      </div>

      <div class="skills-grid">
        ${categoriesHtml}
      </div>
    </div>
  </section>
  `;
}

module.exports = { renderSkills };
