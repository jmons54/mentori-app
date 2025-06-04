import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

interface FieldUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function FieldUpload({ label, className, ...props }: FieldUploadProps) {
  return (
    <>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={props.id}
      >
        {label}
      </label>
      <input
        type="file"
        className={classNames(
          'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
          className
        )}
        {...props}
      />
    </>
  );
}
