import { Test } from '@nestjs/testing';

import { UserRepository } from '../../repositories';
import { DeleteUserUseCase } from './delete-user.use-case';

import { mockUserRepository } from '../../fixtures/mock-user-repository';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    deleteUserUseCase = await module.get(DeleteUserUseCase);
    userRepository = await module.get(UserRepository);
  });

  it('should returns UserNotFoundError when user does not exist', async function() {
    userRepository.getUserByUserId.mockImplementationOnce(() => {
      throw new Error('User not found');
    });

    const result = await deleteUserUseCase.execute({ userId: '123' });
    expect(result.value.error.signature).toBe('userNotFound');
  });
});
