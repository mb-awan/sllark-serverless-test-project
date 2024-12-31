import { logger } from '../../server.mjs';
import { TABLES } from '../constants/common.mjs';
import { ensureTableExists } from './commonOps.mjs';

// Just to Test the connection
const testConnection = async () => {
  try {
    const tables = Object.values(TABLES);
    await Promise.all(
      tables.map((table) => ensureTableExists(table, { log: false }))
    );
    logger.info('DynamoDB connection successful.');
  } catch (error) {
    logger.error('Error connecting to DynamoDB:', error);
  }
};

testConnection();
