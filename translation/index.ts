import { init18n } from 'core/i18n/init';
import en from 'translation/en.json';
import es from 'translation/es.json';

export const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

export const fallbackLng = 'es';

export type LanguageCode = keyof typeof resources;

const i18n = init18n({ resources, fallbackLng });

export default i18n;
