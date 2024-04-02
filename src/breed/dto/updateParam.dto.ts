import { IsBreedSlug } from 'src/decorators/is-breedslug.decorator';

export class UpdateParamDTO {
  @IsBreedSlug({ message: 'Invalid slug' })
  slug: string;
}
