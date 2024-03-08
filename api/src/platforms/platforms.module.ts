import { Module } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { PlatformsController } from './platforms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from 'entities';

@Module({
  providers: [PlatformsService],
  controllers: [PlatformsController],
  exports: [PlatformsService],
  imports: [TypeOrmModule.forFeature([Platform])],
})
export class PlatformsModule {}
