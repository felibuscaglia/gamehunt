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
import entities from './entities';

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
        synchronize: configService.get('NODE_ENV') !== 'production',
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
