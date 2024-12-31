import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from './envConfig.mjs';

const { JWT_SECRET_KEY, JWT_EXPIRES_IN, BCRYPT_SALT_ROUNDS } = env;

export const generateToken = (user) => {
  const payload = {
    id: user.userId,
    email: user.email,
    username: user.userId,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET_KEY);

  return decoded;
};

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  return hashedPassword;
};

export const isValidPassword = async (password, hashedPassword) => {
  const validPassword = await bcrypt.compare(password, hashedPassword);

  return validPassword;
};

