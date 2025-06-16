import { ApiProperty } from '@nestjs/swagger';
import { NewsEntity } from '../entities/news.entity';
import { AuthorDto } from './author.dto';

export class NewDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    description: 'Media (URL)',
    example: 'https://example.com/media.jpg',
    required: false,
  })
  media?: string;

  @ApiProperty({ type: () => AuthorDto })
  author: AuthorDto;

  static fromEntity(entity: NewsEntity): NewDto {
    const dto = new NewDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.content = entity.content;
    dto.published = entity.published;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.media = entity.media;
    dto.author = AuthorDto.fromEntity(entity.author);
    return dto;
  }
}
