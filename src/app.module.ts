import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { FooResolver } from './foo.resolver';
import { UsersModule } from './users/users.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';
import { response } from 'express';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/writer'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      cors: false,
      // fieldResolverEnhancers: ['guards'],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [FooResolver],
})
export class AppModule {}
