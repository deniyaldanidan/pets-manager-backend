import { IsString, MaxLength } from 'class-validator';
import { IsUserNameOrEmail } from 'src/decorators/is-username-or-email.decorator';

export class LoginDto {
  @IsUserNameOrEmail({ message: 'invalid username or email' })
  usernameOrEmail: string;

  @IsString()
  @MaxLength(30)
  password: string;
}
