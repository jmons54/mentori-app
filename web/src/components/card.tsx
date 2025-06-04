import { ReactNode } from 'react';
import classNames from 'classnames';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={classNames(
        'bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
}
