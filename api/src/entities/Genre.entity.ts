import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Subgenre from './Subgenre';

@Entity('genre')
class Genre {
  @PrimaryGeneratedColumn('uuid', { name: 'genre_id' })
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => Subgenre, subgenre => subgenre.genre)
  subgenres: Subgenre[];
}

export default Genre;
