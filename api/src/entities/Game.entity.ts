import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameStatus } from 'games/lib/enums';
import Subgenre from './Subgenre.entity';
import { GamePricing } from 'games/lib/enums/game-pricing.enum';
import GameLink from './GameLink.entity';
import Image from './Image.entity';
import User from './User.entity';
import Platform from './Platform.entity';
import GameMode from './GameMode.entity';

@Entity('game')
class Game {
  @PrimaryGeneratedColumn('uuid', { name: 'game_id' })
  id: string;

  @ManyToOne(() => User, (user) => user.games)
  creator: User;

  @Column({ nullable: false, default: true })
  creatorInvolvedInDevelopment: boolean;

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

  @ManyToMany(() => Platform, { eager: true })
  @JoinTable({
    name: 'game_platform',
    joinColumn: { name: 'game_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'platform_id',
      referencedColumnName: 'id',
    },
  })
  platforms: Platform[];

  @ManyToMany(() => GameMode, { eager: true })
  @JoinTable({
    name: 'game_mode',
    joinColumn: { name: 'game_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'mode_id',
      referencedColumnName: 'id',
    },
  })
  modes: GameMode[];

  @Column({ nullable: true })
  videoUrl?: string;

  @Column({ nullable: true })
  storyline?: string;
}

export default Game;
