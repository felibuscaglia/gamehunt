import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'entities';
import { GameOwnerGuard } from './guards';
import { GameLinksModule } from 'game-links/game-links.module';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GameOwnerGuard],
  imports: [TypeOrmModule.forFeature([Game]), GameLinksModule],
})
export class GamesModule {}
