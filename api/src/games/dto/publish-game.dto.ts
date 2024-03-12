import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { GameLink, GameMode, Image, Platform, Subgenre, User } from 'entities';
import { GamePricing } from 'games/lib/enums';

export class PublishGameDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsDefined()
  @Type(() => User)
  creator: User;

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

  @IsNotEmpty()
  @IsString()
  @MaxLength(260)
  description: string;

  @IsNotEmpty()
  @IsEnum(GamePricing)
  pricing: GamePricing;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => Subgenre)
  @ArrayUnique<Subgenre>((sg) => sg.name)
  subgenres: Subgenre[];

  @IsDefined()
  @IsArray({ message: 'At least one link needs to be added' })
  @ArrayMinSize(1)
  @ArrayMaxSize(11)
  @ValidateNested({ each: true })
  @Type(() => GameLink)
  @ArrayUnique<GameLink>((gl) => gl.platform, {
    message: 'Some distribution channels are duplicated',
  })
  links: GameLink[];

  @IsObject()
  @IsNotEmptyObject()
  thumbnail: Image;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(9)
  @ValidateNested({ each: true })
  @Type(() => Image)
  gallery: Image[];

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Platform)
  @ArrayUnique<Platform>((p) => p.id, {
    message: 'Platforms are duplicated',
  })
  platforms: Platform[];

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GameMode)
  @ArrayUnique<GameMode>((gm) => gm.id, {
    message: 'Game modes are duplicated',
  })
  modes: GameMode[];

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Not a valid URL' })
  videoUrl?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(520)
  storyline: string;
}
