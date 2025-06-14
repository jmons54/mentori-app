import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { comparePassword, hashPassword } from './auth-password.service';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../dto/register.dto';
import { jwtConstants } from '../auth.constants';
import { AwsS3Service } from '../../aws/aws-s3.service';
import 'multer';

type User = Omit<UserEntity, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    readonly s3Service: AwsS3Service
  ) {}

  async validateUser(identifier: string, password: string) {
    const user = await this.userService.findOneByIdentifier(identifier);
    if (
      user &&
      user.password &&
      (await comparePassword(password, user.password))
    ) {
      delete user.password;
      return user;
    }
    return null;
  }

  async register(dto: RegisterDto, avatar?: Express.Multer.File) {
    const {
      firstName,
      lastName,
      birthdate,
      email,
      phone,
      password,
      city,
      profession,
    } = dto;

    const hash = await hashPassword(password);

    const user = await this.userService.createAndSave({
      firstName,
      lastName,
      birthdate,
      email,
      phone,
      city,
      profession,
      password: hash,
    });

    if (avatar) {
      const key = `avatars/10-${avatar.originalname}`;
      const { Location } = await this.s3Service.upload(avatar.buffer, key);
      user.photo = Location;
      await this.userService.save(user);
    }
  }

  login(user: User) {
    return this.getAccessToken(user);
  }

  async googleLogin(idToken: string) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, email, email_verified } = ticket.getPayload();
    if (!email_verified) {
      throw new UnauthorizedException();
    }

    let user = await this.userService.findOneByGoogleId(sub);
    if (!user) {
      user = await this.userService.findOneByIdentifier(email);
      if (user) {
        user.googleId = sub;
        await this.userService.save(user);
      } else {
        user = await this.userService.createAndSave({
          googleId: sub,
          email,
        });
      }
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.getAccessToken(user);
  }

  private getAccessToken({ id, firstName, lastName, roles }: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          sub: id,
          firstName,
          lastName,
          roles,
        },
        {
          secret: jwtConstants.secret,
        }
      ),
    };
  }
}
