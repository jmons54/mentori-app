import { exerciseConstants } from './exercise.constants';

export type ExerciseLanguageType = (typeof exerciseConstants.languages)[number];

export interface ExerciseStepType {
  step: number;
  description: string;
}

export interface ExerciseAssistantContentType {
  exercise: string;
  targetedMuscles: string[];
  equipmentNeeded: string[];
  steps: ExerciseStepType[];
  tips: string[];
}

export interface ExerciseAssistantType {
  difficulty?: string;
  type?: string;
  en: ExerciseAssistantContentType;
  fr: ExerciseAssistantContentType;
}
