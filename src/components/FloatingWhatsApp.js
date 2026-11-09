// src/components/FloatingWhatsApp.js
const { getIcon } = require("./icons");

function renderFloatingWhatsApp(config, lang = "en") {
  if (!config.contact || !config.contact.hasWhatsApp || !config.contact.whatsapp) {
    return "";
  }

  const cleanPhone = config.contact.whatsapp.replace(/[^0-9]/g, "");
  const isAm = lang === "am";
  const greeting = isAm 
    ? "ሰላም ዳንኤል፣ የዲጂታል አገልግሎት ፈልጌ ነበረ።" 
    : "Hello Daniel, I'd like to inquire about your digital services.";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;

  return `
  <aside class="floating-whatsapp" aria-label="${isAm ? 'የዋትስአፕ ፈጣን መልእክት' : 'WhatsApp Quick Chat'}">
    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="floating-whatsapp-btn" aria-label="${isAm ? 'በዋትስአፕ በቀጥታ ያናግሩኝ' : 'Chat directly with Daniel on WhatsApp'}">
      <span class="floating-whatsapp-pulse" aria-hidden="true"></span>
      <span class="whatsapp-icon-inner" aria-hidden="true">
        ${getIcon("whatsapp")}
      </span>
    </a>
    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="floating-whatsapp-label">
      <span class="floating-whatsapp-badge" aria-hidden="true"></span>
      <span>${isAm ? 'በዋትስአፕ ያናግሩኝ' : 'Chat on WhatsApp'}</span>
    </a>
  </aside>
  `;
}

module.exports = { renderFloatingWhatsApp };
