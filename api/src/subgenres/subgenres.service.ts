import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre, Subgenre } from 'entities';
import { FindManyOptions, QueryFailedError, Repository } from 'typeorm';
import { CreateSubgenreDto } from './dto';
import { formatUrlSlug } from 'users/lib/helpers';

@Injectable()
export class SubgenresService {
  constructor(
    @InjectRepository(Subgenre)
    private readonly subgenresRepository: Repository<Subgenre>,
  ) {}
  public findAll(limit?: number, offset?: number) {
    const options: FindManyOptions<Subgenre> = {};

    if (limit) {
      options.take = limit;
    }

    if (offset && limit) {
      options.skip = offset * limit;
    }

    return this.subgenresRepository.find(options);
  }

  public get trending() {
    return this.subgenresRepository
      .createQueryBuilder('subgenre')
      .leftJoinAndSelect('subgenre.games', 'game')
      .select(['subgenre.id', 'subgenre.name', 'COUNT(game.id) AS gameCount'])
      .groupBy('subgenre.id, subgenre.name')
      .orderBy('gameCount', 'DESC')
      .limit(8)
      .getMany();
  }

  public async create(dto: CreateSubgenreDto) {
    try {
      const newSubgenre = new Subgenre();

      newSubgenre.name = dto.name;
      newSubgenre.urlSlug = formatUrlSlug(dto.name);

      const genre = new Genre();
      genre.id = dto.genreId;

      newSubgenre.genre = genre;

      return await this.subgenresRepository.save(newSubgenre);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException({ errors: { genreId: ['Not valid.'] } });
      }
    }
  }
}
