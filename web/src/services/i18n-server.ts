import { headers } from 'next/headers';
import { defaultLocale, Locale, locales } from '@/services/i18n';
import i18n from '@/i18n';

export function getLocaleServerSide(): Locale {
  const headersList = headers();
  const locale = headersList.get('x-locale');
  return locale && locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
}

export async function i18nServer(locale?: Locale) {
  if (!locale) {
    locale = getLocaleServerSide();
  }
  await i18n.changeLanguage(locale);
  return {
    ...i18n,
    locale,
  };
}
