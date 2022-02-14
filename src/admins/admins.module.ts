import { Module } from '@nestjs/common';
import { AdminResolver } from './admins.resolvers';

@Module({
  providers: [AdminResolver],
})
export class AdminsModule {}
