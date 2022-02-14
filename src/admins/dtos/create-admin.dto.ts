import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsString, Length, IsBoolean } from 'class-validator';

@ArgsType()
export class CreateAdminDto {
  @Field(() => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field(() => Boolean)
  @IsBoolean()
  isActive: boolean;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsString()
  @Length(5, 10)
  adminName: string;
}
