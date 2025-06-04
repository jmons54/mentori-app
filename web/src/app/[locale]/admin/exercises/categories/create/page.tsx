import Breadcrumb from '../../../components/breadcrumb';
import { i18nServer } from '@/services/i18n-server';
import { FormAction } from '../../form-action';
import { Button } from '@/components/button';
import { AdminExerciseCategoryService } from '@/client-api';
import { redirect } from 'next/navigation';
import { FormCategory } from '../form-category';

export default async function Index() {
  const { t } = await i18nServer();

  const onSubmit = async (formData: FormData) => {
    'use server';

    const name = formData.get('name') as string;
    const image = formData.get('image') as File;

    console.log(image);

    await AdminExerciseCategoryService.create({
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
            text: t('admin:navs.exercises.createCategory'),
          },
        ]}
      />
      <form action={onSubmit} id={'form-create-category'}>
        <FormAction id={'form-create-category'} />
        <h1 className={'text-3xl mb-4'}>
          {t(`admin:exercises.categories.create.title`)}
        </h1>
        <FormCategory />
        <Button type={'submit'} variant={'green'} className={'mt-4'}>
          {t(`admin:exercises.categories.create.submit`)}
        </Button>
      </form>
    </div>
  );
}
