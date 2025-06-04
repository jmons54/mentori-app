/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExerciseStepReqDto } from './ExerciseStepReqDto';
export type ExerciseTranslationReqDto = {
  /**
   * Language of the exercise translation
   */
  language: ExerciseTranslationReqDto.language;
  /**
   * Name of the exercise
   */
  name: string;
  /**
   * List of targeted muscles
   */
  targetedMuscles?: Array<string>;
  /**
   * List of equipment needed for the exercise
   */
  equipmentNeeded?: Array<string>;
  /**
   * Steps to perform the exercise
   */
  steps: Array<ExerciseStepReqDto>;
  /**
   * Additional tips for performing the exercise
   */
  tips?: Array<string>;
  /**
   * URL to a video demonstrating the exercise
   */
  video?: string;
};
export namespace ExerciseTranslationReqDto {
  /**
   * Language of the exercise translation
   */
  export enum language {
    EN = 'en',
    FR = 'fr',
  }
}

