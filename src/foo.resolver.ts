import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class FooResolver {
  @Query(() => String)
  foo() {
    return 'Foo';
  }
}
