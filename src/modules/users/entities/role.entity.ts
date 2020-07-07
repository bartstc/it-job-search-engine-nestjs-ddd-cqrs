import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { ContextType } from '../domain/types';

@Entity('role')
@Unique(['name'])
export class RoleEntity extends AbstractEntity {
  @PrimaryColumn()
  roleId: string;

  @Column()
  name: string;

  @Column()
  contextType: ContextType;

  @Column('text', { array: true })
  permissions: string[];
}
