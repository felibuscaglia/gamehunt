import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { GenresModule } from 'genres/genres.module';
import { SubgenresModule } from 'subgenres/subgenres.module';
import { PlatformsModule } from 'platforms/platforms.module';
import { GamemodesModule } from 'gamemodes/gamemodes.module';

@Module({
  controllers: [AdminController],
  imports: [GenresModule, SubgenresModule, PlatformsModule, GamemodesModule],
})
export class AdminModule {}
