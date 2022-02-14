import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AdminResolver {
  @Query(() => Boolean)
  isAdmin() {
    return true;
  }
}
