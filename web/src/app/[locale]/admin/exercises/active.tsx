import { useState } from 'react';
import { ModalConfirm } from '@/components/modal-confirm';
import { Button } from '@/components/button';
import { useServerApi } from '@/hooks/useServerApi';
import { useRouter } from 'next/navigation';

export interface ActiveProps {
  id: number;
  jwt: string;
  active: boolean;
  onConfirm: () => void;
  textConfirm: string;
}
export function Active({
  id,
  jwt,
  active,
  onConfirm,
  textConfirm,
}: ActiveProps) {
  const { refresh } = useRouter();
  useServerApi(jwt);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} size={'sm'}>
        {active ? (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
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
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
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
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
        )}
      </Button>
      <ModalConfirm
        id={`modal-active-${id}`}
        text={textConfirm}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={async () => {
          onConfirm();
          refresh();
          setOpen(false);
        }}
      />
    </>
  );
}
