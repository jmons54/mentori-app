'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/button';
import { useI18n } from '@/hooks/useI18n';
import { FormCollection } from './form-collection';

interface TipsProps {
  value?: string[];
}

export function Tips({ value }: TipsProps) {
  const { t } = useI18n();
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    setTips(value ?? []);
  }, [value]);
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <FormCollection data={tips} setData={setTips} fieldName={'tips'} />
      </div>
      <Button
        variant={'default'}
        type={'button'}
        onClick={() => {
          const clone = [...tips];
          clone.push('');
          setTips(clone);
        }}
        className={'mt-4'}
      >
        {t('admin:exercises.create.addTip')}
      </Button>
    </>
  );
}
