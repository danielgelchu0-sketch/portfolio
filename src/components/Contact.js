// src/components/Contact.js - Cinematic Hybrid Contact Experience
const { getIcon } = require("./icons");

function renderContact(content, config, lang = "en") {
  const t = content[lang].contact;
  const form = t.form || {
    title: lang === "am" ? "የስራ ውይይት ይጀምሩ" : "Start a Project Brief",
    subtitle: lang === "am" ? "ስለ ፕሮጀክትዎ እና ግብዎ አጭር መረጃ ያጋሩኝ።" : "Tell me about your project and goals.",
    nameLabel: lang === "am" ? "ሙሉ ስምዎ" : "Your Name",
    namePlaceholder: lang === "am" ? "ለምሳሌ፦ አበበ ቢቂላ" : "e.g. Abebe Bikila",
    emailLabel: lang === "am" ? "የኢሜይል አድራሻ" : "Email Address",
    emailPlaceholder: "you@example.com",
    projectTypeLabel: lang === "am" ? "የፕሮጀክቱ አይነት" : "Project Type",
    projectTypeOptions: [
      lang === "am" ? "የድረ-ገጽ ሲስተም ግንባታ (Web App)" : "Web Application Development",
      lang === "am" ? "የንግድ ድረ-ገጽ / የካታሎግ ዝርጋታ" : "Business Website / Catalog",
      lang === "am" ? "የሚዲያ እና የኦዲዮ ማሰራጫ መድረክ" : "Media & Streaming Platform",
      lang === "am" ? "የአሰራር ማዘመን / ቴክኒካል ማሻሻያ" : "System Automation / Optimization",
      lang === "am" ? "ሌላ አጠቃላይ ጥያቄ" : "Other Technical Inquiry"
    ],
    messageLabel: lang === "am" ? "የፕሮጀክቱ ማብራሪያና ዋና አላማዎች" : "Project Summary & Objectives",
    messagePlaceholder: lang === "am" ? "ስለ ንግድዎ፣ ስለሚፈልጉት አገልግሎት እና ስለ ጊዜ ገደብዎ ባጭሩ ይግለጹልኝ..." : "Briefly describe your business, timeline, key features, and what you aim to achieve...",
    submitBtn: lang === "am" ? "የፕሮጀክት መልእክት ይላኩ" : "Send Project Inquiry",
    submittingBtn: lang === "am" ? "በመላክ ላይ ነው..." : "Sending Message...",
    successMsg: lang === "am" ? "እናመሰግናለን! መልእክትዎ ደርሶኛል። በአጭር ጊዜ ውስጥ ምላሽ እሰጥዎታለሁ።" : "Thank you! Your message has been prepared. I'll get back to you shortly.",
    errorMsg: lang === "am" ? "ችግር አጋጥሟል። እባክዎን በቀጥታ በቴሌግራም ወይም በዋትስአፕ ያናግሩኝ።" : "Something went wrong. Please reach out directly via Telegram or WhatsApp."
  };

  const telegramHandle = config.contact.telegram.replace("@", "");
  const telegramUrl = `https://t.me/${telegramHandle}`;
  const phoneUrl = `tel:${config.contact.phone.replace(/\s+/g, "")}`;
  const emailUrl = `mailto:${config.contact.email}`;

  const waClean = config.contact.whatsapp ? config.contact.whatsapp.replace(/[^0-9]/g, "") : "";
  const waGreeting = lang === "am" 
    ? encodeURIComponent("ሰላም ዳንኤል፣ የዲጂታል አገልግሎት ፈልጌ ነበረ።")
    : encodeURIComponent("Hello Daniel, I'd like to inquire about your digital services.");
  const whatsappUrl = `https://wa.me/${waClean}?text=${waGreeting}`;
  const waHandle = config.contact.whatsappHandle || "@Biruhdigital";

  const ghUrl = (config.social && config.social.github) || "https://github.com/danielgelchu0-sketch";
  const inUrl = (config.social && config.social.linkedin) || "https://www.linkedin.com/in/danswe";

  const optionsHtml = (form.projectTypeOptions || []).map(opt => `<option value="${opt}">${opt}</option>`).join("\n");

  return `
  <section class="section contact-section cinematic-contact" id="contact">
    <!-- Cinematic Portrait Background Treatment -->
    <div class="contact-backdrop" aria-hidden="true">
      <picture>
        <source srcset="/brand/daniel-gelchu.webp" type="image/webp">
        <img 
          src="/brand/daniel-gelchu.png" 
          alt="${config.developerName}" 
          width="720" 
          height="720" 
          loading="lazy" 
          class="contact-portrait-img"
        />
      </picture>
      <div class="contact-backdrop-overlay"></div>
    </div>

    <div class="container contact-container">
      <div class="contact-grid">
        
        <!-- LEFT: Elevated Crisp White Contact Form Card -->
        <div class="contact-form-column">
          <div class="white-contact-card">
            <div class="white-card-header">
              <span class="white-card-pill">${lang === "am" ? "ቀጥተኛ የስራ ጥያቄ" : "Direct Inquiry"}</span>
              <h3>${form.title}</h3>
              <p>${form.subtitle}</p>
            </div>

            <form id="contact-form" class="cinematic-form" action="${emailUrl}" method="POST" enctype="text/plain">
              <div class="form-group">
                <label for="contact-name">${form.nameLabel} <span class="req">*</span></label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  placeholder="${form.namePlaceholder}" 
                  required 
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="contact-email">${form.emailLabel} <span class="req">*</span></label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  placeholder="${form.emailPlaceholder}" 
                  required 
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="contact-project-type">${form.projectTypeLabel}</label>
                <div class="select-wrapper">
                  <select id="contact-project-type" name="project_type" class="form-select">
                    ${optionsHtml}
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="contact-message">${form.messageLabel} <span class="req">*</span></label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  rows="4" 
                  placeholder="${form.messagePlaceholder}" 
                  required 
                  class="form-textarea"
                ></textarea>
              </div>

              <button type="submit" id="contact-submit-btn" class="btn btn-white-submit">
                <span>${form.submitBtn}</span>
                ${getIcon("zap")}
              </button>

              <div id="form-feedback" class="form-feedback" aria-live="polite"></div>
              
              <p class="form-privacy-note">
                ${lang === "am" ? "ቀጥተኛ የ1-ለ-1 ውይይት ከዳንኤል ጋር • ምንም አይነት አላስፈላጊ መልእክት አይላክም" : "Direct 1-on-1 response by Daniel • Zero spam"}
              </p>
            </form>
          </div>
        </div>

        <!-- RIGHT: Large Cinematic GET IN TOUCH & Direct Channels -->
        <div class="contact-info-column">
          <div class="badge badge-cinematic">
            ${getIcon("mail")}
            <span>${t.badge}</span>
          </div>

          <h2 class="contact-hero-heading">${t.headline}</h2>
          <p class="contact-editorial-sub">${t.invitation || t.subtitle}</p>

          <!-- Understated Elegant Direct Channels -->
          <div class="contact-channels ${config.contact.hasWhatsApp ? "has-whatsapp" : ""}">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="contact-card-btn channel-whatsapp">
              <div class="contact-icon-large">
                ${getIcon("whatsapp")}
              </div>
              <span>WhatsApp • ${waHandle}</span>
              <strong>${config.contact.whatsapp}</strong>
            </a>

            <a href="${telegramUrl}" target="_blank" rel="noopener noreferrer" class="contact-card-btn channel-telegram">
              <div class="contact-icon-large">
                ${getIcon("telegram")}
              </div>
              <span>Telegram</span>
              <strong>@${telegramHandle}</strong>
            </a>

            <a href="${phoneUrl}" class="contact-card-btn channel-phone">
              <div class="contact-icon-large">
                ${getIcon("phone")}
              </div>
              <span>Phone</span>
              <strong>${config.contact.phone}</strong>
            </a>

            <a href="${emailUrl}" class="contact-card-btn channel-email">
              <div class="contact-icon-large">
                ${getIcon("mail")}
              </div>
              <span>Email</span>
              <strong>${config.contact.email}</strong>
            </a>
          </div>

          <!-- Verified Developer Profiles -->
          <div class="contact-social-row">
            <span class="social-row-label">${lang === "am" ? "የገንቢው መገለጫዎች፦" : "Professional Profiles:"}</span>
            <div class="social-badges-group">
              <a href="${ghUrl}" target="_blank" rel="noopener noreferrer" class="editorial-social-link" aria-label="GitHub Profile">
                ${getIcon("github")}
                <span>GitHub</span>
              </a>
              <a href="${inUrl}" target="_blank" rel="noopener noreferrer" class="editorial-social-link" aria-label="LinkedIn Profile">
                ${getIcon("linkedin")}
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <!-- Availability Banner -->
          <div class="availability-banner cinematic-banner">
            <span class="status-indicator"></span>
            <span>${t.availabilityNotice}</span>
          </div>
        </div>

      </div>
    </div>
  </section>
  `;
}

module.exports = { renderContact };
