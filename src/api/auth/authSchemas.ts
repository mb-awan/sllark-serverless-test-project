import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/commons/utils/commonValidation';

extendZodWithOpenApi(z);

export const RegisterUserValidationSchema = z
  .object({
    firstName: z.string().optional(),

    lastName: z.string().optional(),

    email: z.string().email('Invalid email address'),

    password: commonValidations.password,

    confirmPassword: commonValidations.password,
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export const LoginUserValidationSchema = z
  .object({
    identifier: commonValidations.identifier,
    password: commonValidations.password,
  })
  .strict();