import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { comparePassword, hashPassword } from './auth-password.service';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../dto/register.dto';
import { jwtConstants } from '../auth.constants';

type User = Omit<UserEntity, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
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

  async register({ name, email, phone, password }: RegisterDto) {
    const hash = await hashPassword(password);
    return await this.userService.createAndSave({
      name,
      email,
      phone,
      password: hash,
    });
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
    const { sub, email, email_verified, name } = ticket.getPayload();
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
          name,
        });
      }
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.getAccessToken(user);
  }

  private getAccessToken({ id, name, roles }: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          sub: id,
          name,
          roles,
        },
        {
          secret: jwtConstants.secret,
        }
      ),
    };
  }
}
