import { EntityRepository, Repository } from 'typeorm';

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

  async persist(role: Role) {
    const roleExists = await this.exists(role.name.value);
    if (!!roleExists) return;

    const roleEntity = await RoleMap.toPersistence(role);

    await this.create(roleEntity).save();
  }
}
