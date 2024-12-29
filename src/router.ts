import { authRouter } from './api/auth/authRouter';
import { healthCheckRouter } from './api/healthCheck/healthCheckRouter';
import { API_ROUTES } from './commons/constants/common';
import express, { Router } from 'express';

export const apiRouter: Router = (() => {
  const router = express.Router();

  router.use(API_ROUTES.HEALTH_CHECK, healthCheckRouter);
  router.use(API_ROUTES.AUTH, authRouter);

  return router;
})();
