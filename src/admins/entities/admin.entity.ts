import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ObjectType()
export class Admin {
  @Field(() => String)
  name: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field(() => String)
  password: string;

  @Field(() => String)
  adminName: string;
}
