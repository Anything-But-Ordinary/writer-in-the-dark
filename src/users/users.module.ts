import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersSerivce } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersSerivce, UsersResolver],
})
export class UsersModule {}