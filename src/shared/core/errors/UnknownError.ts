interface IUnknownError {
  message: string;
  signature: string;
}

export abstract class UnknownError implements IUnknownError {
  protected constructor(
    public readonly message: string,
    public readonly signature: string,
    public readonly error: any,
  ) {
    this.message = message;
    this.signature = signature;
    this.error = error;
  }
}
