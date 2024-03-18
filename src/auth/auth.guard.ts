import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import validator from 'validator';
import AccessPayload from './dto/accessPayload.dto';
import { validateOrReject } from 'class-validator';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/decorators/role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('');
    }

    try {
      const {
        username,
        id: user_id,
        role: user_role,
      } = await this.verifyAccess(token);

      const allowedRole = this.reflector.get<string>(
        Role,
        context.getHandler(),
      );

      if (allowedRole?.length && allowedRole !== user_role) {
        throw new Error('');
      }

      request['username'] = username;
      request['user_id'] = user_id;
      request['user_role'] = user_role;

      return true;
    } catch (error) {
      throw new UnauthorizedException('');
    }
  }

  private async verifyAccess(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const payloadClass = plainToInstance(AccessPayload, payload, {
        excludeExtraneousValues: true,
      });
      await validateOrReject(payloadClass);
      return payloadClass;
    } catch (error) {
      throw new Error();
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const token =
      request.headers?.authorization || request.headers?.Authorization;

    if (typeof token !== 'string' || !token.startsWith('Bearer ')) {
      return undefined;
    }

    const jwt = token.split(' ')[1];

    if (!validator.isJWT(jwt)) {
      return undefined;
    }
    return jwt;
  }
}
