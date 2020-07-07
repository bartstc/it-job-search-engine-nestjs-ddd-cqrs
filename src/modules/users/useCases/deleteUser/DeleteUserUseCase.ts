import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { UserRepository } from '../../repositories';
import { User } from '../../domain';
import { DeleteUserErrors } from './DeleteUserErrors';
import { DeleteUserDto } from './DeleteUserDto';

type Response = Either<
  AppError.UnexpectedError | DeleteUserErrors.UserNotFoundError,
  Result<void>
>;

export class DeleteUserUseCase
  implements UseCase<DeleteUserDto, Promise<Response>> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(request: DeleteUserDto): Promise<Response> {
    let user: User;

    try {
      try {
        user = await this.userRepository.getUserByUserId(request.userId);
      } catch (err) {
        return left(new DeleteUserErrors.UserNotFoundError());
      }

      user.delete();

      await this.userRepository.persist(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
