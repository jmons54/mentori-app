import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExerciseCreateDto } from './exercise-create.dto';

export class ExerciseGenerateDto extends OmitType(ExerciseCreateDto, [
  'translations',
] as const) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  prompt: string;
}
