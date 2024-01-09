import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { User } from 'entities';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  @Get('/me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
