import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { CtxType } from '../../domain/types';

@Entity('roles')
export class RoleEntity extends AbstractEntity {
  @PrimaryColumn()
  role_id: string;

  @Column()
  name: string;

  @Column()
  context_type: CtxType;

  @Column('text', { array: true })
  permissions: string[];
}
