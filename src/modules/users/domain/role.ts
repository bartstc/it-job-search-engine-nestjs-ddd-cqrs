import { Guard, Result } from 'shared/core';
import { Entity, UniqueEntityID } from 'shared/domain';

import { UserId } from './user-id';
import { RoleName } from './role-name';
import { ContextType } from './context-type';

export interface RoleProps {
  name: RoleName;
  contextType: ContextType;
  permissions: string[];
}

export class Role extends Entity<RoleProps> {
  get roleId() {
    return UserId.create(this._id).getValue();
  }

  get name() {
    return this.props.name;
  }

  get contextType() {
    return this.props.contextType;
  }

  get permissions() {
    return this.props.permissions;
  }

  private constructor(props: RoleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RoleProps, id?: UniqueEntityID): Result<Role> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentPath: 'roleName' },
      { argument: props.contextType, argumentPath: 'contextType' },
      { argument: props.permissions, argumentPath: 'permissions' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail(guardResult);
    }

    const isArrayGuardResult = Guard.isListOfStrings(
      props.permissions,
      'permissions',
    );

    if (!isArrayGuardResult.succeeded) {
      return Result.fail(isArrayGuardResult);
    }

    return Result.ok(new Role(props, id));
  }
}
