import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly, url } from 'envalid';
import fs from 'fs';
import path from 'path';

const nodeEnvironment = process.env.NODE_ENV || 'development';

const envPath = nodeEnvironment !== 'production' ? path.resolve(process.cwd(), `.env.${nodeEnvironment}`) : null;

if (envPath && fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  if (nodeEnvironment !== 'production') {
    console.error(`Environment file .env.${process.env.NODE_ENV} not found`);
  }
}

export const env = cleanEnv(process.env, {
  AWS_REGION: str({ devDefault: testOnly('ap-southeast-1') }),

  DYNAMO_ENDPOINT: url({ devDefault: testOnly('http://localhost:8000') }),

  API_BASE_URL: url({ devDefault: testOnly('http://localhost:4000/api') }),

  DAAS_PUBLIC_KEY: str({ devDefault: testOnly('') }),
  DAAS_PRIVATE_KEY: str({ devDefault: testOnly('') }),
  DAAS_BASE_URL: url({ devDefault: testOnly('') }),

  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  PORT: port({ devDefault: testOnly(3000) }),
  HOST: host({ devDefault: testOnly('localhost') }),

  CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:3000;http://localhost:3001') }),

  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),

  JWT_SECRET_KEY: str({ devDefault: testOnly('mySecret') }),
  JWT_EXPIRES_IN: str({ devDefault: testOnly('1d') }),

  BCRYPT_SALT_ROUNDS: num({ devDefault: testOnly(10) }),
});
