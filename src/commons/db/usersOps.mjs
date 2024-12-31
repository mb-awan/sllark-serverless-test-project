import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { TABLE_NAMES } from '../constants/common.mjs';
import { logger } from '../../server.mjs';
import { env } from '../utils/envConfig.mjs';

const { AWS_REGION } = env;

// Initialize DynamoDB client
const dynamoDBClient = new DynamoDBClient({
  region: AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

/**
 * Get a user by userId from DynamoDB.
 * @param {string} userId - The user's ID.
 * @returns {Object} The user data if found, otherwise null.
 */
export async function getUser(userId) {
  try {
    const getCommand = new GetCommand({
      TableName: TABLE_NAMES.USERS,
      Key: { userId },
    });

    const response = await docClient.send(getCommand);
    if (response.Item) {
      logger.info(`User found:`, response.Item);
      return response.Item;
    }

    logger.info(`User with ID "${userId}" not found.`);
    return null;
  } catch (error) {
    logger.error(`Error fetching user with ID "${userId}":`, error.message);
    throw error;
  }
}

/**
 * Create a new user in DynamoDB if it does not already exist.
 * @param {Object} user - The user data.
 * @returns {Object} The newly created or existing user.
 */
export async function createUser(user) {
  try {
    const existingUser = await getUser(user.userId);

    if (existingUser) {
      logger.info(`User with ID "${user.userId}" already exists.`);
      return { alreadyExists: true };
    }

    const putCommand = new PutCommand({
      TableName: TABLE_NAMES.USERS,
      Item: user,
      ConditionExpression: 'attribute_not_exists(userId)',
    });

    await docClient.send(putCommand);
    logger.info(`User created successfully:`, user);
    return user;
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      logger.error(`User with ID "${user.userId}" already exists.`);
      return await getUser(user.userId);
    }

    logger.error(
      `Error creating user with ID "${user.userId}":`,
      error.message
    );
    throw error;
  }
}
