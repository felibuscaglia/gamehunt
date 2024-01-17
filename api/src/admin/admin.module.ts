import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { GenresModule } from 'genres/genre.module';

@Module({
  controllers: [AdminController],
  imports: [GenresModule],
})
export class AdminModule {}
