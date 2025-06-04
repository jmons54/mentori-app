import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/role.guard';
import { plainToInstance } from 'class-transformer';
import { DeepPartial } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create.dto';

@ApiTags('adminUser')
@ApiBearerAuth('Jwt')
@Controller('admin/user')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminUserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    type: UserDto,
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiOperation({
    operationId: 'create',
  })
  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = this.userService.createAndSave(body);
    return plainToInstance(UserDto, user);
  }

  @ApiResponse({
    status: 200,
  })
  @ApiBody({
    type: UserEntity,
  })
  @ApiOperation({
    operationId: 'update',
  })
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: DeepPartial<UserEntity>) {
    await this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'active',
  })
  @ApiResponse({
    status: 204,
    description: 'The exercise has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the exercise to delete',
    required: true,
    example: 1,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        active: {
          type: 'boolean',
        },
      },
    },
  })
  async active(@Param('id') id: number, @Body('active') active = false) {
    try {
      await this.userService.active(id, active);
    } catch (error) {
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    }
  }
}
