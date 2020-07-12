import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../../repositories';
import { LoginUserUseCase } from './login-user.use-case';
import { LoginUserDto } from './login-user.dto';

import { mockJwtService } from '../../fixtures/jwtService';
import { defaultUser } from '../../fixtures/user';
import { mockUserRepository } from '../../fixtures/userRepository';

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
    expect(result.value.error.signature).toBe('userName.tooShort');
  });

  it('should returns UserNameDoesntExistError when user does not exist', async function() {
    userRepository.getUserByUsername.mockImplementationOnce(() => {
      throw new Error('User not found');
    });

    const loginUserDto: LoginUserDto = {
      password: 'test123',
      username: 'bob',
    };

    const result = await loginUserUseCase.execute(loginUserDto);
    expect(result.value.error.signature).toBe('wrongCredentialsProvided');
  });

  it('should returns PasswordDoesntMatchError when password is incorrect', async function() {
    userRepository.getUserByUsername.mockResolvedValueOnce(defaultUser);

    const loginUserDto: LoginUserDto = {
      password: 'test12',
      username: 'bob',
    };

    const result = await loginUserUseCase.execute(loginUserDto);
    expect(result.value.error.signature).toBe('wrongCredentialsProvided');
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
