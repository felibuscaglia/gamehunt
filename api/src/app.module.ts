import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { GenresModule } from './genres/genres.module';
import { AdminModule } from './admin/admin.module';
import { SubgenresModule } from './subgenres/subgenres.module';
import { ImagesModule } from './images/images.module';
import { PlatformsModule } from './platforms/platforms.module';
import { GamemodesModule } from './gamemodes/gamemodes.module';
import { GameLinksModule } from './game-links/game-links.module';
import entities from './entities';
import { CacheModule } from '@nestjs/cache-manager';
import { CommentsModule } from './comments/comments.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities,
        synchronize: true,
        timezone: 'UTC',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    GamesModule,
    GenresModule,
    AdminModule,
    SubgenresModule,
    ImagesModule,
    PlatformsModule,
    GamemodesModule,
    GameLinksModule,
    CacheModule.register({ isGlobal: true }),
    CommentsModule,
    EmailModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
