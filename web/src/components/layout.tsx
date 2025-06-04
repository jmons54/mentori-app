'use server';

import { Header } from './header';
import { Footer } from './footer';
import { getJwt } from '@/services/jwt';
import { ReactNode } from 'react';

export async function Layout({ children }: { children: ReactNode }) {
  const jwt = getJwt();
  return (
    <>
      <div className={'w-full h-screen flex flex-col'}>
        <Header defaultJwt={jwt} />
        {children}
        <div className={'flex flex-1 items-center justify-center w-full'}>
          <Footer />
        </div>
      </div>
    </>
  );
}
