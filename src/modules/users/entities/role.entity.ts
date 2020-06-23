import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { ContextType } from '../domain/types';

@Entity('role')
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
