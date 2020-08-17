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
    const roleNameResult = Guard.againstNullOrUndefined(props.value, 'name');
    if (!roleNameResult.succeeded) {
      return Result.fail(roleNameResult);
    }

    const minLengthResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentPath: 'name',
    });
    if (!minLengthResult.succeeded) {
      return Result.fail(minLengthResult);
    }

    const maxLengthResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'name',
    });
    if (!maxLengthResult.succeeded) {
      return Result.fail(minLengthResult);
    }

    return Result.ok(new RoleName(props));
  }
}
