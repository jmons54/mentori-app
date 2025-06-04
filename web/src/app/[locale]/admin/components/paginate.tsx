import type { PaginatedMetaDocumented } from '@/client-api';
import { ReactNode } from 'react';
import Link from 'next/link';
import { PageProps } from '@/types/PageProps';
import {
  getPaginateDefaultProps,
  getPaginateQueryString,
} from '@/services/paginate';
import { i18nServer } from '@/services/i18n-server';
import { FieldCheckbox } from '@/components/field-checkbox';
import classNames from 'classnames';

type Filter =
  | { type: 'text'; placeholder: string }
  | { type: 'checkbox'; label: string }
  | {
      type: 'select';
      options: {
        value: string;
        name: string;
      }[];
    };

interface PaginateProps {
  fields: {
    name: string;
    label?: string;
    sortable?: boolean;
    filter?: Filter;
    className?: string;
  }[];
  data: Record<string, ReactNode>[];
  meta: PaginatedMetaDocumented;
  searchParams: PageProps['searchParams'];
  filters?: {
    name: string;
    filter: Filter;
  }[];
}

export async function Paginate({
  fields,
  data,
  meta,
  searchParams,
  filters = [],
}: PaginateProps) {
  const { t } = await i18nServer();

  const names = fields.map(({ name }) => name);
  filters = [
    ...fields
      .filter(({ filter }) => filter)
      .map(({ name, filter }) => ({
        name,
        filter: filter as Filter,
      })),
    ...filters,
  ];
  const { sortBy, ...params } = getPaginateDefaultProps(searchParams);

  const getLink = ({ name, value }: { name: string; value: string }) => {
    const params = { ...searchParams };
    params[name] = value;
    return `?${getPaginateQueryString(params)}`;
  };

  const getLinkWithoutSearchName = () => {
    const params = { ...searchParams };
    delete params.name;
    return `?${getPaginateQueryString(params)}`;
  };

  const getPaginationLink = (page: number) => {
    return getLink({
      name: 'page',
      value: page.toString(),
    });
  };

  const getSortLink = (name: string) => {
    const [n, o] = sortBy.split(':');
    const order = n === name && o === 'DESC' ? 'ASC' : 'DESC';
    return getLink({
      name: 'sortBy',
      value: `${name}:${order}`,
    });
  };

  return (
    <div>
      {filters.length && (
        <form className={'mb-5 flex items-end gap-4'}>
          {filters.map(({ name, filter }) => (
            <div key={name}>
              {filter?.type === 'checkbox' && (
                <FieldCheckbox
                  name={name}
                  label={filter.label}
                  defaultChecked={params[name] === 'on'}
                />
              )}
              {filter?.type === 'select' && (
                <div>
                  <select
                    name={name}
                    defaultValue={params[name] ?? 'default'}
                    id={`filter:${name}`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {filter.options.map(({ value, name }) => (
                      <option key={value} value={value}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {filter?.type === 'text' && (
                <div className="relative">
                  <input
                    id={`filter:${name}`}
                    className="pr-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={filter.placeholder}
                    name={name}
                    defaultValue={params[name] as string}
                  />
                  <a
                    href={getLinkWithoutSearchName()}
                    className="absolute inset-y-0 end-2 flex items-center"
                  >
                    <svg
                      className="z-5 w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {t('admin:paginate.search')}
          </button>
        </form>
      )}
      {meta.totalItems > 0 ? (
        <>
          <div
            className={
              'not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-900/25'
            }
          >
            <div className={'relative rounded-xl overflow-auto'}>
              <div className={'shadow-sm overflow-hidden my-8'}>
                <table className="border-collapse table-auto w-full text-sm">
                  <thead>
                    <tr>
                      {fields.map(({ name, label, sortable }) => (
                        <th
                          key={name}
                          className={
                            'border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'
                          }
                        >
                          <div className={'flex items-center'}>
                            <span>{label}</span>
                            {sortable && (
                              <Link href={getSortLink(name)}>
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
                                    d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Link>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={'bg-white dark:bg-slate-700'}>
                    {data.map((rows, index) => (
                      <tr key={index}>
                        {names.map((name) => (
                          <td
                            key={name}
                            className={classNames(
                              'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-200',
                              fields.find((f) => f.name === name)?.className
                            )}
                          >
                            {rows[name]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex my-4 justify-center">
            {meta.currentPage !== 1 && (
              <a
                href={getPaginationLink(1)}
                className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {t('admin:paginate.first')}
              </a>
            )}
            {meta.currentPage > 2 && (
              <a
                href={getPaginationLink(meta.currentPage - 1)}
                className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {t('admin:paginate.previous')}
              </a>
            )}
            {meta.currentPage + 1 < meta.totalPages && (
              <a
                href={getPaginationLink(meta.currentPage + 1)}
                className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {t('admin:paginate.next')}
              </a>
            )}
            {meta.currentPage !== meta.totalPages && (
              <a
                href={getPaginationLink(meta.totalPages)}
                className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {t('admin:paginate.last')}
              </a>
            )}
          </div>

          <div className="flex my-4 justify-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                {meta.currentPage}
              </span>
              /
              <span className="font-semibold text-gray-900 dark:text-white">
                {meta.totalPages}
              </span>{' '}
              {t('admin:paginate.pages')}
            </span>
          </div>
        </>
      ) : (
        <>
          <div
            className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-900 dark:text-blue-400"
            role="alert"
          >
            {t('admin:paginate.noResult')}
          </div>
          <div className={'mt-6'}>
            <a
              href={'?'}
              className={
                'py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              }
            >
              {t('admin:paginate.resetFilter')}
            </a>
          </div>
        </>
      )}
    </div>
  );
}
