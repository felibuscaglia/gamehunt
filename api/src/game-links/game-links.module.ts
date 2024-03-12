import { Module } from '@nestjs/common';
import { GameLinksService } from './game-links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameLink } from 'entities';
import { GameLinksController } from './game-links.controller';

@Module({
  providers: [GameLinksService],
  imports: [TypeOrmModule.forFeature([GameLink])],
  controllers: [GameLinksController],
  exports: [GameLinksService],
})
export class GameLinksModule {}
