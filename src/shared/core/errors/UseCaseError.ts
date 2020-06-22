interface IUseCaseError {
  message: string;
  signature: string;
}

export abstract class UseCaseError implements IUseCaseError {
  protected constructor(
    public readonly message: string,
    public readonly signature: string,
  ) {
    this.message = message;
    this.signature = signature;
  }
}
