// src/components/Footer.js

function renderFooter(content, config, lang = "en") {
  const t = content[lang].footer;
  const nav = content[lang].nav;
  const currentYear = new Date().getFullYear();

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
          <p>&copy; ${currentYear} ${config.brandName}. ${t.rights}</p>
          <p style="font-size: 0.78rem; margin-top: 0.25rem;">${t.builtNote}</p>
        </div>
      </div>
    </div>
  </footer>
  `;
}

module.exports = { renderFooter };