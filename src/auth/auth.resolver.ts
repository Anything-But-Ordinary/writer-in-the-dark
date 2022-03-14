import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { RegisterInput, RegisterResponse } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { BadRequestException, HttpException } from '@nestjs/common';

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
}
