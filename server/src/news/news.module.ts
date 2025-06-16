import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './entities/news.entity';
import { UserModule } from '../user/user.module';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';
import { AwsS3Service } from '../aws/aws-s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity]), UserModule],
  providers: [NewsService, AwsS3Service],
  controllers: [NewsController],
})
export class NewsModule {}
