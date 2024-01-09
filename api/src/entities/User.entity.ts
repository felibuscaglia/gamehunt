import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Game from './Game.entity';

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

  @OneToMany(() => Game, (game) => game.creator)
  games: Game[];
}

export default User;
