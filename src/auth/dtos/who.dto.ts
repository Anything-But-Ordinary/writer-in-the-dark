import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WhoResponse {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => Boolean)
  isAuthed: boolean;

  @Field(() => String, { nullable: true })
  message: string;
}
