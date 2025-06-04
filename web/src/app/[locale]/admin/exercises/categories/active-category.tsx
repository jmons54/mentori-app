'use client';

import { Active, ActiveProps } from '../active';
import { useI18n } from '@/hooks/useI18n';
import { AdminExerciseCategoryService } from '@/client-api';

export function ActiveCategory(
  props: Omit<ActiveProps, 'onConfirm' | 'textConfirm'>
) {
  const { t } = useI18n();
  return (
    <Active
      onConfirm={async () => {
        await AdminExerciseCategoryService.active(props.id, {
          active: !props.active,
        });
      }}
      textConfirm={t(
        `admin:exercises.categories.${
          props.active ? 'deactivate' : 'activate'
        }`,
        {
          value: `#${props.id}`,
        }
      )}
      {...props}
    />
  );
}
