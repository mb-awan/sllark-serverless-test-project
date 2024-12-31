import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly } from 'envalid';
import fs from 'fs';

const nodeEnvironment = process.env.NODE_ENV || 'development';

// Load environment variables from .env files based on the current environment
if (nodeEnvironment !== 'production') {
  const envPath = `.env.${nodeEnvironment}`;
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else {
    console.warn(
      `Environment file ${envPath} not found. Default values may be used.`
    );
  }
}

export const env = cleanEnv(process.env, {
  AWS_REGION: str({ devDefault: testOnly('ap-south-1') }),

  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'production', 'test'],
    optional: true,
  }),

  PORT: port({ devDefault: 4000 }),
  HOST: host({ devDefault: 'localhost' }),

  CORS_ORIGIN: str({ devDefault: 'http://localhost:3000' }),

  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: 1000 }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: 60000 }),

  JWT_SECRET_KEY: str({ devDefault: 'mySecret' }),
  JWT_EXPIRES_IN: str({ devDefault: '1d' }),

  BCRYPT_SALT_ROUNDS: num({ devDefault: 10 }),
});
