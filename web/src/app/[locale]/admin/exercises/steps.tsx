'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/button';
import { useI18n } from '@/hooks/useI18n';
import { FormCollection } from './form-collection';

interface StepsProps {
  value?: string[];
}

export function Steps({ value }: StepsProps) {
  const { t } = useI18n();
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    setSteps(value ?? ['']);
  }, [value]);
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <FormCollection data={steps} setData={setSteps} fieldName={'steps'} />
      </div>
      <Button
        variant={'default'}
        type={'button'}
        onClick={() => {
          const clone = [...steps];
          clone.push('');
          setSteps(clone);
        }}
        className={'mt-4'}
      >
        {t('admin:exercises.create.addStep')}
      </Button>
    </>
  );
}
