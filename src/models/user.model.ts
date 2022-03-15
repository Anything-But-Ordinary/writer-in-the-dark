import { Field, ObjectType } from '@nestjs/graphql';
import { ModelOptions, prop } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';

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
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @prop({
    select: false,
    required: true,
    // get(val) {
    //   return val;
    // },
    // set(val) {
    //   return bcrypt.hashSync(val, 12);
    // },
  })
  password!: string;
}
