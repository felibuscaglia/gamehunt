import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';


@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

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
