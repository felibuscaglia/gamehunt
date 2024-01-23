import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'entities';

@Module({
  controllers: [GenresController],
  providers: [GenresService],
  imports: [TypeOrmModule.forFeature([Genre])],
  exports: [GenresService],
})
export class GenresModule {}
