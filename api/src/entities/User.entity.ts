import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { USER_ROLES, UserProviders } from 'users/lib/enums';
import Game from './Game.entity';
import Comment from './Comment.entity';
import Image from './Image.entity';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  password?: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: true, length: 50 })
  tagline?: string;

  @Column({ nullable: true, length: 300 })
  about?: string;

  @Column({ nullable: false, default: false, type: 'boolean' })
  isSubscribedToNewsletter: boolean;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn({ name: 'image_id' })
  profilePicture?: Image;

  @OneToMany(() => Game, (game) => game.creator)
  games: Game[];

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: USER_ROLES.USER,
  })
  role: USER_ROLES;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @Column({
    nullable: false,
    enum: UserProviders,
    default: UserProviders.LOCAL,
  })
  provider: UserProviders;
}

export default User;
