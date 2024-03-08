import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameCreator, User } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gamesRepository: Repository<Game>,
    @InjectRepository(GameCreator)
    private readonly gameCreatorsRepository: Repository<GameCreator>,
  ) {}

  public async create(user: User) {
    const newGame = new Game();

    const savedGame = await this.gamesRepository.save(newGame);

    const newCreator = new GameCreator();

    newCreator.game = savedGame;
    newCreator.user = user;

    const { game, ...gameCreator } =
      await this.gameCreatorsRepository.save(newCreator);

    savedGame.creators = [gameCreator as GameCreator];

    return savedGame;
  }
}
