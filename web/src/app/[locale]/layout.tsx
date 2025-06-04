import '../global.css';
import { ReactNode } from 'react';
import { OpenAPI } from '@/client-api';
import { getLocaleServerSide } from '@/services/i18n-server';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { cssThemeKey } from '@/services/css-theme';
import classNames from 'classnames';

export const metadata = {
  title: 'Coach',
  description: 'Coach with AI',
};

OpenAPI.BASE = process.env.NEXT_PUBLIC_SERVER_URL as string;

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = getLocaleServerSide();
  const jwt = cookies().get('jwt');
  if (jwt) {
    OpenAPI.TOKEN = jwt.value;
  }
  const cssMode = cookies().get(cssThemeKey);
  return (
    <html
      lang={locale}
      className={classNames(cssMode?.value === 'light' ? 'light' : 'dark')}
    >
      <body
        className={'bg-slate-50 dark:bg-slate-800 dark:text-white'}
        data-locale={locale}
      >
        {children}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy={'beforeInteractive'}
        />
      </body>
    </html>
  );
}
