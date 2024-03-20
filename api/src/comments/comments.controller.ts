import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'auth/guards';
import { SaveCommentDto } from './dto';
import { CurrentUser } from 'auth/decorators';
import { User } from 'entities';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseGuards(JwtGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post()
  async saveComment(
    @Body() saveCommentDto: SaveCommentDto,
    @CurrentUser() user: User,
  ) {
    return await this.commentsService.save(saveCommentDto, user);
  }
}
