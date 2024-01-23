import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User.entity';
import { GameStatus } from 'games/lib/enums';
import Subgenre from './Subgenre.entity';
import { GamePricing } from 'games/lib/enums/game-pricing.enum';

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

  @Column({
    type: 'enum',
    enum: GamePricing,
  })
  pricing?: GamePricing;

  @ManyToMany(() => Subgenre, { eager: true })
  @JoinTable({
    name: 'game_subgenre',
    joinColumn: { name: 'game_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'subgenre_id',
      referencedColumnName: 'id',
    },
  })
  subgenres: Subgenre[];
}

export default Game;
