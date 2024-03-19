import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, User } from 'entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PublishGameDto, SaveGameDto } from './dto';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { GameStatus } from './lib/enums';
import { formatUrlSlug, formatValidationErrors } from 'users/lib/helpers';
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

  public findByDate(date: string) {
    return this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.thumbnail', 'thumbnail')
      .leftJoinAndSelect('game.subgenres', 'subgenre')
      .where('DATE(game.created_at) = Date(:date) AND status = :status', {
        date,
        status: GameStatus.PUBLISHED,
      })
      .getMany();
  }

  public async upvote(gameId: string, user: User) {
    const GAME = await this.findOne({ id: gameId }, ['upvotes']);

    if (!GAME) {
      throw new NotFoundException('Game not found');
    }

    if (GAME.upvotes.some((upvote) => upvote.id === user.id)) {
      throw new BadRequestException("Users can't upvote the same game twice");
    }

    GAME.upvotes.push(user);

    return this.gamesRepository.save(GAME);
  }

  public async downvote(gameId: string, user: User) {
    const GAME = await this.findOne({ id: gameId }, ['upvotes']);

    if (!GAME) {
      throw new NotFoundException('Game not found');
    }

    GAME.upvotes = GAME.upvotes.filter((upvote) => upvote.id !== user.id);

    return this.gamesRepository.save(GAME);
  }

  public async save(id: string, dto: SaveGameDto) {
    return this.gamesRepository.save({
      id,
      ...dto,
      links: await this.gameLinksService.bulkSave(dto.links),
    });
  }

  public async publish(game: Game) {
    game.videoUrl = game.videoUrl || null;

    const GAME_ERRORS = await validate(plainToInstance(PublishGameDto, game));

    let linkErrors: ValidationError[] = [];

    for (const LINK of game.links) {
      const CURR_LINK_ERRORS = await this.gameLinksService.validate(LINK);
      linkErrors = linkErrors.concat(CURR_LINK_ERRORS);

      if (linkErrors.length) {
        break;
      }
    }

    if (GAME_ERRORS.length || linkErrors.length) {
      const FORMATTED_ERRORS: any = formatValidationErrors(GAME_ERRORS);

      if (linkErrors.length) {
        FORMATTED_ERRORS.links = [
          ...(FORMATTED_ERRORS.links || []),
          'Some links are invalid. Please ensure that all links have a valid distribution channel selected and a correctly formatted URL.',
        ];
      }

      throw new BadRequestException({
        errors: FORMATTED_ERRORS,
      });
    }

    game.status = GameStatus.PUBLISHED;
    game.urlSlug = formatUrlSlug(game.name);

    return this.gamesRepository.save(game);
  }
}
