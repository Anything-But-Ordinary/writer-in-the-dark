import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'just a secret',
      signOptions: {
        expiresIn: '100d',
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
