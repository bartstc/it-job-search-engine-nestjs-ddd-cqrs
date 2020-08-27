import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';

import { JwtStrategy, RoleService, UserService } from './application/services';
import { RoleRepository, UserRepository } from './adapter';

import {
  CreateUserController,
  CreateUserUseCase,
} from './application/useCases/createUser';
import {
  LoginUserController,
  LoginUserUseCase,
} from './application/useCases/loginUser';
import {
  DeleteUserController,
  DeleteUserUseCase,
} from './application/useCases/deleteUser';

import {
  CreateRoleController,
  CreateRoleUseCase,
} from './application/useCases/createRole';
import {
  DeleteRoleController,
  DeleteRoleUseCase,
} from './application/useCases/deleteRole';
import {
  GetRolesController,
  GetRolesUseCase,
} from './application/useCases/getRoles';

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
  controllers: [
    CreateRoleController,
    DeleteRoleController,
    GetRolesController,
    CreateUserController,
    DeleteUserController,
    LoginUserController,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    JwtStrategy,
    RoleService,
    UserService,
    CreateUserUseCase,
    LoginUserUseCase,
    DeleteUserUseCase,
    CreateRoleUseCase,
    DeleteRoleUseCase,
    GetRolesUseCase,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
