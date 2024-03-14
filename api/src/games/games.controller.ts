import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { Game, User } from 'entities';
import { GamesService } from './games.service';
import { SaveGameDto } from './dto';
import { GameOwnerGuard } from './guards';
import { CurrentGame } from './decorators';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getGames(@Query('date') date?: string) {
    return date ? this.gamesService.findByDate(date) : [];
  }

  @UseGuards(JwtGuard)
  @Post()
  createGame(@CurrentUser() user: User) {
    return this.gamesService.create(user);
  }

  @UseGuards(JwtGuard, GameOwnerGuard)
  @Patch('/:gameId')
  saveGame(@Param('gameId') gameId: string, @Body() dto: SaveGameDto) {
    return this.gamesService.save(gameId, dto);
  }

  @UseGuards(JwtGuard, GameOwnerGuard)
  @Post('/:gameId/publish')
  publishGame(@CurrentGame() game: Game) {
    return this.gamesService.publish(game);
  }
}
