import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../commons/utils/response.mjs';
import { handleError } from '../../commons/utils/handleError.mjs';
import {
  generateToken,
  hashPassword,
  isValidPassword,
} from '../../commons/utils/auth.mjs';
import { TABLE_NAMES, USER_ROLES } from '../../commons/constants/common.mjs';
import { getUser, createUser } from '../../commons/db/usersOps.mjs';
import { ensureTableExists } from '../../commons/db/commonOps.mjs';

export const registerUser = async (req, res) => {
  try {
    const { username, email, name, password } = req.body;

    await ensureTableExists(TABLE_NAMES.USERS);

    const hashedPassword = await hashPassword(password);

    const newUser = {
      userId: username,
      email,
      name,
      createdAt: new Date().toISOString(),
      role: USER_ROLES.TECH,
      password: hashedPassword,
    };

    const user = await createUser(newUser);

    if (user.alreadyExists) {
      return APIResponse.error(
        res,
        'User already exists',
        StatusCodes.CONFLICT
      );
    }

    const token = generateToken(user);

    return APIResponse.success(
      res,
      'User registered successfully',
      { token },
      StatusCodes.CREATED
    );
  } catch (error) {
    handleError(error, res);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    await ensureTableExists(TABLE_NAMES.USERS);

    const user = await getUser(identifier);

    if (!user) {
      return APIResponse.error(
        res,
        'Invalid Credentials',
        StatusCodes.UNAUTHORIZED
      );
    }

    const isPasswordValid = await isValidPassword(password, user.password);
    if (!isPasswordValid) {
      return APIResponse.error(
        res,
        'Invalid Credentials',
        StatusCodes.UNAUTHORIZED
      );
    }

    const token = generateToken(user);

    return APIResponse.success(
      res,
      'Logged in successfully',
      { token },
      StatusCodes.OK
    );
  } catch (error) {
    handleError(error, res);
  }
};
