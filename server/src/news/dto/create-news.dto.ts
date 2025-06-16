import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateNewsDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty()
  published?: boolean;

  @ApiProperty({
    description: 'Image file of the exercise category',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  media?: Blob;
}
