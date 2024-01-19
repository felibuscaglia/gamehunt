import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { GenresModule } from 'genres/genre.module';
import { SubgenresModule } from 'subgenres/subgenres.module';

@Module({
  controllers: [AdminController],
  imports: [GenresModule, SubgenresModule],
})
export class AdminModule {}
