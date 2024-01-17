import { Controller, Get, Query, Post, UseGuards, Body } from '@nestjs/common';
import { GenresService } from './genre.service';
import { Roles } from 'users/decorators';
import { USER_ROLES } from 'users/lib/enums';
import { JwtGuard } from 'auth/guards';
import { RolesGuard } from 'users/guards/roles.guard';
import { CreateGenreDto } from './dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  getGenres(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.genresService.findAll(limit, offset);
  }

  @Post()
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }
}
