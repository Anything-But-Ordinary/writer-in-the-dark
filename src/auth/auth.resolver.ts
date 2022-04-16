import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Query,
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
  UseGuards,
} from '@nestjs/common';
import { LoginInput, LoginResponse } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, response, Request } from 'express';
import { MyContext } from '../types';
import { User } from '../models/user.model';
import { WhoResponse } from './dtos/who.dto';
import { LogoutResponse } from './dtos/logout.dto';
import { AuthGuard } from './auth.guard';
import { UserInfoInput, UserInfoResponse } from './dtos/userInfoResponse.dto';
import {
  UpdatePasswordInput,
  UpdatePasswordResponse,
} from './dtos/updatePassword.dto';
import { MeQueryResponse } from './dtos/me.dto';

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
    const user = await this.usersService.findOneAndSelect({ email });

    // console.log(user.password);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invaild credential');
    }

    const jwt = await this.jwtService.signAsync({
      _id: user._id,
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

  @UseGuards(AuthGuard)
  @Mutation(() => WhoResponse)
  async user(@Context('req') req: Request): Promise<WhoResponse> {
    const cookie = req.cookies['jwt'];

    if (!cookie) {
      return {
        isAuthed: false,
        username: null,
        message: 'you must have a jwt first',
      };
    }

    try {
      let { _id } = await this.jwtService.verifyAsync(cookie);
      const user = await this.usersService.findOne({ _id });
      console.log(user);

      if (!user) {
        return {
          isAuthed: false,
          username: null,
          message: 'The jwt is not who you login it now',
        };
      }
      return {
        isAuthed: true,
        username: user.username,
        message: 'Yep, You are authed',
      };
    } catch (error) {
      return {
        isAuthed: false,
        username: null,
        message: 'The jwt is not who you login it now',
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => LogoutResponse)
  async logout(
    @Context('res') res: Response,
    @Context('req') req: Request,
  ): Promise<LogoutResponse> {
    try {
      res.clearCookie('jwt');
      req.cookies['jwt'] = null;
      return {
        isLogout: true,
        message: 'Successfully Logout',
      };
    } catch (error) {
      return {
        isLogout: false,
        message: 'Something is wrong',
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserInfoResponse)
  async updateUserInfo(
    @Args('input') userInfoInput: UserInfoInput,
    @Context('req') req: Request,
  ): Promise<UserInfoResponse> {
    try {
      const cookie = req.cookies['jwt'];

      const { _id } = await this.jwtService.verifyAsync(cookie);

      await this.usersService.update(_id, userInfoInput);

      const user = this.usersService.findOne({ _id });

      if (!user) {
        return {
          message: 'user is not found',
          updated: false,
        };
      }

      return {
        message: 'updated successfully',
        updated: true,
      };
    } catch (error) {
      return {
        message: 'Something is wrong',
        updated: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UpdatePasswordResponse)
  async updatePassword(
    @Args('input') updatePasswordInput: UpdatePasswordInput,
    @Context('req') req: Request,
  ): Promise<UpdatePasswordResponse> {
    if (updatePasswordInput.password !== updatePasswordInput.password_confirm) {
      throw new BadRequestException('Password not match');
    }

    try {
      const cookie = req.cookies['jwt'];

      const { _id } = await this.jwtService.verifyAsync(cookie);

      await this.usersService.update(_id, {
        password: await bcrypt.hash(updatePasswordInput.password, 12),
      });
      return {
        message: 'password is updated',
        updated: true,
      };
    } catch (error) {
      return {
        message: 'Something is wrong',
        updated: false,
      };
    }
  }

  // @UseGuards(AuthGuard)
  @Query(() => MeQueryResponse, { nullable: true })
  async me(@Context('req') req: Request): Promise<MeQueryResponse | null> {
    try {
      const cookie = req.cookies['jwt'];
      const { _id } = await this.jwtService.verifyAsync(cookie);
      const user = await this.usersService.findOne({ _id });
      if (!user) {
        return null;
      }
      console.log(user);
      return {
        email: user.email,
        username: user.username,
      };
    } catch (error) {
      console.log('me query error:', error);
      throw Error(error.message);
    }
  }
}
