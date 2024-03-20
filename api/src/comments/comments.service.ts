import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveCommentDto } from './dto';
import { Comment, Game, User } from 'entities';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  public save(dto: SaveCommentDto, user: User) {
    const newComment = new Comment();
    const game = new Game();

    game.id = dto.gameId;

    newComment.author = user;
    newComment.game = game;
    newComment.content = dto.content;

    return this.commentsRepository.save(newComment);
  }
}
