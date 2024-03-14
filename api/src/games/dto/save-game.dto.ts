import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
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
  @MaxLength(80)
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
  @ArrayUnique<Subgenre>(sg => sg.name)
  subgenres: Subgenre[];

  @IsDefined()
  @IsArray()
  @ArrayMaxSize(11)
  links: GameLink[];

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
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
  videoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(520)
  storyline?: string;
}
