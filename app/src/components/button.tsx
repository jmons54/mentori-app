import { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button({
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}
