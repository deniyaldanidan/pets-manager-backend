import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BreedService } from './breed.service';
import { Role } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBreedDTO } from './dto/createBreed.dto';
import { validationExceptionFactory } from 'src/exceptions/validation.exception';
import { UpdateParamDTO } from './dto/updateParam.dto';
import { UpdateBreedDTO } from './dto/updateBreed.dto';
import { ReadAllBreedQueryDTO } from './dto/readAllBreadQuery.dto';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get('/')
  public findAll(
    @Query(new ValidationPipe({ exceptionFactory: validationExceptionFactory }))
    { type }: ReadAllBreedQueryDTO,
  ) {
    return this.breedService.readAll(type);
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard)
  @Post('/')
  public createOne(
    @Body(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: validationExceptionFactory,
      }),
    )
    data: CreateBreedDTO,
  ) {
    return this.breedService.createOne(data);
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard)
  @Put('/:slug')
  public updateOne(
    @Param(new ValidationPipe({ exceptionFactory: validationExceptionFactory }))
    { slug }: UpdateParamDTO,
    @Body(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: validationExceptionFactory,
      }),
    )
    data: UpdateBreedDTO,
  ) {
    return this.breedService.updateOne(slug, data);
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard)
  @Delete('/:slug')
  public deleteOne(
    @Param(new ValidationPipe({ exceptionFactory: validationExceptionFactory }))
    { slug }: UpdateParamDTO,
  ) {
    return this.breedService.deleteOne(slug);
  }
}
