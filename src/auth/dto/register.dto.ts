import {
  IsEmail,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsFullname } from 'src/decorators/is-fullname.decorator';

export const usernameREGEX = /^[A-Za-z0-9\-_]*$/;

export class RegisterDTO {
  @IsFullname({ message: 'Invalid name' })
  name: string;

  @Matches(usernameREGEX, { message: 'Invalid username' })
  @MinLength(2)
  @MaxLength(24)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}
