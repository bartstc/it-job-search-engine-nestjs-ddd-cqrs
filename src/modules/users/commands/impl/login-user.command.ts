import { Response } from 'express';
import { LoginUserDto } from '../../useCases/loginUser';

export class LoginUserCommand {
  constructor(
    public readonly loginUserDto: LoginUserDto,
    public readonly res: Response,
  ) {}
}
