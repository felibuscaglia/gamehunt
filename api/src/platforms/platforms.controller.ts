import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { CreatePlatformDto } from './dto';
import { JwtGuard } from 'auth/guards';
import { FindManyOptions, ILike } from 'typeorm';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Get()
  getPlatforms(@Query('q') nameQuery?: string, @Query('limit') limit?: number) {
    return this.platformsService.findAll({
      take: limit,
      where: { name: ILike(`%${nameQuery}%`) },
    });
  }

  @UseGuards(JwtGuard)
  @Post()
  savePlatform(@Body() dto: CreatePlatformDto) {
    return this.platformsService.save(dto);
  }
}
