import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { ContextType } from '../domain/types';

@Entity('user')
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
  contextType: ContextType;

  @Column('text', { array: true })
  roleIds: string[];
}
