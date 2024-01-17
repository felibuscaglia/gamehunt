import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'entities';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  public findAll(limit?: number, offset?: number) {
    return this.genresRepository.find({
      take: limit,
      skip: offset * limit,
    });
  }

  public create(dto: CreateGenreDto) {
    const newGenre = new Genre();

    newGenre.name = dto.name;

    return this.genresRepository.save(newGenre);
  }
}
