/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExerciseCategoryDto } from './ExerciseCategoryDto';
import type { ExerciseTranslationDto } from './ExerciseTranslationDto';
export type ExerciseDetailDto = {
  /**
   * Unique identifier of the exercise
   */
  id: number;
  /**
   * Type of the exercise
   */
  type: string;
  /**
   * Difficulty level of the exercise
   */
  difficulty: string;
  /**
   * Category of the exercise
   */
  category?: ExerciseCategoryDto;
  /**
   * Exercise is active
   */
  isActive: boolean;
  /**
   * Array of exercise translations
   */
  translations: Array<ExerciseTranslationDto>;
  /**
   * Thumbnail image URL
   */
  thumbnail: string;
  /**
   * Main image URL
   */
  image: string;
};

