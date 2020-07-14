import { JwtService } from '@nestjs/jwt';

export const mockJwtService = (): JwtService =>
  ({
    logger: null,
    options: null,
    getSecretKey: null,
    mergeJwtOptions: null,
    decode: jest.fn(),
    sign: jest.fn(),
    signAsync: jest.fn(),
    verify: jest.fn(),
    verifyAsync: jest.fn(),
  } as any);
