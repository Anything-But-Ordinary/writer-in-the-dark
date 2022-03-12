import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entities';
import { UsersResolver } from './users.resolver';
import { UsersSerivce } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UsersSerivce, UsersResolver],
  exports: [UsersSerivce],
})
export class UsersModule {}
