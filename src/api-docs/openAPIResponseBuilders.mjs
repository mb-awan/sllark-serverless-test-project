import { StatusCodes } from 'http-status-codes';

import { ServiceResponseSchema } from '../commons/utils/serviceResponse.mjs';

export function createApiResponse(
  schema,
  description,
  statusCode = StatusCodes.OK
) {
  return {
    [statusCode]: {
      description,
      content: {
        'application/json': {
          schema: ServiceResponseSchema(schema),
        },
      },
    },
  };
}

