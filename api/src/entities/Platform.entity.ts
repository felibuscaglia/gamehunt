import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('platform')
class Platform {
  @PrimaryGeneratedColumn({ name: 'platform_id' })
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  urlSlug: string;
}

export default Platform;
