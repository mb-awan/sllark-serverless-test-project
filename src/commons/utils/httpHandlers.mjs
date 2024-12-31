import { StatusCodes } from 'http-status-codes';
import { ResponseStatus, ServiceResponse } from './serviceResponse.mjs';

// Function to handle service responses
export const handleServiceResponse = (serviceResponse, response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

// Middleware to validate requests using Zod
export const validateRequest = (schema) => (req, res, next) => {
  try {
    const data = { ...req.body, ...req.query, ...req.params };
    schema.parse(data);
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${err.errors
      .map((e) => e.message)
      .join(', ')}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    res
      .status(statusCode)
      .send(
        new ServiceResponse(
          ResponseStatus.Failed,
          errorMessage,
          null,
          statusCode
        )
      );
  }
};

// Middleware to normalize query array
export const normalizeQueryArray = (paramName) => (req, res, next) => {
  const paramValue = req.query[paramName];

  if (typeof paramValue === 'string') {
    // Convert a comma-separated string to an array
    req.query[paramName] = paramValue.split(',').map((item) => item.trim());
  } else if (!Array.isArray(paramValue)) {
    // Default to an empty array if it's not a string or array
    req.query[paramName] = [];
  }

  next();
};

