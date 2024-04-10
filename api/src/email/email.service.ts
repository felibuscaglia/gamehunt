import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { APP_NAME } from 'auth/lib/constants';
import { User } from '../entities';
import { Event } from 'lib/enums';
import dayjs from 'dayjs';
import { GamesService } from 'games/games.service';
import { UsersService } from 'users/users.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly gamesService: GamesService,
    private readonly usersService: UsersService,
  ) {}

  @Cron('0 11 * * 1-5')
  async sendNewsletter() {
    const YESTERDAY = dayjs().subtract(1, 'day');

    const YESTERDAY_GAMES = await this.gamesService.findByDate(
      YESTERDAY.toISOString(),
      10,
    );

    const SUBSCRIBED_USERS = await this.usersService.findMany({
      isSubscribedToNewsletter: true,
    });

    for (const USER of SUBSCRIBED_USERS) {
      try {
        await this.mailerService.sendMail({
          to: USER.email,
          subject: 'GameHunt Daily Newsletter',
          template: './newsletter',
          context: {
            date: YESTERDAY.format('dddd, D MMMM YYYY'),
            games: YESTERDAY_GAMES,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  @OnEvent(Event.VERIFY_EMAIL)
  async sendVerificationEmail() {
    await this.mailerService.sendMail({
      to: 'felipebbuscaglia@gmail.com',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome',
      context: {
        name: 'Hi!',
        confirmation_url: `example.com/auth/confirm?token=1234`,
      },
    });
  }

  @OnEvent(Event.RESET_PASSWORD)
  async sendResetPasswordEmail(payload: { recipient: User; token: string }) {
    await this.mailerService.sendMail({
      to: payload.recipient.email,
      subject: `Change password for ${APP_NAME}`,
      template: './reset-password',
      context: {
        reset_password_url: `${this.configService.get(
          'UI_URL',
        )}/change-password?token=${payload.token}&id=${payload.recipient.id}`,
        app_name: APP_NAME,
      },
    });
  }
}
