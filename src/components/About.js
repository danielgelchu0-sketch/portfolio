// src/components/About.js
const { getIcon } = require("./icons");

function renderAbout(content, config, lang = "en") {
  const t = content[lang].about;

  let githubHtml = "";
  if (config.social && config.social.github) {
    githubHtml = `
    <a href="${config.social.github}" target="_blank" rel="noopener noreferrer" class="social-badge-btn" aria-label="GitHub Profile">
      ${getIcon("github")}
      <span>GitHub</span>
    </a>
    `;
  }

  let linkedinHtml = "";
  if (config.social && config.social.linkedin) {
    linkedinHtml = `
    <a href="${config.social.linkedin}" target="_blank" rel="noopener noreferrer" class="social-badge-btn" aria-label="LinkedIn Profile">
      ${getIcon("linkedin")}
      <span>LinkedIn</span>
    </a>
    `;
  }

  const principlesHtml = t.principles.map(item => {
    return `
    <li>
      ${getIcon("check-circle")}
      <span>${item}</span>
    </li>
    `;
  }).join("\n");

  return `
  <section class="section about-section" id="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-visual">
          <div class="avatar-frame">
            <div class="avatar-img-wrap">
              <picture>
                <source srcset="/brand/daniel-gelchu.webp" type="image/webp">
                <img 
                  src="/brand/daniel-gelchu.png" 
                  alt="${config.developerName} - Solo Software Developer & Systems Engineer" 
                  width="360" 
                  height="360" 
                  loading="lazy" 
                />
              </picture>
            </div>
            <div class="avatar-status-pill">
              <span class="status-indicator"></span>
              <span>${lang === "am" ? "ለአዳዲስ ፕሮጀክቶች ዝግጁ" : "Available for Projects"}</span>
            </div>
            <div class="developer-social-links">
              ${githubHtml}
              ${linkedinHtml}
            </div>
          </div>
        </div>

        <div class="about-bio">
          <div class="badge">
            ${getIcon("shield-check")}
            <span>${t.badge}</span>
          </div>
          <h3>${t.headline}</h3>
          <p>${t.bioP1}</p>
          <p>${t.bioP2}</p>
          <p>${t.bioP3}</p>

          <div class="principles-box">
            <h4>${t.principlesHeading}</h4>
            <ul class="principles-list">
              ${principlesHtml}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

module.exports = { renderAbout };