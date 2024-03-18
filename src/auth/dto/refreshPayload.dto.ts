import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { usernameREGEX } from './register.dto';
import { Expose } from 'class-transformer';

export default class RefreshPayload {
  @Expose()
  @IsString()
  @Matches(usernameREGEX, { message: 'Invalid username' })
  @MinLength(2)
  @MaxLength(24)
  username: string;
}
