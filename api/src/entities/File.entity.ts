import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
class File {
  @PrimaryGeneratedColumn('uuid', { name: 'file_id' })
  id: string;

  @Column({ unique: true, nullable: false })
  url: string;
}

export default File;
