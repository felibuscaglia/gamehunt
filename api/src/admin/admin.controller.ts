import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'auth/guards';
import { GenresService } from 'genres/genre.service';
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
}
