import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import {
  GoogleOauthGuard,
  JwtGuard,
  LocalAuthGuard,
  RefreshJwtGuard,
} from './guards';
import { CurrentUser } from './decorators';
import { User } from '../entities';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './lib/constants';
import { Response, response } from 'express';
import { PatchMeDto, SignUpDto } from './dto';
import { UsersService } from 'users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: User,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.generateTokens(user);

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });

    return {
      accessToken,
      refreshToken,
    };
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

  @UseGuards(JwtGuard)
  @Patch('/me')
  async patchMe(
    @CurrentUser('id') userId: string,
    @Body() patchMeDto: PatchMeDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const UPDATED_USER = await this.usersService.update(userId, patchMeDto);

    const { accessToken, refreshToken } =
      await this.authService.generateTokens(UPDATED_USER);

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  getMe(
    @CurrentUser() user: User,
    @Query('includeDetails') includeDetails?: string,
  ) {
    return includeDetails
      ? this.usersService.findOne({ id: user.id }, ['profilePicture'])
      : user;
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

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(
    @CurrentUser() dto: SignUpDto,
    @Res() response: Response,
  ) {
    let user: User;

    try {
      user = await this.authService.signUp(dto);
    } catch (err) {
      if (err?.status === 409) {
        user = await this.usersService.findOne({ email: dto.email });
      }
    }

    if (!user) {
      throw new BadRequestException(
        'Something unexpected happened. Please, try again later.',
      );
    }

    const { refreshToken, accessToken } =
      await this.authService.generateTokens(user);

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });

    return response.redirect(this.configService.get('UI_URL'));
  }
}
