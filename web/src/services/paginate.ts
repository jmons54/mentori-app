import { PageProps } from '@/types/PageProps';

export const getPaginateDefaultProps = (
  searchParams: PageProps['searchParams']
): {
  page: number;
  limit: number;
  sortBy: string;
  [key: string]: string | number;
} => {
  if (!searchParams) {
    searchParams = {};
  }
  let page = searchParams.page ? +searchParams.page : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  let limit = searchParams.limit ? +searchParams.limit : 20;
  if (isNaN(limit) || limit < 1) {
    limit = 20;
  }
  return {
    ...searchParams,
    page,
    limit,
    sortBy: (searchParams.sortBy as string) ?? '',
  };
};

export const getPaginateQueryString = (
  searchParams: PageProps['searchParams']
) =>
  searchParams
    ? `${Object.keys(searchParams)
        .map((k) => k + '=' + searchParams[k])
        .join('&')}`
    : '';
