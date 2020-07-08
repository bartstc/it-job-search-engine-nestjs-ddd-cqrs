import { EntityRepository, Repository } from 'typeorm';
import { chain } from 'lodash';

import { RoleEntity } from '../entities';
import { Role } from '../domain/role';
import { RoleRepo } from '../types';
import { RoleMap } from '../mappers';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> implements RoleRepo {
  async exists(roleName: string) {
    const existingRole = await this.findOne({ name: roleName });
    return !!existingRole;
  }

  async getPermissions(roleIds: string[]) {
    const roles = await this.createQueryBuilder('role')
      .where('role.roleId IN (:...ids)', { ids: roleIds })
      .select('permissions')
      .getMany();

    return chain(roles)
      .map(role => role.permissions)
      .flatten()
      .uniq()
      .value();
  }

  async persist(role: Role) {
    const roleExists = await this.exists(role.name.value);
    if (!!roleExists) return;

    const roleEntity = await RoleMap.toPersistence(role);

    await this.create(roleEntity).save();
  }
}
