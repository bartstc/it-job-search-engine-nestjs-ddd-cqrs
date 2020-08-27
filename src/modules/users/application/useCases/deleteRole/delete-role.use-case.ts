import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { DeleteRoleErrors } from './delete-role.errors';
import { DeleteRoleDto } from './delete-role.dto';
import { Role } from '../../../domain';
import { RoleRepository } from '../../../adapter';

export type DeleteRoleResponse = Either<
  AppError.UnexpectedError | DeleteRoleErrors.RoleNotFoundError,
  Result<void>
>;

export class DeleteRoleUseCase
  implements UseCase<DeleteRoleDto, Promise<DeleteRoleResponse>> {
  constructor(
    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository,
  ) {}

  async execute(dto: DeleteRoleDto): Promise<DeleteRoleResponse> {
    let role: Role;

    try {
      try {
        role = await this.roleRepository.getRoleByRoleId(dto.roleId);
      } catch (err) {
        return left(new DeleteRoleErrors.RoleNotFoundError());
      }

      await this.roleRepository.deleteRole(role);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
