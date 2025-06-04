/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExerciseTranslationReqDto } from './ExerciseTranslationReqDto';
export type ExerciseCreateDto = {
  /**
   * Type of the exercise
   */
  type: string;
  /**
   * Difficulty level of the exercise
   */
  difficulty: string;
  /**
   * Thumbnail image URL for the exercise
   */
  thumbnail?: string;
  /**
   * Main image URL for the exercise
   */
  image?: string;
  /**
   * Category ID for the exercise
   */
  categoryId: number;
  /**
   * List of translations for the exercise
   */
  translations: Array<ExerciseTranslationReqDto>;
};

