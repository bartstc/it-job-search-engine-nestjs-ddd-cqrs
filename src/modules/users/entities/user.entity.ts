import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { CtxType } from '../domain/types';

@Entity('users')
@Unique(['email', 'username'])
export class UserEntity extends AbstractEntity {
  @PrimaryColumn()
  userId: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column()
  contextType: CtxType;

  @Column('text', { array: true })
  roleIds: string[];
}
