import { createI18n } from 'vue-i18n'

import appEsMessages from '/home/pgarcia/code/vueua-componentes-ejemplo/src/locales/es/app.json';
// import plantillasEsMessages from 'vueua-plantilla-uacloud/locales/es/plantilla.json';

import appCaMessages from '/home/pgarcia/code/vueua-componentes-ejemplo/src/locales/ca/app.json';
//import plantillasCaMessages from 'vueua-plantilla-uacloud/locales/ca/plantilla.json';

import appEnMessages from '/home/pgarcia/code/vueua-componentes-ejemplo/src/locales/en/app.json';
//import plantillasEnMessages from 'vueua-plantilla-uacloud/locales/en/plantilla.json';

// Detectar el idioma del usuario
const elapp = document.getElementById('app');
const persona = elapp?.dataset.usuario ?? '';

let idioma = 'es'

idioma = (persona && JSON.parse(persona).Idioma) ?? 'es'

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
