'use client';

import { useEffect, useState } from 'react';
import { Spinner } from '@/components/spinner';

interface LoaderProps {
  id: string;
}

export function FormAction({ id }: LoaderProps) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const element = document.getElementById(id) as HTMLFormElement;

    if (element) {
      const onSubmit = () => {
        setLoad(true);
      };
      element.addEventListener('submit', onSubmit);
      return () => element.removeEventListener('submit', onSubmit);
    }
  }, [id]);

  useEffect(() => {
    if (load) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [load]);

  return (
    load && (
      <>
        <div
          className={
            'fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex'
          }
        >
          <Spinner />
        </div>
        <div
          className={'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40'}
        />
      </>
    )
  );
}
