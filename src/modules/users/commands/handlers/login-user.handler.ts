import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LoginUserCommand } from '../impl';
import { LoginUserUseCase } from '../../useCases/loginUser';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async execute({ loginUserDto }: LoginUserCommand) {
    return await this.loginUserUseCase.execute(loginUserDto);
  }
}
