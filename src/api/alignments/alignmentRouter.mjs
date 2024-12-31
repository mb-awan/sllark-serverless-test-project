import express from 'express';
import { listAlignments, createAlignment } from './alignmentController.mjs';
import {
  ListAlignmentsValidationSchema,
  CreateAlignmentValidationSchema,
} from './alignmentSchemas.mjs';
import { validateRequest } from '../../commons/utils/httpHandlers.mjs';
import { authenticate } from '../../commons/middleware/authenticate.mjs';

export const ALIGNMENT_PATHS = {
  CREATE: '/',
  LIST: '/',
};

export const alignmentRouter = (() => {
  const router = express.Router();

  router.post(
    ALIGNMENT_PATHS.CREATE,
    authenticate,
    validateRequest(CreateAlignmentValidationSchema),
    createAlignment
  );

  router.get(
    ALIGNMENT_PATHS.LIST,
    authenticate,
    validateRequest(ListAlignmentsValidationSchema),
    listAlignments
  );

  return router;
})();
