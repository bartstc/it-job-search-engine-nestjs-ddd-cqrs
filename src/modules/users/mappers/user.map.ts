import { Mapper } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import {
  ContextType,
  User,
  UserEmail,
  UserName,
  UserPassword,
} from '../domain';
import { UserDto } from '../dtos';
import { UserEntity } from '../entities';

export class UserMap implements Mapper<User> {
  static toDto(user: User): UserDto {
    return {
      userId: user.userId.id.toString(),
      username: user.username.value,
      contextType: user.contextType.value,
      isEmailVerified: user.isEmailVerified,
      email: user.email.value,
      roleIds: user.roleIds,
      isDeleted: user.isDeleted,
    };
  }

  static toDomain(entity: UserEntity): User {
    const userNameOrError = UserName.create({ value: entity.username });
    const userEmailOrError = UserEmail.create({ value: entity.email });
    const userPasswordOrError = UserPassword.create({
      value: entity.password,
      hashed: true,
    });
    const contextTypeOrError = ContextType.create({
      value: entity.context_type,
    });

    const userOrError = User.create(
      {
        username: userNameOrError.getValue(),
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
        contextType: contextTypeOrError.getValue(),
        isDeleted: entity.is_deleted,
        isEmailVerified: entity.is_email_verified,
        roleIds: entity.role_ids,
      },
      new UniqueEntityID(entity.user_id),
    );

    !userOrError.isSuccess ? console.log(userOrError.error) : '';

    return userOrError.getValue();
  }

  static async toPersistence(user: User): Promise<Partial<UserEntity>> {
    let password;
    if (!!user.password) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }

    return {
      user_id: user.userId.id.toString(),
      email: user.email.value,
      username: user.username.value,
      context_type: user.contextType.value,
      is_email_verified: user.isEmailVerified,
      password: password,
      role_ids: user.roleIds,
      is_deleted: user.isDeleted,
    };
  }
}
