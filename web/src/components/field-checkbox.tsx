import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

interface FieldCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
}

export function FieldCheckbox({
  label,
  className,
  labelClassName,
  inputClassName,
  ...props
}: FieldCheckboxProps) {
  return (
    <div className={classNames('flex items-center', className)}>
      <input
        type={'checkbox'}
        className={classNames(
          'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
          inputClassName
        )}
        {...props}
      />
      <label
        htmlFor={props.id}
        className={classNames(
          'ms-2 text-sm font-medium text-gray-900 dark:text-gray-300',
          labelClassName
        )}
      >
        {label}
      </label>
    </div>
  );
}
