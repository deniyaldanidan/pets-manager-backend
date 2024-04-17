import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPets() {
    try {
      const data = await this.prismaService.pet.findMany({
        where: {
          approved: true,
        },
        include: {
          breed: {
            select: { name: true, slug: true },
          },
          owner: {
            select: { name: true, username: true },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Unknown Error Happened');
    }
  }

  async getPet(petId: number) {
    try {
      const foundPet = await this.prismaService.pet.findFirstOrThrow({
        where: { id: petId },
        include: {
          breed: {
            select: { name: true, slug: true },
          },
          owner: {
            select: { name: true, username: true },
          },
        },
      });
      return foundPet;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Unknown Error Happened');
    }
  }

  async privatePetView(req: Request, petId: number) {
    try {
      const foundPet = await this.prismaService.pet.findFirstOrThrow({
        where: {
          id: petId,
          user_id: req['user_role'] === 'ADMIN' ? undefined : req['user_id'],
        },
        include: {
          breed: {
            select: {
              name: true,
              slug: true,
            },
          },
          owner: {
            select: { name: true, username: true },
          },
        },
      });
      return foundPet;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Requested pet not found');
        }
      }

      console.log(error);
      throw new InternalServerErrorException('Unknown Error Happened');
    }
  }
}
