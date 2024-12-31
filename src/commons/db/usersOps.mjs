import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { TABLES } from '../constants/common.mjs';
import { logger } from '../../server.mjs';
import { env } from '../utils/envConfig.mjs';

const { AWS_REGION } = env;

// Initialize DynamoDB client
const dynamoDBClient = new DynamoDBClient({
  region: AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

/**
 * Determine if the identifier is an email.
 * @param {string} identifier - The identifier to check.
 * @returns {boolean} True if it's an email, false otherwise.
 */
function isEmail(identifier) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
}

/**
 * Get a user by userId or email from DynamoDB.
 * @param {string} identifier - The user's ID or email.
 * @returns {Object|null} The user data if found, otherwise null.
 */
export async function getUser(identifier) {
  try {
    let command;

    if (isEmail(identifier)) {
      // Query by email using a GSI (assuming you have a GSI named `email-index`)
      command = new QueryCommand({
        TableName: TABLES.USERS.name,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': identifier,
        },
      });
    } else {
      // Get by userId (primary key)
      command = new GetCommand({
        TableName: TABLES.USERS.name,
        Key: { userId: identifier },
      });
    }

    const response = await docClient.send(command);

    if (response.Item || (response.Items && response.Items.length > 0)) {
      const user = response.Item || response.Items[0];
      logger.info(`User found:`, user);
      return user;
    }

    logger.info(`User with identifier "${identifier}" not found.`);
    return null;
  } catch (error) {
    logger.error(
      `Error fetching user with identifier "${identifier}":`,
      error.message
    );
    throw error;
  }
}

// /**
//  * Create a new user in DynamoDB if it does not already exist.
//  * @param {Object} user - The user data.
//  * @returns {Object} The newly created or existing user.
//  */
// export async function createUser(user) {
//   try {
//     const existingUser = await getUser(user.userId);

//     if (existingUser) {
//       logger.info('User already exists.');
//       return { alreadyExists: true };
//     }

//     const putCommand = new PutCommand({
//       TableName: TABLES.USERS.name,
//       Item: user,
//       ConditionExpression: 'attribute_not_exists(userId)',
//     });

//     await docClient.send(putCommand);
//     logger.info(`User created successfully:`, user);
//     return user;
//   } catch (error) {
//     if (error.name === 'ConditionalCheckFailedException') {
//       logger.error('User already exists.');
//       return await getUser(user.userId);
//     }

//     logger.error(
//       `Error creating user with ID "${user.userId}":`,
//       error.message
//     );
//     throw error;
//   }
// }

/**
 * Create a new user in DynamoDB if it does not already exist.
 * Ensures both userId and email are unique.
 * @param {Object} user - The user data.
 * @returns {Object} The newly created or existing user.
 */
export async function createUser(user) {
  try {
    // Check if the userId already exists
    const existingUserById = await getUser(user.userId);
    if (existingUserById) {
      logger.info('User with this userId already exists.');
      return { alreadyExists: true, user: existingUserById };
    }

    // Check if the email already exists using the GSI
    const findByEmailCommand = new QueryCommand({
      TableName: TABLES.USERS.name,
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': user.email,
      },
    });
    const existingUserByEmail = await docClient.send(findByEmailCommand);
    if (existingUserByEmail.Item || existingUserByEmail.Items.length > 0) {
      logger.info('User with this email already exists.');
      return { alreadyExists: true };
    }

    // If both userId and email are unique, proceed with creating the user
    const putCommand = new PutCommand({
      TableName: TABLES.USERS.name,
      Item: user,
      ConditionExpression: 'attribute_not_exists(userId)', // Ensure userId is unique
    });

    await docClient.send(putCommand);
    logger.info(`User created successfully:`, user);
    return user;
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      logger.error('User with this userId already exists.');
      return await getUser(user.userId);
    }

    logger.error(
      `Error creating user with ID "${user.userId}":`,
      error.message
    );
    throw error;
  }
}
