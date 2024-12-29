// import '@/common/utils/db'; // Database connection setup

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet'; // Adds security headers
import { pino } from 'pino'; // Logger for application

import errorHandler from '@/commons/middleware/errorHandler';
import rateLimiter from '@/commons/middleware/rateLimiter';
import { env } from '@/commons/utils/envConfig';

import { apiRouter } from './router';

// Initialize logger
const logger = pino({ name: 'server start' });

// Initialize Express application
const app: Express = express();

// Trust reverse proxies (e.g., for HTTPS headers when behind a load balancer)
app.set('trust proxy', true);

// Middleware: Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Middleware: Enable CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: env.CORS_ORIGIN?.split(';'), // Allow origins specified in environment variable
    credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
  })
);

// Middleware: Parse JSON requests
app.use(bodyParser.json());

// Middleware: Add security headers
app.use(helmet());

// Middleware: Rate limiting (prevents abuse)
app.use(rateLimiter);

// Define application routes

// Health-check route to verify server status
app.use('/api', apiRouter);

// Middleware: Error handling (must be added last)
app.use(errorHandler());

// Export the application and logger
export { app, logger };
