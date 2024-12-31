import express from 'express';
import { listAlignments, createAlignment } from './alignmentController.mjs';
import {
  ListAlignmentsValidationSchema,
  CreateAlignmentValidationSchema,
} from './alignmentSchemas.mjs';
import { validateRequest } from '../../commons/utils/httpHandlers.mjs';

export const ALIGNMENT_PATHS = {
  CREATE: '/',
  LIST: '/',
};

export const alignmentRouter = (() => {
  const router = express.Router();

  router.post(
    ALIGNMENT_PATHS.CREATE,
    validateRequest(CreateAlignmentValidationSchema),
    createAlignment
  );

  router.get(
    ALIGNMENT_PATHS.LIST,
    validateRequest(ListAlignmentsValidationSchema),
    listAlignments
  );

  return router;
})();
