'use client';

import { FieldSelect, FieldSelectProps } from '@/components/field-select';
import { useParams, useRouter } from 'next/navigation';

export const SelectLanguage = ({ value, label, options }: FieldSelectProps) => {
  const router = useRouter();
  const { slug } = useParams();
  return (
    <FieldSelect
      label={label}
      options={options}
      defaultValue={value}
      onChange={(e) => {
        router.push(`/${e.target.value}/admin/exercises/edit/${slug}`);
      }}
    />
  );
};
