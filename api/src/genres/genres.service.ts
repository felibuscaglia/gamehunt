import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../entities';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateGenreDto } from './dto';
import { formatUrlSlug } from 'users/lib/helpers';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  public findAll(limit?: number, offset?: number, relations?: string[]) {
    const options: FindManyOptions<Genre> = {};

    if (limit) {
      options.take = limit;
    }

    if (offset && limit) {
      options.skip = offset * limit;
    }

    if (relations) {
      options.relations = relations;
    }

    return this.genresRepository.find(options);
  }

  public findOne(where: FindOptionsWhere<Genre>, relations: string[] = []) {
    return this.genresRepository.findOne({ where, relations });
  }

  public create(dto: CreateGenreDto) {
    const newGenre = new Genre();

    newGenre.name = dto.name;
    newGenre.urlSlug = formatUrlSlug(dto.name);

    return this.genresRepository.save(newGenre);
  }
}
