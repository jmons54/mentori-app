import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExerciseStepReqDto {
  @ApiProperty({
    description: 'Step number of the exercise',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  step: number;

  @ApiProperty({
    description: 'Description of the exercise step',
    example: 'Start with a warm-up',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
