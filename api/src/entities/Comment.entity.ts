import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User.entity';
import Game from './Game.entity';

@Entity('comment')
class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  id: number;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true }) // A comment can have one parent comment
  parent?: Comment;

  @ManyToOne(() => Game, (game) => game.comments)
  game: Game;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}

export default Comment;
