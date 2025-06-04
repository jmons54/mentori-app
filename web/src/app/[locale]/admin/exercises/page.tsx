import {
  ExerciseCategoryService,
  ExerciseService,
  type ExerciseTranslationDto,
} from '@/client-api';
import { Paginate } from '../components/paginate';
import { redirect } from 'next/navigation';
import { PageProps } from '@/types/PageProps';
import { getPaginateDefaultProps } from '@/services/paginate';
import { i18nServer } from '@/services/i18n-server';
import Link from 'next/link';
import { getJwt } from '@/services/jwt';
import Breadcrumb from '../components/breadcrumb';
import { ActiveExercise } from './active-exercise';

export default async function Index({ searchParams }: PageProps) {
  const jwt = getJwt();
  const { t } = await i18nServer();
  const { page, limit, sortBy, name, category, inactive } =
    getPaginateDefaultProps(searchParams);

  const [categories, response] = await Promise.all([
    ExerciseCategoryService.findAll(),
    ExerciseService.findAll(
      page,
      limit,
      category && Number.isInteger(+category)
        ? [category as string]
        : undefined,
      name ? [name as string] : undefined,
      inactive ? [inactive === 'on' ? 'off' : 'on'] : undefined,
      [sortBy] as ['id:ASC']
    ).catch(console.error),
  ]);

  if (
    !response ||
    (response.meta.totalItems > 0 && page > response.meta.totalPages)
  ) {
    return redirect('/admin/exercises');
  }

  const data = response.data.map((rows) => {
    return {
      id: rows['id'],
      name: rows['translations'].find(
        (t: ExerciseTranslationDto) => t.language === 'en'
      )?.name,
      ['name-fr']: rows['translations'].find(
        (t: ExerciseTranslationDto) => t.language === 'fr'
      )?.name,
      type: t(`exercises:types.${rows['type']}`),
      difficulty: t(`exercises:difficulty.${rows['difficulty']}`),
      category: rows['category']
        ? t(`exercises:category.${rows['category']['name']}`)
        : null,
      show: (
        <Link href={`/admin/exercises/${rows['id']}`}>
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
              d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      ),
      edit: (
        <Link href={`/admin/exercises/edit/${rows['id']}`}>
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
        </Link>
      ),
      active: (
        <ActiveExercise
          id={rows['id']}
          jwt={jwt as string}
          active={rows['isActive']}
        />
      ),
    };
  });
  return (
    <div className={'w-full max-w-screen-xl mx-auto p-8'}>
      <Breadcrumb
        className={'mb-4'}
        navs={[
          {
            text: t('admin:navs.exercises.default'),
          },
        ]}
      />
      <h1 className={'text-3xl mb-4'}>{t(`admin:exercises.title`)}</h1>
      <Paginate
        fields={[
          {
            name: 'id',
            label: 'Id',
            sortable: true,
          },
          {
            name: 'name',
            label: `${t('admin:exercises.name')} (en)`,
            filter: {
              type: 'text',
              placeholder: t(`admin:exercises.searchByName`),
            },
          },
          {
            name: 'name-fr',
            label: `${t('admin:exercises.name')} (fr)`,
          },
          {
            name: 'type',
            label: t(`admin:exercises.type`),
            sortable: true,
          },
          {
            name: 'difficulty',
            label: t(`admin:exercises.difficulty`),
            sortable: true,
          },
          {
            name: 'category',
            label: t(`admin:exercises.category`),
            filter: {
              type: 'select',
              options: [
                {
                  value: 'default',
                  name: t(`admin:exercises.allCategory`),
                },
                ...categories.map(({ id, name }) => ({
                  value: id.toString(),
                  name: t(`exercises:category.${name}`),
                })),
              ],
            },
          },
          { name: 'show' },
          { name: 'edit' },
          { name: 'active', className: 'pl-4' },
        ]}
        data={data}
        meta={response.meta}
        searchParams={searchParams}
        filters={[
          {
            name: 'inactive',
            filter: {
              type: 'checkbox',
              label: t(`admin:exercises.inactive`),
            },
          },
        ]}
      />
    </div>
  );
}
