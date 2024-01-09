import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, User } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gamesRepository: Repository<Game>,
  ) {}

  public create(user: User) {
    const newGame = new Game();

    newGame.creator = user;

    return this.gamesRepository.save(newGame);
  }
}
