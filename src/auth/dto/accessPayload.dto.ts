import {
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsFullname } from 'src/decorators/is-fullname.decorator';
import { usernameREGEX } from './register.dto';
import { Expose } from 'class-transformer';

export default class AccessPayload {
  @Expose()
  @IsString()
  @Matches(usernameREGEX, { message: 'Invalid username' })
  @MinLength(2)
  @MaxLength(24)
  username: string;

  @Expose()
  @IsFullname()
  name: string;

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsEnum(['USER', 'ADMIN'])
  role: 'USER' | 'ADMIN';
}
