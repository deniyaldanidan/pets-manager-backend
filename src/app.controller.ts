import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Role } from './decorators/role.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Role('USER')
  @UseGuards(AuthGuard)
  @Get()
  getHello(@Req() req: Request): string {
    return this.appService.getHello(req);
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard)
  @Get('/admin')
  getAdmin(): string {
    return 'Hello Admin';
  }
}
