import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'auth/guards';
import { CategoriesService } from 'categories/categories.service';

@Controller('admin')
@UseGuards(JwtGuard)
export class AdminController {
  constructor(private readonly categoriesService: CategoriesService) {}
  
  @Get('/categories')
  getCategories(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.categoriesService.findAll(limit, offset);
  }
}
