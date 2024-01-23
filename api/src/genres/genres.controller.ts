import {
  Controller,
  Get,
  Query,
  Post,
  UseGuards,
  Body,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { Roles } from 'users/decorators';
import { USER_ROLES } from 'users/lib/enums';
import { JwtGuard } from 'auth/guards';
import { RolesGuard } from 'users/guards/roles.guard';
import { CreateGenreDto } from './dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  getGenres(
    @Query('includeSubgenres', new DefaultValuePipe(false), ParseBoolPipe)
    includeSubgenres: boolean,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    const relations: string[] = [];

    if (includeSubgenres) {
      relations.push('subgenres');
    }

    return this.genresService.findAll(limit, offset, relations);
  }

  @Post()
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }
}
