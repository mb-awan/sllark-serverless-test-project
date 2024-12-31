import {
  CreateTableCommand,
  DynamoDBClient,
  ListTablesCommand,
} from '@aws-sdk/client-dynamodb';
import { logger } from '../../server.mjs';
import { env } from '../utils/envConfig.mjs';

const { AWS_REGION } = env;

// Initialize DynamoDB client
const dynamoDBClient = new DynamoDBClient({
  region: AWS_REGION,
});

/**
 * Check if a DynamoDB table exists; if not, create it.
 * @param {string} tableName - The name of the DynamoDB table.
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function ensureTableExists(tableName, options = { log: true }) {
  const { log } = options;
  try {
    // Check if table exists
    const listTablesCommand = new ListTablesCommand({});
    const tables = await dynamoDBClient.send(listTablesCommand);

    if (tables.TableNames.includes(tableName)) {
      log && logger.info(`Table "${tableName}" already exists.`);
      return;
    }

    // Create table if it doesn't exist
    log && logger.info(`Table "${tableName}" does not exist. Creating...`);
    const createTableCommand = new CreateTableCommand({
      TableName: tableName,
      AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
      KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
      BillingMode: 'PAY_PER_REQUEST',
    });

    await dynamoDBClient.send(createTableCommand);
    log && logger.info(`Table "${tableName}" created successfully.`);
  } catch (error) {
    log &&
      logger.error(
        `Error ensuring table "${tableName}" exists:`,
        error.message
      );
    throw error;
  }
}
