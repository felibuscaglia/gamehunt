import { CUSTOM_EMAIL_ERROR_MESSAGE } from 'auth/lib/constants';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: CUSTOM_EMAIL_ERROR_MESSAGE })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
