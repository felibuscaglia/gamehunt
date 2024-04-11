import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveCommentDto } from './dto';
import { Comment, Game, User } from '../entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from 'lib/enums';
import { NotificationType } from 'notifications/lib/enums';
import { GamesService } from 'games/games.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly eventEmitter: EventEmitter2,
    private readonly gamesService: GamesService
  ) {}

  public async save(dto: SaveCommentDto, user: User) {
    const NEW_COMMENT = new Comment();
    const GAME = await this.gamesService.findOne({ id: dto.gameId }, ['creator'])

    NEW_COMMENT.author = user;
    NEW_COMMENT.game = GAME;
    NEW_COMMENT.content = dto.content;

    if (dto.parentCommentId) {
      await this.validateReply(dto.parentCommentId);
      const PARENT_COMMENT = new Comment();
      PARENT_COMMENT.id = dto.parentCommentId;
      NEW_COMMENT.parent = PARENT_COMMENT;
    }

    const SAVED_COMMENT = await this.commentsRepository.save(NEW_COMMENT);

    this.eventEmitter.emit(Event.NOTIFY_USER, {
      game: GAME,
      sender: user,
      type: NotificationType.COMMENT,
    });

    return SAVED_COMMENT;
  }

  private async validateReply(parentCommentId: number) {
    const COMMENT = await this.commentsRepository.findOne({
      where: { id: parentCommentId },
      relations: ['parent'],
    });

    if (!COMMENT) {
      throw new NotFoundException('Comment was removed or does not exist');
    }

    if (COMMENT.parent) {
      throw new ConflictException('Replies cannot be replied to');
    }
  }
}
