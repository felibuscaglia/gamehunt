import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Genre from './Genre.entity';

@Entity('subgenre')
class Subgenre {
  @PrimaryGeneratedColumn({ name: 'subgenre_id' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  urlSlug: string;

  @ManyToOne(() => Genre, (genre) => genre.subgenres)
  genre: Genre;
}

export default Subgenre;
