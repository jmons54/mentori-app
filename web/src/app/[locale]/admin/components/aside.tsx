'use client';

import { Logo } from '@/components/logo';
import Link from 'next/link';
import { UserDto } from '@/client-api';
import { CssMode } from '@/components/css-mode';
import { usePathname } from 'next/navigation';
import { getLocalClientSide, locales } from '@/services/i18n';
import { Button } from '@/components/button';

interface AsideProps {
  user: UserDto;
  navs: {
    path: string;
    text: string;
  }[];
}

export function Aside({ navs, user }: AsideProps) {
  const pathname = usePathname();
  const locale = getLocalClientSide(pathname);
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 flex flex-col">
        <div className={'flex items-center mb-4'}>
          <Logo />
          <div className={'font-bold ml-2'}>ADMIN</div>
        </div>
        <ul className="space-y-2 font-medium">
          {navs.map((nav) => (
            <li key={nav.path}>
              <Link
                href={`/admin${nav.path}`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className={'font-bold'}>{nav.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="mt-auto flex items-center dark:text-white bg-gray-200 dark:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none dark:focus:ring-blue-800"
          role="menuitem"
        >
          {user.name}
        </div>
        <div
          className={'flex mt-6 justify-between items-center'}
          role={'menuitem'}
        >
          {locales
            .filter((value) => value !== locale)
            .map((value) => (
              <Link key={value} href={pathname.replace(locale, value)}>
                <Button size={'xs'} variant={'default'}>
                  {value}
                </Button>
              </Link>
            ))}
          <CssMode />
          <Link href={'/'}>
            <svg
              className="ml-4 w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
              />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
