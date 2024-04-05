import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User.entity';
import Game from './Game.entity';
import { NotificationType } from 'notifications/lib/enums';

@Entity()
class Notification {
  @PrimaryGeneratedColumn('uuid', { name: 'notification_id' })
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipient_id' })
  recipient: User;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @ManyToOne(() => Game, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'game_id' })
  game?: Game;
}

export default Notification;
