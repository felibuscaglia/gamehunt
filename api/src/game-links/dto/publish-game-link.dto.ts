import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Platform } from 'games/lib/enums';

export class PublishGameLinkDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl({}, { message: 'Not a valid URL' })
  url: string;

  @IsNotEmpty()
  @IsEnum(Platform)
  platform: Platform;
}
