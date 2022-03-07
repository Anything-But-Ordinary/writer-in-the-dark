import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

enum Who {
  Owner,
  Visitor,
}

registerEnumType(Who, { name: 'Who' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ type: 'enum', enum: Who })
  @Field(() => Who)
  who: Who;
}
