import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { JwtPayload } from '../../domain/types';
import { User, UserName, UserPassword } from '../../domain';
import { UserRepository } from '../../repositories';
import { LoginUserErrors } from './login-user.errors';
import { LoginUserDtoResponse, LoginUserDto } from './login-user.dto';

export type LoginUserResponse = Either<
  | LoginUserErrors.PasswordDoesntMatchError
  | LoginUserErrors.UserNameDoesntExistError
  | AppError.ValidationError
  | AppError.UnexpectedError,
  Result<LoginUserDtoResponse>
>;

export class LoginUserUseCase
  implements UseCase<LoginUserDto, Promise<LoginUserResponse>> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(request: LoginUserDto): Promise<LoginUserResponse> {
    let user: User;
    let username: UserName;
    let password: UserPassword;

    try {
      const usernameOrError = UserName.create({ value: request.username });
      const passwordOrError = UserPassword.create({ value: request.password });

      const payloadResult = Result.combine([usernameOrError, passwordOrError]);

      if (!payloadResult.isSuccess) {
        return left(new AppError.ValidationError({ ...payloadResult.error }));
      }

      username = usernameOrError.getValue();
      password = passwordOrError.getValue();

      try {
        user = await this.userRepository.getUserByUsername(username.value);
      } catch (err) {
        return left(new LoginUserErrors.UserNameDoesntExistError());
      }

      const isPasswordValid = await user.password.comparePassword(
        password.value,
      );

      if (!isPasswordValid) {
        return left(new LoginUserErrors.PasswordDoesntMatchError());
      }

      const payload: JwtPayload = {
        username: user.username.value,
        userId: user.userId.id.toString(),
        roleIds: user.roleIds,
      };

      const token = await this.jwtService.sign(payload);

      return right(
        Result.ok({
          token,
        }),
      );
    } catch (err) {
      return left(new AppError.UnexpectedError(err.toString()));
    }
  }
}
