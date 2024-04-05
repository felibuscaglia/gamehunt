import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../entities';
import { NotificationsController } from './notifications.controller';

@Module({
  providers: [NotificationsService],
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
