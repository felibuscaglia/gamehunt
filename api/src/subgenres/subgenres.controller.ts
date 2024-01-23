import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SubgenresService } from './subgenres.service';
import { JwtGuard } from 'auth/guards';
import { USER_ROLES } from 'users/lib/enums';
import { RolesGuard } from 'users/guards/roles.guard';
import { Roles } from 'users/decorators';
import { CreateSubgenreDto } from './dto';

@Controller('subgenres')
export class SubgenresController {
  constructor(private readonly subgenresService: SubgenresService) {}

  @Get()
  getAllSubgenres() {
    return this.subgenresService.findAll();
  }

  @Post()
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  createSubgenre(@Body() dto: CreateSubgenreDto) {
    return this.subgenresService.create(dto);
  }
}
