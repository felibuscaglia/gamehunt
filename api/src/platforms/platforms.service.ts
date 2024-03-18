import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform } from 'entities';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreatePlatformDto } from './dto';
import { IDbQueryProps } from 'lib/interfaces';
import { formatUrlSlug } from 'users/lib/helpers';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformsRepository: Repository<Platform>,
  ) {}

  public find({ nameQuery, limit, offset }: IDbQueryProps) {
    const options: FindManyOptions<Platform> = {};

    if (nameQuery) {
      options.where = { name: ILike(`%${nameQuery}%`) };
    }

    if (limit) {
      options.take = limit;
    }

    if (offset) {
      options.skip = limit * offset;
    }

    return this.platformsRepository.find(options);
  }

  public save(dto: CreatePlatformDto) {
    const newPlatform = new Platform();

    newPlatform.name = dto.name;
    newPlatform.urlSlug = formatUrlSlug(dto.name);

    return this.platformsRepository.save(newPlatform);
  }
}
