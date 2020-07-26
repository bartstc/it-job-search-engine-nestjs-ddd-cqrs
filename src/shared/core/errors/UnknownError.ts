interface IUnknownError {
  message: string;
}

export abstract class UnknownError implements IUnknownError {
  protected constructor(
    public readonly message: string,
    public readonly error: any,
  ) {
    this.message = message;
    this.error = error;
  }
}
