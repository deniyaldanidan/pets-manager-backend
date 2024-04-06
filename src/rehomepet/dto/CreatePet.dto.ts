import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsString,
  Length,
} from 'class-validator';
import { IsFullname } from 'src/decorators/is-fullname.decorator';
import { IsValidBreed } from 'src/decorators/is-valid-breed.decorator';
import { IsValidCity } from 'src/decorators/is-valid-city.decorator';
import { IsValidState } from 'src/decorators/is-valid-state.decorator';

export const petAge = [
  'PUPPYHOOD',
  'ADOLESCENCE',
  'ADULTHOOD',
  'SENIOR',
] as const;

export class CreatePetDTO {
  @IsFullname({ message: 'Invalid Pet Name' })
  name: string;

  @IsEnum(['CAT', 'DOG'], { message: 'Invalid pet type. Should be CAT or DOG' })
  type: 'CAT' | 'DOG';

  @IsEnum(petAge, { message: 'Invalid pet age value.' })
  age: (typeof petAge)[number];

  @IsEnum(['MALE', 'FEMALE'], {
    message: 'Invalid gender value. Should be MALE or FEMALE',
  })
  gender: 'MALE' | 'FEMALE';

  @IsBoolean({ message: 'should only be true or false' })
  vaccinated: boolean;

  @IsBoolean({ message: 'should only be true or false' })
  neutered: boolean;

  @IsBoolean({ message: 'should only be true or false' })
  sprayed: boolean;

  @IsBoolean({ message: 'should only be true or false' })
  shots_uptodate: boolean;

  @IsString()
  @Length(3, 600, { message: 'Should be between 3 and 600 chars' })
  reason: string;

  @IsString()
  @Length(3, 600, { message: 'Should be between 3 and 600 chars' })
  info: string;

  @IsString()
  @IsMobilePhone('en-IN', {}, { message: 'Invalid phone number' })
  phone: string;

  @IsInt()
  @IsValidBreed({ message: 'Invalid breed id.' })
  breed_id: number;

  @IsValidState({ message: 'Invalid state name' })
  state: string;

  @IsValidCity({ message: 'Invalid city Name' })
  city: string;
}
