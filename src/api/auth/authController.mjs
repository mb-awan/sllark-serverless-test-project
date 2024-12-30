import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../commons/utils/response.mjs';
import { logger } from '../../server.mjs';

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    console.log({ firstName, lastName, email, password, confirmPassword });

    return APIResponse.success(
      res,
      'User registered successfully',
      { token: '' },
      StatusCodes.CREATED
    );
  } catch (error) {
    console.log({ error });

    logger.error('Error while registering 456', JSON.stringify(error));
    return APIResponse.error(
      res,
      'Error while registering',
      error,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Login user controller
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    console.log({ identifier, password });

    return APIResponse.success(
      res,
      'Logged in successfully',
      {
        token: '',
      },
      StatusCodes.OK
    );
  } catch (error) {
    console.log({ error });
    return APIResponse.error(
      res,
      'Internal server error',
      error,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
