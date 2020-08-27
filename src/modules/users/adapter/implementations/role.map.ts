import { UniqueEntityID } from 'shared/domain';
import { Mapper } from 'shared/core';

import { RoleEntity } from '../../infra/entities';
import { ContextType, Role } from '../../domain';
import { RoleDto } from '../../application/dtos';
import { RoleName } from '../../domain/role-name';

export class RoleMap implements Mapper<Role> {
  static toDto(role: Role): RoleDto {
    return {
      roleId: role.roleId.id.toString(),
      name: role.name.value,
      contextType: role.contextType.value,
      permissions: role.permissions,
    };
  }

  static toDtoBulk(roles: Role[]): RoleDto[] {
    return roles.map(role => ({
      roleId: role.roleId.id.toString(),
      name: role.name.value,
      contextType: role.contextType.value,
      permissions: role.permissions,
    }));
  }

  static toDomain(entity: RoleEntity): Role {
    const roleNameOrError = RoleName.create({ value: entity.name });
    const contextTypeOrError = ContextType.create({
      value: entity.context_type,
    });

    const roleOrError = Role.create(
      {
        name: roleNameOrError.getValue(),
        contextType: contextTypeOrError.getValue(),
        permissions: entity.permissions,
      },
      new UniqueEntityID(entity.role_id),
    );

    !roleOrError.isSuccess ? console.log(roleOrError.error) : '';
    return roleOrError.getValue();
  }

  static async toPersistence(role: Role): Promise<Partial<RoleEntity>> {
    return {
      role_id: role.roleId.id.toString(),
      name: role.name.value,
      context_type: role.contextType.value,
      permissions: role.permissions,
    };
  }
}
