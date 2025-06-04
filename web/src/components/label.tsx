import { LabelHTMLAttributes } from 'react';
import classNames from 'classnames';

export function Label({
  children,
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={classNames(
        'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
