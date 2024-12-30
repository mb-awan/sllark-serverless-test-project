import { openAPIRouter } from './api-docs/openAPIRouter.mjs';
import { authRouter } from './api/auth/authRouter.mjs';
import { healthCheckRouter } from './api/healthCheck/healthCheckRouter.mjs';
import { API_ROUTES } from './commons/constants/common.mjs';
import express from 'express';

export const apiRouter = (() => {
  const router = express.Router();

  router.use(API_ROUTES.HEALTH_CHECK, healthCheckRouter);
  router.use(API_ROUTES.AUTH, authRouter);

  // Swagger/OpenAPI route for API documentation
  router.use(API_ROUTES.DOCS, openAPIRouter);

  return router;
})();
