import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UserRepository } from './repositories';
import { UsersCommandHandlers } from './commands/handlers';
import { CreateUserUseCase } from './useCases/createUser';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [...UsersCommandHandlers, CreateUserUseCase],
})
export class UsersModule {}
