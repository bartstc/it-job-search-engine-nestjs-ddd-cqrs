export const mockUserRepository = () => ({
  exists: jest.fn(),
  getUserByUserId: jest.fn(),
  getUserByUsername: jest.fn(),
  persist: jest.fn(),
  findOne: jest.fn(),
});
