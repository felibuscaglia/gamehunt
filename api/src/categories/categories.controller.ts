import { Controller, Get, Query, Post, UseGuards, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Roles } from 'users/decorators';
import { USER_ROLES } from 'users/lib/enums';
import { JwtGuard } from 'auth/guards';
import { RolesGuard } from 'users/guards/roles.guard';
import { CreateCategoryDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.categoriesService.findAll(limit, offset);
  }

  @Post()
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }
}
