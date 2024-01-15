import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { CategoriesModule } from 'categories/categories.module';

@Module({
  controllers: [AdminController],
  imports: [CategoriesModule]
})
export class AdminModule {}
