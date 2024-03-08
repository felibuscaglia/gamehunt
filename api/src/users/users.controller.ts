import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { User } from 'entities';
import { UsersService } from './users.service';
import { ILike } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get('/me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Get()
  getUsers(@Query('q') nameQuery?: string, @Query('limit') limit?: number) {
    return this.usersService.findMany(
      {
        fullName: ILike(`%${nameQuery}%`),
      },
      limit,
    );
  }
}
