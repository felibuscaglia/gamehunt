import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { GameStatus } from 'games/lib/enums';
import { UserProviders } from './lib/enums';

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

  public findProfileByUsername(username: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .leftJoinAndSelect('user.games', 'games', 'games.status = :status', {
        status: GameStatus.PUBLISHED,
      })
      .leftJoinAndSelect('games.thumbnail', 'thumbnail')
      .leftJoinAndSelect('user.profilePicture', 'profilePicture')
      .orderBy('games.postedAt', 'DESC')
      .getOne();
  }

  public findMany(whereOptions: FindOptionsWhere<User>, limit?: number) {
    return this.usersRepository.find({
      where: whereOptions,
      take: limit,
    });
  }

  async create(
    fullName: string,
    email: string,
    password?: string,
    provider = UserProviders.LOCAL,
  ) {
    const newUser = new User();

    newUser.fullName = fullName;
    newUser.email = email;
    newUser.password = password || null;
    newUser.username = fullName.toLowerCase().replace(/\s/g, '');
    newUser.provider = provider;
    newUser.emailConfirmed = provider !== UserProviders.LOCAL;

    try {
      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        newUser.username = await this.generateRandomUsername();
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

  private async generateRandomUsername() {
    let username = 'user-' + uuidv4();
    let existingUserWithUsername = await this.findOne({ username });

    while (existingUserWithUsername) {
      username = 'user-' + uuidv4();
      existingUserWithUsername = await this.findOne({ username });
    }

    return username;
  }
}
