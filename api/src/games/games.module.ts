import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'entities';
import { GameOwnerGuard } from './guards';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GameOwnerGuard],
  imports: [TypeOrmModule.forFeature([Game])]
})
export class GamesModule {}
