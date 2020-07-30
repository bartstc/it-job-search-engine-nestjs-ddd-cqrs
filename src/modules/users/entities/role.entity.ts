import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { CtxType } from '../domain/types';

@Entity('roles')
export class RoleEntity extends AbstractEntity {
  @PrimaryColumn()
  roleId: string;

  @Column()
  name: string;

  @Column()
  contextType: CtxType;

  @Column('text', { array: true })
  permissions: string[];
}
