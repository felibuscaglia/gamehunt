import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard, RefreshJwtGuard } from './guards';
import { CurrentUser } from './decorators';
import { User } from 'entities';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './lib/constants';
import { Response } from 'express';
import { SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: User,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(user);

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });

    return { accessToken, refreshToken };
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) response: Response) {
    response.cookie(ACCESS_TOKEN_COOKIE_NAME, null, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, null, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });

    return HttpStatus.OK;
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: User,
  ) {
    const { refreshToken, accessToken } =
      await this.authService.refreshToken(user);

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });

    return { accessToken, refreshToken };
  }
}
