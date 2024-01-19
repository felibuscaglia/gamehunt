import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Subgenre from './Subgenre.entity';

@Entity('genre')
class Genre {
  @PrimaryGeneratedColumn({ name: 'genre_id' })
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => Subgenre, subgenre => subgenre.genre)
  subgenres: Subgenre[];
}

export default Genre;
