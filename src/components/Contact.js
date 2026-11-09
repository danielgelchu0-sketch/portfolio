// src/components/Contact.js
const { getIcon } = require("./icons");

function renderContact(content, config, lang = "en") {
  const t = content[lang].contact;
  const telegramHandle = config.contact.telegram.replace("@", "");
  const telegramUrl = `https://t.me/${telegramHandle}`;
  const phoneUrl = `tel:${config.contact.phone.replace(/\s+/g, "")}`;
  const emailUrl = `mailto:${config.contact.email}`;

  let whatsappHtml = "";
  if (config.contact.hasWhatsApp && config.contact.whatsapp) {
    const waClean = config.contact.whatsapp.replace(/[^0-9]/g, "");
    const waGreeting = lang === "am" 
      ? encodeURIComponent("ሰላም ዳንኤል፣ የዲጂታል አገልግሎት ፈልጌ ነበረ።")
      : encodeURIComponent("Hello Daniel, I'd like to inquire about your digital services.");
    whatsappHtml = `
    <a href="https://wa.me/${waClean}?text=${waGreeting}" target="_blank" rel="noopener noreferrer" class="contact-card-btn channel-whatsapp">
      <div class="contact-icon-large">
        ${getIcon("whatsapp")}
      </div>
      <span>WhatsApp</span>
      <strong>${t.whatsappBtn}</strong>
    </a>
    `;
  }

  return `
  <section class="section contact-section" id="contact">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          ${getIcon("mail")}
          <span>${t.badge}</span>
        </div>
        <h2>${t.headline}</h2>
        <p>${t.subtitle}</p>
      </div>

      <div class="contact-channels ${config.contact.hasWhatsApp ? "has-whatsapp" : ""}">
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

        ${whatsappHtml}
      </div>

      <div class="availability-banner">
        <span class="status-indicator-dot"></span>
        <span>${t.availabilityNotice}</span>
      </div>
    </div>
  </section>
  `;
}

module.exports = { renderContact };