import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User.entity';
import Game from './Game.entity';

@Entity('game_creator')
class GameCreator {
  @PrimaryGeneratedColumn('uuid', { name: 'game_creator_id' })
  id: string;

  @ManyToOne(() => User, (user) => user.games)
  user: User;

  @ManyToOne(() => Game, (game) => game.creators)
  game: Game;

  @Column({ nullable: false, default: false })
  confirmed: boolean;

  @Column({ nullable: false, default: true })
  involvedInDevelopment: boolean;
}

export default GameCreator;
