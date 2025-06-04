'use client';

import { FieldCheckbox } from '@/components/field-checkbox';

export function CheckboxInactive({ checked }: { checked: boolean }) {
  return (
    <FieldCheckbox
      label={'Inactive'}
      onChange={(e) => {
        e.target.closest('form')?.submit();
      }}
      name={'inactive'}
      defaultChecked={checked}
    />
  );
}
