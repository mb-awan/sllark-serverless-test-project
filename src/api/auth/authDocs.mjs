import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { AUTH_PATHS } from './authRouter.mjs';
import {
  LoginUserValidationSchema,
  RegisterUserValidationSchema,
} from './authSchemas.mjs';
import { API_ROUTES } from '../../commons/constants/common.mjs';

export const authRegistry = new OpenAPIRegistry();

// Register endpoint documentation
authRegistry.registerPath({
  method: 'post',
  description: `
    Register a new user by providing the required details.
    Workflow:
      - Validate input fields.
      - Hash the user's password securely before storing it.
      - Save user details in the database.
      - Generate and return a JWT token for authentication.
  `,
  path: `/api${API_ROUTES.AUTH}${AUTH_PATHS.REGISTER}`,
  request: {
    body: {
      description: 'Payload for user registration',
      content: {
        'application/json': {
          schema: RegisterUserValidationSchema,
        },
      },
    },
  },
  tags: ['Auth'],
  responses: {
    201: {
      description: 'User registered successfully',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(true),
            message: z.string(),
            data: z
              .object({
                token: z.string(),
              })
              .nullable(),
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
    409: {
      description: 'Conflict - User already exists',
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

// Login endpoint documentation
authRegistry.registerPath({
  method: 'post',
  description: `
    Log in a user by validating their credentials.
    Workflow:
      - Validate input fields.
      - Authenticate the user using the provided identifier and password.
      - Generate and return a JWT token upon successful authentication.
  `,
  path: `/api${API_ROUTES.AUTH}${AUTH_PATHS.LOGIN}`,
  request: {
    body: {
      description: 'Payload for user login',
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
      description: 'Login successful - Access token generated',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(true),
            message: z.string(),
            data: z
              .object({
                token: z.string(),
              })
              .nullable(),
            TFAEnabled: z.boolean().default(false),
            role: z.string(),
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
    403: {
      description: 'Forbidden - User account is blocked',
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
      description: 'Unauthorized - Invalid credentials',
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

