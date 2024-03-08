import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { User } from 'entities';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  
  @UseGuards(JwtGuard)
  @Post()
  async createGame(@CurrentUser() user: User) {
    return await this.gamesService.create(user);
  }

}
