import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { v4 } from 'uuid';

import { UserRepository } from './repositories';
import { UserEntity } from './entities';
import { JwtPayload } from './domain/types';

import { mockUserRepository } from './fixtures/userRepository';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  process.env = {
    SECRET: 'secretKey',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    const payload: JwtPayload = {
      roleIds: [v4()],
      username: 'bob',
      userId: '123',
    };

    it('validates and returns the user based on JWT payload', async () => {
      const user = new UserEntity();
      user.username = 'TestUser';

      userRepository.findOne.mockResolvedValue(user);
      const result = await jwtStrategy.validate(payload);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        username: 'bob',
      });
      expect(result).toEqual(user);
    });

    it('throws an unauthorized exception as user cannot be found', () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(jwtStrategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
