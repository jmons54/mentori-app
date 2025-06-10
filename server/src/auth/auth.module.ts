import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserAlreadyExistValidator } from './validators/user.validator';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AwsS3Service } from '../aws/aws-s3.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserAlreadyExistValidator,
    AwsS3Service,
  ],
})
export class AuthModule {}
