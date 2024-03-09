import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { CreatePlatformDto } from './dto';
import { JwtGuard } from 'auth/guards';
import { USER_ROLES } from 'users/lib/enums';
import { Roles } from 'users/decorators';
import { RolesGuard } from 'users/guards/roles.guard';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Get()
  getPlatforms(@Query('q') nameQuery?: string, @Query('limit') limit?: number) {
    return this.platformsService.find({ nameQuery, limit })
  }

  @Post()
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  savePlatform(@Body() dto: CreatePlatformDto) {
    return this.platformsService.save(dto);
  }
}
