import { Module } from '@nestjs/common';
import { RehomepetController } from './rehomepet.controller';
import { RehomepetService } from './rehomepet.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RehomepetController],
  providers: [RehomepetService, PrismaService],
})
export class RehomepetModule {}
