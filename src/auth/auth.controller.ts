import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto, res);
  }

  @Post('/register')
  public register(
    @Body(new ValidationPipe({ whitelist: true })) registerDTO: RegisterDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(registerDTO, res);
  }

  @Post('/logout')
  public logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }

  @Post('/refresh')
  public refresh(@Req() req: Request) {
    return this.authService.refresh(req);
  }
}
