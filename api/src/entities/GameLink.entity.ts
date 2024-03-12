import { Platform } from 'games/lib/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Game from './Game.entity';

@Entity('game_link')
class GameLink {
  @PrimaryGeneratedColumn('uuid', { name: 'game_link_id' })
  id: string;

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true, type: 'enum', enum: Platform })
  platform?: Platform;

  @ManyToOne(() => Game, (game) => game.links)
  game: Game;
}

export default GameLink;
