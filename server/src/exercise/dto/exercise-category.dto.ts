import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ExerciseCategoryDto {
  @ApiProperty({
    description: 'Unique identifier of the exercise category',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Name of the exercise category',
    example: 'endurance',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'URL of the category image',
    example: 'https://example.com/image.png',
    required: false,
  })
  @Expose()
  image?: string;

  @ApiProperty()
  @Expose()
  isActive: boolean;
}
