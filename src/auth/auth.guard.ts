import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    // const req = context.switchToHttp().getRequest<Request>();
    // try {
    //   const jwt = req.cookies['jwt'];
    //   return this.jwtService.verify(jwt);
    // } catch (error) {
    //   return false;
    // }
    const gqlContext = GqlExecutionContext.create(context).getContext<{
      req: Request;
      res: Response;
    }>();
    // const { req: Request, res } = gqlContext;
    const { req, res } = gqlContext;
    // console.log(req.cookies['jwt']);

    try {
      const jwt = req.cookies['jwt'];
      return this.jwtService.verify(jwt);
    } catch (error) {
      return false;
    }
    // return true;
  }
}
