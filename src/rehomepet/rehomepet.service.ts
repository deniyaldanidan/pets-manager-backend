import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePetDTO } from './dto/CreatePet.dto';
import { Request } from 'express';
import { UpdatePetDTO } from './dto/UpdatePet.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RehomepetService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPet(req: Request, createData: CreatePetDTO) {
    try {
      const newPet = await this.prismaService.pet.create({
        data: { ...createData, user_id: req['user_id'] },
      });

      return newPet;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Unknown error happened');
    }
  }

  async myPets(req: Request) {
    try {
      const foundPets = await this.prismaService.pet.findMany({
        where: { user_id: req['user_id'] ?? '' },
        include: {
          breed: {
            select: { name: true, slug: true },
          },
          owner: {
            select: { username: true, name: true },
          },
        },
      });
      return foundPets.map((pets) => ({
        ...pets,
        breed_id: undefined,
        user_id: undefined,
      }));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Unknown Error Happened');
    }
  }

  async updatePet(req: Request, petId: number, updateData: UpdatePetDTO) {
    try {
      const updatedPet = await this.prismaService.pet.update({
        where: { id: petId, user_id: req['user_id'] ?? '' },
        data: updateData,
      });
      return updatedPet.id;
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

  async deletePet(req: Request, petId: number) {
    try {
      const deletedPet = await this.prismaService.pet.delete({
        where: {
          id: petId,
          user_id: req['user_role'] === 'ADMIN' ? undefined : req['user_id'],
        },
      });
      return deletedPet.id;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return { message: 'Requested pet not found' };
        }
      }
      console.log(error);
      throw new InternalServerErrorException('Unknown Error Happened');
    }
  }
}
