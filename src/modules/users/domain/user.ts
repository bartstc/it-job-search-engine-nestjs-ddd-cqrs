import { Guard, Result } from 'shared/core';
import { Entity, UniqueEntityID } from 'shared/domain';

import { UserId } from './userId';
import { UserEmail } from './userEmail';
import { UserName } from './userName';
import { UserPassword } from './userPassword';
import { ContextType } from './types';

export class UserProps {
  email: UserEmail;
  username: UserName;
  password: UserPassword;
  contextType: ContextType;
  roleIds: string[];
  isDeleted?: boolean = false;
  isEmailVerified?: boolean = false;
}

export class User extends Entity<UserProps> {
  get userId() {
    return UserId.create(this._id).getValue();
  }

  get email() {
    return this.props.email;
  }

  get username() {
    return this.props.username;
  }

  get password() {
    return this.props.password;
  }

  get contextType() {
    return this.props.contextType;
  }

  get isDeleted() {
    return this.props.isDeleted;
  }

  get isEmailVerified() {
    return this.props.isEmailVerified;
  }

  get roleIds() {
    return this.props.roleIds;
  }

  public delete(): void {
    if (!this.props.isDeleted) {
      // todo: domain events
      // this.addDomainEvent(new UserDeleted(this));
      this.props.isDeleted = true;
    }
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.password, argumentName: 'password' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.contextType, argumentName: 'contextType' },
      { argument: props.roleIds, argumentName: 'roleIds' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail(guardResult);
    }

    const isArrayGuardResult = Guard.isListOfStrings(props.roleIds, 'roleIds');

    if (!isArrayGuardResult.succeeded) {
      return Result.fail(isArrayGuardResult);
    }

    const user = new User(
      {
        ...props,
        isDeleted: props.isDeleted ?? false,
        isEmailVerified: props.isEmailVerified ?? false,
      },
      id,
    );

    return Result.ok(user);
  }
}
