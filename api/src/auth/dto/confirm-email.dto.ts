import { IsJWT, IsNotEmpty } from 'class-validator';

export class ConfirmEmailDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
