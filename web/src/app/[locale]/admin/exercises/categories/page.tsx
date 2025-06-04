import Breadcrumb from '../../components/breadcrumb';
import { i18nServer } from '@/services/i18n-server';
import { ExerciseCategoryService } from '@/client-api';
import { Card } from '@/components/card';
import Link from 'next/link';
import { ActiveCategory } from './active-category';
import { getJwt } from '@/services/jwt';
import { Button } from '@/components/button';
import { CheckboxInactive } from './checkbox-inactive';
import { PageProps } from '@/types/PageProps';
import Image from 'next/image';

export default async function Index({ searchParams }: PageProps) {
  const jwt = getJwt();
  const { t } = await i18nServer();
  const active = searchParams?.inactive !== 'on';
  const categories = (await ExerciseCategoryService.findAll(active)).map(
    (category) => ({
      ...category,
      name: t(`exercises:category.${category.name}`),
    })
  );
  categories.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return (
    <div className={'w-full max-w-screen-lg mx-auto my-8 px-8'}>
      <Breadcrumb
        navs={[
          {
            link: '/admin/exercises',
            text: t('admin:navs.exercises.default'),
          },
          {
            text: t('admin:exercises.categories.default'),
          },
        ]}
      />
      <h1 className={'text-3xl mt-4'}>
        {t('admin:exercises.categories.title')}
      </h1>
      <form className={'my-4 flex items-end gap-4'}>
        <CheckboxInactive checked={!active} />
      </form>
      <div className={'mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'}>
        {categories.map(({ id, image, name, isActive }) => (
          <Card key={id}>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
              </h5>
            </div>
            <div className={'relative w-full h-72'}>
              {image && (
                <Image
                  src={image ?? '/'}
                  alt="Image category"
                  objectFit={'cover'}
                  fill
                />
              )}
            </div>
            <div
              className={
                'flex p-4 border-t border-gray-200 dark:border-gray-700 justify-end '
              }
            >
              <Link href={`/admin/exercises/categories/edit/${id}`}>
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
              <ActiveCategory id={id} active={isActive} jwt={jwt as string} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
