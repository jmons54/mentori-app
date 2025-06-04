/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ExerciseDto = {
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
  category?: Record<string, any>;
  /**
   * Exercise is active
   */
  isActive: boolean;
};

