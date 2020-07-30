import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Either, left, Result, right } from 'shared/core/Result';
import { AppError, UseCase, ValidationTransformer } from 'shared/core';

import { createRoleSchema } from './create-role.schema';
import { RoleRepository } from '../../repositories';
import { RoleName } from '../../domain/role-name';
import { CreateRoleDto } from './create-role.dto';
import { ContextType, Role } from '../../domain';

export type CreateRoleResponse = Either<
  AppError.ValidationError | AppError.UnexpectedError,
  Result<Role>
>;

@Injectable()
export class CreateRoleUseCase
  implements UseCase<CreateRoleDto, Promise<CreateRoleResponse>> {
  constructor(
    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository,
  ) {}

  async execute(dto: CreateRoleDto): Promise<CreateRoleResponse> {
    const roleNameOrError = RoleName.create({ value: dto.name });
    const contextTypeOrError = ContextType.create({
      value: dto.contextType,
    });

    const validationResult = await ValidationTransformer.extractExceptions({
      dto,
      schema: createRoleSchema,
      results: [roleNameOrError, contextTypeOrError],
    });

    if (!validationResult.isSuccess) {
      return left(new AppError.ValidationError(validationResult.error));
    }

    const name = roleNameOrError.getValue();
    const contextType = contextTypeOrError.getValue();

    try {
      const roleOrError = Role.create({
        name,
        contextType,
        permissions: dto.permissions,
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
