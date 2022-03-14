import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { User } from '../../models/user.model';
import { FieldError } from '../../shared/dtos/field-error.dto';

@InputType()
@ObjectType()
export class RegisterInput {
  @IsNotEmpty()
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Field(() => String)
  username: string;

  @IsNotEmpty()
  @Field(() => String)
  password_confirm: string;
}

@ObjectType()
export class RegisterResponse {
  // @Field(() => [FieldError], { nullable: true })
  // errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}
