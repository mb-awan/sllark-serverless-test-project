import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { API_ROUTES } from '@/commons/constants/common';

import { AUTH_PATHS } from './authRouter';
import {
  LoginUserValidationSchema,
  RegisterUserValidationSchema,
} from './authSchemas';

export const authRegistry = new OpenAPIRegistry();

// Register login path documentation
authRegistry.registerPath({
  method: 'post',
  description: `
    This endpoint allows users to register by providing their information for registration:
      - Validation: Validate all fields.
      - Password Handling: Hash the password securely before storing it.
      - Database Interaction: Save user data to the database.
      - Token Generation: Generate a JWT token and send it in the response.
  `,
  path: `/api/${API_ROUTES.AUTH}${AUTH_PATHS.REGISTER}`,
  request: {
    body: {
      description: 'User registration details',
      content: {
        'application/json': {
          schema: RegisterUserValidationSchema,
        },
      },
    },
  },
  tags: ['Auth'],
  responses: {
    200: {
      description: 'User registration successful',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            token: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Invalid input',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
            responseObject: z.object({}).nullable().optional(),
            statusCode: z.number().optional(),
          }),
        },
      },
    },
    404: {
      description: 'Not found',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.object({}).nullable(),
            statusCode: z.number(),
          }),
        },
      },
    },
    409: {
      description: 'Conflict: User already exists',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            success: z.boolean(),
            error: z.object({}).nullable(),
          }),
        },
      },
    },
  },
});

// login path documentation
authRegistry.registerPath({
  method: 'post',
  description: `
    This endpoint allows users to login by providing their credentials:
      - Validation: Ensure at least one of email, username, or phone is provided along with the password.
      - Authentication: Verify the user's credentials and generate an access token if valid.
  `,
  path: `/api/${API_ROUTES.AUTH}${AUTH_PATHS.LOGIN}`,
  request: {
    body: {
      description: 'User login details',
      content: {
        'application/json': {
          schema: LoginUserValidationSchema,
        },
      },
    },
  },
  tags: ['Auth'],
  responses: {
    200: {
      description: 'Logged in successfully',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            token: z.string().nullable(),
            TFAEnabled: z.boolean(),
            role: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Invalid input',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
            responseObject: z.object({}).nullable().optional(),
            statusCode: z.number().optional(),
          }),
        },
      },
    },
    403: {
      description: 'User is blocked',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(false),
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'Invalid Credentials',
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
      description: 'Internal server error',
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