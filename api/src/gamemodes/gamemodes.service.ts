import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameMode } from 'entities';
import { IDbQueryProps } from 'lib/interfaces';
import { FindManyOptions, Repository } from 'typeorm';
import { SaveGameModeDto } from './dto';

@Injectable()
export class GamemodesService {
  constructor(
    @InjectRepository(GameMode)
    private readonly gameModesRepository: Repository<GameMode>,
  ) {}

  public find({ limit, offset }: IDbQueryProps) {
    const options: FindManyOptions<GameMode> = {};

    if (limit) {
      options.take = limit;
    }

    if (offset && limit) {
      options.skip = offset * limit;
    }

    return this.gameModesRepository.find(options);
  }

  public save(dto: SaveGameModeDto) {
    return this.gameModesRepository.save(dto);
  }
}
