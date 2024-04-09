import { CUSTOM_EMAIL_ERROR_MESSAGE } from 'auth/lib/constants';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserProviders } from 'users/lib/enums';

export class SignUpDto {
  @IsNotEmpty({ message: 'Full name must not be empty' })
  fullName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: CUSTOM_EMAIL_ERROR_MESSAGE })
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(UserProviders)
  provider?: UserProviders;
}
