import { SelectHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Label } from './label';

export interface FieldSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: {
    value: string;
    text: string;
  }[];
}

export function FieldSelect({
  label,
  options,
  className,
  ...props
}: FieldSelectProps) {
  return (
    <>
      <Label htmlFor={props.id}>{label}</Label>
      <select
        className={classNames(
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          className
        )}
        {...props}
      >
        {options.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </>
  );
}
