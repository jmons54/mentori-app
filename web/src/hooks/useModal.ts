import { useEffect } from 'react';

export function useModal({ open }: { open: boolean }) {
  const createShadow = () => {
    const element = document.createElement('div');
    element.id = `modal-shadow`;
    element.className = 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40';
    return element;
  };
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
      document.body.appendChild(createShadow());
    } else {
      document.body.classList.remove('overflow-hidden');
      document.getElementById(`modal-shadow`)?.remove();
    }
  }, [open]);
}
