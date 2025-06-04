'use client';

import { Active, ActiveProps } from './active';
import { AdminExerciseService } from '@/client-api';
import { useI18n } from '@/hooks/useI18n';

export function ActiveExercise(
  props: Omit<ActiveProps, 'onConfirm' | 'textConfirm'>
) {
  const { t } = useI18n();
  return (
    <Active
      onConfirm={async () => {
        await AdminExerciseService.active(props.id, {
          active: !props.active,
        });
      }}
      textConfirm={t(
        `admin:exercises.${props.active ? 'deactivate' : 'activate'}`,
        {
          value: `#${props.id}`,
        }
      )}
      {...props}
    />
  );
}
