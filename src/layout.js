// src/layout.js - HTML Document Shell with SEO, Open Graph & Accessibility
const { renderFloatingWhatsApp } = require("./components/FloatingWhatsApp");

function renderLayout({ bodyContent, content, config, lang = "en" }) {
  const meta = content[lang].meta;
  const canonicalUrl = `${config.siteUrl}/${lang === "en" ? "en/" : "am/"}`;
  const ogImage = `${config.siteUrl}/brand/icon-512.png`;
  const floatingWhatsApp = renderFloatingWhatsApp(config, lang);

  let analyticsScript = "";
  if (config.analyticsId) {
    analyticsScript = `
    <!-- Analytics Configured -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${config.analyticsId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.analyticsId}');
    </script>
    `;
  }

  return `<!DOCTYPE html>
<html lang="${lang}" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <meta name="author" content="${config.developerName}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- Multilingual Alternates -->
  <link rel="alternate" hreflang="en" href="${config.siteUrl}/en/" />
  <link rel="alternate" hreflang="am" href="${config.siteUrl}/am/" />
  <link rel="alternate" hreflang="x-default" href="${config.siteUrl}/" />

  <!-- Open Graph / Social Media -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${meta.ogTitle}" />
  <meta property="og:description" content="${meta.ogDescription}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:site_name" content="${config.brandName}" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.ogTitle}" />
  <meta name="twitter:description" content="${meta.ogDescription}" />
  <meta name="twitter:image" content="${ogImage}" />

  <!-- Favicon & Touch Icons -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
  <meta name="theme-color" content="#090A0F" />

  <!-- Master Stylesheet -->
  <link rel="stylesheet" href="/styles/main.css" />

  ${analyticsScript}
</head>
<body>
  <!-- Ambient 2026 Lighting Glow Mesh -->
  <div class="ambient-mesh" aria-hidden="true">
    <div class="mesh-orb mesh-orb-1"></div>
    <div class="mesh-orb mesh-orb-2"></div>
    <div class="mesh-orb mesh-orb-3"></div>
  </div>

  <a href="#main-content" class="skip-to-content">${lang === "am" ? "ወደ ዋናው ይዘት ይዝለሉ" : "Skip to main content"}</a>

  <div id="page-wrapper">
    ${bodyContent}
  </div>

  ${floatingWhatsApp}

  <!-- Lightweight, zero-dependency 2026 client progressive enhancement -->
  <script>
    (function() {
      // Mark JS active for progressive enhancement
      document.documentElement.classList.add('js-ready');

      // Handle in-page smooth transitions if JS is enabled
      const langBtns = document.querySelectorAll('.lang-btn');
      langBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
          const target = this.getAttribute('data-lang-target');
          if (target && target !== document.documentElement.lang) {
            localStorage.setItem('biruh_lang_pref', target);
          }
        });
      });

      // 2026 Smooth Staggered Reveal on Scroll (IntersectionObserver)
      if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        }, { 
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px' 
        });

        // Collect elements for fluid entrance
        const targets = document.querySelectorAll(
          '.card, .section-header, .stat-item, .contact-card-btn, .hero-content, .hero-showcase, .avatar-frame, .about-bio, .principles-box, .skill-category-card, .white-contact-card, .contact-info-column'
        );

        // Group sibling items to automatically set cascading stagger delays
        const groupMap = new Map();
        targets.forEach(el => {
          el.classList.add('reveal-node');
          const parent = el.parentElement;
          if (!groupMap.has(parent)) {
            groupMap.set(parent, []);
          }
          groupMap.get(parent).push(el);
        });

        groupMap.forEach(children => {
          children.forEach((child, index) => {
            if (index > 0 && index < 6) {
              child.style.setProperty('--stagger-delay', (index * 70) + 'ms');
            }
          });
        });

        targets.forEach(el => observer.observe(el));
      }

      // Interactive Contact Form Handling with Validation & Feedback
      const formEl = document.getElementById('contact-form');
      if (formEl) {
        formEl.addEventListener('submit', function(e) {
          e.preventDefault();
          const nameInput = document.getElementById('contact-name');
          const emailInput = document.getElementById('contact-email');
          const typeInput = document.getElementById('contact-project-type');
          const messageInput = document.getElementById('contact-message');
          const feedback = document.getElementById('form-feedback');
          const submitBtn = document.getElementById('contact-submit-btn');

          const name = nameInput ? nameInput.value.trim() : '';
          const email = emailInput ? emailInput.value.trim() : '';
          const ptype = typeInput ? typeInput.value : '';
          const message = messageInput ? messageInput.value.trim() : '';

          if (!name || !email || !message) {
            if (feedback) {
              feedback.className = 'form-feedback error';
              feedback.textContent = '${lang === "am" ? "እባክዎን ሁሉንም አስፈላጊ መረጃዎች በትክክል ይሙሉ" : "Please complete all required fields."}';
            }
            return;
          }

          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('is-submitting');
          }

          setTimeout(function() {
            const subject = encodeURIComponent('[Project Brief] ' + (ptype || 'New Project') + ' - ' + name);
            const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nProject: ' + ptype + '\n\n' + message);
            window.location.href = 'mailto:${config.contact.email}?subject=' + subject + '&body=' + body;

            if (feedback) {
              feedback.className = 'form-feedback success';
              feedback.textContent = '${lang === "am" ? "እናመሰግናለን! መልእክትዎ ተዘጋጅቷል። በቅርቡ ምላሽ እሰጥዎታለሁ።" : "Thank you! Your project inquiry has been prepared. Daniel will be in touch shortly."}';
            }

            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.classList.remove('is-submitting');
            }
            formEl.reset();
          }, 350);
        });
      }
    })();
  </script>
</body>
</html>`;
}

module.exports = { renderLayout };