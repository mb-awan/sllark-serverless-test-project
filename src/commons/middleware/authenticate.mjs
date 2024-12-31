import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../utils/response.mjs';

import jwt from 'jsonwebtoken';
import { env } from '../utils/envConfig.mjs';

const { JWT_SECRET_KEY } = env;

export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return APIResponse.error(
      res,
      'Unauthorized - Access token is missing or invalid',
      null,
      StatusCodes.UNAUTHORIZED
    );
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return APIResponse.error(
        res,
        'Unauthorized - Access token is missing or invalid',
        null,
        StatusCodes.UNAUTHORIZED
      );
    }

    req.user = user;
    next();
  });
};
