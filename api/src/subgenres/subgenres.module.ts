import { Module } from '@nestjs/common';
import { SubgenresService } from './subgenres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subgenre } from 'entities';
import { SubgenresController } from './subgenres.controller';

@Module({
  providers: [SubgenresService],
  imports: [TypeOrmModule.forFeature([Subgenre])],
  exports: [SubgenresService],
  controllers: [SubgenresController],
})
export class SubgenresModule {}
