import { Module } from '@nestjs/common';
import { GenresController } from './genre.controller';
import { GenresService } from './genre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'entities';

@Module({
  controllers: [GenresController],
  providers: [GenresService],
  imports: [TypeOrmModule.forFeature([Genre])],
  exports: [GenresService],
})
export class GenresModule {}
