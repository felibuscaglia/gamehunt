import { Module } from '@nestjs/common';
import { GamemodesService } from './gamemodes.service';
import { GamemodesController } from './gamemodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameMode } from '../entities';

@Module({
  providers: [GamemodesService],
  controllers: [GamemodesController],
  imports: [TypeOrmModule.forFeature([GameMode])],
  exports: [GamemodesService],
})
export class GamemodesModule {}
