import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform } from 'entities';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePlatformDto } from './dto';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformsRepository: Repository<Platform>,
  ) {}

  public findAll(options: FindManyOptions<Platform>) {
    return this.platformsRepository.find(options);
  }

  public save(dto: CreatePlatformDto) {
    const newPlatform = new Platform();

    newPlatform.name = dto.name;

    return this.platformsRepository.save(newPlatform);
  }
}
