import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { Game, User } from '../entities';
import { GamesService } from './games.service';
import { SaveGameDto } from './dto';
import { GameOwnerGuard } from './guards';
import { CurrentGame } from './decorators';
import { GameStatus } from './lib/enums';
import { ILike } from 'typeorm';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getGames(
    @Query('q') query?: string,
    @Query('date') date?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return date
      ? this.gamesService.findByDate(date, limit, offset)
      : this.gamesService.find({
          name: ILike(`${query}%`),
          status: GameStatus.PUBLISHED,
        });
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  getMyGames(@CurrentUser('id') userId: string) {
    return this.gamesService.find({ creator: { id: userId } }, ['thumbnail']);
  }

  @UseGuards(JwtGuard, GameOwnerGuard)
  @Get('/me/:gameId')
  getDraftGame(@CurrentGame() draftGame: Game) {
    return draftGame;
  }

  @Get('/:gameUrlSlug')
  getGameByUrlSlug(@Param('gameUrlSlug') gameUrlSlug: string) {
    return this.gamesService.findOne(
      {
        urlSlug: gameUrlSlug,
        status: GameStatus.PUBLISHED,
      },
      [
        'thumbnail',
        'links',
        'creator',
        'creator.profilePicture',
        'upvotes',
        'comments',
        'comments.author',
        'comments.replies',
        'comments.replies.author',
        'comments.parent',
      ],
    );
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

  @UseGuards(JwtGuard, GameOwnerGuard)
  @Delete('/:gameId')
  deleteGame(@CurrentGame() game: Game) {
    return this.gamesService.delete(game);
  }

  @UseGuards(JwtGuard)
  @Post('/:gameId/upvote')
  async upvoteGame(@Param('gameId') gameId: string, @CurrentUser() user: User) {
    return await this.gamesService.upvote(gameId, user);
  }

  @UseGuards(JwtGuard)
  @Delete('/:gameId/downvote')
  async downvoteGame(
    @Param('gameId') gameId: string,
    @CurrentUser() user: User,
  ) {
    return await this.gamesService.downvote(gameId, user);
  }
}
