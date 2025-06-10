import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthModule } from './auth.module';
import { UserService } from '../user/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AwsS3Service } from '../aws/aws-s3.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UserService, JwtService, AwsS3Service],
  controllers: [AuthController],
})
export class AuthHttpModule {}
