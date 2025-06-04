/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ExerciseTranslationDto = {
  language: string;
  name: string;
  /**
   * Details about the exercise content
   */
  content: {
    /**
     * Name of the exercise
     */
    exercise?: string;
    /**
     * List of targeted muscles
     */
    targetedMuscles?: Array<string>;
    /**
     * List of equipment needed
     */
    equipmentNeeded?: Array<string>;
    /**
     * List of steps to perform the exercise
     */
    steps?: Array<{
      /**
       * Step number
       */
      step?: number;
      /**
       * Description of the step
       */
      description?: string;
    }>;
    /**
     * List of tips for the exercise
     */
    tips?: Array<{
      /**
       * A tip for the exercise
       */
      tip?: string;
    }>;
  };
  targetedMuscles?: Array<string>;
  equipmentNeeded?: Array<string>;
  /**
   * Details about exercise steps
   */
  steps: any[];
  tips?: Array<string>;
  video: string;
};

