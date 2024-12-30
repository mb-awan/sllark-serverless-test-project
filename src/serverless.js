import serverless from 'serverless-http';
import { app } from './server.mjs';

const handler = serverless(app);

export { handler };
