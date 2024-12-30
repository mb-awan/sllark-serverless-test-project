import express from 'express';

import { loginUser, registerUser } from './authController.mjs';

import {
  LoginUserValidationSchema,
  RegisterUserValidationSchema,
} from './authSchemas.mjs';
import { validateRequest } from '../../commons/utils/httpHandlers.mjs';

export const AUTH_PATHS = {
  REGISTER: '/register',
  LOGIN: '/login',
};

export const authRouter = (() => {
  const router = express.Router();

  router.post(
    AUTH_PATHS.REGISTER,
    validateRequest(RegisterUserValidationSchema),
    registerUser
  );

  router.post(
    AUTH_PATHS.LOGIN,
    validateRequest(LoginUserValidationSchema),
    loginUser
  );

  return router;
})();
