import { Platform } from 'games/lib/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Game from './Game.entity';

@Entity('game_link')
class GameLink {
  @PrimaryGeneratedColumn('uuid', { name: 'game_link_id' })
  id: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false, type: 'enum', enum: Platform })
  platform: Platform;

  @ManyToOne(() => Game, (game) => game.links)
  game: Game;
}

export default GameLink;
