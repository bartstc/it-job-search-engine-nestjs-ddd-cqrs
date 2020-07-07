import { Mapper } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { User, UserEmail, UserName, UserPassword } from '../domain';
import { UserDto } from '../dtos';
import { UserEntity } from '../entities';

export class UserMap implements Mapper<User> {
  static toDto(user: User): UserDto {
    return {
      userId: user.userId.id.toString(),
      username: user.username.value,
      contextType: user.contextType,
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

    const userOrError = User.create(
      {
        username: userNameOrError.getValue(),
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
        isDeleted: entity.isDeleted,
        isEmailVerified: entity.isEmailVerified,
        contextType: entity.contextType,
        roleIds: entity.roleIds,
      },
      new UniqueEntityID(entity.userId),
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
      userId: user.userId.id.toString(),
      email: user.email.value,
      username: user.username.value,
      isEmailVerified: user.isEmailVerified,
      password: password,
      roleIds: user.roleIds,
      isDeleted: user.isDeleted,
      contextType: user.contextType,
    };
  }
}
