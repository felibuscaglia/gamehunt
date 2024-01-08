import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'entities';
import { UsersService } from 'users/users.service';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto';

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
      email: true,
      fullName: true,
    });
    
    if (user && (await compare(password, user.password))) {
      result = user;
    }

    return result;
  }

  public async login(user: User) {
    const { email, fullName, id } = user;
    const payload = {
      email,
      fullName,
      id,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  public async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;

    const userAlreadyCreated = await this.usersService.findOne({ email });

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
