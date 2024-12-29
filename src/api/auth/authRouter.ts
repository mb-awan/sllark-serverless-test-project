import express, { Router } from 'express';

import {
  loginUser,
  registerUser,
} from './authController';
import { validateRequest } from '@/commons/utils/httpHandlers';

import {
  LoginUserValidationSchema,
  RegisterUserValidationSchema,
} from './authSchemas';

export const AUTH_PATHS = {
  REGISTER: '/register',
  LOGIN: '/login',
};

export const authRoutes: Router = (() => {
  const router = express.Router();

  router.post(AUTH_PATHS.REGISTER, validateRequest(RegisterUserValidationSchema), registerUser);

  router.post(AUTH_PATHS.LOGIN, validateRequest(LoginUserValidationSchema), loginUser);

  return router;
})();
