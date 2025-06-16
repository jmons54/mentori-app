import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { NewsService } from '../services/news.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateNewsDto } from '../dto/create-news.dto';
import { NewDto } from '../dto/new.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from '../../user/entities/user.entity';

@ApiTags('news')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ operationId: 'findAll' })
  @ApiResponse({
    status: 200,
    description: 'Liste retournée avec succès',
    type: [NewDto],
  })
  async findAll(): Promise<NewDto[]> {
    const news = await this.newsService.findPublished();
    return news.map(NewDto.fromEntity);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findOne' })
  @ApiResponse({ status: 200, description: 'Actualité trouvée', type: NewDto })
  @ApiResponse({ status: 404, description: 'Actualité non trouvée' })
  async findOne(@Param('id') id: string): Promise<NewDto> {
    const news = await this.newsService.findOne(+id);
    return NewDto.fromEntity(news);
  }

  @Post()
  @ApiOperation({
    operationId: 'create',
    summary: 'Créer une actualité avec fichier optionnel',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('media'))
  @ApiResponse({
    status: 201,
    description: 'Actualité créée avec succès',
    type: NewDto,
  })
  async create(
    @Request() { user }: { user: UserEntity },
    @Body() dto: CreateNewsDto,
    @UploadedFile() media?: Express.Multer.File
  ): Promise<NewDto> {
    const created = await this.newsService.create(dto, user.id, media);
    return NewDto.fromEntity(created);
  }
}
