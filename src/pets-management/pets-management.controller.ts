import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PetsManagementService } from './pets-management.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/decorators/role.decorator';

@Controller('pets-management')
export class PetsManagementController {
  constructor(private readonly petsManagementService: PetsManagementService) {}

  @Role('ADMIN')
  @UseGuards(AuthGuard)
  @Get('/')
  getAll(
    @Query('pageNo', new ParseIntPipe({ optional: true })) pageNo?: number,
  ) {
    return this.petsManagementService.getAll(pageNo);
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard)
  @Put('/approve/:petId')
  approvePet(@Param('petId', ParseIntPipe) petId: number) {
    return this.petsManagementService.approve(petId);
  }
}
