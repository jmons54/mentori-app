/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaginatedMetaDocumented = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy?: Array<Array<(string | 'ASC' | 'DESC')>>;
  searchBy?: Array<string>;
  search?: string;
  select?: Array<string>;
  filter?: Record<string, any>;
};

