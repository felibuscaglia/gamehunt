import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Genre from './Genre.entity';

@Entity('subgenre')
class Subgenre {
  @PrimaryGeneratedColumn({ name: 'subgenre_id' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Genre, (genre) => genre.subgenres)
  genre: Genre;
}

export default Subgenre;
