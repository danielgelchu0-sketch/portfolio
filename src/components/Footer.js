// src/components/Footer.js
const { getIcon } = require("./icons");

function renderFooter(content, config, lang = "en") {
  const t = content[lang].footer;
  const nav = content[lang].nav;
  const currentYear = new Date().getFullYear();

  let socialHtml = "";
  if (config.social) {
    const ghLink = config.social.github 
      ? `<a href="${config.social.github}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="GitHub Profile">${getIcon("github")}</a>` 
      : "";
    const inLink = config.social.linkedin 
      ? `<a href="${config.social.linkedin}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="LinkedIn Profile">${getIcon("linkedin")}</a>` 
      : "";
    if (ghLink || inLink) {
      socialHtml = `
      <div class="footer-social">
        ${ghLink}
        ${inLink}
      </div>
      `;
    }
  }

  return `
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <a href="#top" class="brand-link" aria-label="${config.brandName}">
            <img src="/brand/logo.svg" alt="${config.brandName}" width="160" height="34" loading="lazy" />
          </a>
          <p>${t.brandTagline}</p>
        </div>

        <nav class="footer-nav" aria-label="Footer Navigation">
          <a href="#work">${nav.work}</a>
          <a href="#services">${nav.services}</a>
          <a href="#process">${nav.process}</a>
          <a href="#about">${nav.about}</a>
          <a href="#contact">${nav.contact}</a>
        </nav>

        <div class="footer-copy">
          ${socialHtml}
          <p>&copy; ${currentYear} ${config.brandName}. ${t.rights}</p>
          <p style="font-size: 0.78rem; margin-top: 0.25rem;">${t.builtNote}</p>
        </div>
      </div>
    </div>
  </footer>
  `;
}

module.exports = { renderFooter };