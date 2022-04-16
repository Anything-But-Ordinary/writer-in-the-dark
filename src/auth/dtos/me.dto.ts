import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeQueryResponse {
  @Field(() => String, {
    nullable: true,
  })
  email?: string;

  @Field(() => String, {
    nullable: true,
  })
  username?: string;
}
