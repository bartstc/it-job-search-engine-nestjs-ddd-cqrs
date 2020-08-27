import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from '../../infra/entities';
import { User } from '../../domain';
import { UserRepo } from '../user-repo';
import { UserMap } from './user.map';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements UserRepo {
  async exists(email: string) {
    const existingUser = await this.findOne({ email });
    return !!existingUser;
  }

  async getUserByUsername(username: string) {
    const user = await this.findOne({ username });
    if (!user) throw new Error('User not found');

    return UserMap.toDomain(user);
  }

  async getUserByUserId(userId: string) {
    const user = await this.findOne({ user_id: userId });
    if (!user) throw new Error('User not found');

    return UserMap.toDomain(user);
  }

  async persist(user: User) {
    const userExists = await this.exists(user.email.props.value);
    if (!!userExists) return;

    const userEntity = await UserMap.toPersistence(user);

    await this.create(userEntity).save();
  }
}
