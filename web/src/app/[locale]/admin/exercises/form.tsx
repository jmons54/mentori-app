import { Field } from '@/components/field';
import { FieldSelect } from '@/components/field-select';
import { equipments, exerciseTypes, muscles } from '@/services/exercise';
import { FieldUpload } from '@/components/field-upload';
import { FieldCheckbox } from '@/components/field-checkbox';
import { Steps } from './steps';
import { Tips } from './tips';
import {
  ExerciseCategoryDto,
  ExerciseCategoryService,
  ExerciseDetailDto,
} from '@/client-api';
import { i18nServer } from '@/services/i18n-server';

interface FormProps {
  exercise?: ExerciseDetailDto;
  language?: string;
  categories?: ExerciseCategoryDto[];
  withTranslation?: boolean;
}

export async function Form({
  exercise,
  language,
  categories,
  withTranslation = true,
}: FormProps) {
  const { t } = await i18nServer();

  if (!categories) {
    categories = await ExerciseCategoryService.findAll();
  }

  const translation = exercise?.translations.find(
    (translation) => translation.language === language
  );

  const exerciseTypesOptions = exerciseTypes.map((type) => ({
    text: t(`exercises:types.${type}`),
    value: type,
  }));
  exerciseTypesOptions.sort((a, b) => (a.text > b.text ? 1 : -1));

  const musclesOptions = muscles.map((muscle) =>
    t(`exercises:muscles.${muscle}`)
  );
  const musclesValue = translation?.targetedMuscles?.map((t) =>
    t.toLowerCase()
  );

  if (musclesValue?.length) {
    musclesValue
      .filter(
        (value) =>
          !musclesOptions.map((muscle) => muscle.toLowerCase()).includes(value)
      )
      .forEach((value) =>
        musclesOptions.push(
          `${value.charAt(0).toUpperCase()}${value.charAt(1)}`
        )
      );
  }

  musclesOptions.sort((a, b) => (a > b ? 1 : -1));

  const equipmentsOptions = equipments.map((equipment) =>
    t(`exercises:equipments.${equipment}`)
  );
  const equipmentsValue = translation?.equipmentNeeded?.map((t) =>
    t.toLowerCase()
  );

  if (equipmentsValue?.length) {
    equipmentsValue
      .filter(
        (value) =>
          !equipmentsOptions.map((o) => o.toLowerCase()).includes(value)
      )
      .forEach((value) =>
        equipmentsOptions.push(
          `${value.charAt(0).toUpperCase()}${value.slice(1)}`
        )
      );
  }

  equipmentsOptions.sort((a, b) => (a > b ? 1 : -1));

  return (
    <>
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'}>
        <div>
          <Field
            defaultValue={translation?.name}
            name={'name'}
            label={
              withTranslation
                ? t('admin:exercises.name')
                : t('admin:exercises.generate.prompt')
            }
            placeholder={
              !withTranslation
                ? t('admin:exercises.generate.promptPlaceholder')
                : ''
            }
            required
          />
        </div>
        <div>
          <FieldSelect
            defaultValue={exercise?.category?.id}
            name={'categoryId'}
            label={t('admin:exercises.category')}
            options={categories.map((category) => ({
              value: category.id.toString(),
              text: t(`exercises:category.${category.name}`),
            }))}
            required
          />
        </div>
      </div>

      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'}>
        <div>
          <FieldSelect
            defaultValue={exercise?.type}
            name={'type'}
            label={t('admin:exercises.type')}
            options={exerciseTypesOptions}
            required
          />
        </div>
        <div>
          <FieldSelect
            defaultValue={exercise?.difficulty}
            name={'difficulty'}
            label={t('admin:exercises.difficulty')}
            options={[
              {
                value: 'beginner',
                text: 'Beginner',
              },
              {
                value: 'intermediate',
                text: 'intermediate',
              },
              {
                value: 'expert',
                text: 'Expert',
              },
            ]}
            required
          />
        </div>
      </div>

      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'}>
        <div>
          <FieldUpload
            label={t('admin:exercises.thumbnail')}
            name={'thumbnail'}
          />
        </div>
        <div>
          <FieldUpload label={t('admin:exercises.image')} name={'image'} />
        </div>
      </div>
      {withTranslation && (
        <>
          <fieldset className="mb-4 border border-gray-300 dark:border-gray-600 p-4 rounded">
            <legend className={'text-md px-2'}>
              {t(`admin:exercises.muscles`)}
            </legend>
            <div className={'flex flex-wrap gap-4'}>
              {musclesOptions.map((muscle) => (
                <FieldCheckbox
                  defaultChecked={translation?.targetedMuscles
                    ?.map((v) => v.toLowerCase())
                    .includes(muscle.toLowerCase())}
                  key={muscle}
                  value={muscle}
                  label={muscle}
                  id={`muscle-${muscle}`}
                  name={'muscles'}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="mb-4 border border-gray-300 dark:border-gray-600 p-4 rounded">
            <legend className={'text-md px-2'}>
              {t(`admin:exercises.equipments`)}
            </legend>
            <div className={'flex flex-wrap gap-4'}>
              {equipmentsOptions.map((equipment) => (
                <FieldCheckbox
                  defaultChecked={translation?.equipmentNeeded
                    ?.map((v) => v.toLowerCase())
                    .includes(equipment.toLowerCase())}
                  key={equipment}
                  value={equipment}
                  label={equipment}
                  id={`equipment-${equipment}`}
                  name={'equipments'}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="mb-4 border border-gray-300 dark:border-gray-600 p-4 rounded">
            <legend className={'text-md px-2'}>
              {t(`admin:exercises.steps`)}
            </legend>
            <Steps
              value={translation?.steps.map(({ description }) => description)}
            />
          </fieldset>
          <fieldset className="border border-gray-300 dark:border-gray-600 p-4 rounded">
            <legend className={'text-md px-2'}>
              {t(`admin:exercises.tips`)}
            </legend>
            <Tips value={translation?.tips} />
          </fieldset>
        </>
      )}
    </>
  );
}
