import serverless from 'serverless-http'
import { app } from './server';


const handler = serverless(app);

module.exports.handler = handler;