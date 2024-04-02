import { PartialType } from '@nestjs/swagger';
import { CreateBreedDTO } from './createBreed.dto';

export class UpdateBreedDTO extends PartialType(CreateBreedDTO) {}
