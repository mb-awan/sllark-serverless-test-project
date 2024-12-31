import { jest } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../../../server.mjs';
import { StatusCodes } from 'http-status-codes';
import * as commonOps from '../../../commons/db/commonOps.mjs';
import * as userOps from '../../../commons/db/usersOps.mjs';

// Mock DynamoDB operations
jest.mock('../../../commons/db/commonOps.mjs', () => ({
  ensureTableExists: jest.fn(),
}));
jest.mock('../../../commons/db/usersOps.mjs', () => ({
  getUser: jest.fn(),
  createUser: jest.fn(),
}));

const request = supertest(app);

describe('Auth Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      commonOps.ensureTableExists.mockResolvedValueOnce();
      userOps.createUser.mockResolvedValueOnce({
        userId: 'testUser',
        email: 'test@example.com',
        role: 'TECH',
      });

      const response = await request.post('/api/auth/register').send({
        username: 'testUser',
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        confirmPassword: 'password123',
      });

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
    });
  });
});
