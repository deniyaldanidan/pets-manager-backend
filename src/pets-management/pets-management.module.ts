import { Module } from '@nestjs/common';
import { PetsManagementController } from './pets-management.controller';
import { PetsManagementService } from './pets-management.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PetsManagementController],
  providers: [PetsManagementService, PrismaService],
})
export class PetsManagementModule {}
