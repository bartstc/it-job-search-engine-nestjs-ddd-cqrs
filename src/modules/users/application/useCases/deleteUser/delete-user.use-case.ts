import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { User } from '../../../domain';
import { UserRepository } from '../../../adapter';
import { DeleteUserErrors } from './delete-user.errors';
import { DeleteUserDto } from './delete-user.dto';

export type DeleteUserResponse = Either<
  AppError.UnexpectedError | DeleteUserErrors.UserNotFoundError,
  Result<void>
>;

export class DeleteUserUseCase
  implements UseCase<DeleteUserDto, Promise<DeleteUserResponse>> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(dto: DeleteUserDto): Promise<DeleteUserResponse> {
    let user: User;

    try {
      try {
        user = await this.userRepository.getUserByUserId(dto.userId);
      } catch (err) {
        return left(new DeleteUserErrors.UserNotFoundError());
      }

      user.delete();

      await this.userRepository.persist(user);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
