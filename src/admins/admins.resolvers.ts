import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { Admin } from './entities/admin.entity';

@Resolver(() => Admin)
export class AdminResolver {
  @Query(() => [Admin])
  admins(@Args('active') active: boolean): Admin[] {
    console.log(active);
    return [];
  }

  @Mutation(() => Boolean)
  createAdmin(@Args() createAdminDto: CreateAdminDto): boolean {
    console.log(CreateAdminDto);
    return true;
  }
}
