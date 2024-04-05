import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ILike } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUsers(@Query('q') nameQuery?: string, @Query('limit') limit?: number) {
    return this.usersService.findMany(
      {
        fullName: ILike(`${nameQuery}%`),
      },
      limit,
    );
  }

  @Get('/:username/profile')
  getProfileByUsername(@Param('username') username: string) {
    return this.usersService.findProfileByUsername(username);
  }
}
