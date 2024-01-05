import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;
}

export default User;
