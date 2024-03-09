import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'auth/guards';
import { GamemodesService } from 'gamemodes/gamemodes.service';
import { GenresService } from 'genres/genres.service';
import { PlatformsService } from 'platforms/platforms.service';
import { SubgenresService } from 'subgenres/subgenres.service';
import { Roles } from 'users/decorators';
import { RolesGuard } from 'users/guards/roles.guard';
import { USER_ROLES } from 'users/lib/enums';

@Controller('admin')
@Roles(USER_ROLES.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
export class AdminController {
  constructor(
    private readonly genresService: GenresService,
    private readonly subgenresService: SubgenresService,
    private readonly platformsService: PlatformsService,
    private readonly gameModesService: GamemodesService,
  ) {}

  @Get('/genres')
  getGenres(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.genresService.findAll(limit, offset);
  }

  @Get('/subgenres')
  getSubgenres(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.subgenresService.findAll(limit, offset);
  }

  @Get('/platforms')
  getAdminPlatforms(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.platformsService.find({ limit, offset });
  }

  @Get('/game-modes')
  getAdminGameModes(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.gameModesService.find({ limit, offset });
  }
}
