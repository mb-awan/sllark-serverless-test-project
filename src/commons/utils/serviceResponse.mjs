import { z } from 'zod';

// Enum for Response Status
export const ResponseStatus = {
  Success: 'Success',
  Failed: 'Failed',
};

// Class for Service Response
export class ServiceResponse {
  constructor(status, message, responseObject = null, statusCode) {
    this.success = status === ResponseStatus.Success;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
  }
}

// Zod schema for Service Response
export const ServiceResponseSchema = (dataSchema) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
  });

