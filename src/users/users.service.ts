import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UsersSerivce {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    who,
  }: CreateAccountInput): Promise<[boolean, string?]> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        // make error
        return [false, 'There is a user with that email already'];
      }
      await this.users.save(this.users.create({ email, password, who }));
      return [true];
    } catch (e) {
      return [false, "Couldn't create account"];
    }
    // hash the password
    // ok
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const token = jwt.sign({ id: user.id }, this.config.get('SECRET_KEY'));
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }

    // make the jwt and give it to the user
  }
}
