import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { SignUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from 'entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    let result: Omit<User, 'password'> | null = null;

    const user = await this.usersService.findOne({ email }, [], {
      password: true,
      fullName: true,
      id: true,
      email: true,
    });

    if (user && (await compare(password, user.password))) {
      const { password, ...userData } = user;

      result = userData;
    }

    return result;
  }

  public async login(user: User) {
    const payload = {
      email: user.email,
      fullName: user.fullName,
      id: user.id,
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

    const hashedPassword = await hash(signUpDto.password, await genSalt(10));

    const { password, ...newUser } = await this.usersService.create(
      signUpDto.fullName,
      email,
      hashedPassword,
    );

    return newUser;
  }

  public async refreshToken(user: User) {
    const payload = {
      email: user.email,
      fullName: user.fullName,
      id: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
