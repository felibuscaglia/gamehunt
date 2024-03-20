import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SaveCommentDto {
    @IsNotEmpty()
    @IsUUID()
    gameId: string;
    
    @IsNotEmpty()
    @IsString()
    content: string;
}