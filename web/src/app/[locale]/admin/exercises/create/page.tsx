import { redirect } from 'next/navigation';
import {
  AdminExerciseService,
  type ExerciseCreateDto,
  type ExerciseTranslationReqDto,
} from '@/client-api';
import { i18nServer } from '@/services/i18n-server';
import { Button } from '@/components/button';
import { Form } from '../form';
import { getTranslationData } from '../form-data';
import { FormAction } from '../form-action';
import Breadcrumb from '../../components/breadcrumb';

export default async function Index() {
  const { t, locale } = await i18nServer();

  const onSubmit = async (formData: FormData) => {
    'use server';

    const translation = getTranslationData({
      formData,
      language: locale as ExerciseTranslationReqDto.language,
    });

    const translations: ExerciseTranslationReqDto[] = [translation];

    try {
      const translate = await AdminExerciseService.translate(
        translation as ExerciseTranslationReqDto
      );
      translations.push(translate);
    } catch (e) {
      console.error(e);
    }

    const data: ExerciseCreateDto = {
      difficulty: formData.get('difficulty') as string,
      type: formData.get('type') as string,
      categoryId: +(formData.get('categoryId') as string),
      translations,
    };

    const { id } = await AdminExerciseService.create(data);

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
            text: t('admin:navs.exercises.create'),
          },
        ]}
      />
      <form action={onSubmit} id={'form-create'}>
        <FormAction id={'form-create'} />
        <div className={'flex mb-4'}>
          <h1 className={'text-3xl'}>{t(`admin:exercises.create.title`)}</h1>
          <Button type={'submit'} variant={'green'} className={'ml-auto'}>
            {t('admin:exercises.create.submit')}
          </Button>
        </div>
        <Form />
        <Button type={'submit'} variant={'green'} className={'mt-4'}>
          {t('admin:exercises.create.submit')}
        </Button>
      </form>
    </div>
  );
}
