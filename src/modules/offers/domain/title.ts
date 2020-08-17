import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

interface TitleProps {
  value: string;
}

export class Title extends ValueObject<TitleProps> {
  public static minLength = 2;
  public static maxLength = 85;

  get value() {
    return this.props.value;
  }

  private constructor(props: TitleProps) {
    super(props);
  }

  public static create(props: TitleProps): Result<Title> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'title');

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentPath: 'title',
    });
    const maxGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentPath: 'title',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail(maxGuardResult);
    }

    return Result.ok(new Title(props));
  }
}
