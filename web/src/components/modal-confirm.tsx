import { useI18n } from '@/hooks/useI18n';
import { MouseEvent, ReactNode } from 'react';
import { Button } from './button';
import classNames from 'classnames';
import { useModal } from '@/hooks/useModal';

interface ModalConfirmProps {
  id?: string;
  text: string;
  open: boolean;
  onConfirm: (event: MouseEvent<HTMLButtonElement>) => void;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
}
export function ModalConfirm({
  id,
  text,
  open,
  onConfirm,
  onClose,
  confirmText,
  cancelText,
  className,
  children,
}: ModalConfirmProps) {
  const { t } = useI18n();
  useModal({ open });
  return (
    <div
      id={id}
      tabIndex={-1}
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex',
        className,
        !open && 'hidden'
      )}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide={id}
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {children ?? (
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {text}
              </h3>
            )}
            <Button data-modal-hide={id} variant={'red'} onClick={onConfirm}>
              {confirmText ?? t('common:confirm')}
            </Button>
            <Button
              data-modal-hide={id}
              variant={'alternative'}
              className={'ms-3'}
              onClick={onClose}
            >
              {cancelText ?? t('common:cancel')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
