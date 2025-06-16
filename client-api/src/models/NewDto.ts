/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthorDto } from './AuthorDto';
export type NewDto = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  /**
   * Media (URL)
   */
  media?: string;
  author: AuthorDto;
};

