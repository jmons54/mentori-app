import { PageProps } from '@/types/PageProps';
import { redirect } from 'next/navigation';
import {
  AdminExerciseCategoryService,
  ExerciseCategoryService,
} from '@/client-api';
import Breadcrumb from '../../../../components/breadcrumb';
import { i18nServer } from '@/services/i18n-server';
import { FormAction } from '../../../form-action';
import { FormCategory } from '../../form-category';
import { Button } from '@/components/button';

export default async function Index({ params }: PageProps) {
  const { t } = await i18nServer();

  const id = +params.slug;
  if (isNaN(id)) {
    return redirect('/admin/exercises/categories');
  }
  const category = await ExerciseCategoryService.findOne(id).catch(() => {
    redirect('/admin/exercises/categories');
  });

  const onSubmit = async (formData: FormData) => {
    'use server';

    const name = formData.get('name') as string;
    const image = formData.get('image') as File;

    await AdminExerciseCategoryService.update(id, {
      name,
      image,
    });

    redirect('/admin/exercises/categories');
  };

  return (
    <div className={'w-full max-w-screen-lg mx-auto p-8'}>
      <Breadcrumb
        className={'mb-4'}
        navs={[
          {
            link: '/admin/exercises',
            text: t('admin:navs.exercises.default'),
          },
          {
            link: '/admin/exercises/categories',
            text: t('admin:exercises.categories.default'),
          },
          {
            text: `#${category.id}`,
          },
        ]}
      />
      <form action={onSubmit} id={'form-edit'}>
        <FormAction id={'form-edit'} />
        <FormCategory category={category} />
        <Button type={'submit'} variant={'green'} className={'mt-4'}>
          {t(`admin:exercises.categories.edit.submit`)}
        </Button>
      </form>
    </div>
  );
}
