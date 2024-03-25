import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SubgenresService } from './subgenres.service';
import { JwtGuard } from 'auth/guards';
import { USER_ROLES } from 'users/lib/enums';
import { RolesGuard } from 'users/guards/roles.guard';
import { Roles } from 'users/decorators';
import { CreateSubgenreDto } from './dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('subgenres')
export class SubgenresController {
  constructor(private readonly subgenresService: SubgenresService) {}
  @Get()
  getAllSubgenres() {
    return this.subgenresService.findAll();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(86400)
  @Get('/trending')
  getTrendingSubgenres() {
    return this.subgenresService.trending;
  }

  @Get('/:urlSlug')
  getSubgenreByUrlSlug(
    @Param('urlSlug') subgenreUrlSlug: string,
    @Query('genreUrlSlug') genreUrlSlug: string,
  ) {
    return this.subgenresService.findOne(
      {
        urlSlug: subgenreUrlSlug,
        genre: { urlSlug: genreUrlSlug },
      },
      ['games', 'games.thumbnail', 'genre', 'genre.subgenres'],
    );
  }

  @Post()
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  createSubgenre(@Body() dto: CreateSubgenreDto) {
    return this.subgenresService.create(dto);
  }
}
