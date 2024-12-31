import { jest } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../../../server.mjs';
import { StatusCodes } from 'http-status-codes';
import * as commonOps from '../../../commons/db/commonOps.mjs';
import * as alignmentOps from '../../../commons/db/alignmentsOps.mjs';

// Mock DynamoDB operations
jest.mock('../../../commons/db/commonOps.mjs', () => ({
  ensureTableExists: jest.fn(),
}));
jest.mock('../../../commons/db/alignmentsOps.mjs', () => ({
  createAlignmentRecord: jest.fn(),
  listAlignmentsByTechnician: jest.fn(),
}));

const request = supertest(app);

describe('Alignment Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/alignments', () => {
    it('should create a new alignment session successfully', async () => {
      commonOps.ensureTableExists.mockResolvedValueOnce();
      alignmentOps.createAlignmentRecord.mockResolvedValueOnce({
        alignmentId: 'align123',
        vehicleVin: '1HGCM82633A123456',
        technicianId: 'tech123',
        startTime: '2023-10-05T10:00:00Z',
        status: 'in-progress',
      });

      const response = await request.post('/api/alignments').send({
        alignmentId: 'align123',
        vehicleVin: '1HGCM82633A123456',
        technicianId: 'tech123',
        startTime: '2023-10-05T10:00:00Z',
        status: 'in-progress',
      });

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        'Alignment session created successfully'
      );
    });
  });
});
