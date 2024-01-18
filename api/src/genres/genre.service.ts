import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'entities';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateGenreDto } from './dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  public findAll(limit?: number, offset?: number) {
    const options: FindManyOptions<Genre> = {};

    if (limit) {
      options.take = limit;
    }

    if (offset && limit) {
      options.skip = offset * limit;
    }

    return this.genresRepository.find(options);
  }

  public create(dto: CreateGenreDto) {
    const newGenre = new Genre();

    newGenre.name = dto.name;

    return this.genresRepository.save(newGenre);
  }
}
