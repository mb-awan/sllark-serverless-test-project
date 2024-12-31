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
 * @param {Object} table - The information of the DynamoDB table.
 * @param {boolean} [options.log=true] - Whether to log information.
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function ensureTableExists(table, options = { log: true }) {
  const { log } = options;
  try {
    // Check if table exists
    const listTablesCommand = new ListTablesCommand({});
    const tables = await dynamoDBClient.send(listTablesCommand);

    if (tables.TableNames.includes(table.name)) {
      log && logger.info(`Table "${table.name}" already exists.`);
      return;
    }

    // Build the attribute definitions
    const attributeDefinitions = [
      { AttributeName: table.index, AttributeType: 'S' }, // Primary key
      ...(table.secondIndex
        ? [{ AttributeName: table.secondIndex, AttributeType: 'S' }]
        : []), // Secondary key
    ];

    // Create table if it doesn't exist
    log && logger.info(`Table "${table.name}" does not exist. Creating...`);
    const createTableCommand = new CreateTableCommand({
      TableName: table.name,
      AttributeDefinitions: attributeDefinitions,
      KeySchema: [{ AttributeName: table.index, KeyType: 'HASH' }],
      ...(table.secondIndex && {
        GlobalSecondaryIndexes: [
          {
            IndexName: `${table.secondIndex}-index`, // Dynamic GSI name
            KeySchema: [{ AttributeName: table.secondIndex, KeyType: 'HASH' }],
            Projection: { ProjectionType: 'ALL' },
          },
        ],
      }),
      BillingMode: 'PAY_PER_REQUEST',
    });

    await dynamoDBClient.send(createTableCommand);
    log && logger.info(`Table "${table.name}" created successfully.`);
  } catch (error) {
    log &&
      logger.error(
        `Error ensuring table "${table.name}" exists:`,
        error.message
      );
    throw error;
  }
}
