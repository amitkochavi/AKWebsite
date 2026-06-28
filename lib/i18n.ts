export const locales = ['en', 'he'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeConfig: Record<Locale, { label: string; dir: 'ltr' | 'rtl'; htmlLang: string }> = {
  en: { label: 'English', dir: 'ltr', htmlLang: 'en' },
  he: { label: 'עברית', dir: 'rtl', htmlLang: 'he' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'he' : 'en';
}
