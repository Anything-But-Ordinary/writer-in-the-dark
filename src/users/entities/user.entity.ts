import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

// type Visitor = 'owner' | 'others';

@Entity()
export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  // @Column()
  // visitor: Visitor;
}
