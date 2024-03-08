import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameStatus } from 'games/lib/enums';
import Subgenre from './Subgenre.entity';
import { GamePricing } from 'games/lib/enums/game-pricing.enum';
import GameLink from './GameLink.entity';
import Image from './Image.entity';
import GameCreator from './GameCreator.entity';

@Entity('game')
class Game {
  @PrimaryGeneratedColumn('uuid', { name: 'game_id' })
  id: string;

  @OneToMany(() => GameCreator, (creator) => creator.game)
  creators: GameCreator[];

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
    nullable: true,
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

  @OneToMany(() => GameLink, (link) => link.game)
  links: GameLink[];

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail?: Image;

  @ManyToMany(() => Image, { eager: true })
  @JoinTable({
    name: 'game_gallery',
    joinColumn: { name: 'game_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'image_id',
      referencedColumnName: 'id',
    },
  })
  gallery: Image[];

  @Column({ nullable: true })
  videoUrl?: string;
}

export default Game;
