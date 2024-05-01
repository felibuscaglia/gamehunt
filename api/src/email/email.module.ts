import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GamesModule } from 'games/games.module';
import { UsersModule } from 'users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_NAME } from 'auth/lib/constants';

@Global()
@Module({
  imports: [
    GamesModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '6h' },
      }),
    }),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: true,
          port: Number(config.get('MAIL_PORT')),
          auth: {
            user: config.get('SMTP_USERNAME'),
            pass: config.get('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: `"${APP_NAME}" <${config.get('SMTP_USERNAME')}>`, // TODO: Change
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
})
export class EmailModule {}
