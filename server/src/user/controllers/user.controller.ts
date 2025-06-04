import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserEntity } from '../entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
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
}
