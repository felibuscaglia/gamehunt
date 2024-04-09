import {  IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  newPasswordConfirmation: string;

  @IsNotEmpty()
  @IsString()
  @Length(64, 64)
  token: string;

  @IsNotEmpty()
  @IsUUID('all')
  userId: string;
}
