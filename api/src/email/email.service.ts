import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';


@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  @Cron('0 11 * * 1-5')
  async sendNewsletter() {
    await this.mailerService.sendMail({
      to: 'felipebbuscaglia@gmail.com',
      subject: 'GameHunt Daily Newsletter',
      template: './newsletter',
      context: {
        games: [
          { title: "Call of Duty: Modern Warfare 2", description: "aidnfiqdfaijfqifqw", upvotes: [2,2,12,1231] }
        ]
      }
    });
  }

  @OnEvent('user.verify-email')
  async sendVerificationEmail() {
    const confirmation_url = `example.com/auth/confirm?token=1234`;

    await this.mailerService.sendMail({
      to: 'felipebbuscaglia@gmail.com',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome',
      context: {
        name: 'Hi!',
        confirmation_url,
      },
    });
  }
}
