import { PartialType, PickType } from '@nestjs/swagger';
import { CreateBreedDTO } from './createBreed.dto';

export class ReadAllBreedQueryDTO extends PartialType(
  PickType(CreateBreedDTO, ['type'] as const),
) {}
