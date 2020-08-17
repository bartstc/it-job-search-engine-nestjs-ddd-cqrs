import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

interface SkillsProps {
  value: string[];
}

export class Skills extends ValueObject<SkillsProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: SkillsProps) {
    super(props);
  }

  public static create(props: SkillsProps): Result<Skills> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'skills');

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const listOfStringsGuardResult = Guard.isListOfStrings(
      props.value,
      'skills',
    );

    if (!listOfStringsGuardResult.succeeded) {
      return Result.fail(listOfStringsGuardResult);
    }

    return Result.ok(new Skills(props));
  }
}
