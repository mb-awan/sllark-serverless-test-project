import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const CreateAlignmentValidationSchema = z
  .object({
    alignmentId: z.string(),

    vehicleVin: z.string(),

    technicianId: z.string(),

    startTime: z.string(),

    endTime: z.string().optional(),

    status: z.enum(['in-progress', 'completed']),
  })
  .strict();

export const ListAlignmentsValidationSchema = z
  .object({
    technicianId: z.string().optional(),
  })
  .strict();
