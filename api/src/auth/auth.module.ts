import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy, LocalStrategy, RefreshJwtStrategy } from './strategies';
import { GoogleStrategy } from './strategies/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPasswordToken } from '../entities';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
  ],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([ResetPasswordToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10s' },
      }),
    }),
  ],
})
export class AuthModule {}
