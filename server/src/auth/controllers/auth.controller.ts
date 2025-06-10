import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { GoogleAuthDto } from '../dto/google-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'User successfully registered',
  })
  @ApiBody({
    type: RegisterDto,
  })
  @ApiOperation({
    operationId: 'register',
  })
  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body() body: RegisterDto,
    @UploadedFile() avatar: Express.Multer.File
  ) {
    await this.authService.register(body, avatar);
  }

  @ApiResponse({
    status: 200,
    type: LoginDto,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        identifier: {
          type: 'string',
          description: 'User identifier (could be email or phone)',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          description: 'User password',
          example: 'Str0ngP@ssword!',
        },
      },
      required: ['identifier', 'password'],
    },
  })
  @ApiOperation({
    operationId: 'auth',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Request() { user }: { user: UserEntity }) {
    return this.authService.login(user);
  }

  @Post('google')
  @ApiResponse({
    status: 200,
    type: LoginDto,
  })
  @ApiBody({
    type: GoogleAuthDto,
  })
  @ApiOperation({
    operationId: 'googleAuth',
  })
  @HttpCode(200)
  async googleAuth(@Body() { idToken }: GoogleAuthDto) {
    return this.authService.googleLogin(idToken);
  }
}
