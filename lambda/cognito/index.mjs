import AWS from 'aws-sdk';
import { TABLE_NAMES, USER_ROLES } from '../constants/index.mjs';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = TABLE_NAMES.USERS;

export const handler = async (event) => {
  const { userName, request } = event;
  const { email, name } = request.userAttributes; // Extract attributes from Cognito

  const params = {
    TableName: TABLE_NAME,
    Item: {
      userId: userName, // Cognito user ID
      email,
      name,
      createdAt: new Date().toISOString(),
      role: USER_ROLES.TECH,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log('User added to DynamoDB:', params.Item);

    return event;
  } catch (error) {
    console.error('Error adding user to DynamoDB:', error);

    throw new Error('Failed to add user to DynamoDB');
  }
};
