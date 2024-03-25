import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { User } from 'entities';
import { UsersService } from './users.service';
import { ILike } from 'typeorm';
import { PatchMeDto } from './dto/patch-me.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get('/me')
  getMe(
    @CurrentUser() user: User,
    @Query('includeDetails') includeDetails?: string,
  ) {
    return includeDetails
      ? this.usersService.findOne({ id: user.id }, ['profilePicture'])
      : user;
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  async patchMe(
    @CurrentUser('id') userId: string,
    @Body() patchMeDto: PatchMeDto,
  ) {
    return await this.usersService.update(userId, patchMeDto);
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

  @Get('/:username/profile')
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.findOne({ username }, ['profilePicture', 'games', 'games.thumbnail']);
  }
}
