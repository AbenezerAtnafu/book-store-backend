import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(username);

    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new UnauthorizedException();
  }

  async signup(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      throw new UnauthorizedException();
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      username,
      password: hash,
    });

    const payload = { sub: newUser.id, username: newUser.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
