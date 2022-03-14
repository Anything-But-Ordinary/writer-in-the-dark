import { Field, ObjectType } from '@nestjs/graphql';
import { ModelOptions, prop } from '@typegoose/typegoose';

@ObjectType()
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @Field(() => String)
  @prop({ required: true })
  username: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @Field(() => String)
  @prop({ required: true })
  password: string;
}
