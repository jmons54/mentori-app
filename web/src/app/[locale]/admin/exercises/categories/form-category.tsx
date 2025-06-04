import { Field } from '@/components/field';
import { ExerciseCategoryDto } from '@/client-api';
import { FieldUpload } from '@/components/field-upload';

interface FormCategoryProps {
  category?: ExerciseCategoryDto;
}

export function FormCategory({ category }: FormCategoryProps) {
  return (
    <>
      <Field
        className={'mb-4'}
        defaultValue={category?.name}
        name={'name'}
        label={'Name'}
        required
      />
      <FieldUpload label={'Image'} name={'image'} />
    </>
  );
}
