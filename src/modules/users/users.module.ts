import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { RoleRepository, UserRepository } from './repositories';
import { UsersCommandHandlers } from './commands/handlers';

import { JwtStrategy } from './jwt.strategy';
import { CreateUserUseCase } from './useCases/createUser';
import { LoginUserUseCase } from './useCases/loginUser';
import { DeleteUserUseCase } from './useCases/deleteUser';
import { CreateRoleUseCase } from './useCases/createRole';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
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
    CreateRoleUseCase,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
