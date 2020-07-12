import { Test } from '@nestjs/testing';

import { ContextType } from '../../domain/types';
import { UserRepository } from '../../repositories';
import { CreateUserDto } from './create-user.dto';
import { CreateUserUseCase } from './create-user.use-case';

import { mockUserRepository } from '../../fixtures/userRepository';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    createUserUseCase = await module.get(CreateUserUseCase);
    userRepository = await module.get(UserRepository);
  });

  it('should returns ValidationError when dto is invalid', async function() {
    const createUserDto = {
      username: '',
      email: 'bob@bob.com',
      password: 'test123',
    } as CreateUserDto;

    const result = await createUserUseCase.execute(createUserDto);
    expect(result.value.error.signature).toBe('userName.tooShort');
  });

  it('should returns EmailAlreadyExistsError when user already exists', async function() {
    userRepository.exists.mockResolvedValue(true);

    const createUserDto = {
      username: 'bob',
      email: 'bob@bob.com',
      password: 'test123',
    } as CreateUserDto;

    const result = await createUserUseCase.execute(createUserDto);
    expect(result.value.error.signature).toBe('emailAlreadyTaken');
  });

  it('should returns UsernameTakenError when username is taken', async function() {
    userRepository.exists.mockResolvedValue(false);
    userRepository.getUserByUsername.mockResolvedValue({ username: 'bob' });

    const createUserDto = {
      username: 'bob',
      email: 'bob@bob.com',
      password: 'test123',
    } as CreateUserDto;

    const result = await createUserUseCase.execute(createUserDto);
    expect(result.value.error.signature).toBe('usernameAlreadyTaken');
  });

  it('should return instance of User', async function() {
    userRepository.exists.mockResolvedValue(false);
    userRepository.getUserByUsername.mockRejectedValue();

    const createUserDto = {
      username: 'bob',
      email: 'bob@bob.com',
      password: 'test123',
      contextType: ContextType.Brand,
      roleIds: ['test'],
    };

    const result = await createUserUseCase.execute(createUserDto);
    expect(result.value.isSuccess).toBeTruthy();
  });
});
