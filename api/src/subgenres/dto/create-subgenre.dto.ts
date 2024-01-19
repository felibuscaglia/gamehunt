import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateSubgenreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  genreId: number;
}
