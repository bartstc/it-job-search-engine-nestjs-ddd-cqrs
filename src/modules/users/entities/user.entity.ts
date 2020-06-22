import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';

import { AbstractEntity } from 'shared/core/AbstractEntity';
import { ContextEntity } from './context.entity';

@Entity('user')
@Unique(['email', 'username'])
export class UserEntity extends AbstractEntity {
  @PrimaryColumn()
  userAccountId: string;

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
  contextId: string;

  @OneToOne(
    () => ContextEntity,
    (context: ContextEntity) => context.user,
  )
  @JoinColumn()
  context: ContextEntity;
}
