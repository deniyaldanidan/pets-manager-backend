import { IsEnum } from 'class-validator';
import { IsBreedname } from 'src/decorators/is-breedname.decorator';

export class CreateBreedDTO {
  @IsBreedname({
    message:
      'Invalid breed name. Should only contain alphanumeric characted and space.',
  })
  name: string;

  @IsEnum(['CAT', 'DOG'], {
    message: 'Invalid type value. Should be CAT or DOG',
  })
  type: 'CAT' | 'DOG';
}
