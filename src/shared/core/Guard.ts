export interface IGuardResult {
  succeeded: boolean;
  message: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

const successGuardResult: IGuardResult = {
  succeeded: true,
  message: 'Success',
};

export class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (const result of guardResults) {
      if (result.succeeded) return result;
    }

    return { ...successGuardResult };
  }

  public static greaterThan(
    minValue: number,
    actualValue: number,
    argumentName: string,
  ): IGuardResult {
    return actualValue > minValue
      ? { ...successGuardResult }
      : {
          succeeded: false,
          message: `${argumentName} - Number given {${actualValue}} is not greater than {${minValue}}`,
        };
  }

  public static againstAtLeast(
    numChars: number,
    text: string,
    argumentName: string,
  ): IGuardResult {
    return text.length >= numChars
      ? { ...successGuardResult }
      : {
          succeeded: false,
          message: `${argumentName} is not at least ${numChars} chars.`,
        };
  }

  public static againstAtMost(
    numChars: number,
    text: string,
    argumentName: string,
  ): IGuardResult {
    return text.length <= numChars
      ? { ...successGuardResult }
      : {
          succeeded: false,
          message: `${argumentName} is greater than ${numChars} chars.`,
        };
  }

  public static againstNullOrUndefined(
    argument: any,
    argumentName: string,
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    } else {
      return { ...successGuardResult };
    }
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection,
  ): IGuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName,
      );
      if (!result.succeeded) return result;
    }

    return { ...successGuardResult };
  }

  public static isOneOf(
    value: any,
    validValues: any[],
    argumentName: string,
  ): IGuardResult {
    let isValid = false;
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { ...successGuardResult };
    } else {
      return {
        succeeded: false,
        message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
          validValues,
        )}. Got "${value}".`,
      };
    }
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string,
  ): IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName} is not within range ${min} to ${max}.`,
      };
    } else {
      return { ...successGuardResult };
    }
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string,
  ): IGuardResult {
    let failingResult: IGuardResult | null = null;
    for (const num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`,
      };
    } else {
      return { ...successGuardResult };
    }
  }

  public static isListOfStrings(list: any, argumentName: string): IGuardResult {
    let failingResult: IGuardResult | null = null;

    if (!Array.isArray(list)) {
      return {
        succeeded: false,
        message: `${argumentName} must ba an array`,
      };
    }

    if (list.length === 0) {
      return {
        succeeded: false,
        message: `${argumentName} cannot be empty`,
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
        message: `All items of ${argumentName} list must by a string`,
      };
    }

    return { ...successGuardResult };
  }

  public static isString(value: any, argumentName: string): IGuardResult {
    if (typeof value === 'string' || value instanceof String) {
      return { ...successGuardResult };
    }

    return {
      succeeded: false,
      message: `${argumentName} is not a string`,
    };
  }

  public static isNumber(value: any, argumentName: string): IGuardResult {
    if (typeof value === 'number') {
      return { ...successGuardResult };
    }

    return {
      succeeded: false,
      message: `${argumentName} is not type of number`,
    };
  }
}
