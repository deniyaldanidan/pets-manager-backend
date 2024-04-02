import { Module } from '@nestjs/common';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BreedController],
  providers: [BreedService, PrismaService],
})
export class BreedModule {}
