import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
class Image {
  @PrimaryGeneratedColumn('uuid', { name: 'image_id' })
  id: string;

  @Column({ unique: true, nullable: false })
  url: string;
}

export default Image;
