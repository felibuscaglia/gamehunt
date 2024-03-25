import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Genre from './Genre.entity';
import Game from './Game.entity';

@Entity('subgenre')
class Subgenre {
  @PrimaryGeneratedColumn({ name: 'subgenre_id' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  urlSlug: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Genre, (genre) => genre.subgenres)
  genre: Genre;

  @ManyToMany(() => Game, (game) => game.subgenres)
  @JoinTable({
    name: 'game_subgenre',
    joinColumn: { name: 'subgenre_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'game_id',
      referencedColumnName: 'id',
    },
  })
  games: Game[];
}

export default Subgenre;
