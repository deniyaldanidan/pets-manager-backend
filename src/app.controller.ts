import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllPet() {
    return this.appService.getAllPets();
  }

  @Get('/pet/view/:petId')
  getOnePet(@Param('petId', ParseIntPipe) petId: number) {
    return this.appService.getPet(petId);
  }

  @UseGuards(AuthGuard)
  @Get('/pet-private-view/:petId')
  petPrivateView(
    @Req() req: Request,
    @Param(
      'petId',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('Invalid pet Id');
        },
      }),
    )
    petId: number,
  ) {
    return this.appService.privatePetView(req, petId);
  }
}
