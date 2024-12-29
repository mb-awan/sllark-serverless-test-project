import dynamoDB from './dynamoDBConfig';
import { logger } from '@/server';

const TABLE_NAME = 'users_table'; // Replace with your table name

// Function to connect and perform actions in DynamoDB
const connectToDynamoDB = async () => {
  try {
    // Example: Fetch all users from the DynamoDB table
    const params = {
      TableName: TABLE_NAME,
    };

    const data = await dynamoDB.scan(params).promise();
    logger.info(`Connected to DynamoDB. Retrieved ${data.Count} items.`);
  } catch (error) {
    logger.error('Error connecting to DynamoDB:', error);
  }
};

// Transform data before saving or returning (optional)
const transformData = (item: any) => {
  // Example: Convert DynamoDB keys to a more user-friendly format
  const { userId, ...rest } = item;
  return { id: userId, ...rest };
};

connectToDynamoDB();
