import Breadcrumb from '../../components/breadcrumb';
import { FormAction } from '../form-action';
import { Button } from '@/components/button';
import { Form } from '../form';
import { i18nServer } from '@/services/i18n-server';
import {
  AdminExerciseService,
  ExerciseCategoryDto,
  ExerciseCategoryService,
} from '@/client-api';
import { redirect } from 'next/navigation';

export default async function Index() {
  const { t } = await i18nServer();
  const categories = await ExerciseCategoryService.findAll();

  const onSubmit = async (formData: FormData) => {
    'use server';

    const name = formData.get('name');
    const type = formData.get('type') as string;
    const difficulty = formData.get('difficulty') as string;
    const categoryId = +(formData.get('categoryId') as string);

    let category: ExerciseCategoryDto | null = null;

    for (const value of categories) {
      if (categoryId === value.id) {
        category = value;
        break;
      }
    }

    const { id } = await AdminExerciseService.generate({
      prompt: `${name}, ${category?.name}, ${type}`,
      type,
      difficulty,
      categoryId,
    });

    redirect(`/admin/exercises/${id}`);
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
            text: t('admin:navs.exercises.generate'),
          },
        ]}
      />
      <form action={onSubmit} id={'form-generate'}>
        <FormAction id={'form-generate'} />
        <h1 className={' mb-4 text-3xl'}>
          {t(`admin:exercises.generate.title`)}
        </h1>
        <Form withTranslation={false} />
        <Button type={'submit'} variant={'green'} className={'mt-4'}>
          {t('admin:exercises.generate.submit')}
        </Button>
      </form>
    </div>
  );
}
