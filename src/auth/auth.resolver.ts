import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { RegisterInput, RegisterResponse } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { LoginInput, LoginResponse } from './dtos/login.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('input') registerInput: RegisterInput,
  ): Promise<RegisterResponse> {
    const { password_confirm, ...data } = registerInput;

    if (data.password !== password_confirm) {
      throw new BadRequestException('Password not match');
    }

    const hashed = await bcrypt.hash(data.password, 12);

    try {
      await this.usersService.create({
        ...data,
        password: hashed,
      });
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

    return {
      isRegister: true,
    };
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginResponse> {
    const { email, password } = loginInput;
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invaild credential');
    }

    return {
      isLogin: true,
    };
  }
}
