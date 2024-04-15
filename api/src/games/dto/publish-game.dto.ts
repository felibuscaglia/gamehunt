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
import {
  GameLink,
  GameMode,
  Image,
  Platform,
  Subgenre,
  User,
} from '../../entities';
import { PublishGameLinkDto } from 'game-links/dto';
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
  @MaxLength(80)
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
  @Type(() => PublishGameLinkDto)
  @ValidateNested({ each: true })
  @ArrayUnique<GameLink>((gl) => gl.platform, {
    message:
      'Duplicate distribution channels detected. Please ensure each distribution channel is unique.',
  })
  links: PublishGameLinkDto[];

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
    message:
      'Duplicated platform entries found. Ensure each platform is listed only once.',
  })
  platforms: Platform[];

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GameMode)
  @ArrayUnique<GameMode>((gm) => gm.id, {
    message:
      'Duplicate game modes detected. Please ensure each game mode is listed only once.',
  })
  modes: GameMode[];

  @IsOptional()
  @IsString()
  @MaxLength(520)
  storyline?: string;
}
