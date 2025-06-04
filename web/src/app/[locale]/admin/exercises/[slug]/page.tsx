import { i18nServer } from '@/services/i18n-server';
import { PageProps } from '@/types/PageProps';
import { ExerciseService } from '@/client-api';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/badge';
import Breadcrumb from '../../components/breadcrumb';
import Link from 'next/link';
import { getJwt } from '@/services/jwt';
import { Button } from '@/components/button';
import { ActiveExercise } from '../active-exercise';

export default async function Index({ params }: PageProps) {
  const jwt = getJwt();
  const id = +params.slug;
  if (isNaN(id)) {
    return redirect('/admin/exercises');
  }
  const exercise = await ExerciseService.findOne(id);
  if (!exercise) {
    return redirect('/admin/exercises');
  }
  const { t } = await i18nServer();

  const { translations } = exercise;

  return (
    <div className={'w-full max-w-screen-lg mx-auto mt-8 px-8'}>
      <Breadcrumb
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
      <div className={'flex gap-2 mt-4'}>
        <Badge variant={'default'}>#{exercise.id}</Badge>
        <Badge variant={'purple'}>
          {t(`exercises:types.${exercise.type}`)}
        </Badge>
        <Badge variant={'indigo'}>
          {t(`exercises:difficulty.${exercise.difficulty}`)}
        </Badge>
        {exercise.isActive ? (
          <Badge variant={'green'}>{t(`admin:exercises.active`)}</Badge>
        ) : (
          <Badge variant={'red'}>{t(`admin:exercises.inactive`)}</Badge>
        )}
        {exercise.category && (
          <Badge variant={'green'}>
            {t(`exercises:category.${exercise.category.name}`)}
          </Badge>
        )}
      </div>
      <div className={'flex items-end  my-4'}>
        <h1 className={'text-3xl'}>
          {t('admin:exercises.exercise')} #{exercise.id}
        </h1>
        <Link
          href={`/admin/exercises/edit/${exercise.id}`}
          className={'ml-auto'}
        >
          <Button size={'sm'}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Link>
        <ActiveExercise
          id={exercise.id}
          jwt={jwt as string}
          active={exercise.isActive}
        />
      </div>
      {translations
        .sort((a) => (a.language === 'fr' ? -1 : 1))
        .map((translation) => (
          <>
            <h2 className={'text-2xl mb-4'}>{translation.name}</h2>
            {(translation.targetedMuscles?.length ||
              translation.equipmentNeeded?.length) && (
              <div className={'flex gap-2'}>
                {translation.targetedMuscles?.map((value) => (
                  <Badge key={value} variant={'default'}>
                    {value}
                  </Badge>
                ))}
                {translation.equipmentNeeded?.map((value) => (
                  <Badge key={value} variant={'yellow'}>
                    {value}
                  </Badge>
                ))}
              </div>
            )}
            <ol className="mt-8 relative text-gray-500 border-s border-blue-200 dark:border-blue-700 dark:text-white">
              {translation.steps?.map(({ step, description }) => (
                <li key={step} className="mb-10 ms-6 flex items-center">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-4 ring-white dark:ring-blue-900 dark:bg-blue-700">
                    {step}
                  </span>
                  <h3 className="ml-2 font-medium leading-tight">
                    {description}
                  </h3>
                </li>
              ))}
            </ol>
            <ol className="mt-8 relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-white">
              {translation.tips?.map((tip, index) => (
                <li key={index} className="mb-10 ms-6 flex items-center">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg
                      className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                    </svg>
                  </span>
                  <h3 className="ml-2 font-medium leading-tight">{tip}</h3>
                </li>
              ))}
            </ol>
          </>
        ))}
    </div>
  );
}
