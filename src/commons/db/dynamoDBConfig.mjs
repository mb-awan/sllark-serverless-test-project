import { logger } from '../../server.mjs';
import { TABLE_NAMES } from '../constants/common.mjs';
import { ensureTableExists } from './commonOps.mjs';

// Just to Test the connection
const testConnection = async () => {
  try {
    const tables = Object.values(TABLE_NAMES);
    await Promise.all(
      tables.map((table) => ensureTableExists(table, { log: false }))
    );
    logger.info('DynamoDB connection successful.');
  } catch (error) {
    logger.error('Error connecting to DynamoDB:', error);
  }
};

testConnection();
