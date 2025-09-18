/**
 * VASECOM - International Configuration
 * Multi-language and multi-country setup for Latin America expansion
 */

const i18nConfig = {
  // Supported countries and languages
  countries: {
    'co': {
      name: 'Colombia',
      language: 'es-CO',
      currency: 'COP',
      whatsapp: '+573107736703',
      timezone: 'America/Bogota',
      flag: '🇨🇴',
      marketingMessages: {
        hero: 'Transformación Digital para Colombia',
        cta: 'Comienza tu transformación digital en Colombia'
      }
    },
    'mx': {
      name: 'México',
      language: 'es-MX',
      currency: 'MXN',
      whatsapp: '+573107736703', // Update when expanding
      timezone: 'America/Mexico_City',
      flag: '🇲🇽',
      marketingMessages: {
        hero: 'Transformación Digital para México',
        cta: 'Comienza tu transformación digital en México'
      }
    },
    'ar': {
      name: 'Argentina',
      language: 'es-AR',
      currency: 'ARS',
      whatsapp: '+573107736703', // Update when expanding
      timezone: 'America/Argentina/Buenos_Aires',
      flag: '🇦🇷',
      marketingMessages: {
        hero: 'Transformación Digital para Argentina',
        cta: 'Comienza tu transformación digital en Argentina'
      }
    },
    'br': {
      name: 'Brasil',
      language: 'pt-BR',
      currency: 'BRL',
      whatsapp: '+573107736703', // Update when expanding
      timezone: 'America/Sao_Paulo',
      flag: '🇧🇷',
      marketingMessages: {
        hero: 'Transformação Digital para o Brasil',
        cta: 'Comece sua transformação digital no Brasil'
      }
    },
    'pe': {
      name: 'Perú',
      language: 'es-PE',
      currency: 'PEN',
      whatsapp: '+573107736703', // Update when expanding
      timezone: 'America/Lima',
      flag: '🇵🇪',
      marketingMessages: {
        hero: 'Transformación Digital para Perú',
        cta: 'Comienza tu transformación digital en Perú'
      }
    },
    'cl': {
      name: 'Chile',
      language: 'es-CL',
      currency: 'CLP',
      whatsapp: '+573107736703', // Update when expanding
      timezone: 'America/Santiago',
      flag: '🇨🇱',
      marketingMessages: {
        hero: 'Transformación Digital para Chile',
        cta: 'Comienza tu transformación digital en Chile'
      }
    }
  },

  // Default fallback
  defaultCountry: 'co',
  defaultLanguage: 'es',

  // SEO Keywords by country
  seoKeywords: {
    'co': [
      'transformación digital Colombia',
      'e-commerce Colombia',
      'mentorías empresariales Bogotá',
      'automatización negocios Colombia',
      'desarrollo web Colombia'
    ],
    'mx': [
      'transformación digital México',
      'e-commerce México',
      'mentorías empresariales CDMX',
      'automatización negocios México',
      'desarrollo web México'
    ],
    'ar': [
      'transformación digital Argentina',
      'e-commerce Argentina',
      'mentorías empresariales Buenos Aires',
      'automatización negocios Argentina',
      'desarrollo web Argentina'
    ],
    'br': [
      'transformação digital Brasil',
      'e-commerce Brasil',
      'mentorias empresariais São Paulo',
      'automação negócios Brasil',
      'desenvolvimento web Brasil'
    ]
  },

  // Currency formatting
  formatCurrency: (amount, countryCode) => {
    const country = i18nConfig.countries[countryCode] || i18nConfig.countries[i18nConfig.defaultCountry];
    return new Intl.NumberFormat(country.language, {
      style: 'currency',
      currency: country.currency
    }).format(amount);
  },

  // Phone number formatting
  formatWhatsApp: (countryCode, message = '') => {
    const country = i18nConfig.countries[countryCode] || i18nConfig.countries[i18nConfig.defaultCountry];
    const encodedMessage = encodeURIComponent(message || country.marketingMessages.cta);
    return `https://wa.me/${country.whatsapp.replace('+', '')}?text=${encodedMessage}`;
  },

  // Get country from URL or browser
  detectCountry: () => {
    // Check URL path
    const path = window.location.pathname;
    const countryMatch = path.match(/^\/([a-z]{2})\//);
    if (countryMatch && i18nConfig.countries[countryMatch[1]]) {
      return countryMatch[1];
    }

    // Fallback to browser language
    const browserLang = navigator.language.toLowerCase();
    for (const [code, country] of Object.entries(i18nConfig.countries)) {
      if (browserLang.startsWith(country.language.toLowerCase().substr(0, 2))) {
        return code;
      }
    }

    return i18nConfig.defaultCountry;
  },

  // Analytics tracking
  analytics: {
    googleAnalytics: 'GA_MEASUREMENT_ID', // Replace with actual ID
    facebookPixel: 'FB_PIXEL_ID', // Replace with actual ID
    hotjar: 'HOTJAR_ID' // Replace with actual ID
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = i18nConfig;
} else {
  window.i18nConfig = i18nConfig;
}
