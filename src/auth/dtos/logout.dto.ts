import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogoutResponse {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Boolean)
  isLogout?: boolean;
}
