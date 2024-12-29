import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { env } from './envConfig';

const { JWT_SECRET_KEY, JWT_EXPIRES_IN, BCRYPT_SALT_ROUNDS } = env;

export const generateToken = (user: any) => {
  const payload = {
    id: user.userId,
    email: user.email,
    username: user.userId,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });

  return token;
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET_KEY);

  return decoded;
};

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  return hashedPassword;
};

export const isValidPassword = async (password: string, hashedPassword: string) => {
  const validPassword = await bcrypt.compare(password, hashedPassword);

  return validPassword;
};
