import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import validator from 'validator';
import RefreshPayload from './dto/refreshPayload.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import AccessPayload from './dto/accessPayload.dto';

@Injectable()
export class AuthService {
  private readonly refreshExpiresString: string = '24h';
  private readonly refreshExpiresMilliSeconds: number = 24 * 60 * 60 * 1000;
  private readonly refreshSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.refreshSecret = this.configService.get('REFRESH_SECRET');
  }

  private signRefresh(payload: RefreshPayload) {
    return this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresString,
    });
  }

  private async verifyRefresh(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.refreshSecret,
      });

      const payloadClass = plainToInstance(RefreshPayload, payload, {
        excludeExtraneousValues: true,
      });

      await validateOrReject(payloadClass);
      return payloadClass;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  public async register(registerData: RegisterDTO, res: Response) {
    //! find if an user exist? If throws an Error else register him in

    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { username: registerData.username },
          { email: registerData.email },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists. Try logging in');
    }

    const hashedPWD = await bcrypt.hash(registerData.password, 10);
    const refreshToken = this.signRefresh({ username: registerData.username });

    const newUser = await this.prismaService.user.create({
      data: {
        username: registerData.username,
        email: registerData.email,
        name: registerData.name,
        password: hashedPWD,
        refresh: refreshToken,
      },
    });

    const accessPayload: AccessPayload = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
    };
    const accessToken = this.jwtService.sign(accessPayload);

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      maxAge: this.refreshExpiresMilliSeconds,
    });
    return { accessToken };
  }

  public async login(loginData: LoginDto, res: Response) {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { username: loginData.usernameOrEmail },
          { email: loginData.usernameOrEmail },
        ],
      },
    });

    if (!existingUser) {
      throw new ConflictException("User doesn't exist. Register first");
    }

    const pwdMatch: boolean = await bcrypt.compare(
      loginData.password,
      existingUser.password,
    );

    if (!pwdMatch) {
      throw new ConflictException('Invalid credentials.');
    }
    //! signing new refresh-token
    const refresh = this.signRefresh({ username: existingUser.username });
    //! signing new access-token
    const accessPayload: AccessPayload = {
      id: existingUser.id,
      name: existingUser.name,
      username: existingUser.username,
      role: existingUser.role,
    };
    const accessToken = this.jwtService.sign(accessPayload);

    //! updating the refresh value in DB
    await this.prismaService.user.update({
      where: { username: existingUser.username },
      data: {
        refresh,
      },
    });

    res.cookie('refresh', refresh, {
      httpOnly: true,
      maxAge: this.refreshExpiresMilliSeconds,
    });
    return { accessToken };
  }

  public async logout(req: Request, res: Response) {
    const ref_token = req.cookies?.refresh;
    res.cookie('refresh', '', { maxAge: 0, httpOnly: true });

    if (typeof ref_token !== 'string' || !validator.isJWT(ref_token)) {
      return;
    }

    const existingUser = await this.prismaService.user.findFirst({
      where: { refresh: ref_token },
    });

    if (!existingUser) {
      return;
    }

    await this.prismaService.user.update({
      where: { username: existingUser.username },
      data: { refresh: '' },
    });

    return;
  }

  public async refresh(req: Request) {
    const ref_token = req.cookies?.refresh;

    if (typeof ref_token !== 'string' || !validator.isJWT(ref_token)) {
      throw new BadRequestException('Invalid token');
    }

    try {
      const { username } = await this.verifyRefresh(ref_token);

      const existingUser = await this.prismaService.user.findFirstOrThrow({
        where: { username, refresh: ref_token },
      });

      //! signing new access-token and send to the user
      const accessPayload: AccessPayload = {
        id: existingUser.id,
        name: existingUser.name,
        username: existingUser.username,
        role: existingUser.role,
      };
      const accessToken = this.jwtService.sign(accessPayload);
      return { accessToken };
    } catch (error) {
      throw new BadRequestException('Invalid Token');
    }
  }
}
