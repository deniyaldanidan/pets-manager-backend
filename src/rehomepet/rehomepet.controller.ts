import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RehomepetService } from './rehomepet.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { validationExceptionFactory } from 'src/exceptions/validation.exception';
import { CreatePetDTO } from './dto/CreatePet.dto';
import { Request } from 'express';
import { UpdatePetDTO } from './dto/UpdatePet.dto';

@Controller('rehome-a-pet')
export class RehomepetController {
  constructor(private readonly rehomepetService: RehomepetService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  createOne(
    @Req() req: Request,
    @Body(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: validationExceptionFactory,
      }),
    )
    createData: CreatePetDTO,
  ) {
    return this.rehomepetService.createPet(req, createData);
    // return createData;
  }

  @UseGuards(AuthGuard)
  @Get('/')
  myPets(@Req() req: Request) {
    return this.rehomepetService.myPets(req);
  }

  @UseGuards(AuthGuard)
  @Put('/:petId')
  updateOne(
    @Req() req: Request,
    @Param(
      'petId',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('Invalid pet id');
        },
      }),
    )
    petId: number,
    @Body(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: validationExceptionFactory,
      }),
    )
    updatePetDTO: UpdatePetDTO,
  ) {
    return this.rehomepetService.updatePet(req, petId, updatePetDTO);
  }

  @UseGuards(AuthGuard)
  @Delete('/:petId')
  deleteOne(
    @Req() req: Request,
    @Param(
      'petId',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('Invalid pet id');
        },
      }),
    )
    petId: number,
  ) {
    return this.rehomepetService.deletePet(req, petId);
  }
}
