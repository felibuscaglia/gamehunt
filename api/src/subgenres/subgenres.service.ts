import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre, Subgenre } from '../entities';
import {
  FindManyOptions,
  FindOptionsWhere,
  QueryFailedError,
  Repository,
} from 'typeorm';
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

  public findOne(where: FindOptionsWhere<Subgenre>, relations: string[] = []) {
    return this.subgenresRepository.findOne({
      where,
      relations,
    });
  }

  public findWithQueryBuilder(subgenreUrlSlug: string, genreUrlSlug: string) {
    return this.subgenresRepository
      .createQueryBuilder('subgenre')
      .where('subgenre.urlSlug = :subgenreUrlSlug', { subgenreUrlSlug })
      .leftJoinAndSelect('subgenre.genre', 'genre')
      .andWhere('genre.urlSlug = :genreUrlSlug', { genreUrlSlug })
      .leftJoinAndSelect('subgenre.games', 'games')
      .leftJoinAndSelect('games.thumbnail', 'thumbnail')
      .leftJoinAndSelect('genre.subgenres', 'subgenres')
      .leftJoinAndSelect('games.upvotes', 'upvotes')
      .groupBy('subgenre.subgenre_id')
      .addGroupBy('genre.genre_id')
      .addGroupBy('games.game_id')
      .addGroupBy('thumbnail.image_id')
      .addGroupBy('subgenres.subgenre_id')
      .addGroupBy('upvotes.user_id')
      .orderBy('COUNT(upvotes)', 'DESC')
      .getOne();
  }

  public get trending() {
    return this.subgenresRepository
      .createQueryBuilder('subgenre')
      .leftJoinAndSelect('subgenre.games', 'game')
      .leftJoinAndSelect('subgenre.genre', 'genre')
      .select([
        'subgenre.id',
        'subgenre.name',
        'COUNT(game.id) AS gameCount',
        'subgenre.urlSlug',
        'genre',
      ])
      .groupBy('subgenre.id, subgenre.name, genre.id')
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
