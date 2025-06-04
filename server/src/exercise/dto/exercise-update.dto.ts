import { PartialType } from '@nestjs/swagger';
import { ExerciseCreateDto } from './exercise-create.dto';

export class ExerciseUpdateDto extends PartialType(ExerciseCreateDto) {}
