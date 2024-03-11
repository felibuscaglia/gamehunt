import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInstance,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
  ArrayUnique
} from 'class-validator';
import { GameLink, GameMode, Image, Platform, Subgenre } from 'entities';
import { GamePricing } from 'games/lib/enums';

export class SaveGameDto {
  @IsBoolean()
  creatorInvolvedInDevelopment: boolean;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  tagline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(260)
  description?: string;

  @IsOptional()
  @IsEnum(GamePricing)
  pricing?: GamePricing;

  @IsDefined()
  @IsArray()
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => Subgenre)
  subgenres: Subgenre[];

  @IsDefined()
  @IsArray()
  @ArrayMaxSize(11)
  @ValidateNested({ each: true })
  @Type(() => GameLink)
  @ArrayUnique<GameLink>(gl => gl.platform)
  links: GameLink[];

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @IsInstance(Image)
  thumbnail?: Image;

  @IsDefined()
  @IsArray()
  @ArrayMaxSize(9)
  @ValidateNested({ each: true })
  @Type(() => Image)
  gallery: Image[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Platform)
  platforms: Platform[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GameMode)
  modes: GameMode[];

  @IsOptional()
  @IsString()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(520)
  storyline?: string;
}
