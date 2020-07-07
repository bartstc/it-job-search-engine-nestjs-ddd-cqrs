import { UniqueEntityID } from 'shared/domain';
import { Mapper } from 'shared/core';

import { RoleEntity } from '../entities';
import { Role } from '../domain/role';
import { RoleDto } from '../dtos/role.dto';
import { RoleName } from '../domain/role-name';

export class RoleMap implements Mapper<Role> {
  static toDto(role: Role): RoleDto {
    return {
      roleId: role.roleId.id.toString(),
      name: role.name.value,
      contextType: role.contextType,
      permissions: role.permissions,
    };
  }

  static toDomain(entity: RoleEntity): Role {
    const roleNameOrError = RoleName.create({ value: entity.name });

    const roleOrError = Role.create(
      {
        name: roleNameOrError.getValue(),
        contextType: entity.contextType,
        permissions: entity.permissions,
      },
      new UniqueEntityID(entity.roleId),
    );

    !roleOrError.isSuccess ? console.log(roleOrError.error) : '';
    return roleOrError.getValue();
  }

  static async toPersistence(role: Role): Promise<Partial<RoleEntity>> {
    return {
      roleId: role.roleId.id.toString(),
      contextType: role.contextType,
      permissions: role.permissions,
      name: role.name.value,
    };
  }
}
