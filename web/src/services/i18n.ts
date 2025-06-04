import { fallbackLng } from '@/i18n';

export type Locale = 'en' | 'fr';

export const locales: Locale[] = ['en', 'fr'];

export const defaultLocale = fallbackLng;

export function getLocalClientSide(pathname: string): Locale {
  const [, locale] = pathname.split('/');
  return locale ? (locale as Locale) : defaultLocale;
}
