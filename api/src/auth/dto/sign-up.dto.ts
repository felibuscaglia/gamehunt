import { CUSTOM_EMAIL_ERROR_MESSAGE } from 'auth/lib/constants';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: "Full name must not be empty" })
  fullName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: CUSTOM_EMAIL_ERROR_MESSAGE })
  email: string;

  @IsNotEmpty()
  password: string;
}
