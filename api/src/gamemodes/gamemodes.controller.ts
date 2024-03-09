import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'auth/guards';
import { GamemodesService } from './gamemodes.service';
import { SaveGameModeDto } from './dto';
import { Roles } from 'users/decorators';
import { USER_ROLES } from 'users/lib/enums';
import { RolesGuard } from 'users/guards/roles.guard';

@Controller('game-modes')
export class GamemodesController {
  constructor(private readonly gamemodesService: GamemodesService) {}

  @Post()
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  saveGameMode(@Body() dto: SaveGameModeDto) {
    return this.gamemodesService.save(dto);
  }

  @Get()
  getGameModes(@Query('q') nameQuery?: string, @Query('limit') limit?: number) {
    return this.gamemodesService.find({ nameQuery, limit })
  }
}
