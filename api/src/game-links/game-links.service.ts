import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameLink } from 'entities';
import { Repository } from 'typeorm';
import { CreateGameLinkDto } from './dto';

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
}
