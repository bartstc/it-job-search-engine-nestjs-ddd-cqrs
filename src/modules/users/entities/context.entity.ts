import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core/AbstractEntity';

import { ContextType } from '../domain/types/ContextType';
import { UserEntity } from './user.entity';

@Entity('user')
export class ContextEntity extends AbstractEntity {
  @PrimaryColumn()
  contextId: string;

  @Column()
  contextType: ContextType;

  @Column('text', { array: true })
  roleIds: string[];

  @Column()
  userId: string;

  @OneToOne(
    () => UserEntity,
    (account: UserEntity) => account.context,
  )
  @JoinColumn()
  user: UserEntity;
}
