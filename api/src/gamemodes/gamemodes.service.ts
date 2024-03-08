import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameMode } from 'entities';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class GamemodesService {
  constructor(
    @InjectRepository(GameMode)
    private readonly gameModesRepository: Repository<GameMode>,
  ) {}

  public findAll(limit?: number, offset?: number) {
    const options: FindManyOptions<GameMode> = {};

    if (limit) {
      options.take = limit;
    }

    if (offset && limit) {
      options.skip = offset * limit;
    }

    return this.gameModesRepository.find(options);
  }
}
