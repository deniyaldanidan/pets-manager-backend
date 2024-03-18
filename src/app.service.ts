import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(req: Request): string {
    return 'Hello User!' + req['username'] + req['user_id'] + req['user_role'];
  }
}
