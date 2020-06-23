import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

interface RoleNameProps {
  value: string;
}

export class RoleName extends ValueObject<RoleNameProps> {
  public static maxLength = 50;
  public static minLength = 2;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: RoleNameProps) {
    super(props);
  }

  public static create(props: RoleNameProps): Result<RoleName> {
    const roleNameResult = Guard.againstNullOrUndefined(
      props.value,
      'roleName',
    );
    if (!roleNameResult.succeeded) {
      return Result.fail<RoleName>(roleNameResult);
    }

    const minLengthResult = Guard.againstAtLeast(
      this.minLength,
      props.value,
      'roleName',
    );
    if (!minLengthResult.succeeded) {
      return Result.fail<RoleName>(minLengthResult);
    }

    const maxLengthResult = Guard.againstAtMost(
      this.maxLength,
      props.value,
      'roleName',
    );
    if (!maxLengthResult.succeeded) {
      return Result.fail<RoleName>(minLengthResult);
    }

    return Result.ok<RoleName>(new RoleName(props));
  }
}
