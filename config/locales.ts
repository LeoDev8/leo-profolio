// config/locales.ts

export const LOCALES = {
  en: 'English',
  zh: '简体中文',
  jp: '日本語',
  hk: '繁體中文'
} as const;

export type LocaleKey = keyof typeof LOCALES;