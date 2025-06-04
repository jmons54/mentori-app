import type { ExerciseTranslationReqDto } from '@/client-api';

interface TranslationDataProps {
  formData: FormData;
  language: ExerciseTranslationReqDto.language;
}

export function getTranslationData({
  formData,
  language,
}: TranslationDataProps) {
  const equipments = formData.getAll('equipments');
  const muscles = formData.getAll('muscles');
  const steps = formData.getAll('steps');
  const tips = formData.getAll('tips');

  const translation: Partial<ExerciseTranslationReqDto> = {
    language: language,
    name: formData.get('name') as string,
  };

  if (equipments.length) {
    translation.equipmentNeeded = equipments as string[];
  }

  if (muscles.length) {
    translation.targetedMuscles = muscles as string[];
  }

  if (steps.length) {
    const data = steps as string[];
    translation.steps = data
      .filter((step) => !!step.trim())
      .map((description, step) => ({
        step: step + 1,
        description,
      }));
  }

  if (tips.length) {
    translation.tips = (tips as string[]).filter((tip) => !!tip.trim());
  }

  return translation as ExerciseTranslationReqDto;
}
