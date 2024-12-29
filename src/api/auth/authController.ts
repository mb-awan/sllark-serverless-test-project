import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// import { generateToken, hashPassword, isValidPassword } from '@/commons/utils/auth';
import { APIResponse } from '@/commons/utils/response';
import { logger } from '@/server';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    console.log({ firstName, lastName, email, password, confirmPassword });

    return APIResponse.success(res, 'User registered successfully', { token: '' }, StatusCodes.CREATED);
  } catch (error) {
    console.log({ error });

    logger.error('Error while registering 456', JSON.stringify(error));
    return APIResponse.error(res, 'Error while registering', error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Login user controller
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    console.log({ identifier, password });

    return APIResponse.success(
      res,
      'Logged in successfully',
      {
        token: '123',
      },
      StatusCodes.OK
    );
  } catch (error) {
    console.log({ error });
    return APIResponse.error(res, 'Internal server error', error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};