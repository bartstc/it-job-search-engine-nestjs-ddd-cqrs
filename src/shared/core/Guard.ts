export interface IGuardResult {
  succeeded: boolean;
  message: string;
}

export interface IGuardArgument {
  argument: any;
  argumentPath: string;
}

export type GuardArgumentCollection = IGuardArgument[];

const getSuccessResult = (argumentPath: string): IGuardResult => ({
  succeeded: true,
  message: `${argumentPath}.correct`,
});

export class Guard {
  public static greaterThan(
    minValue: number,
    actualValue: number,
    argumentPath: string,
  ): IGuardResult {
    return actualValue > minValue
      ? getSuccessResult(argumentPath)
      : {
          succeeded: false,
          message: `${argumentPath}.shouldBeGreaterThan${minValue}`,
        };
  }

  public static allAtLeast(numChars: number, args: IGuardArgument[]) {
    for (const arg of args) {
      const result = this.againstAtLeast({ numChars, ...arg });
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentPath);
  }

  public static againstAtLeast({
    argumentPath,
    numChars,
    argument,
  }: {
    numChars: number;
    argument: string;
    argumentPath: string;
  }): IGuardResult {
    return argument.length >= numChars
      ? getSuccessResult(argumentPath)
      : {
          succeeded: false,
          message: `${argumentPath}.shouldBeAtLeast${numChars}chars`,
        };
  }

  public static allAtMost(numChars: number, args: IGuardArgument[]) {
    for (const arg of args) {
      const result = this.againstAtMost({ numChars, ...arg });
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentPath);
  }

  public static againstAtMost({
    numChars,
    argumentPath,
    argument,
  }: {
    numChars: number;
    argument: string;
    argumentPath: string;
  }): IGuardResult {
    return argument.length <= numChars
      ? getSuccessResult(argumentPath)
      : {
          succeeded: false,
          message: `${argumentPath}.shouldBeLowerThan${numChars}chars`,
        };
  }

  public static againstNullOrUndefined(
    argument: any,
    argumentPath: string,
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentPath}.shouldBeDefined`,
      };
    } else {
      return getSuccessResult(argumentPath);
    }
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection,
  ): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentPath,
      );
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentPath);
  }

  public static isOneOf({
    value,
    validValues,
    argumentPath,
  }: {
    value: any;
    validValues: any[];
    argumentPath: string;
  }): IGuardResult {
    let isValid = false;
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return getSuccessResult(argumentPath);
    } else {
      return {
        succeeded: false,
        message: `${argumentPath}.isInvalidType`,
      };
    }
  }

  public static inRange({
    argumentPath,
    max,
    min,
    num,
  }: {
    num: number;
    min: number;
    max: number;
    argumentPath: string;
  }): IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentPath}.shouldBeWithinRange${min}to${max}`,
      };
    } else {
      return getSuccessResult(argumentPath);
    }
  }

  public static allInRange({
    min,
    max,
    args,
  }: {
    min: number;
    max: number;
    args: IGuardArgument[];
  }): IGuardResult {
    let failingResult: IGuardResult | null = null;
    for (const { argument, argumentPath } of args) {
      const numIsInRangeResult = this.inRange({
        num: argument,
        min,
        max,
        argumentPath,
      });
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return failingResult;
    } else {
      return getSuccessResult(args[0].argumentPath);
    }
  }

  public static isListOfStrings(list: any, argumentPath: string): IGuardResult {
    let failingResult: IGuardResult | null = null;

    if (!Array.isArray(list)) {
      return {
        succeeded: false,
        message: `${argumentPath}.shouldBeArray`,
      };
    }

    if (list.length === 0) {
      return {
        succeeded: false,
        message: `${argumentPath}.shouldBeNotEmpty`,
      };
    }

    for (const item in list) {
      const isStringResult = this.isString(item, 'listItem');
      if (!isStringResult.succeeded) {
        failingResult = isStringResult;
      }
    }

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentPath}.allItemsShouldBeTypeOfString`,
      };
    }
    return getSuccessResult(argumentPath);
  }

  public static isStringBulk(args: GuardArgumentCollection): IGuardResult {
    for (const arg of args) {
      const result = this.isString(arg.argument, arg.argumentPath);
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentPath);
  }

  public static isString(value: any, argumentPath: string): IGuardResult {
    if (typeof value === 'string' || value instanceof String) {
      return getSuccessResult(argumentPath);
    }

    return {
      succeeded: false,
      message: `${argumentPath}.shouldBeString`,
    };
  }

  public static allIsNumber(args: GuardArgumentCollection): IGuardResult {
    for (const arg of args) {
      const result = this.isNumber(arg.argument, arg.argumentPath);
      if (!result.succeeded) return result;
    }
    return getSuccessResult(args[0].argumentPath);
  }

  public static isNumber(value: any, argumentPath: string): IGuardResult {
    if (typeof value === 'number') {
      return getSuccessResult(argumentPath);
    }
    return {
      succeeded: false,
      message: `${argumentPath}.shouldBeNumber`,
    };
  }
}
