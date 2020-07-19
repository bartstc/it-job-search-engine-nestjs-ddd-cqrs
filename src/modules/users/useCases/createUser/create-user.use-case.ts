import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Either, left, Result, right } from 'shared/core/Result';
import { AppError, UseCase } from 'shared/core';

import { User, UserEmail, UserName, UserPassword } from '../../domain';
import { UserRepository } from '../../repositories';
import { CreateUserErrors } from './create-user.errors';
import { CreateUserDto } from './create-user.dto';

export type CreateUserResponse = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.ValidationError
  | AppError.UnexpectedError,
  Result<User>
>;

@Injectable()
export class CreateUserUseCase
  implements UseCase<CreateUserDto, Promise<CreateUserResponse>> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(request: CreateUserDto): Promise<CreateUserResponse> {
    const emailOrError = UserEmail.create({ value: request.email });
    const passwordOrError = UserPassword.create({ value: request.password });
    const usernameOrError = UserName.create({ value: request.username });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (!dtoResult.isSuccess) {
      return left(new AppError.ValidationError(dtoResult.error));
    }

    const email = emailOrError.getValue();
    const password = passwordOrError.getValue();
    const username = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepository.exists(email.value);

      if (userAlreadyExists) {
        return left(new CreateUserErrors.EmailAlreadyExistsError(email.value));
      }

      try {
        const usernameTaken = await this.userRepository.getUserByUsername(
          username.value,
        );

        if (usernameTaken) {
          return left(new CreateUserErrors.UsernameTakenError(username.value));
        }
      } catch (err) {}

      const userOrError = User.create({
        email,
        password,
        username,
        contextType: request.contextType,
        roleIds: request.roleIds,
        isEmailVerified: false,
        isDeleted: false,
      });

      if (!userOrError.isSuccess) {
        return left(Result.fail(userOrError.error));
      }

      const user: User = userOrError.getValue();

      await this.userRepository.persist(user);

      return right(Result.ok(user));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
