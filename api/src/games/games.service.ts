import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, User } from '../entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PublishGameDto, SaveGameDto } from './dto';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { GameStatus } from './lib/enums';
import { formatUrlSlug, formatValidationErrors } from 'users/lib/helpers';
import { GameLinksService } from 'game-links/game-links.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from 'lib/enums';
import { NotificationType } from 'notifications/lib/enums';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gamesRepository: Repository<Game>,
    private readonly gameLinksService: GameLinksService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public create(user: User) {
    const newGame = new Game();

    newGame.creator = user;
    newGame.postedAt = null;

    return this.gamesRepository.save(newGame);
  }

  public find(whereOptions: FindOptionsWhere<Game>, relations: string[] = []) {
    return this.gamesRepository.find({
      where: whereOptions,
      relations,
    });
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

  public async findByDate(date: string, limit?: number, offset?: number) {
    const utcDate = new Date(date);
    utcDate.setUTCHours(0, 0, 0, 0);

    let queryBuilder = this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.thumbnail', 'thumbnail')
      .leftJoinAndSelect('game.subgenres', 'subgenre')
      .leftJoinAndSelect('game.upvotes', 'upvotes')
      .where('DATE(game.posted_at) = DATE(:date) AND game.status = :status', {
        date: utcDate.toISOString().slice(0, 10),
        status: GameStatus.PUBLISHED,
      });

    if (!isNaN(limit)) {
      queryBuilder = queryBuilder.limit(limit);
    }

    if (!isNaN(offset)) {
      queryBuilder = queryBuilder.offset(offset * (limit || 0));
    }

    return (await queryBuilder.getMany()).sort(
      (game1, game2) => game2.upvotes.length - game1.upvotes.length,
    );
  }

  public async upvote(gameId: string, user: User) {
    const GAME = await this.findOne({ id: gameId }, ['upvotes', 'creator']);

    if (!GAME) {
      throw new NotFoundException('Game not found');
    }

    if (GAME.upvotes.some((upvote) => upvote.id === user.id)) {
      throw new BadRequestException("Users can't upvote the same game twice");
    }

    GAME.upvotes.push(user);

    this.eventEmitter.emit(Event.NOTIFY_USER, {
      game: GAME,
      sender: user,
      type: NotificationType.UPVOTE,
    });

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
    game.postedAt = new Date();
    game.urlSlug = await this.generateUrlSlug(game.name);

    return this.gamesRepository.save(game);
  }

  public delete(game: Game) {
    if (game.status !== GameStatus.DRAFT) {
      throw new BadRequestException('Only draft games can be deleted');
    }

    return this.gamesRepository.delete(game.id);
  }

  private async generateUrlSlug(gameName: string) {
    let urlSlug = formatUrlSlug(gameName);
    let counter = 1;
    let existingGameWithSlug = await this.findOne({ urlSlug });
    
    while (existingGameWithSlug) {
      urlSlug = `${formatUrlSlug(gameName)}-${counter}`;
      counter++;
      existingGameWithSlug = await this.findOne({ urlSlug });
    }

    return urlSlug;
  }
}
