import AWS from 'aws-sdk';
import { env } from './envConfig'; // Import your environment variables
import { logger } from '@/server'; // Import logger

// Load AWS credentials and set region
const { AWS_REGION, DYNAMO_ENDPOINT } = env;

AWS.config.update({
  region: AWS_REGION,
  ...(DYNAMO_ENDPOINT && { endpoint: DYNAMO_ENDPOINT }), // For local DynamoDB testing
});

// Initialize DynamoDB Document Client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Test the connection
const testConnection = async () => {
  try {
    const params = {
      TableName: 'users_table', // Replace with your table name
      Limit: 1,
    };

    const result = await dynamoDB.scan(params).promise();
    logger.info(`Successfully connected to DynamoDB. Retrieved ${result.Count} items.`);
  } catch (error) {
    logger.error('Error connecting to DynamoDB:', error);
  }
};

testConnection();

export default dynamoDB;
