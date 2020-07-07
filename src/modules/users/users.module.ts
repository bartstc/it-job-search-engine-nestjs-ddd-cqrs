import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { UserRepository } from './repositories';
import { UsersCommandHandlers } from './commands/handlers';

import { CreateUserUseCase } from './useCases/createUser';
import { LoginUserUseCase } from './useCases/loginUser';
import { DeleteUserUseCase } from './useCases/deleteUser';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    ...UsersCommandHandlers,
    JwtStrategy,
    CreateUserUseCase,
    LoginUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
