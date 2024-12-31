import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand,
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
 * Create an alignment record in DynamoDB.
 * @param {Object} alignment - The alignment data.
 * @returns {Object} The created alignment record.
 */
export async function createAlignmentRecord(alignment) {
  try {
    const putCommand = new PutCommand({
      TableName: TABLES.ALIGNMENT.name,
      Item: alignment,
      ConditionExpression: 'attribute_not_exists(alignmentId)', // Prevent overwriting
    });

    await docClient.send(putCommand);
    logger.info(`Alignment created successfully:`, alignment);
    return alignment;
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      logger.info(
        `Alignment with ID "${alignment.alignmentId}" already exists.`
      );
      return { alreadyExists: true };
    }
    logger.error(`Error creating alignment:`, error.message);
    throw error;
  }
}

/**
 * List alignments by technician ID or fetch all alignments if no technician ID is provided.
 * @param {string} technicianId - The technician's ID (optional).
 * @returns {Array} List of alignments.
 */
export async function listAlignmentsByTechnician(technicianId = null) {
  try {
    const params = {
      TableName: TABLES.ALIGNMENT.name,
      ...(technicianId && {
        IndexName: 'technicianId-index', // Ensure this index exists
        KeyConditionExpression: 'technicianId = :technicianId',
        ExpressionAttributeValues: { ':technicianId': technicianId },
      }),
    };

    const command = technicianId
      ? new QueryCommand(params)
      : new ScanCommand(params);
    const response = await docClient.send(command);

    logger.info(`Alignments retrieved successfully:`, response.Items);
    return response.Items || [];
  } catch (error) {
    logger.error(`Error retrieving alignments:`, error.message);
    throw error;
  }
}
