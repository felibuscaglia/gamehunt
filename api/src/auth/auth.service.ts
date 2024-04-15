import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { ChangePasswordDto, SignUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { ResetPasswordToken, User } from '../entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from 'lib/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { INVALID_RESET_PASSWORD_TOKEN_ERROR_MSG } from './lib/constants';
import { UserProviders } from 'users/lib/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    @InjectRepository(ResetPasswordToken)
    private readonly resetPasswordTokenRepository: Repository<ResetPasswordToken>,
  ) {}

  public async validateUser(email: string, password: string) {
    let result: Omit<User, 'password'> | null = null;

    const user = await this.usersService.findOne({ email }, [], {
      password: true,
      fullName: true,
      id: true,
      email: true,
      role: true,
      username: true,
      isSubscribedToNewsletter: true,
      emailConfirmed: true,
      provider: true,
    });

    if (!user) {
      return result;
    }

    if (user.provider !== UserProviders.LOCAL) {
      throw new ForbiddenException(
        `It seems you signed up using social login. Please use the corresponding ${user.provider} login option.`,
      );
    }

    if (await compare(password, user.password)) {
      const { password, ...userData } = user;

      result = userData;
    }

    return result;
  }

  public async generateTokens(user: User) {
    const payload = {
      email: user.email,
      fullName: user.fullName,
      id: user.id,
      role: user.role,
      username: user.username,
      isSubscribedToNewsletter: user.isSubscribedToNewsletter,
      emailConfirmed: user.emailConfirmed,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  public async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;

    const userAlreadyCreated = await this.usersService.findOne({
      email,
    });

    if (userAlreadyCreated) {
      throw new ConflictException();
    }

    const hashedPassword = signUpDto.password
      ? await this._hash(signUpDto.password)
      : undefined;

    const { password, ...newUser } = await this.usersService.create(
      signUpDto.fullName,
      email,
      hashedPassword,
      signUpDto.provider,
    );

    return newUser;
  }

  public async refreshToken(user: User) {
    const payload = {
      email: user.email,
      fullName: user.fullName,
      id: user.id,
      role: user.role,
      username: user.username,
      isSubscribedToNewsletter: user.isSubscribedToNewsletter,
      emailConfirmed: user.emailConfirmed,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  public async changePassword(dto: ChangePasswordDto) {
    if (dto.newPassword !== dto.newPasswordConfirmation) {
      throw new BadRequestException({
        errors: { newPasswordConfirmation: ["Passwords don't match"] },
      });
    }

    const TOKEN = await this.resetPasswordTokenRepository.findOne({
      where: { user: { id: dto.userId } },
    });

    if (!TOKEN || !(await compare(dto.token, TOKEN.token))) {
      throw new NotFoundException(INVALID_RESET_PASSWORD_TOKEN_ERROR_MSG);
    }

    await this.usersService.update(dto.userId, {
      password: await this._hash(dto.newPassword),
    });
    await this.resetPasswordTokenRepository.delete(TOKEN);

    return true;
  }

  public async resetPassword(userEmail: string) {
    const USER = await this.usersService.findOne({ email: userEmail });

    if (!USER) {
      return;
    }

    const TOKEN = await this.resetPasswordTokenRepository.findOne({
      where: { user: { id: USER.id } },
    });

    if (TOKEN) {
      await this.resetPasswordTokenRepository.delete(TOKEN);
    }

    const RESET_TOKEN = crypto.randomBytes(32).toString('hex');
    const NEW_TOKEN = new ResetPasswordToken();

    NEW_TOKEN.user = USER;
    NEW_TOKEN.token = await this._hash(RESET_TOKEN);

    await this.resetPasswordTokenRepository.save(NEW_TOKEN);

    this.eventEmitter.emit(Event.RESET_PASSWORD, {
      recipient: USER,
      token: RESET_TOKEN,
    });
  }

  public async confirmEmail(email: string) {
    const USER = await this.usersService.findOne({ email });

    if (!USER) {
      throw new NotFoundException('User not found');
    }

    if (USER.emailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    await this.usersService.update(USER.id, { emailConfirmed: true });

    return {
      ...USER,
      emailConfirmed: true,
    };
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const PAYLOAD = await this.jwtService.verify(token);

      return PAYLOAD.email;
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  private async _hash(unhashedString: string) {
    return await hash(unhashedString, await genSalt(10));
  }
}
