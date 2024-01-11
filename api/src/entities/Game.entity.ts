import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User.entity';
import { GameStatus } from 'games/lib/enums';

@Entity('game')
class Game {
  @PrimaryGeneratedColumn('uuid', { name: 'game_id' })
  id: string;

  @ManyToOne(() => User, (user) => user.games)
  creator: User;

  @Column({ nullable: false, default: 'Draft game' })
  name: string;

  @Column({ nullable: true })
  tagline?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.DRAFT,
  })
  status: GameStatus;
}

export default Game;
