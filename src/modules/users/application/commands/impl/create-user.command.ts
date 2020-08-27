import { CreateUserDto } from '../../useCases/createUser';

export class CreateUserCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
