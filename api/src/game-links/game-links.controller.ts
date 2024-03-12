import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'auth/guards';
import { CreateGameLinkDto } from './dto';
import { GameLinksService } from './game-links.service';

@Controller('game-links')
@UseGuards(JwtGuard)
export class GameLinksController {
  constructor(private readonly gameLinksService: GameLinksService) {}

  @Post()
  createGameLink(@Body() createGameLinkDto: CreateGameLinkDto) {
    return this.gameLinksService.create(createGameLinkDto);
  }

  @Delete('/:gameLinkId')
  deleteGameLink(@Param('gameLinkId') gameLinkId: string) {
    return this.gameLinksService.delete(gameLinkId);
  }
}
