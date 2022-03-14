import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterInput, RegisterResponse } from './dtos/register.dto';

@Resolver()
export class AuthResolver {
  @Mutation(() => RegisterResponse)
  register(@Args('input') registerInput: RegisterInput) {
    return registerInput;
  }
}
