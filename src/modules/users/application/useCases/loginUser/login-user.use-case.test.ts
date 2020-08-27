import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AppError } from 'shared/core/errors';

import { LoginUserUseCase } from './login-user.use-case';
import { LoginUserDto } from './login-user.dto';
import { LoginUserErrors } from './login-user.errors';

import { mockJwtService } from '../../fixtures/mock-jwt-service';
import { defaultUser } from '../../fixtures/user';
import { mockUserRepository } from '../../fixtures/mock-user-repository';
import { UserRepository } from '../../../adapter';

describe('LoginUserUseCase', () => {
  let loginUserUseCase: LoginUserUseCase;
  let userRepository;
  let jwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginUserUseCase,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    loginUserUseCase = await module.get(LoginUserUseCase);
    userRepository = await module.get(UserRepository);
    jwtService = await module.get(JwtService);
  });

  it('should returns ValidationError when dto is invalid', async function() {
    const loginUserDto: LoginUserDto = {
      password: 'test123',
      username: '',
    };

    const result = await loginUserUseCase.execute(loginUserDto);
    expect(result.value.constructor).toBe(AppError.ValidationError);
  });

  it('should returns UserNameDoesntExistError when user does not exist', async function() {
    userRepository.getUserByUsername.mockImplementationOnce(() => {
      throw new Error('userNotFound');
    });

    const loginUserDto: LoginUserDto = {
      password: 'test123',
      username: 'bob',
    };

    const result = await loginUserUseCase.execute(loginUserDto);
    expect(result.value.constructor).toBe(
      LoginUserErrors.UserNameDoesntExistError,
    );
  });

  it('should returns PasswordDoesntMatchError when password is incorrect', async function() {
    userRepository.getUserByUsername.mockResolvedValueOnce(defaultUser);

    const loginUserDto: LoginUserDto = {
      password: 'test12',
      username: 'bob',
    };

    const result = await loginUserUseCase.execute(loginUserDto);
    expect(result.value.constructor).toBe(
      LoginUserErrors.PasswordDoesntMatchError,
    );
  });

  it('should returns token', async function() {
    userRepository.getUserByUsername.mockResolvedValueOnce(defaultUser);
    jwtService.sign.mockResolvedValueOnce('token');

    const loginUserDto: LoginUserDto = {
      password: 'test123',
      username: 'bob',
    };

    const result = await loginUserUseCase.execute(loginUserDto);
    expect(result.value.getValue()).toStrictEqual({ token: 'token' });
  });
});
