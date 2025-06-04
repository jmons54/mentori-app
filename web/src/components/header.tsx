'use client';

import { Logo } from './logo';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useServerApi } from '@/hooks/useServerApi';
import { Dropdown } from './dropdown';
import { UserDto, UserService } from '@/client-api';
import { useI18n } from '@/hooks/useI18n';
import { CssMode } from './css-mode';
import { Button } from './button';

const NAVS = [
  {
    path: '/exercises',
    text: 'Exercises',
  },
  {
    path: '/food',
    text: 'Food',
  },
];

export function Header({ defaultJwt }: { defaultJwt?: string }) {
  const { t, loadI18n } = useI18n();

  const [user, setUser] = useState<UserDto>();
  const { jwt, setJwt } = useServerApi(defaultJwt);
  const buttonGoogle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /** @ts-expect-error="google script" */
    if (typeof google !== 'undefined') {
      /** @ts-expect-error="google script" */
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: (response: { credential: string }) => {
          fetch('/api/auth-google', {
            method: 'POST',
            body: JSON.stringify({
              credential: response.credential,
            }),
          })
            .then((response) => response.json())
            .then(({ jwt }) => {
              setJwt(jwt);
            });
        },
      });
    }
  }, [setJwt]);

  useEffect(() => {
    if (jwt) {
      UserService.me().then((user) => {
        setUser(user);
      });
    } else {
      renderGoogleButton();
    }
  }, [jwt]);

  const renderGoogleButton = () => {
    //@ts-expect-error="google script"
    if (typeof google !== 'undefined' && buttonGoogle.current) {
      //@ts-expect-error="google script"
      google.accounts.id.renderButton(buttonGoogle.current, {
        theme: 'filled_blue',
        size: 'large',
        text: 'continue_with',
      });
    }
  };

  const logout = () => {
    fetch('/api/auth-logout')
      .then((response) => response.json())
      .then(() => {
        setUser(undefined);
        setJwt('');
      });
  };
  return (
    <div
      className={
        'p-4 max-w-container flex justify-between items-center min-h-navHeight m:h-full'
      }
    >
      <Logo />
      <div className={'ml-auto mr-12 flex gap-8'}>
        {NAVS.map(({ path, text }) => (
          <Link key={path} href={path} className={'uppercase'}>
            {text}
          </Link>
        ))}
      </div>
      <div className={'flex'}>
        {user ? (
          <Dropdown label={user.name} buttonVariant={'blue'}>
            <Button onClick={logout} className={'text-black'}>
              {t('common:auth.logout')}
            </Button>
          </Dropdown>
        ) : (
          <>
            <div ref={buttonGoogle} className={'mr-4'} />
            {!loadI18n && (
              <Button variant={'blue'}>{t('common:auth.login')}</Button>
            )}
          </>
        )}
        <CssMode className={'ml-4'} />
      </div>
    </div>
  );
}
