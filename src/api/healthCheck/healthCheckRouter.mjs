import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import {
  ResponseStatus,
  ServiceResponse,
} from '../../commons/utils/serviceResponse.mjs';

import { handleServiceResponse } from '../../commons/utils/httpHandlers.mjs';
import { API_ROUTES } from '../../commons/constants/common.mjs';
import { createApiResponse } from '../../api-docs/openAPIResponseBuilders.mjs';

export const healthCheckRegistry = new OpenAPIRegistry();

export const healthCheckRouter = (() => {
  const router = express.Router();

  healthCheckRegistry.registerPath({
    method: 'get',
    path: `/api${API_ROUTES.HEALTH_CHECK}`,
    tags: ['Health Check'],
    description: `
      Check the health of the service.
      Workflow:
        - Return a success response.
    `,
    responses: createApiResponse(z.null(), 'Success'),
  });

  router.get('/', (_req, res) => {
    const serviceResponse = new ServiceResponse(
      ResponseStatus.Success,
      'Service is healthy',
      null,
      StatusCodes.OK
    );
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();

