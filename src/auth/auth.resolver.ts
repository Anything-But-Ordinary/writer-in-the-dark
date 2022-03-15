import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { RegisterInput, RegisterResponse } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { LoginInput, LoginResponse } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, response } from 'express';
import { MyContext } from '../types';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
  async login(
    @Args('input') loginInput: LoginInput,
    @Context('res') res: Response,
  ): Promise<LoginResponse> {
    const { email, password } = loginInput;
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invaild credential');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
    });

    res.cookie('jwt', jwt, {
      httpOnly: true,
    });

    // console.log(res.cookie('jwt'));

    return {
      isLogin: true,
      jwt,
    };
  }
}
