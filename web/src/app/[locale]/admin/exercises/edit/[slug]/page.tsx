import { PageProps } from '@/types/PageProps';
import {
  AdminExerciseService,
  type ExerciseUpdateDto,
  ExerciseService,
  type ExerciseTranslationReqDto,
} from '@/client-api';
import { redirect } from 'next/navigation';
import { Form } from '../../form';
import { i18nServer } from '@/services/i18n-server';
import { Button } from '@/components/button';
import { SelectLanguage } from '../select-language';
import { getTranslationData } from '../../form-data';
import { FieldCheckbox } from '@/components/field-checkbox';
import { FormAction } from '../../form-action';
import Breadcrumb from '../../../components/breadcrumb';

export default async function Index({ params, searchParams }: PageProps) {
  const { t, locale } = await i18nServer();
  const language = (searchParams?.language as string) ?? locale;
  const id = +params.slug;
  if (isNaN(id)) {
    return redirect('/admin/exercises');
  }
  const exercise = await ExerciseService.findOne(id).catch(() => {
    redirect('/admin/exercises');
  });

  const onSubmit = async (formData: FormData) => {
    'use server';

    const autoTranslation = formData.get('auto-translation');

    const translation = getTranslationData({
      formData,
      language: language as ExerciseTranslationReqDto.language,
    });

    const translations: ExerciseTranslationReqDto[] = [translation];

    if (autoTranslation) {
      try {
        const translate = await AdminExerciseService.translate(
          translation as ExerciseTranslationReqDto
        );
        translations.push(translate);
      } catch (e) {
        console.error(e);
      }
    }

    const data: ExerciseUpdateDto = {
      difficulty: formData.get('difficulty') as string,
      type: formData.get('type') as string,
      categoryId: +(formData.get('categoryId') as string),
      translations,
    };

    await AdminExerciseService.update(id, data);

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
            text: `${t('admin:exercises.exercise')} #${exercise.id}`,
          },
        ]}
      />
      <form action={onSubmit} id={'form-edit'}>
        <FormAction id={'form-edit'} />
        <div className={'flex mb-4'}>
          <h1 className={'text-3xl'}>{t(`admin:exercises.edit.title`)}</h1>
          <Button type={'submit'} variant={'green'} className={'ml-auto'}>
            {t('admin:exercises.edit.submit')}
          </Button>
        </div>
        <div className={'flex items-end  mb-4'}>
          <div className={'flex-1'}>
            <SelectLanguage
              value={(searchParams?.language as string) ?? locale}
              label={t('admin:exercises.language')}
              options={[
                {
                  text: t('common:language.en'),
                  value: 'en',
                },
                {
                  text: t('common:language.fr'),
                  value: 'fr',
                },
              ]}
            />
          </div>
          <FieldCheckbox
            label={t('admin:exercises.edit.autoTranslation')}
            name={'auto-translation'}
            className={'ml-4'}
          />
        </div>
        <Form exercise={exercise} language={language} />
      </form>
    </div>
  );
}
