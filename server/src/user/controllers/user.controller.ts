import {
  Body,
  Controller,
  Get, Param,
  Patch,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update.dto';

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
  async me(@Request() { user }: { user: UserEntity }) {
    const data = await this.userService.findById(user.id);
    return UserDto.fromEntity(data);
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
    return UserDto.fromEntities(users);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiOperation({
    operationId: 'updateMe',
    summary: 'Modifier les informations de son propre profil',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(
    @Request() { user }: { user: UserEntity },
    @Body() payload: UpdateUserDto
  ) {
    const updated = await this.userService.update(user.id, payload);
    return UserDto.fromEntity(updated);
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiOperation({
    operationId: 'findById',
    summary: 'Récupérer un utilisateur par son ID',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const data = await this.userService.findById(parseInt(id));
    return UserDto.fromEntity(data);
  }
}
