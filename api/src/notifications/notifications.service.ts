import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, Notification, User } from '../entities';
import { Event } from 'lib/enums';
import { Repository } from 'typeorm';
import { NotificationType } from './lib/enums';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
  ) {}

  public userNotifications(userId: string) {
    return this.notificationsRepository.find({
      where: {
        recipient: {
          id: userId,
        },
      },
      select: {
        sender: {
          username: true,
        },
        game: {
          name: true,
          urlSlug: true,
        },
      },
      relations: ['sender', 'game'],
    });
  }

  @OnEvent(Event.NOTIFY_USER)
  notifyUser(payload: { game: Game; sender: User; type: NotificationType }) {
    const NEW_NOTIFICATION = new Notification();

    NEW_NOTIFICATION.sender = payload.sender;
    NEW_NOTIFICATION.type = payload.type;
    NEW_NOTIFICATION.recipient = payload.game.creator;
    NEW_NOTIFICATION.game = payload.game;

    this.notificationsRepository.save(NEW_NOTIFICATION);
  }
}
