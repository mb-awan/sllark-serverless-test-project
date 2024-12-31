import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly } from 'envalid';
import fs from 'fs';

const nodeEnvironment = process.env.NODE_ENV || 'development';

if (nodeEnvironment !== 'production') {
  const envPath = process.env.NODE_ENV ? `.env.${nodeEnvironment}` : '.env';

  if (envPath && fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else {
    console.error(`Environment file .env.${process.env.NODE_ENV} not found`);
  }
}

export const env = cleanEnv(process.env, {
  AWS_REGION: str({ devDefault: testOnly('ap-south-1') }),

  NODE_ENV: str({
    devDefault: testOnly('test'),
    choices: ['development', 'production', 'test'],
    optional: true,
  }),

  PORT: port({ devDefault: testOnly(4000) }),
  HOST: host({ devDefault: testOnly('localhost') }),

  CORS_ORIGIN: str({
    devDefault: testOnly('http://localhost:3000'),
  }),

  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),

  JWT_SECRET_KEY: str({ devDefault: testOnly('mySecret') }),
  JWT_EXPIRES_IN: str({ devDefault: testOnly('1d') }),

  BCRYPT_SALT_ROUNDS: num({ devDefault: testOnly(10) }),
});
