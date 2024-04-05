import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtGuard } from 'auth/guards';
import { CurrentUser } from 'auth/decorators';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtGuard)
  getUserNotifications(@CurrentUser('id') userId: string) {
    return this.notificationsService.userNotifications(userId);
  }
}
