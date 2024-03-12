import { IsEnum, IsOptional, IsString } from "class-validator";
import { Platform } from "games/lib/enums";

export class CreateGameLinkDto {
    @IsOptional()
    @IsString()
    url?: string;

    @IsOptional()
    @IsEnum(Platform)
    platform?: Platform;
}