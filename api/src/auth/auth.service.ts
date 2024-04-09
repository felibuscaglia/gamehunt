import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { SignUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { ResetPasswordToken, User } from '../entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from 'lib/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

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
    });

    if (user && (await compare(password, user.password))) {
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
      ? await hash(signUpDto.password, await genSalt(10))
      : undefined;

    const { password, ...newUser } = await this.usersService.create(
      signUpDto.fullName,
      email,
      hashedPassword,
      signUpDto.provider,
    );

    this.eventEmitter.emit(Event.VERIFY_EMAIL);

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
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
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
    NEW_TOKEN.token = await this.hashResetToken(RESET_TOKEN);

    await this.resetPasswordTokenRepository.save(NEW_TOKEN);

    this.eventEmitter.emit(Event.RESET_PASSWORD, {
      recipient: USER,
      token: RESET_TOKEN,
    });
  }

  private async hashResetToken(resetToken: string) {
    return await hash(resetToken, await genSalt(10));
  }
}
