import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
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
    const { firstName, lastName, email, phone, password, city, profession } =
      dto;

    const existing = await this.userService.findOneByEmail(email);
    if (existing) {
      throw new ConflictException('Email déjà utilisé');
    }

    const hash = await hashPassword(password);

    const user = await this.userService.createAndSave({
      firstName,
      lastName,
      email,
      phone,
      city,
      profession,
      password: hash,
    });

    if (avatar) {
      const key = `avatars/${user.id}-${avatar.originalname}`;
      const { Location } = await this.s3Service.upload(avatar.buffer, key);
      user.photo = Location;
      await this.userService.save(user);
    }
  }

  login(user: User) {
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
