import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  pong() {
    return { message: 'pong' };
  }
}
