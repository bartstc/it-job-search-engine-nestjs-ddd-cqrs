import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RoleRepository } from '../users/repositories';
import { UserEntity } from '../users/entities';

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
