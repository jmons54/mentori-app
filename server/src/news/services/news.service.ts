import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from '../entities/news.entity';
import { CreateNewsDto } from '../dto/create-news.dto';
import { AwsS3Service } from '../../aws/aws-s3.service';
import { Role } from '../../user/roles/role.enum';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    readonly newsRepos: Repository<NewsEntity>,
    readonly userService: UserService,
    readonly s3Service: AwsS3Service
  ) {}

  async findPublished(): Promise<NewsEntity[]> {
    return this.newsRepos.find({
      where: { published: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<NewsEntity | null> {
    return this.newsRepos.findOne({
      where: { id },
    });
  }

  async create(
    dto: CreateNewsDto,
    userId: number,
    media?: Express.Multer.File
  ): Promise<NewsEntity> {
    const user = await this.userService.findById(userId);
    const news = await this.newsRepos.save(
      this.newsRepos.create({
        title: dto.title,
        content: dto.content,
        published: dto.published,
        isAdmin: user.roles.includes(Role.Admin),
        author: user,
      })
    );

    if (media) {
      const key = `news/${news.id}-${media.originalname}`;
      const { Location } = await this.s3Service.upload(media.buffer, key);
      news.media = Location;
      await this.newsRepos.save(news);
    }

    return news;
  }
}
