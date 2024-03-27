import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public findOne(
    whereOptions: FindOptionsWhere<User>,
    relations: string[] = [],
    select?: FindOptionsSelect<User>,
  ) {
    return this.usersRepository.findOne({
      where: whereOptions,
      relations,
      select,
    });
  }

  public findMany(whereOptions: FindOptionsWhere<User>, limit?: number) {
    return this.usersRepository.find({
      where: whereOptions,
      take: limit,
    });
  }

  async create(fullName: string, email: string, password: string) {
    const newUser = new User();

    newUser.fullName = fullName;
    newUser.email = email;
    newUser.password = password;
    newUser.username = fullName.toLowerCase().replace(/\s/g, '');

    try {
      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        newUser.username = this.generateRandomUsername();
        return await this.usersRepository.save(newUser);
      }
      throw error;
    }
  }

  public async update(id: string, dto: Partial<User>) {
    try {
      return await this.usersRepository.save({
        id,
        ...dto,
      });
    } catch (error) {
      if (error?.code === '23505') {
        throw new ConflictException('Username already taken');
      }

      throw error;
    }
  }

  private generateRandomUsername(): string {
    return 'user-' + uuidv4();
  }
}
