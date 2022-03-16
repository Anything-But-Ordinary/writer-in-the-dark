import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../../models/user.model';

@InputType()
export class UserInfoInput {
  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  email: string;
}

@ObjectType()
export class UserInfoResponse {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Boolean)
  updated: boolean;
}
