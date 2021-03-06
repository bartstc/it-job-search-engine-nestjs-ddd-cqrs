import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { GetRolesErrors } from './get-roles.errors';
import { GetRolesDto } from './get-roles.dto';
import { RoleDto } from '../../dtos';
import { Role, ContextType } from '../../../domain';
import { RoleMap, RoleRepository } from '../../../adapter';

export type GetRolesResponse = Either<
  GetRolesErrors.InvalidContextTypeError | AppError.UnexpectedError,
  Result<RoleDto[]>
>;

@Injectable()
export class GetRolesUseCase
  implements UseCase<GetRolesDto, Promise<GetRolesResponse>> {
  constructor(
    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository,
  ) {}

  async execute({ contextType }: GetRolesDto): Promise<GetRolesResponse> {
    let roles: Role[];

    if (!ContextType.contextTypeIsValid(contextType)) {
      return left(new GetRolesErrors.InvalidContextTypeError());
    }

    try {
      roles = await this.roleRepository.getRolesByContextType(contextType);
      const rolesDto = RoleMap.toDtoBulk(roles);

      return right(Result.ok(rolesDto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
