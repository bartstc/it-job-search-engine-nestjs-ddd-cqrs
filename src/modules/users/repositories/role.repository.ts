import { EntityRepository, Repository } from 'typeorm';
import { chain } from 'lodash';

import { RoleEntity } from '../entities';
import { Role } from '../domain';
import { RoleRepo } from '../types';
import { RoleMap } from '../mappers';
import { CtxType } from '../domain/types';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> implements RoleRepo {
  async exists(roleName: string) {
    const existingRole = await this.findOne({ name: roleName });
    return !!existingRole;
  }

  async getRoleByRoleId(roleId: string) {
    const role = await this.findOne({ role_id: roleId });
    if (!role) throw new Error('Role not found');

    return RoleMap.toDomain(role);
  }

  async getPermissions(roleIds: string[]) {
    const roles = await this.createQueryBuilder('role')
      .where('role.role_id IN (:...ids)', { ids: roleIds })
      .select('permissions')
      .getMany();

    return chain(roles)
      .map(role => role.permissions)
      .flatten()
      .uniq()
      .value();
  }

  async getRolesByContextType(contextType: CtxType) {
    const roles = await this.find({ where: { context_type: contextType } });

    return roles.map(role => RoleMap.toDomain(role));
  }

  async persist(role: Role) {
    const roleExists = await this.exists(role.name.value);
    if (!!roleExists) return;

    const roleEntity = await RoleMap.toPersistence(role);

    await this.create(roleEntity).save();
  }

  async deleteRole(role: Role) {
    const roleId = role.roleId.id.toString();
    const deleteResult = await this.delete({
      role_id: roleId,
    });

    if (deleteResult.affected === 0) {
      throw new Error(`Role with id ${roleId} not found`);
    }
  }
}
