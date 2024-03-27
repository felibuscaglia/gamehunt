import {
  IsBoolean,
  IsLowercase,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Image } from '../../entities';

export class PatchMeDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  @IsLowercase()
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  tagline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  about?: string;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  profilePicture?: Image;

  @IsOptional()
  @IsBoolean()
  isSubscribedToNewsletter: boolean;
}
