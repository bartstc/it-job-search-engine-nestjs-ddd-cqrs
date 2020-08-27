import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserEntity } from '../users/infra/entities';
import { RoleRepository } from '../users/adapter';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleRepository: RoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    const user: UserEntity = req.user;

    const userPermissions = await this.roleRepository.getPermissions(
      user.role_ids,
    );

    return permissions.every(permission =>
      userPermissions.includes(permission),
    );
  }
}
