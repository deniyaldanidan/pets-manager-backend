import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PetsManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(pageNo?: number) {
    const pageContents = 10;
    const pageNumber = pageNo <= 0 ? 1 : pageNo;
    try {
      const data = await this.prismaService.pet.findMany({
        skip: (pageNumber - 1) * pageContents,
        take: pageContents,
        include: {
          breed: { select: { name: true, slug: true } },
          owner: { select: { name: true, username: true } },
        },
        orderBy: {
          id: 'desc',
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async approve(petId: number) {
    try {
      const updatedPet = await this.prismaService.pet.update({
        where: { id: petId },
        data: { approved: true, approved_at: new Date() },
      });
      return updatedPet;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Requested resource not found');
        }
      }
      console.log(error);
      throw new InternalServerErrorException('Unknown Error Happened');
    }
  }
}
