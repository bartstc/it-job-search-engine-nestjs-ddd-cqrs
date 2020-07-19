import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { RoleRepository, UserRepository } from './repositories';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

import { JwtStrategy, RolesService, UsersService } from './services';

import { CreateUserController, CreateUserUseCase } from './useCases/createUser';
import { LoginUserController, LoginUserUseCase } from './useCases/loginUser';
import { DeleteUserController, DeleteUserUseCase } from './useCases/deleteUser';

import { CreateRoleController, CreateRoleUseCase } from './useCases/createRole';
import { DeleteRoleController, DeleteRoleUseCase } from './useCases/deleteRole';
import { GetRolesController, GetRolesUseCase } from './useCases/getRoles';

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
    RolesService,
    UsersService,
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
