import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { Button, ButtonVariant } from './button';

interface DropdownProps {
  label: string;
  children: ReactNode;
  buttonVariant?: ButtonVariant;
  buttonClassName?: string;
}

export function Dropdown({
  label,
  children,
  buttonVariant,
  buttonClassName,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <Button
          variant={buttonVariant}
          className={classNames('inline-flex', buttonClassName)}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {label}
          <svg
            className="-mr-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
          </svg>
        </Button>
      </div>
      {open && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
