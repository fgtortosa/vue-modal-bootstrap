import { createI18n } from 'vue-i18n'

import appEsMessages from '@/locales/es/app.json';
import appCaMessages from '@/locales/ca/app.json';
import appEnMessages from '@/locales/en/app.json';

// Detectar el idioma del navegador
const getBrowserLanguage = (): string => {
    const browserLang = navigator.language.split('-')[0]; // Obtiene 'es' de 'es-ES'
    const supportedLanguages = ['es', 'ca', 'en'];
    
    return supportedLanguages.includes(browserLang) ? browserLang : 'es';
  }


let idioma = getBrowserLanguage();


export const fallbackLocale = "es";

const i18n = createI18n({
    useScope: "global",
    locale: idioma || fallbackLocale,
    fallbackLocale: fallbackLocale,
    legacy: false,
    globalInjection: true,
    messages: {
        es: {
            ...appEsMessages,
        },
        ca: {
            ...appCaMessages,
        },
        en: {
            ...appEnMessages,
        }
    },
})

// Función para cambiar el idioma
export const cambiarIdioma = (nuevoIdioma: string) => {
    const idiomaValido: "es" | "ca" | "en" = ["es", "ca", "en"].includes(nuevoIdioma)
      ? (nuevoIdioma as "es" | "ca" | "en")
      : "es";
    i18n.global.locale.value = idiomaValido;
  };
  
export default i18n
