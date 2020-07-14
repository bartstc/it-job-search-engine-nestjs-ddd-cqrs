import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Either, left, Result, right } from 'shared/core/Result';
import { AppError, UseCase } from 'shared/core';

import { RoleRepository } from '../../repositories';
import { RoleName } from '../../domain/role-name';
import { CreateRoleDto } from './create-role.dto';
import { Role } from '../../domain/role';

type Response = Either<
  AppError.ValidationError | AppError.UnexpectedError,
  Result<Role>
>;

@Injectable()
export class CreateRoleUseCase
  implements UseCase<CreateRoleDto, Promise<Response>> {
  constructor(
    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository,
  ) {}

  async execute(request: CreateRoleDto): Promise<Response> {
    const roleNameOrError = RoleName.create({ value: request.name });

    if (!roleNameOrError.isSuccess) {
      return left(new AppError.ValidationError(roleNameOrError.error));
    }

    const name = roleNameOrError.getValue();

    try {
      const roleOrError = Role.create({
        name,
        contextType: request.contextType,
        permissions: request.permissions,
      });

      if (!roleOrError.isSuccess) {
        return left(Result.fail(roleOrError.error));
      }

      const role: Role = roleOrError.getValue();

      await this.roleRepository.persist(role);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
