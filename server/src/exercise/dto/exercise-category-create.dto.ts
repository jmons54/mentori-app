import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExerciseCategoryCreateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Image file of the exercise category',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Blob;
}
