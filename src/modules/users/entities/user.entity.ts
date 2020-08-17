import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { CtxType } from '../domain/types';

@Entity('users')
@Unique(['email', 'username'])
export class UserEntity extends AbstractEntity {
  @PrimaryColumn()
  user_id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: false })
  is_email_verified: boolean;

  @Column()
  context_type: CtxType;

  @Column('text', { array: true })
  role_ids: string[];
}
