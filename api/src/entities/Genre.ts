import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genre')
class Genre {
  @PrimaryGeneratedColumn('uuid', { name: 'genre_id' })
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;
}

export default Genre;
