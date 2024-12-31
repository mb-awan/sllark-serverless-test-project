import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { ALIGNMENT_PATHS } from './alignmentRouter.mjs';
import {
  CreateAlignmentValidationSchema,
  ListAlignmentsValidationSchema,
} from './alignmentSchemas.mjs';
import { API_ROUTES } from '../../commons/constants/common.mjs';

export const alignmentRegistry = new OpenAPIRegistry();

// Create Alignment Endpoint Documentation
alignmentRegistry.registerPath({
  method: 'post',
  description: `
    Create a new alignment session.
    Workflow:
      - Validate input payload.
      - Store the alignment details in DynamoDB.
      - Return the created alignment session details.
  `,
  security: [{ bearerAuth: [] }],
  path: `/api${API_ROUTES.ALIGNMENT}${ALIGNMENT_PATHS.CREATE}`,
  request: {
    body: {
      description: 'Payload for creating an alignment session',
      content: {
        'application/json': {
          schema: CreateAlignmentValidationSchema,
        },
      },
    },
  },
  tags: ['Alignments'],
  responses: {
    201: {
      description: 'Alignment session created successfully',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(true),
            message: z.string(),
            data: z.object({
              alignmentId: z.string(),
              vehicleVin: z.string(),
              technicianId: z.string(),
              startTime: z.string(),
              endTime: z.string().nullable(),
              status: z.enum(['in-progress', 'completed']),
            }),
          }),
        },
      },
    },
    400: {
      description: 'Bad request - Invalid input or validation errors',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
            errors: z.array(z.string()).optional(),
          }),
        },
      },
    },
    401: {
      description: 'Unauthorized - Access token is missing or invalid',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
          }),
        },
      },
    },
    409: {
      description: 'Conflict - Alignment session already exists',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: 'Internal server error - An unexpected error occurred',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
            error: z.object({}).nullable(),
          }),
        },
      },
    },
  },
});

// List Alignments Endpoint Documentation
alignmentRegistry.registerPath({
  method: 'get',
  description: `
    Retrieve all alignments for a technician or all alignments if no technician ID is provided.
    Workflow:
      - Validate query parameters.
      - Fetch alignment records from DynamoDB.
      - Return the list of alignment sessions.
  `,
  path: `/api${API_ROUTES.ALIGNMENT}${ALIGNMENT_PATHS.LIST}`,
  security: [{ bearerAuth: [] }],
  request: {
    query: ListAlignmentsValidationSchema,
  },
  tags: ['Alignments'],
  responses: {
    200: {
      description: 'Alignments retrieved successfully',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(true),
            message: z.string(),
            data: z.array(
              z.object({
                alignmentId: z.string(),
                vehicleVin: z.string(),
                technicianId: z.string(),
                startTime: z.string(),
                endTime: z.string().nullable(),
                status: z.enum(['in-progress', 'completed']),
              })
            ),
          }),
        },
      },
    },
    400: {
      description: 'Bad request - Invalid input or validation errors',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
            errors: z.array(z.string()).optional(),
          }),
        },
      },
    },
    401: {
      description: 'Unauthorized - Access token is missing or invalid',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: 'Internal server error - An unexpected error occurred',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
            error: z.object({}).nullable(),
          }),
        },
      },
    },
  },
});
