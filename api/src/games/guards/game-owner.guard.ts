import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Game } from 'entities';
import { User } from 'entities';
import { GamesService } from 'games/games.service';

@Injectable()
export class GameOwnerGuard implements CanActivate {
  constructor(private readonly gamesService: GamesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const gameId = request.params.gameId;

    const game: Game = await this.gamesService.findOne({ id: gameId }, [
      'creator',
      'thumbnail',
      'links',
    ]);

    if (!game) {
      throw new UnauthorizedException('Game not found');
    }

    if (game.creator.id !== user.id) {
      throw new UnauthorizedException('You are not the owner of this game');
    }

    request.game = game;

    return true;
  }
}
