import { IsNotEmpty, IsString } from 'class-validator';

export class SaveGameModeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
