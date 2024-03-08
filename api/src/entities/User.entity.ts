import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { USER_ROLES } from 'users/lib/enums';
import GameCreator from './GameCreator.entity';

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

  @OneToMany(() => GameCreator, (creator) => creator.user)
  games: GameCreator[];

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: USER_ROLES.USER,
  })
  role: USER_ROLES;
}

export default User;
