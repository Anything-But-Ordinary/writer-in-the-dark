import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatePasswordResponse {
  @Field(() => String)
  message: string;

  @Field(() => Boolean)
  updated: boolean;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  password: string;

  @Field(() => String)
  password_confirm: string;
}
