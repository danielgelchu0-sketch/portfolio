// src/layout.js - HTML Document Shell with SEO, Open Graph & Accessibility

function renderLayout({ bodyContent, content, config, lang = "en" }) {
  const meta = content[lang].meta;
  const canonicalUrl = `${config.siteUrl}/${lang === "en" ? "en/" : "am/"}`;
  const ogImage = `${config.siteUrl}/brand/icon-512.png`;

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
  <a href="#main-content" class="skip-to-content">${lang === "am" ? "ወደ ዋናው ይዘት ይዝለሉ" : "Skip to main content"}</a>

  <div id="page-wrapper">
    ${bodyContent}
  </div>

  <!-- Lightweight, zero-dependency client progressive enhancement -->
  <script>
    (function() {
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

      // Smooth section reveal on scroll (restrained IntersectionObserver)
      if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card, .section-header, .stat-item').forEach(el => {
          observer.observe(el);
        });
      }
    })();
  </script>
</body>
</html>`;
}

module.exports = { renderLayout };