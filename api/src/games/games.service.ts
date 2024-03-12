import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameLink, User } from 'entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PublishGameDto, SaveGameDto } from './dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { GameStatus } from './lib/enums';
import { formatValidationErrors } from 'users/lib/helpers';
import { GameLinksService } from 'game-links/game-links.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gamesRepository: Repository<Game>,
    private readonly gameLinksService: GameLinksService,
  ) {}

  public create(user: User) {
    const newGame = new Game();

    newGame.creator = user;

    return this.gamesRepository.save(newGame);
  }

  public findOne(
    whereOptions: FindOptionsWhere<Game>,
    relations: string[] = [],
  ) {
    return this.gamesRepository.findOne({
      where: whereOptions,
      relations,
    });
  }

  public async save(id: string, dto: SaveGameDto) {
    return this.gamesRepository.save({
      id,
      ...dto,
      links: await this.gameLinksService.bulkSave(dto.links),
    });
  }

  public async publish(game: Game) {
    const gameErrors = await validate(plainToInstance(PublishGameDto, game));

    if (gameErrors.length) {
      throw new BadRequestException({
        errors: formatValidationErrors(gameErrors),
      });
    }

    game.status = GameStatus.PUBLISHED;

    return this.gamesRepository.save(game);
  }
}
