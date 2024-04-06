import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBreedDTO } from './dto/createBreed.dto';
import slugify from 'slugify';
import { UpdateBreedDTO } from './dto/updateBreed.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ReadAllBreedQueryDTO } from './dto/readAllBreadQuery.dto';

@Injectable()
export class BreedService {
  constructor(private readonly prismaService: PrismaService) {}

  private slugify_breed(name: string) {
    return slugify(name, {
      replacement: '-',
      lower: true,
      trim: true,
    });
  }

  public async readAll(type: ReadAllBreedQueryDTO['type']) {
    const breeds = await this.prismaService.breed.findMany({
      where: {
        type,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return breeds;
  }

  public async createOne(data: CreateBreedDTO) {
    const slug = this.slugify_breed(data.name);

    try {
      const newBreed = await this.prismaService.breed.create({
        data: { name: data.name, type: data.type, slug },
      });

      return { newBreed };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Breed already exists');
      }
      throw new InternalServerErrorException('Unknown error happened');
    }
  }

  public async updateOne(slug: string, data: UpdateBreedDTO) {
    try {
      const updatedBreed = await this.prismaService.breed.update({
        where: { slug },
        data: {
          name: data?.name,
          type: data?.type,
          slug: data?.name?.length ? this.slugify_breed(data.name) : undefined,
        },
      });

      return updatedBreed;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Requested breed not found');
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Similar breed already exists');
        }
      }
      console.log(error);
      throw new InternalServerErrorException('Unknown error happened');
    }
  }

  public async deleteOne(slug: string) {
    try {
      await this.prismaService.breed.delete({ where: { slug } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return { message: 'Requested resource seems already deleted' };
        }
      }
      console.log(error);
      throw new InternalServerErrorException('Unknown error happened');
    }
  }
}
