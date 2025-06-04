import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ExerciseDto {
  @ApiProperty({
    description: 'Unique identifier of the exercise',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Type of the exercise',
    example: 'cardio',
  })
  @Expose()
  type: string;

  @ApiProperty({
    description: 'Difficulty level of the exercise',
    example: 'hard',
  })
  @Expose()
  difficulty: string;

  @ApiProperty({
    description: 'Category of the exercise',
    example: { name: 'endurance' },
    required: false,
  })
  @Expose()
  category?: {
    name: string;
  };

  @ApiProperty({
    description: 'Exercise is active',
    example: true,
  })
  @Expose()
  isActive: boolean;
}
