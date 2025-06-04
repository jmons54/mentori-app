import { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserDto } from '@/client-api';
import { i18nServer } from '@/services/i18n-server';
import { getJwt } from '@/services/jwt';
import { Aside } from './components/aside';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { t } = await i18nServer();
  const jwt = getJwt();
  const user = jwtDecode(jwt as string) as UserDto;

  return (
    <div className={'w-full h-screen flex flex-col'}>
      <Aside
        navs={[
          {
            path: '/exercises',
            text: t(`admin:navs.exercises.default`),
          },
          {
            path: '/exercises/generate',
            text: t(`admin:navs.exercises.generate`),
          },
          {
            path: '/exercises/create',
            text: t(`admin:navs.exercises.create`),
          },
          {
            path: '/exercises/categories',
            text: t(`admin:navs.exercises.categories`),
          },
          {
            path: '/exercises/categories/create',
            text: t(`admin:navs.exercises.createCategory`),
          },
        ]}
        user={user}
      />
      <div className={'pl-64'}>{children}</div>
    </div>
  );
}
