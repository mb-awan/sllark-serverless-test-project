import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { generateOpenAPIDocument } from './openAPIDocumentGenerator.mjs';

export const openAPIRouter = (() => {
  const router = express.Router();
  const openAPIDocument = generateOpenAPIDocument();

  router.get('/swagger.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(openAPIDocument);
  });

  router.use('/', swaggerUi.serve, swaggerUi.setup(openAPIDocument));

  return router;
})();

