import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameLink } from 'entities';
import { Repository } from 'typeorm';
import { CreateGameLinkDto, PublishGameLinkDto } from './dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GameLinksService {
  constructor(
    @InjectRepository(GameLink)
    private readonly gameLinksRepository: Repository<GameLink>,
  ) {}

  public create(dto: CreateGameLinkDto) {
    return this.gameLinksRepository.save(dto);
  }

  public bulkSave(gameLinks: GameLink[]) {
    return this.gameLinksRepository.save(gameLinks);
  }

  public delete(id: string) {
    return this.gameLinksRepository.delete({ id });
  }

  public validate(gameLink: GameLink) {
    return validate(plainToInstance(PublishGameLinkDto, gameLink));
  }
}
