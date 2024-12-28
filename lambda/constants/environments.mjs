import "dotenv/config";

export const CONFIG = {
  API_BASE_URL:
    process.env.API_BASE_URL ??
    "REDACTED",
  ENVIRONMENT: process.env.NODE_ENV ?? "dev",
  DEFAULT_REGION: process.env.AWS_REGION ?? "REDACTED",
  DAAS_PUBLIC_KEY: process.env.DAAS_PUB_KEY ?? "REDACTED",
  DAAS_PRIVATE_KEY: process.env.DAAS_PRIV_KEY ?? "REDACTED",
  DAAS_BASE_URL: process.env.DAAS_BASE_URL ?? "REDACTED",
};
