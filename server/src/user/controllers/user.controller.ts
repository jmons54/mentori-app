import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserEntity } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserService } from '../services/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiOperation({
    operationId: 'me',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() { user }: { user: UserEntity }) {
    return user;
  }

  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  @ApiOperation({
    operationId: 'findAll',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return plainToInstance(UserDto, users);
  }
}
