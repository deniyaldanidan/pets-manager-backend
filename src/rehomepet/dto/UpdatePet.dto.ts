import { PartialType } from '@nestjs/swagger';
import { CreatePetDTO } from './CreatePet.dto';

export class UpdatePetDTO extends PartialType(CreatePetDTO) {}
