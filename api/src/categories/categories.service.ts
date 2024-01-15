import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  public findAll(limit?: number, offset?: number) {
    return this.categoriesRepository.find({
      take: limit,
      skip: offset * limit,
    });
  }
}
