import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { LoginUserCommand } from '../impl';
import { LoginUserUseCase } from '../../useCases/loginUser';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler extends BaseController
  implements ICommandHandler<LoginUserCommand> {
  constructor(private loginUserUseCase: LoginUserUseCase) {
    super();
  }

  async execute({ loginUserDto }: LoginUserCommand) {
    return await this.loginUserUseCase.execute(loginUserDto);
  }
}
