import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Genre from './Genre.entity';

@Entity('subgenre')
class Subgenre {
  @PrimaryGeneratedColumn('uuid', { name: 'subgenre_id' })
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Genre, (genre) => genre.subgenres)
  genre: Genre;
}

export default Subgenre;
