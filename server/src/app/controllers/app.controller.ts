import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    description: 'The server is up and running',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'pong',
        },
      },
    },
  })
  @Get('ping')
  ping() {
    return this.appService.pong();
  }
}
